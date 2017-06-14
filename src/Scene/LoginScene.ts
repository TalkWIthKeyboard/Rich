class LoginScene extends egret.DisplayObjectContainer {

    private controller;

    public constructor(controller) {
        super();

        console.log('1');
        let resManage = new ResManage(controller, 'preload', () => {
            this.init(controller);
            this.controller.addChild(this);
        }, null);
    }

    private init(controller) {
        this.controller = controller;

        let accountText = new TextInput('INPUT', null, 30, 240, 10, 10);
        let passwordText = new TextInput('INPUT', null, 30, 240, 10, 40);
        let loginButton = new MyBitmap('egret_icon_png', 'BUTTON', 40, 40, 1, 1);
        let registerButton = new MyBitmap('egret_icon_png', 'BUTTON', 40, 400, 1, 1);

        loginButton.addTouchEvent((evt) => {
            let account = accountText.text;
            let password = passwordText.text;

            if (account !== '' && password !== '') {
                // 进行HTTP请求            
            } else {
                // 报错
            }
        }, this);

        registerButton.addTouchEvent((evt) => {
            this.controller.dispatchEventWith('event');
        }, this);

        Util.workManyChild(this, [
            accountText, 
            passwordText, 
            loginButton, 
            registerButton
            ], null);
    }
}