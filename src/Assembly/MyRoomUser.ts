class MyRoomUser extends eui.Group {
	
	private img: eui.Image;
	private usernameLabel: eui.Label;
	private readyLabel: eui.Label;
	private notReadyLabel: eui.Label;
	private readyornot: boolean;

	public constructor() {
		super();
		this.usernameLabel = new eui.Label();
		this.readyLabel = new eui.Label();
		this.notReadyLabel = new eui.Label();
		this.width = 165;
		this.height = 292;
	}

	public init() {
		this.img = new eui.Image("resource/assets/Room/waituser.jpg");
		this.addChild(this.img);
		this.usernameLabel.text = '';
		this.usernameLabel.horizontalCenter = "0";
		this.usernameLabel.size = 36;
		this.usernameLabel.textColor = 0x543503;
		this.usernameLabel.y = 185;
		this.addChild(this.usernameLabel);
		this.readyLabel.text = '';
		this.readyLabel.size = 32;
		this.readyLabel.textColor = 0x543503;
		this.readyLabel.y = 247;
		this.readyLabel.horizontalCenter = "0";
		this.addChild(this.readyLabel);
	}

	public setUser(user) {
		this.removeChild(this.img);
		this.img = new eui.Image("resource/assets/Room/user.jpg");
		this.addChildAt(this.img, 0);
		this.usernameLabel.text = user.name;
		if(user.type) {
			this.readyLabel.text = '准备好了';
			this.readyLabel.textColor = 0x543503;
		}
		else {
			this.readyLabel.text = '准备中...';
			this.readyLabel.textColor = 0xF5F5F5;
		}
	}

	public clear() {
		this.removeChild(this.img);
		this.img = new eui.Image("resource/assets/Room/waituser.jpg");
		this.addChildAt(this.img, 0);
		this.usernameLabel.text = '';
		this.readyornot = null;
		this.readyLabel.text = '';
	}

	public unable() {
		this.removeChild(this.img);
		this.img = new eui.Image("resource/assets/Room/nouser.png");
		this.addChildAt(this.img, 0);
		this.usernameLabel.text = '';
		this.readyornot = null;
	}
}
