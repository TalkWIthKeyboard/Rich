class RoomScene extends egret.DisplayObjectContainer {

    private controller;
    private type;

    public constructor(controller) {
        super();
        let resManage = new ResManage(controller, 'preload', () => {
            this.init(controller);
            this.controller.addChild(this);
        }, null);
    }

    private init(controller) {
        this.controller = controller;
        this.type = Coder.SCENE_TYPE.ROOM;
        let util = new Util();

        // let bg = new eui.Image();
        // bg.source = 'resource/assets/background.png';
        // this.addChild(bg);

        let roomList = new RoomList();
        roomList.init(this, 320, 200);

        Util.workManyChild(this, [
            roomList
        ], null);
    }
}