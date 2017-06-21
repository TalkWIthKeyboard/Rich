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
            this.scene.resetPlayerModal(msg.info);
            if (this.scene.num === msg.num)
                this.scene.removeSelectButton();
        })

        this.socket.on('ShowRole', message => {
            let msg = JSON.parse(message);
            this.scene.resetPlayerModal(msg);
        })

        this.socket.on('GameOver', message => {
            let msg = JSON.parse(message);
            console.log(msg);
            this.scene.showScorePanel(msg);
        })

        this.socket.on('ShowRoleAndMessage', message => {
            let msg = JSON.parse(message);
            for (let i = 0; i < msg.length; i++) 
                if (this.scene.controller.me.getSocketId() === msg[i].socketId) 
                    this.scene.num = i;
            this.scene.resetPlayerModal(msg);
        })

        this.socket.on('Skill', message => {
            let msg = JSON.parse(message);
            this.scene.resetPlayerModal(msg);
        })

        this.socket.on(Coder.GAME_STATE[5], message => {
            let msg = JSON.parse(message);
            this.scene.resetPlayerModal(msg.info);
            // 如果是最后一个玩家就发送结束回合状态
            if (msg.num === msg.info.users.length - 1)
                if (msg.num === this.scene.num)
                    this.sendMessage(Coder.GAME_STATE[3], JSON.stringify({user: '1'})); 
                else 
                    this.sendMessage(Coder.GAME_STATE[3], JSON.stringify({user: '2'}));

            // 如果不是最后一个玩家，继续            
            if (msg.num + 1 === this.scene.num) {
                this.sendMessage(Coder.GAME_STATE[3], JSON.stringify({user: this.scene.controller.me.getSocketId()})); 
            }
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
            if (this.scene.num === 0)
                this.sendMessage(Coder.GAME_STATE[3], JSON.stringify({user: this.scene.controller.me.getSocketId()}));                            
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