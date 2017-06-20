class MyCard {

	public group: eui.Group;
	public num: number;
	public on: Function;
	public off: Function;
	public root: MyHandCard;
	
	public constructor(root: MyHandCard, i:number, msg) {
		this.root = root;

		this.group = new eui.Group();
		this.group.width = 180;
		this.group.height = 300;
		if(msg.length * 180 <= 550) {
			this.group.x = 180 * i; 
		}
		else {
			this.group.x = i * (400.0 / (msg.length-1));
		}
		this.num = i;
		let img = new eui.Image();
		img.width = 180;
		img.height = 277;
		img.source = "resource/assets/BigCards/" + Coder.CARD_INFO[msg[i].cardName].cn_name + ".png";
		img.y = 23;
		
		this.group.addChild(img);
		
		this.on = () => { img.y = 0; }
		this.off = () => { img.y = 23; }
		
		this.group.getChildAt(0).addEventListener(egret.TouchEvent.TOUCH_END, this.click, this);
	}

	public removeEventListener() {
		this.group.getChildAt(0).removeEventListener(egret.TouchEvent.TOUCH_END, this.click, this);
	}

	public click() {
		this.root.selectOne(this);
	}
}