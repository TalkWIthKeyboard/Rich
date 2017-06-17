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

        let bg = new eui.Image();
        bg.source = 'resource/assets/background.png';
        let logo = new eui.Image();
        logo.source = 'resource/assets/logo.png'
        logo.x = 420;
        logo.y = 252;

        let accountText = new MyTextInput('输入账号', 510, 70, 465, 540, 0.8);
        let passwordText = new MyTextInput('输入密码', 510, 70, 465, 640, 0.8);
        passwordText.displayAsPassword = true;

        let loginButton = new MyButton('登录', 240, 70, 465, 740, () => {

            let account = accountText.text;
            let password = passwordText.text;

            if (account !== '' && password !== '') {
                let loginParams = {account: account, password: password};
                let http = new Http(Coder.API_LOGIN, loginParams, 
                    (data) => {
                        console.log("Success Login");
                        let _token = JSON.parse(data).data.token;
                        let _username = JSON.parse(data).data.username;
                        controller.me.setToken(_token);
                        controller.me.setUsername(_username);
                        this.controller.dispatchEvent(new ChangeSceneEvent(Coder.SCENE_TYPE.LOGIN, Coder.SCENE_TYPE.ROOM));
                    },
                    (res) => {
                        console.log('Err: ' + res);
                        let errModal = new Modal();
                        this.addChild(errModal);
                        errModal.init(this, "系统提示", "登录失败！");
                    });   
                http.send();      
            } else {
                let errModal = new Modal();
                this.addChild(errModal);
                errModal.init(this, "系统提示", "请输入用户名/密码！");
            }
        })

        let registerButton = new MyButton('注册', 240, 70, 735, 740, () => {
            this.controller.dispatchEvent(new ChangeSceneEvent(Coder.SCENE_TYPE.LOGIN, Coder.SCENE_TYPE.REGISTER));
        })
        Util.workManyChild(this, [
            bg,
            logo,
            accountText, 
            passwordText, 
            loginButton, 
            registerButton
        ], null);
    }
}