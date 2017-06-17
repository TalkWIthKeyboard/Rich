class MyCreateRoom extends eui.Panel {

	private roomNameLabel: MyTextInput;
	private roomLimit: number = 4;

	public constructor() {
		super();
	}

	public init(container: HallScene, px: number = 405, py: number = 311, callback: Function) {
		let shadow = new eui.Image();
        shadow.source = 'resource/assets/Shadow/shadow.png';
		container.addChild(shadow);
		// let num = this.parent.getChildIndex(this);
		// this.parent.addChildAt(shadow, num);
		// this.parent.swapChildren(this, shadow);
		this.width = 666;
		this.height = 598;
		this.x = px;
		this.y = py;
        this.skinName = 'resource/eui_skins/CreateRoomPanelSkin.exml';
		// label.horizontalCenter="0";
		// label.verticalCenter="0";

		this.addRadioButton();

		this.roomNameLabel = new MyTextInput('请输入房间名', 500, 70, 0, 180, 0.8);
		this.roomNameLabel.horizontalCenter = "0";
		this.addChild(this.roomNameLabel);
		
		let limitLabel = new eui.Label('人数:');
		limitLabel.size = 36;
		limitLabel.textColor = 0x543503;
		limitLabel.y = 300;
		limitLabel.x = 83;
		this.addChild(limitLabel);

		let submit = new MyButton('', 166, 79, 83, 400, () => {
			container.removeChild(shadow);
			container.removeChild(this);
			container.sendCreateRoom(this.roomNameLabel.text, this.roomLimit);
		});
		submit.skinName = "resource/eui_skins/CreateRoomSubmitButton.exml";
		this.addChild(submit);

		let cancel = new MyButton('', 166, 79, 417, 400, () => {
			container.removeChild(shadow);
			container.removeChild(this);
		});
		cancel.skinName = "resource/eui_skins/CreateRoomCancelButton.exml";
		this.addChild(cancel);

		container.addChild(this);
	}

	private addRadioButton() {
		var radioGroup: eui.RadioButtonGroup = new eui.RadioButtonGroup();
		radioGroup.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
		var rdb4: eui.RadioButton = new eui.RadioButton();
        rdb4.skinName = "resource/eui_skins/RadioButtonSkin.exml"
		rdb4.x = 240;
		rdb4.y = 308;
		rdb4.label = "4";
		rdb4.value = 4;
		rdb4.selected = true;
		rdb4.group = radioGroup;
		this.addChild(rdb4);
		var rdb5: eui.RadioButton = new eui.RadioButton();
        rdb5.skinName = "resource/eui_skins/RadioButtonSkin.exml"
		rdb5.x = 340;
		rdb5.y = 308;
		rdb5.label = "5";
		rdb5.value = 5;
		rdb5.group = radioGroup;
		this.addChild(rdb5);
		var rdb6: eui.RadioButton = new eui.RadioButton();
        rdb6.skinName = "resource/eui_skins/RadioButtonSkin.exml"
		rdb6.x = 440;
		rdb6.y = 308;
		rdb6.label = "6";
		rdb6.value = 6;
		rdb6.group = radioGroup;
		this.addChild(rdb6);
		var rdb7: eui.RadioButton = new eui.RadioButton();
        rdb7.skinName = "resource/eui_skins/RadioButtonSkin.exml"
		rdb7.x = 540;
		rdb7.y = 308;
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