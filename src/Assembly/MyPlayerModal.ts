class MyPlayerModal extends eui.Panel{
	
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
		this.height = 300;
		this.width = 310;
		this.playernameLabel = new eui.Label();
		this.img = new eui.Image();
		this.coinNum = new eui.Label();
		this.cardNum = new eui.Label();
		this.arcs = new Array<MyArc>();
		for(let i = 0; i < 8; i++) {
			let arc = new MyArc(this.playScene, i);
			this.arcs.push(arc);
			this.addChild(arc);
		}
		this.addChild(this.playernameLabel);
		this.addChild(this.cardNum);
		this.addChild(this.cardNum);
	}

	public reset(msg) {
		this.user = msg.socketId;
		this.playernameLabel.text = msg.name;
		this.cardNum.text = msg.cars.length;
		this.coinNum.text = msg.gold;
		this.img.source = "resource/assets/MyPlayerModal/" + msg.role + ".png";
		if(msg.a) {
			this.addChild(this.img);
		}
		for(let i = 0; i < msg.regions.length; i++) {
			this.arcs[i].reset(msg.regions[i]);
		}
		for(let i = msg.regions.length; i < 8; i++) {
			this.arcs[i].clear();
		}
	}
}