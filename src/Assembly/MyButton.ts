class MyButton extends eui.Button {

	public constructor(label: string, width: number, height: number, px: number, py: number, callback: Function) {
		super();
		this.label = label;
		this.width = width;
		this.height = height;
		this.x = px;
		this.y = py;
		this.skinName="resource/eui_skins/ButtonSkin.exml";
		if (callback) {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, callback, this);
		}
	}
}