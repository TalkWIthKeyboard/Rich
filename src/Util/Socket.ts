class Socket {

    private socket;
    private scene;

    public constructor(scene, type, roomId, socketId) {

        this.scene = scene;
        let url = `ws://localhost:5000?type=${type}`;
        url += 
            type === 'Room' || type === 'Play' 
                ? `&roomId=${roomId}&socketId=${socketId}`
                : '';

        this.socket = io.connect(url);                

        switch (type) {
            case 'Hall':
                this.workTypeHall();
                break;
            case 'Room':
                this.workTypeRoom();
                break;
            case 'Play':
                this.workTypePlay();
                break;
        }
    }


    private workTypeHall() {

        this.socket.on('socketId', socketId => {
            this.scene.controller.me.setSocketId(socketId);
        })

        this.socket.on('roomNumber', message => {
            let msg = JSON.parse(message);
            this.scene.setRoomList(msg.room);
        })

        this.socket.on('create', roomId => {
            this.scene.jumpToRoom(roomId)
        })

        this.socket.on('join', roomId => {
            this.scene.jumpToRoom(roomId)
        })
    }


    private workTypeRoom() {
        this.socket.on('enter', message => {
            let msg = JSON.parse(message);
            this.scene.update(msg);
        })
        
        this.socket.on('exit', message => {
            let msg = JSON.parse(message);
            if (msg.obj.exitUser === this.scene.controller.me.getSocketId()) this.scene.jumpToHall();
            else this.scene.update(msg);
        })

        this.socket.on('start', () => {
            this.scene.jumpToPlay();
        })
    }

    private workTypePlay() {
        this.socket.on(Coder.GAME_STATE[1], message => {
            let msg = JSON.parse(message);
            this.scene.initPlayInterface(msg);
        })

        this.socket.on(Coder.GAME_STATE[2], message => {
            let msg = JSON.parse(message);
            if (this.scene.controller.me.getSocketId() === msg.user) {
                this.scene.showSelectCharacterModal(msg.role);
                this.scene.user = msg.user;
                this.scene.num = msg.num;
            } else
                if (this.scene.selectFlag) this.scene.hideSelectCharacterModal();
        })

        this.socket.on(Coder.GAME_STATE[4], message => {
            let msg = JSON.parse(message);
            if (this.scene.controller.me.getSocketId() === msg.user) this.scene.addSelectButton();
            else if (this.scene.selectCardFlag) this.scene.removeSelectButton();   
        })

        this.socket.on('Licensing', message => {
            let msg = JSON.parse(message);
            this.scene.addSelectButton(msg.cards);   
        })

        this.socket.on('ChooseCard', message => {
            let msg = JSON.parse(message);
            console.log('Cards: ', msg);
            this.scene.resetPlayerModal(msg.info);
            this.scene.removeSelectButton();
        })

        this.socket.on(Coder.GAME_STATE[5], message => {
            let msg = JSON.parse(message);
            console.log('House: ', msg);
            this.scene.resetPlayerModal(msg);
        })

        this.socket.on(Coder.GAME_END_STATE[Coder.GAME_STATE[2]], message => {
            let msg = JSON.parse(message);

            // 修正回合开始顺序
            for (let i = 0; i < msg.users.length; i++) 
                if (msg.users[i].socketId === this.scene.user) {
                    this.scene.num = i;
                    break;
                }
            if (this.scene.selectFlag) this.scene.hideSelectCharacterModal();

            // 第一名玩家开始回合
            if (this.scene.num === 0) {
                this.sendMessage(Coder.GAME_STATE[3], JSON.stringify({user: this.scene.controller.me.getSocketId()}));                            
            }
            this.sendMessage(Coder.GAME_END_STATE[Coder.GAME_STATE[2]], null);
        })

        this.socket.on(Coder.GAME_END_STATE[Coder.GAME_STATE[3]], () => {
            if (this.scene.selectCardFlag) this.scene.removeSelectButton();
            this.sendMessage(Coder.GAME_END_STATE[Coder.GAME_STATE[3]], null);  
        })
    }

    public sendMessage(evt, msg) {
        this.socket.emit(evt, msg);
    }
}