class RoomScene extends egret.DisplayObjectContainer {

    private type;
    private socketIO: Socket;
    private title: eui.Label;
    private readyButton: eui.Button;
    private noReadyButton: eui.Button;
    private readyornot: boolean;
    private userList: Array<MyRoomUser>;
    private position = [
        {x: 101, y: 243},
        {x: 352, y: 243},
        {x: 603, y: 243},
        {x: 101, y: 591},
        {x: 352, y: 591},
        {x: 603, y: 591},
    ];

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
        this.readyornot = false;

        let bg = new eui.Image();
        bg.source = 'resource/assets/background.png';
        this.addChild(bg);

        this.title = new eui.Label("");
        this.title.size = 48;
        this.title.bold = true;
        this.title.textColor = 0x543503;
        this.title.x = 48;
        this.title.y = 36;
        this.addChild(this.title);

        let exitButton = new eui.Button();
        exitButton.skinName = "resource/eui_skins/ExitButton.exml";
        exitButton.width = 230;
        exitButton.height = 79;
        exitButton.x = 1181;
        exitButton.y = 28;
        exitButton.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.socketIO.sendMessage('exit', null);
        }, this);
        this.addChild(exitButton);

        let img = new eui.Image("resource/assets/img.jpg");
        img.x = 1031;
        img.y = 276;
        this.addChild(img);

        let usernameLabel = new eui.Label(this.controller.me.getUsername());
        usernameLabel.size = 48;
        usernameLabel.textColor = 0x543503;
        usernameLabel.x = 1049;
        usernameLabel.y = 513;
        this.addChild(usernameLabel);

        this.readyButton = new eui.Button();
        this.readyButton.skinName = "resource/eui_skins/ReadyButtonSkin.exml";
        this.readyButton.x = 1031;
        this.readyButton.y = 591;
        this.readyButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendNotReady, this)

        this.noReadyButton = new eui.Button();
        this.noReadyButton.skinName = "resource/eui_skins/NoReadyButtonSkin.exml";
        this.noReadyButton.x = 1031;
        this.noReadyButton.y = 591;
        this.noReadyButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendReady, this)
        this.addChild(this.noReadyButton);

        this.userList = new Array<MyRoomUser>();
        
        for(let i = 0; i < 6; i++) {
            let user = new MyRoomUser();
            user.init();
            user.x = this.position[i].x;
            user.y = this.position[i].y;
            this.userList.push(user);
            this.addChild(user);
        }

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
     * 跳转到游戏界面
     */
    public jumpToPlay() {
        this.socketIO.sendMessage('disconnect', null);
        this.controller.dispatchEvent(new ChangeSceneEvent(Coder.SCENE_TYPE.ROOM, Coder.SCENE_TYPE.PLAY));
    }

    /**
     * 跳转到大厅界面
     */
    public jumpToHall() {
        this.socketIO.sendMessage('disconnect', null);
        this.controller.dispatchEvent(new ChangeSceneEvent(Coder.SCENE_TYPE.ROOM, Coder.SCENE_TYPE.HALL));
    }

    /**
     * 更新界面
     */
    public update(msg) {
        console.log(msg);
        for (let i = 0; i < msg.room.num - 1; i++) 
            this.userList[i].clear();
        let users = msg.users;
        let find = 0;
        for(let i = 0; i < users.length; i++) {
            if(users[i].id == this.controller.me.getSocketId()) {
                find = 1;
                if(this.readyornot != users[i].type) {
                    if(users[i].type) {
                        this.removeChild(this.noReadyButton);
                        this.addChild(this.readyButton);
                    } else {
                        this.removeChild(this.readyButton);
                        this.addChild(this.noReadyButton);
                    }
                    this.readyornot = users[i].type;
                }
            }
            else this.userList[i - find].setUser(users[i]);
        }
        let room = msg.room;
        this.title.text = room.name + '   (' + users.length + '/' + room.num + ')';

        for(let i = users.length - 1; i < room.num; i++) {
            this.userList[i].clear();
        }

        for(let i = room.num - 1; i < 6; i++) {
            this.userList[i].unable();
        }
    }
}