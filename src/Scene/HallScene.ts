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
        this.socketIO = new Socket(this, this.type, null, null);
        if (!!this.controller.me.getRoomId()) {
            this.socketIO.sendMessage('enter', JSON.stringify({roomId: this.controller.me.getRoomId()}));
            this.controller.me.setRoomId('');
        }
        let util = new Util();

        let bg = new eui.Image();
        bg.source = 'resource/assets/background.png';
        this.addChild(bg);

        this.myRoomList = new MyRoomList();
        this.myRoomList.init(this, 320, 200);

        let createRoomButton = new MyButton('创建房间', 200, 70, 50, 100, () => {
            let creatRoom = new MyCreateRoom();
            this.addChild(creatRoom);
            creatRoom.init(this,'创建房间', '啦啦啦啦', 400, 400, this.sendCreateRoom);
        });
        this.addChild(createRoomButton);

        Util.workManyChild(this, [
            this.myRoomList
        ], null);
    }

    public setRoomList(roomList) {
        this.roomList = roomList;
        this.myRoomList.update(roomList);
    }

    public getRoomList() {
        return this.roomList;
    }

    /**
     * 发送创建房间信息
     */
    public sendCreateRoom(roomName, roomNumber) {
        this.socketIO.sendMessage('create', JSON.stringify({
            room: {name: roomName, number: roomNumber}, 
            user: {name: this.controller.me.getUsername()}
        }));
    }

    /**
     * 发送加入房间信息
     */
    public sendJoinRoom(roomId, username) {
        this.socketIO.sendMessage('join', JSON.stringify({
            name: this.controller.me.getUsername(),
            roomId: roomId
        }))
    }

    /**
     * 跳转到房间页面
     */
    public jumpToRoom(roomId) {
        this.controller.me.setRoomId(roomId);
        this.socketIO.socket.emit('disconnect');
        this.controller.dispatchEvent(new ChangeSceneEvent(Coder.SCENE_TYPE.HALL, Coder.SCENE_TYPE.ROOM));
    }
}