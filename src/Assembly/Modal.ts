class Modal extends egret.Sprite {

	private title;
	private content;
	private positiveButton;
	private negativeButton;
	private myGroup;

	public constructor(title: string, content: string) {
		super();
		this.title = title;
		this.content = content;
		this.myGroup = new eui.Group();
		this.addChild(this.myGroup);
		this.myGroup.width = 400;
		this.myGroup.height = 300;
		this.myGroup.layout = new eui.BasicLayout();
		var outline:egret.Shape = new egret.Shape;
		outline.graphics.lineStyle(3,0x00ff00);
		outline.graphics.beginFill(0x000000,0);
		outline.graphics.drawRect(0,0,400,300);
		outline.graphics.endFill();
		this.myGroup.addChild(outline);
	}

	public setPositiveButton(label: string, positive: Function) {
		this.initButton(this.positiveButton, 10, 10, label, positive);
	}

	public setNegativeButton(label: string, negative: Function) {
		this.initButton(this.negativeButton, 100, 100, label, negative);
	}

	private initButton(button, label, px, py, callback) {
		button = new eui.Button();
		button.width = 100;
		button.height = 50;
		button.x = px;
		button.y = py;
		button.skinName="resource/eui_skins/ButtonSkin.exml";
		button.label = label;
		button.addEventListener(egret.TouchEvent.TOUCH_TAP, callback, this);
		this.myGroup.addChild(button);
	}
}
