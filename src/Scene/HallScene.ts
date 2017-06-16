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
    }

    private createScene() {
        // 通过场景的图片来渲染界面
        for (let i = 0; i < this.roomList.length; i++) {
            let room = new MyBitmap('', '', 10, 10, 10, 10);
            room.addTouchEvent((ev) => {
                // 进入房间的逻辑
            }, this);
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