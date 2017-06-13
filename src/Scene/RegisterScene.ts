class RegisterScene extends egret.DisplayObjectContainer {

    private controller;

    public constructor(controller) {
        super();
        this.init(controller);
    }

    private init(controller) {
        this.controller = controller;
        
        let util = new Util();
        let usernameText = new TextInput('INPUT', null, 30, 240, 10, 10);
        let accountText = new TextInput('INPUT', null, 30, 240, 10, 10);
        let passwordText = new TextInput('INPUT', null, 30, 240, 10, 40);
        let rePasswordText = new TextInput('INPUT', null, 30, 240, 10, 40);

        let sureButton = new MyBitmap('', 'BUTTON', 40, 40, 1, 1);
        let exitButton = new MyBitmap('', 'BUTTON', 40, 80, 1, 1);

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
            // 切换场景
        }, this);

        util.workManyChild(this, [
            usernameText, 
            accountText, 
            passwordText, 
            rePasswordText, 
            sureButton, 
            exitButton
            ], null);
    }
}