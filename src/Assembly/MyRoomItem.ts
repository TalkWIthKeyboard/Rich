class MyRoomItem extends eui.Group {

	private id;
	private bgOrigin: eui.Image;
	private bgCover: eui.Image;
	private bgSelect: eui.Image;
	private title: eui.Label;
	private number: eui.Label;
	private limit: eui.Label;

	private static selectItem: MyRoomItem;

	public constructor() {
		super();
		this.height = 196;
		this.width = 789;
		this.bgOrigin = new eui.Image("resource/assets/RoomItem/bg_origin.png");
		this.bgCover = new eui.Image("resource/assets/RoomItem/bg_select.png");
		this.bgSelect = new eui.Image("resource/assets/RoomItem/bg_select.png");
		this.title = new eui.Label();
		this.number = new eui.Label();
		this.limit = new eui.Label();
	}

	public init(roomItem) {
		this.id = roomItem.roomId;
		this.addChild(this.bgOrigin);
		this.title.text = roomItem.name;
		this.title.x = 48;
		this.title.y = 66;
		this.title.size = 54;
        this.title.bold = true;
		this.title.textColor = 0x543503;
		this.addChild(this.title);
		this.number.text = `${roomItem.number}`;
		this.number.x = 625;
		this.number.y = 52;
		this.number.size = 64;
		this.number.textColor = 0xC44343;
		this.addChild(this.number);
		this.limit.text = `${roomItem.limit}`;
		this.limit.x = 715;
		this.limit.y = 80;
		this.limit.size = 64;
		this.limit.textColor = 0x543503;
		this.addChild(this.limit);
		
		if (roomItem.number != roomItem.limit) {
			this.number.textColor = 0x543503;
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
		}
	}

	private onTouch(evt:egret.TouchEvent) {
		if (MyRoomItem.selectItem === this) {
			(<HallScene>this.parent.parent.parent.parent).sendJoinRoom(this.id);
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
		(<HallScene>this.parent.parent.parent.parent).sendJoinRoom(this.id);
	}
}