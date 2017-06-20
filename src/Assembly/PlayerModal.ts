class PlayerModal extends eui.Panel{
	
	private playScene: PlayScene;
	private img: eui.Image;
	private playernameLabel: eui.Label;
	private coinNum: eui.Label;
	private cardNum: eui.Label;
	private arcs: Array<MyArc>;
	private user;

	public constructor(playScene: PlayScene) {
		super();
		this.playScene = playScene;
		this.height = 336;
		this.width = 334;
		let bg = new eui.Image();
		bg.source = "resource/assets/Game/其他玩家面板.png";
		this.addChild(bg);
		this.playernameLabel = new eui.Label();
		this.playernameLabel.x = 32.57;
		this.playernameLabel.y = 36;
		this.playernameLabel.size = 36;
		this.playernameLabel.textColor = 0x543503;
		this.img = new eui.Image();
		this.img.y = 284;
		this.coinNum = new eui.Label();
		this.coinNum.x = 269;
		this.coinNum.y = 36;
		this.coinNum.size = 36;
		this.coinNum.textColor = 0xF6E25C;
		this.cardNum = new eui.Label();
		this.cardNum.x = 210;
		this.cardNum.y = 36;
		this.cardNum.size = 36;
		this.cardNum.textColor = 0xF9F9F9;
		this.arcs = new Array<MyArc>();
		for(let i = 0; i < 8; i++) {
			let arc = new MyArc(this.playScene, i);
			arc.x = 33 + (i % 4) * 70;
			arc.y = 122 + Math.floor(i / 4) * 66;
			this.arcs.push(arc);
			this.addChild(arc);
		}
		this.addChild(this.playernameLabel);
		this.addChild(this.coinNum);
		this.addChild(this.cardNum);
		this.addChild(this.img);
	}

	public reset(msg) {
		this.user = msg.socketId;
		this.playernameLabel.text = msg.name;
		this.cardNum.text = msg.cards.length;
		this.coinNum.text = msg.gold;
		this.img.source =  msg.open ? "resource/assets/PlayerModal/" + msg.role.roleName + ".png" : "";
		for(let i = 0; i < msg.regions.length; i++) {
			this.arcs[i].reset(msg.regions[i]);
		}
		for(let i = msg.regions.length; i < 8; i++) {
			this.arcs[i].clear();
		}
	}
}
