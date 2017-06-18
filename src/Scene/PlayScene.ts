class PlayScene extends egret.DisplayObjectContainer {

    private type;
	private selectCharacterModal: SelectCharacterModal;
    public socketIO: Socket;
    public controller;
    public selectFlag = false;
    public user = null;
    public num = null;

    private myRoomList: MyRoomList;

    public constructor(controller) {
        super();
        let resManage = new ResManage(controller, 'preload', () => {
            this.init(controller);
            this.controller.addChild(this);
        }, null);
    }

	private init(controller) {
        this.controller = controller;
        this.type = Coder.SCENE_TYPE.PLAY;
        this.socketIO = new Socket(this, this.type, this.controller.me.getRoomId(), this.controller.me.getSocketId());

        let bg = new eui.Image();
        bg.source = 'resource/assets/background.png';
        this.addChild(bg);

		this.selectCharacterModal = new SelectCharacterModal();
		this.selectCharacterModal.init();
		this.selectCharacterModal.x = 113;
		this.selectCharacterModal.y = 220;
    }

	public showSelectCharacterModal(roles) {
        this.selectFlag = true;
		this.selectCharacterModal.reset(roles);
		this.addChild(this.selectCharacterModal);
	}

	public hideSelectCharacterModal() {
        this.selectFlag = false;
		this.removeChild(this.selectCharacterModal);
	}
}