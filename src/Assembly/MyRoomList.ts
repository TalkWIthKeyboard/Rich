class MyRoomList extends eui.Group {
	
	private group: eui.Group;

	public constructor() {
        super();
	}

	public init(container: egret.DisplayObjectContainer, px: number = 24, py: number = 120) {
		
		this.group = new eui.Group();
		let bg = new eui.Image("resource/assets/Hall/bg.png");
		bg.x = px, bg.y = py;
		bg.alpha = 0.2;
		container.addChild(bg);
		let myScoller = new eui.Scroller();
		myScoller.skinName = "resource/eui_skins/ScrollerSkin.exml";
		myScoller.visible = true;
		myScoller.width = 800;
		myScoller.height = 860;
		myScoller.viewport = this.group;
		this.addChild(myScoller);
		this.x = px;
		this.y = py;
		container.addChild(this);
	}

	public update(myRoomList) {
		this.group.removeChildren();
		for(let x = 0; x < myRoomList.length; x++) {
			let roomItem = new MyRoomItem();
			roomItem.init(myRoomList[x]);
			roomItem.y = 6 + x * 208;
			roomItem.x = 6;
			this.group.addChild(roomItem);
		}
	}
}

    