class RoomList extends eui.Group {
	
	public constructor() {
        super();
	}

	public init(container: egret.DisplayObjectContainer, px: number = 405, py: number = 311) {
		
		let group = new eui.Group();
		// let bg = new eui.Image("resource/assets/alma.jpg");
		// bg.x = px, bg.y = py;
		// container.addChild(bg);
		let myScoller = new eui.Scroller();
		myScoller.skinName = "resource/eui_skins/ScrollerSkin.exml";
		myScoller.visible = true;
		myScoller.width = 1060;
		myScoller.height = 600;
		myScoller.viewport = group;
		for(let i = 0; i < 20; i++) {
			let room = new eui.Label();
			room.text = "Room: " + i;
			room.size = 32;
			room.y = i * 40;
			group.addChild(room);
		}
		this.addChild(myScoller);
		this.x = px;
		this.y = py;
		container.addChild(this);
	}
}

    