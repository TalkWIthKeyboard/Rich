class LoginScene extends egret.DisplayObjectContainer {

    private controller;

    public constructor(controller) {
        super();
        this.init(controller);
    }

    private init(controller) {
        this.controller = controller;

        let util = new Util();
        let accountText = new TextInput('INPUT', null, 30, 240, 10, 10);
        let passwordText = new TextInput('INPUT', null, 30, 240, 10, 40);
        let loginButton = new MyBitmap('', 'BUTTON', 40, 40, 1, 1);
        let registerButton = new MyBitmap('', 'BUTTON', 40, 80, 1, 1);

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
            // 切换场景
        }, this);

        util.workManyChild(this, [
            accountText, 
            passwordText, 
            loginButton, 
            registerButton
            ], null);
    }
}