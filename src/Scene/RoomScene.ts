class RoomScene extends egret.DisplayObjectContainer {

    private type;
    private socketIO: Socket;

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
        this.socketIO = new Socket(this, this.type, this.controller.me.getRoomId(), this.controller.me.getSocketId());
        


        Util.workManyChild(this, [
        ], null);
    }

    /**
     * 发送准备信息
     */
    public sendReady() {
        this.socketIO.sendMessage('ready', null);
    }

    /**
     * 发送取消准备信息
     */
    public sendNotReady() {
        this.socketIO.sendMessage('noReady', null);
    }

    /**
     * 发送断开连接信息
     */
    public sendDisconnect() {
        this.socketIO.sendMessage('disconnect', null);
    }
    
    /**
     * 跳转到游戏界面
     */
    public jumpToPlay() {
        this.socketIO.sendMessage('disconnect', null);
        this.controller.dispatchEvent(new ChangeSceneEvent(Coder.SCENE_TYPE.ROOM, Coder.SCENE_TYPE.PLAY));
    }
}