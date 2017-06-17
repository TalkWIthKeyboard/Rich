class MyRoomList extends eui.Group {
	
	private group: eui.Group;

	public constructor() {
        super();
	}

	public init(container: egret.DisplayObjectContainer, px: number = 405, py: number = 311) {
		
		this.group = new eui.Group();
		// let bg = new eui.Image("resource/assets/alma.jpg");
		// bg.x = px, bg.y = py;
		// container.addChild(bg);
		let myScoller = new eui.Scroller();
		myScoller.skinName = "resource/eui_skins/ScrollerSkin.exml";
		myScoller.visible = true;
		myScoller.width = 1060;
		myScoller.height = 600;
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
			roomItem.y = 40 * x;
			this.group.addChild(roomItem);
		}
	}
}

    