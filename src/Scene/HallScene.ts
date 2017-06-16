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

    private createScene() {
        // 通过场景的图片来渲染界面
        // for (let i = 0; i < this.roomList.length; i++) {
        //     let room = new MyBitmap('', '', 10, 10, 10, 10);
        //     room.addTouchEvent((ev) => {
        //         // 进入房间的逻辑
        //     }, this);
        // }
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