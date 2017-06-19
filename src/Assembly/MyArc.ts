class MyArc extends eui.Group {

	private playScene: PlayScene;
	private user;
	private num;
	private cardName;
	private tag;
	private count;
	private bg: eui.Image;
	private countLabel: eui.Label;

	public constructor(playScene: PlayScene, user, num) {
		super();
		this.playScene = playScene;
		this.user = user;
		this.num = num;
		this.bg = new eui.Image();
		this.bg.horizontalCenter = "0";
		this.bg.verticalCenter = "0";
		this.addChild(this.bg);
		this.countLabel = new eui.Label();
		this.countLabel.horizontalCenter = "0";
		this.countLabel.verticalCenter = "0";
		this.addChild(this.countLabel);
	}

	public reset(cardName: String) {
		this.cardName = cardName;
		let count = "";
		let tag = "";
		this.clear();
		this.tag = tag;
		this.count = count;
		this.countLabel.text = count;
		this.bg.source = "resource/assets/MyArc/" + tag + ".png";
	}
	
	public clear() {
		this.tag = null;
		this.count = null;
		this.removeChild(this.bg);
		this.removeChild(this.countLabel);
	}
}