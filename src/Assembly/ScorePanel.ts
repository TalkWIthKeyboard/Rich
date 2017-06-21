class ScorePanel extends eui.Panel {
	
	public scoreGroup: Array<eui.Group>;
	public playScene: PlayScene;
	public exitButton: eui.Button;

	public constructor(playScene: PlayScene) {
		super();
		let bg = new eui.Image();
		bg.source = "resource/assets/Game/计分框.png";
		this.addChild(bg);
		this.scoreGroup = Array<eui.Group>();
		this.exitButton = new eui.Button();
		this.exitButton.skinName = "resource/eui_skins/DetailButton.exml";
		this.exitButton.x = 630;
		this.exitButton.y = 809;
		this.addChild(this.exitButton);
		this.exitButton.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
	}

	public reset(msg) {
		for(let i = 0; i < msg.users.length; i++) {
			let group = new eui.Group();
			group.x = 470;
			group.y = 352 + 60 * i;
			let rankLabel = new eui.Label("" + (i+1));
			rankLabel.size = 36;
			rankLabel.textColor = 0x533502;
			group.addChild(rankLabel);
			let usernameLabel = new eui.Label(msg.users[i].name);
			usernameLabel.size = 36;
			usernameLabel.x = 235;
			usernameLabel.textColor = 0x533502;
			group.addChild(usernameLabel);
			let scoreLabel = new eui.Label(msg.users[i].score);
			scoreLabel.size = 36;
			scoreLabel.x = 494;
			scoreLabel.textColor = 0x533502;
			group.addChild(scoreLabel);
			this.addChild(group);
		}
	}

	public onTouch() {
		this.exitButton.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
		this.parent.removeChild(this);
	}
}
