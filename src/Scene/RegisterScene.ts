class RegisterScene extends egret.DisplayObjectContainer {

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
        this.type = Coder.SCENE_TYPE.REGISTER;
        
        let usernameText = new TextInput('INPUT', null, 30, 240, 10, 10);
        let accountText = new TextInput('INPUT', null, 30, 240, 10, 10);
        let passwordText = new TextInput('INPUT', null, 30, 240, 10, 40);
        let rePasswordText = new TextInput('INPUT', null, 30, 240, 10, 40);

        let sureButton = new MyBitmap('egret_icon_png', 'BUTTON', 40, 40, 1, 1);
        let exitButton = new MyBitmap('egret_icon_png', 'BUTTON', 40, 200, 1, 1);

        sureButton.addTouchEvent((evt) => {
            let account = accountText.text;
            let password = passwordText.text;
            let username = usernameText.text;
            let rePassword = rePasswordText.text;

            if (password !== rePassword) {
                // 报错
                return;
            }

            if (account !== '' && password !== '' && username !== '' && rePassword !== '') {
                // 进行HTTP请求            
            } else {
                // 报错
            }
        }, this);

        exitButton.addTouchEvent((evt) => {
            this.controller.dispatchEvent(new ChangeSceneEvent(Coder.SCENE_TYPE.REGISTER, Coder.SCENE_TYPE.LOGIN));
        }, this);

        Util.workManyChild(this, [
            usernameText, 
            accountText, 
            passwordText, 
            rePasswordText, 
            sureButton, 
            exitButton
            ], null);
    }
}