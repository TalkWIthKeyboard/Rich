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

        let bg = new eui.Image();
        bg.source = 'resource/assets/background.png';
        let logo = new eui.Image();
        logo.source = 'resource/assets/logo.png'
        logo.x = 420;
        logo.y = 252;
        
        let accountText = new MyTextInput('输入账号', 510, 70, 465, 540, 0.8);
        let usernameText = new MyTextInput('输入昵称', 510, 70, 465, 640, 0.8);
        let passwordText = new MyTextInput('输入密码', 510, 70, 465, 740, 0.8);
        let rePasswordText = new MyTextInput('输入密码', 510, 70, 465, 840, 0.8);
        passwordText.displayAsPassword = true;
        rePasswordText.displayAsPassword = true;
        
        let submitButton = new MyButton("注册", 240, 70, 465, 940, () => {

            let account = accountText.text;
            let username = usernameText.text;
            let password = passwordText.text;
            let rePassword = rePasswordText.text;

            if (!account) {
                let errModal = new Modal();
                this.addChildAt(errModal, 30);
                errModal.init(this, "系统提示", "请输入账号！");
            }
            else if(!username) {
                let errModal = new Modal();
                this.addChildAt(errModal, 30);
                errModal.init(this, "系统提示", "请输入用户名！");
            }
            else if(!password) {
                let errModal = new Modal();
                this.addChildAt(errModal, 30);
                errModal.init(this, "系统提示", "请输入密码！");
            }
            else if(!rePassword) {
                let errModal = new Modal();
                this.addChildAt(errModal, 30);
                errModal.init(this, "系统提示", "请再次输入密码！");
            }
            else if (!(password === rePassword)) {
                let errModal = new Modal();
                this.addChildAt(errModal, 30);
                errModal.init(this, "系统提示", "两次密码输入不一致！");
            }
            else {
                let registerParams = {account: account, username: username, password: password};
                console.log('url: '+ Coder.API_REGISTER + '\nregisterParams: ' + registerParams);
                let http = new Http(Coder.API_REGISTER, registerParams, 
                    (token) => {
                        console.log("Success Register");
                        this.controller.dispatchEvent(new ChangeSceneEvent(Coder.SCENE_TYPE.REGISTER, Coder.SCENE_TYPE.LOGIN));
                    },
                    (res) => {
                        console.log('Err: ' + res);
                        let errModal = new Modal();
                        this.addChildAt(errModal, 30);
                        errModal.init(this, "系统提示", "注册失败！");
                    });   
                http.send();      
            }
        });

        let loginButton = new MyButton("登录", 240, 70, 735, 940, () => {
            this.controller.dispatchEvent(new ChangeSceneEvent(Coder.SCENE_TYPE.REGISTER, Coder.SCENE_TYPE.LOGIN));
        });

        Util.workManyChild(this, [
            bg,
            logo,
            usernameText, 
            accountText, 
            passwordText, 
            rePasswordText, 
            loginButton,
            submitButton
            ], null);
    }
}