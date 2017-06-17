class MyRoomItem extends eui.Group {

	private id;
	private bgOrigin: eui.Image;
	private bgCover: eui.Image;
	private bgSelect: eui.Image;
	private title: eui.Label;
	private number: eui.Label;
	private enterButton: eui.Button;

	private static selectItem: MyRoomItem;

	public constructor() {
		super();
		this.height = 40;
		this.width = 1060;
		this.bgOrigin = new eui.Image("resource/assets/RoomItem/bg_origin.png");
		this.bgOrigin.alpha = 0;
		this.bgCover = new eui.Image("resource/assets/RoomItem/bg_cover.png");
		this.bgSelect = new eui.Image("resource/assets/RoomItem/bg_select.png");
		this.title = new eui.Label();
		this.number = new eui.Label();
		this.enterButton = new eui.Button();
	}

	public init(roomItem) {
		this.id = roomItem.roomId;
		this.addChild(this.bgOrigin);
		this.title.text = this.id + ' ' + roomItem.name;
		this.title.x = 100;
		this.addChild(this.title);
		this.number.text = `(${roomItem.number}/${roomItem.limit})`;
		this.number.x = 600;
		this.addChild(this.number);
		this.enterButton.x = 700;
		this.enterButton.label = '进入';
		this.enterButton.skinName = "resource/eui_skins/ButtonSkin.exml";
		this.enterButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onEnter, this);
		this.addChild(this.enterButton);
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
	}

	private onTouch(evt:egret.TouchEvent) {
		if (MyRoomItem.selectItem === this) {
			console.log('Enter the room ' + this.id);
		}
		else {
			if (MyRoomItem.selectItem) {
				MyRoomItem.selectItem.removeChildAt(0);
				MyRoomItem.selectItem.addChildAt(MyRoomItem.selectItem.bgOrigin, 0);
			}
			this.removeChildAt(0);
			this.addChildAt(this.bgCover, 0);
			MyRoomItem.selectItem = this;
		}
	}

	private onEnter(evt:egret.TouchEvent) {
		console.log('Enter the room ' + this.id);
	}
}