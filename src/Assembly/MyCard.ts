class MyCard {

	public group: eui.Group;
	public num: number;
	public on: Function;
	public off: Function;
	public root: MyHandCard;
	
	public constructor(root: MyHandCard, i:number, msg) {
		this.root = root;

		this.group = new eui.Group();
		this.group.width = 150;
		this.group.height = 240;
		if(msg.length * 150 <= 600) {
			this.group.x = 150 * i + 30; 
		}
		else {
			this.group.x = i * (450.0 / (msg.length-1)) + 50;
		}
		this.num = i;
		let img = new eui.Image();
		img.source = "resource/assets/Card/" + Coder.CARD_INFO[msg[i].cardName].cn_name + ".png";
		img.y = 50;
		
		this.group.addChild(img);
		
		this.on = () => { img.y = 30; }
		this.off = () => { img.y = 50; }
		
		this.group.getChildAt(0).addEventListener(egret.TouchEvent.TOUCH_END, this.click, this);
	}

	public removeEventListener() {
		this.group.getChildAt(0).removeEventListener(egret.TouchEvent.TOUCH_END, this.click, this);
	}

	public click() {
		this.root.selectOne(this);
	}
}