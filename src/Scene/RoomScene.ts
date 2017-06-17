class RoomScene extends egret.DisplayObjectContainer {

    private type;
    private socket;

    public controller;    

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
        // this.socket = new Socket(this, this.type, this.controller.me.getRoomId(), this.controller.me.getSocketId());
        


        Util.workManyChild(this, [
        ], null);
    }

}