class LoginScene extends egret.DisplayObjectContainer {

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
        this.type = Coder.SCENE_TYPE.LOGIN;

        let accountText = new TextInput('INPUT', null, 30, 240, 10, 10);
        let passwordText = new TextInput('INPUT', null, 30, 240, 10, 40);
        let loginButton = new MyBitmap('egret_icon_png', 'BUTTON', 40, 40, 1, 1);
        let registerButton = new MyBitmap('egret_icon_png', 'BUTTON', 40, 400, 1, 1);

        loginButton.addTouchEvent((evt) => {
            let account = accountText.text;
            let password = passwordText.text;

            if (account !== '' && password !== '') {
                let loginParams = {account: account, password: password};
                let http = new Http(Coder.API_LOGIN, loginParams, 
                    (token) => {
                        console.log("Success Login");
                        token = JSON.parse(token).data.token;
                        controller.me.setToken(token);
                    },
                    (res) => {
                        console.log('Err: ' + res);
                    });   
                http.send();      
            } else {
                // 报错
            }
        }, this);

        registerButton.addTouchEvent((evt) => {
            this.controller.dispatchEvent(new ChangeSceneEvent(Coder.SCENE_TYPE.LOGIN, Coder.SCENE_TYPE.REGISTER));
        }, this);

        Util.workManyChild(this, [
            accountText, 
            passwordText, 
            loginButton, 
            registerButton
            ], null);
    }
}