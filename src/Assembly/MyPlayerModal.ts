class MyPlayerModal extends eui.Panel{
	
	private playScene: PlayScene;
	private img: eui.Image;
	private coinNum: eui.Label;
	private cardNum: eui.Label;
	private arcs: Array<MyArc>;
	private user;

	public constructor(playScene: PlayScene) {
		super();
		this.playScene = playScene;
		this.height = 300;
		this.width = 476;
		let bg = new eui.Image();
		bg.source = "resource/assets/Game/玩家个人面板.png";
		this.addChild(bg);
		this.img = new eui.Image();
		this.img.x = 101;
		this.img.y = 32;
		this.img.width = 184;
		this.img.height = 283;
		this.coinNum = new eui.Label();
		this.coinNum.x = 47;
		this.coinNum.y = 186;
		this.coinNum.size = 36;
		this.coinNum.textColor = 0xF9CD8B;
		this.cardNum = new eui.Label();
		this.cardNum.x = 47;
		this.cardNum.y = 97;
		this.cardNum.size = 36;
		this.cardNum.textColor = 0xF9F9F9;
		this.arcs = new Array<MyArc>();
		for(let i = 0; i < 8; i++) {
			let arc = new MyArc(this.playScene, i);
			// 1269 745 1345
			arc.x = 321 + 76 * (i & 1);
			arc.y = 37 + 70 * Math.floor(i / 2);
			this.arcs.push(arc);
			this.addChild(arc);
		}
		this.addChild(this.cardNum);
		this.addChild(this.coinNum);
		this.addChild(this.img);
	}

	public reset(msg) {
		this.user = msg.socketId;
		this.cardNum.text = msg.cards.length;
		this.coinNum.text = msg.gold;
		this.img.source = msg.open ? "resource/assets/BigCards/" + Coder.ROLE_TYPE[msg.role.roleName].cn_name + ".png" : "";
		for(let i = 0; i < msg.regions.length; i++) {
			this.arcs[i].reset(msg.regions[i]);
		}
		for(let i = msg.regions.length; i < 8; i++) {
			this.arcs[i].clear();
		}
	}
}