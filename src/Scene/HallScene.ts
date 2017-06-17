class HallScene extends egret.DisplayObjectContainer {

    private roomList;
    private type;
    private socketIO;
    public controller;    

    private myRoomList: MyRoomList;

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

        this.myRoomList = new MyRoomList();
        this.myRoomList.init(this, 320, 200);

        // let data = [];
        // for(let i=0;i<20;i++) {
        //     data.push({id: i, name: 'This is name', number: i, limit: 5});
        // }
        // this.myRoomList.update(data);

        Util.workManyChild(this, [
            this.myRoomList
        ], null);
    }

    public joinRoom(roomId) {
        this.controller.me.setRoomId(roomId);
        this.socketIO.socket.emit('disconnect');
        this.controller.dispatchEvent(new ChangeSceneEvent(Coder.SCENE_TYPE.HALL, Coder.SCENE_TYPE.ROOM));
    }

    public setRoomList(roomList) {
        this.roomList = roomList;
        this.myRoomList.update(roomList);
    }

    public getRoomList() {
        return this.roomList;
    }
}