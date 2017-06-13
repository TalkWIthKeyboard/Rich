class Socket {

    private socket;
    private main;

    public constructor(main, type, roomId, socketId) {
        
        this.main = main;
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
            this.main.me.setSocketId(socketId);
            console.log(socketId);
        });

        this.socket.on('roomNumber', message => {
            let msg = JSON.parse(message);
            console.log(msg);
        })

        this.socket.on('create', () => {

        })

        this.socket.on('error', () => {

        })
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

    /**
     * 接收消息
     */
    private onReceiveMessage(e: egret.Event) {
        let msg:string = this.socket.readUTF();
        let obj = JSON.parse(msg);
    }
}