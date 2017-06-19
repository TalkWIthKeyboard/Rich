class PlayerModal extends eui.Panel{
	
	private usertag;
	private img: eui.Image;
	private playernameLabel: eui.Label;
	private coinNum: eui.Label;
	private cardNum: eui.Label;
	private arcs: Array<MyArc>;
	private user;

	public constructor(user) {
		super();
		this.user = user;
		this.height = 300;
		this.width = 310;
		this.playernameLabel = new eui.Label();
		this.img = new eui.Image();
		this.coinNum = new eui.Label();
		this.cardNum = new eui.Label();
		this.arcs = new Array<MyArc>();
		for(let i = 0; i < 8; i++) {
			let arc = new MyArc(this.user, i);
			this.arcs.push(arc);
		}

		// this.img = new eui.Image();
		// this.img.source = "resource/assets/Card/魔术师.png";
		// this.addChild(this.img);
		// this.coinImg = new eui.Image();
		// this.coinImg.source = "resource/assets/Game/coin.png";
		// this.coinImg.y = 10;
		// this.coinImg.x = 210;
		// this.addChild(this.coinImg);
		// this.cardImg = new eui.Image();
		// this.cardImg.source = "resource/assets/Game/card.png";
		// this.cardImg.y = 10;
		// this.cardImg.x = 260;
		// this.addChild(this.cardImg);
		// this.arcs = new Array<eui.Image>();
		// for(let i = 0; i < 8; i ++) {
		// 	let arcImage = new eui.Image();
		// 	arcImage.source = "resource/assets/Game/arc.png";
		// 	arcImage.y = 70 + Math.floor(i / 2) * 60;
		// 	arcImage.x = 210 + 50 * (i & 1);
		// 	this.addChild(arcImage);
		// 	this.arcs.push(arcImage);
		// }
	}

	public reset(msg) {

	}
}