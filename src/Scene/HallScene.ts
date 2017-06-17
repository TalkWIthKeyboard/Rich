class HallScene extends egret.DisplayObjectContainer {

    private roomList;
    private type;
    private socketIO;
    public controller;    

    public constructor(controller) {
        super();
        let resManage = new ResManage(controller, 'preload', () => {
            this.init(controller);
            this.controller.addChild(this);
        }, null);
    }

    private init(controller) {
        this.type = Coder.SCENE_TYPE.HALL;
        this.controller = controller;
        let socket = new Socket(this, this.type, null, null);
        if (!!this.controller.me.getRoomId()) {
            this.socketIO.socket.emit('enter', JSON.stringify({roomId: this.controller.me.getRoomId()}));
            this.controller.me.setRoomId(null);
        }
        let util = new Util();

        let bg = new eui.Image();
        bg.source = 'resource/assets/background.png';
        this.addChild(bg);

        let roomList = new RoomList();
        roomList.init(this, 320, 200);

        Util.workManyChild(this, [
            roomList
        ], null);
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