class Modal extends eui.Panel {

	public constructor(title: string, content: string, px: number = 405, py: number = 311) {
		super();
		this.width = 630;
		this.height = 402;
		this.x = px;
		this.y = py;
        this.skinName = 'resource/eui_skins/PanelSkin.exml';
		this.title = title;
		let button = new MyButton('确定', 158, 71, 236, 282, () => {
			this.parent.removeChild(this);
		});
		this.addChild(button);
		let label = new eui.Label(content);
		label.size = 36;
		label.textColor = 0x543503;
		label.y = 196;
		label.horizontalCenter="0";
		label.verticalCenter="0";
		this.addChild(label);
	}
}
