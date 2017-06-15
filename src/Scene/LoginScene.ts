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
            // 切换场景
        })
        
        let loginModal = new Modal("", "");
        loginModal.x = 10;
        loginModal.y = 10;
        loginModal.setPositiveButton("登录", () => {console.log("Positive")});
        loginModal.setNegativeButton("注册", () => {console.log("Negative")});

        util.workManyChild(this, [
            accountText, 
            passwordText, 
            loginButton, 
            registerButton,
            // loginModal
            ], null);
    }
}