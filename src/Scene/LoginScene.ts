class LoginScene extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.init();
    }

    private init() {
        let accountText = new TextInput('INPUT', null, 30, 240, 10, 10);
        let passwordText = new TextInput('INPUT', null, 30, 240, 10, 40);
        let loginButton = new MyBitmap('', 'BUTTON', 40, 40, 1, 1);
        let registerButton = new MyBitmap('', 'BUTTON', 40, 80, 1, 1);

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
            // 切换场景
        }, this);
    }
}