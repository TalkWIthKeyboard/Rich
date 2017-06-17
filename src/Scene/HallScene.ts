class HallScene extends egret.DisplayObjectContainer {

    private roomList;
    private type;
    private socketIO;
    public controller;    

    public constructor(controller) {
        super();
        this.init(controller);
    }

    private init(controller) {
        this.type = Coder.SCENE_TYPE.HALL;
        this.controller = controller;
        this.socketIO = new Socket(this, this.type, null, null);

        if (!!this.controller.me.getRoomId()) {
            this.socketIO.socket.emit('enter', JSON.stringify({roomId: this.controller.me.getRoomId()}));
            this.controller.me.setRoomId(null);
        }
    }

    public joinRoom(roomId) {
        this.controller.me.setRoomId(roomId);
        this.socketIO.socket.emit('disconnect');
        this.controller.dispatchEvent(new ChangeSceneEvent(Coder.SCENE_TYPE.HALL, Coder.SCENE_TYPE.ROOM));
    }

    public setRoomList(roomList) {
        this.roomList = roomList;
    }

    public getRoomList() {
        return this.roomList;
    }
}