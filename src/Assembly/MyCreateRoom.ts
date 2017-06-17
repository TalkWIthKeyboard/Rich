class MyCreateRoom extends eui.Panel {

	private roomNameLabel: MyTextInput;
	private roomLimit: number;

	public constructor() {
		super();
	}

	public init(container: egret.DisplayObjectContainer, title: string, content: string, px: number = 405, py: number = 311, callback: Function) {
		let shadow = new eui.Image();
        shadow.source = 'resource/assets/Shadow/shadow.png';
		container.addChild(shadow);
		// let num = this.parent.getChildIndex(this);
		// this.parent.addChildAt(shadow, num);
		// this.parent.swapChildren(this, shadow);
		this.width = 630;
		this.height = 800;
		this.x = px;
		this.y = py;
        this.skinName = 'resource/eui_skins/CreateRoomPanelSkin.exml';
		this.title = title;
		let button = new MyButton('确定', 158, 71, 236, 282, () => {
			this.parent.removeChild(shadow);
			this.parent.removeChild(this);
			callback();
		});
		this.addChild(button);
		let label = new eui.Label(content);
		label.size = 36;
		label.textColor = 0x543503;
		label.y = 196;
		label.horizontalCenter="0";
		label.verticalCenter="0";
		this.addChild(label);

		this.addRadioButton();

		let name
		container.addChild(this);
	}

	private addRadioButton() {
		var radioGroup: eui.RadioButtonGroup = new eui.RadioButtonGroup();
		radioGroup.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
		var rdb4: eui.RadioButton = new eui.RadioButton();
        rdb4.skinName = "resource/eui_skins/RadioButtonSkin.exml"
		rdb4.x = 30;
		rdb4.y = 30;
		rdb4.label = "4";
		rdb4.value = 4;
		rdb4.selected = true;
		rdb4.group = radioGroup;
		this.addChild(rdb4);
		var rdb5: eui.RadioButton = new eui.RadioButton();
        rdb5.skinName = "resource/eui_skins/RadioButtonSkin.exml"
		rdb5.x = 30;
		rdb5.y = 60;
		rdb5.label = "5";
		rdb5.value = 5;
		rdb5.group = radioGroup;
		this.addChild(rdb5);
		var rdb6: eui.RadioButton = new eui.RadioButton();
        rdb6.skinName = "resource/eui_skins/RadioButtonSkin.exml"
		rdb6.x = 30;
		rdb6.y = 90;
		rdb6.label = "6";
		rdb6.value = 6;
		rdb6.group = radioGroup;
		this.addChild(rdb6);
		var rdb7: eui.RadioButton = new eui.RadioButton();
        rdb7.skinName = "resource/eui_skins/RadioButtonSkin.exml"
		rdb7.x = 30;
		rdb7.y = 120;
		rdb7.label = "7";
		rdb7.value = 7;
		rdb7.group = radioGroup;
		this.addChild(rdb7);
	}

	private radioChangeHandler(evt:eui.UIEvent):void {
		var radioGroup: eui.RadioButtonGroup = evt.target;
		this.roomLimit = radioGroup.selectedValue;
	}
}