class HallScene extends egret.DisplayObjectContainer {

    private roomList;
    private type;
    private socketIO: Socket;
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

        let title = new eui.Label('选择房间');
        title.x = 48, title.y = 36;
        title.size = 48;
        title.textColor = 0x543503;
        title.bold = true;
        this.addChild(title);

        let createRoomButton = new MyButton('创建房间', 300, 71, 523, 28, () => {
            let creatRoom = new MyCreateRoom();
            this.addChild(creatRoom);
            creatRoom.init(this, 405, 251, this.sendCreateRoom);
        });
        this.addChild(createRoomButton);

        this.myRoomList = new MyRoomList();
        this.myRoomList.init(this);

        let img = new eui.Image("resource/assets/img.png");
        img.x = 1031;
        img.y = 276;

        let usernameLabel = new eui.Label(this.controller.me.getUsername());
        usernameLabel.size = 48;
        usernameLabel.textColor = 0x543503;
        usernameLabel.x = 1049;
        usernameLabel.y = 513;

        let editeButton = new eui.Button();
        editeButton.skinName = "resource/eui_skins/EditButton.exml";
        editeButton.x = 1031;
        editeButton.y = 591;

        Util.workManyChild(this, [
            this.myRoomList,
            img,
            usernameLabel,
            editeButton
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
    public sendJoinRoom(roomId) {
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
        this.socketIO.sendMessage('disconnect', null);
        this.controller.dispatchEvent(new ChangeSceneEvent(Coder.SCENE_TYPE.HALL, Coder.SCENE_TYPE.ROOM));
    }
}