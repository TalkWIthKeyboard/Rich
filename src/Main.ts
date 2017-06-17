class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;
    // 玩家自己的实例
    public me: User;
    private loginScene: LoginScene;
    private registerScene: RegisterScene;
    private hallScene: HallScene;
    private roomScene: RoomScene;

    public constructor() {
        super();
        this.me = new User();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        // 设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        // 初始化Resource资源加载库
        RES.loadConfig("resource/default.res.json", "resource/");

        this.loginScene = new LoginScene(this);
        this.addEventListener(ChangeSceneEvent.CHANGE_SCENE_EVENT, this.changeScene, this);

        // this.hallScene = new HallScene(this);
        // this.addEventListener(ChangeSceneEvent.CHANGE_SCENE_EVENT, this.changeScene, this);
    }

    private changeScene(e: ChangeSceneEvent) {
        switch (e.thisScene) {
            case Coder.SCENE_TYPE.LOGIN:
                this.removeChild(this.loginScene);
            break;
            case Coder.SCENE_TYPE.REGISTER:
                this.removeChild(this.registerScene);
            break;
            case Coder.SCENE_TYPE.HALL:
                this.removeChild(this.hallScene);
            break;
            case Coder.SCENE_TYPE.ROOM:
                this.removeChild(this.roomScene);
            break;
        }

        switch (e.nextScene) {
            case Coder.SCENE_TYPE.LOGIN:
                this.loginScene = new LoginScene(this);
                this.addChild(this.loginScene);
            break;
            case Coder.SCENE_TYPE.REGISTER:
                this.registerScene = new RegisterScene(this);
                this.addChild(this.registerScene);
            break;
            case Coder.SCENE_TYPE.HALL:
                this.hallScene = new HallScene(this);
                this.addChild(this.hallScene);
            break;
            case Coder.SCENE_TYPE.ROOM:
                this.roomScene = new RoomScene(this);
                this.addChild(this.roomScene);
            break;
        }
    }

    private textfield: egret.TextField;

    private createGameScene() {
        this.me = new User();
        let websocket = new Socket(this, 'Hall', null, null);
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}


