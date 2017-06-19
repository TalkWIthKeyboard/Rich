class MyArc extends eui.Group {

	private playScene: PlayScene;
	private num;
	private cardName;
	private tag;
	private count;
	private bg: eui.Image;
	private countLabel: eui.Label;

	public constructor(playScene: PlayScene, num) {
		super();
		this.playScene = playScene;
		this.num = num;
		this.bg = new eui.Image();
		this.bg.horizontalCenter = "0";
		this.bg.verticalCenter = "0";
		this.addChild(this.bg);
		this.countLabel = new eui.Label();
		this.countLabel.horizontalCenter = "0";
		this.countLabel.verticalCenter = "0";
		this.countLabel.size = 36;
		this.countLabel.textColor = 0x0F0F0F;
		this.addChild(this.countLabel);
	}

	public reset(msg) {
		this.cardName = msg.name;
		let count = msg.star;
		let tag = msg.color;
		this.clear();
		this.tag = tag;
		this.count = count;
		this.countLabel.text = count;
		this.bg.source = "resource/assets/MyArc/" + tag + ".png";
		this.addChild(this.bg);
		this.addChild(this.countLabel);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.showCardDetails, this);
	}
	
	public clear() {
		this.removeEventListener(egret.TouchEvent.TOUCH_END, this.showCardDetails, this);
		this.tag = null;
		this.count = null;
		this.removeChild(this.bg);
		this.removeChild(this.countLabel);
	}

	public showCardDetails() {
		this.playScene.showCardDetailsPanel(this.cardName);
	}
}