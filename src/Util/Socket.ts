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

        this.socket.on(Coder.GAME_STATE[3], message => {
            let msg = JSON.parse(message);
            if (this.scene.selectFlag) this.scene.hideSelectCharacterModal();          
        })
    }

    public sendMessage(evt, msg) {
        this.socket.emit(evt, msg);
    }
}