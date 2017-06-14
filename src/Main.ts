class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;
    // 玩家自己的实例
    private me: User;
    private loginScene: LoginScene;
    private registerScene: RegisterScene;
    private nowScene: string;

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
        this.addEventListener('event', this.changeScene, this);
    }

    private changeScene(evt: egret.Event) {
        this.loginScene.removeEventListener('event', this.changeScene, this);        
        this.removeChild(this.loginScene);
        this.registerScene = new RegisterScene(this);
    }
}


