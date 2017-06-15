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

        let util = new Util();

        let accountText = new TextInput('INPUT', null, 30, 240, 10, 10);
        let passwordText = new TextInput('INPUT', null, 30, 240, 10, 40);

        let loginButton = new MyButton('Login', 100, 50, 200, 750, () => {

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
        })

        let registerButton = new MyButton('Register', 100, 50, 400, 750, () => {
            this.controller.dispatchEvent(new ChangeSceneEvent(Coder.SCENE_TYPE.LOGIN, Coder.SCENE_TYPE.REGISTER));
        })
        
        let loginModal = new Modal("", "");
        loginModal.x = 10;
        loginModal.y = 10;
        loginModal.setPositiveButton("登录", () => {console.log("Positive")});
        loginModal.setNegativeButton("注册", () => {console.log("Negative")});


        Util.workManyChild(this, [
            accountText, 
            passwordText, 
            loginButton, 
            registerButton,
            // loginModal
            ], null);
    }
}