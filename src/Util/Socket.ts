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
            // this.scene.setRoomList(msg.room);
            console.log(msg.room);
        })

        this.socket.on('create', () => {

        })

        this.socket.on('join', () => {

        })

        this.socket.on('error', () => {

        })

        this.socket.emit('enter', JSON.stringify({'roomId': ''}));
    }


    private workTypeRoom() {
        this.socket.on('enter', message => {
            let msg = JSON.parse(message);
            
        })

        this.socket.on('join', message => {
            let msg = JSON.parse(message);
        })

        this.socket.on('ready', socketId => {

        })

        this.socket.on('noReady', socketId => {
        
        })

        this.socket.on('disconnect', socketId => {

        })

        this.socket.on('error', () => {
            
        })
    }


    private workTypePlay() {
        this.socket.on('state', message => {

        })

        this.socket.on('error', () => {
            
        })
    }

    public sendMessage(evt, msg) {
        this.socket.emit(evt, msg);
    }
}