class PlayScene extends egret.DisplayObjectContainer {

    private type;
	private selectCharacterModal: SelectCharacterModal;
    private myHandCard: MyHandCard;
    private playButton: eui.Button;
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

        this.myHandCard = new MyHandCard();
        this.myHandCard.x = 50;
        this.myHandCard.y = 700;
        this.addChild(this.myHandCard);

        this.playButton = new eui.Button();
        this.playButton.skinName = "resource/eui_skins/ExitButton.exml";
        this.playButton.width = 230;
        this.playButton.height = 79;
        this.playButton.x = 1181;
        this.playButton.y = 28;
        
        this.playButton.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {}, this.myHandCard);
        this.addChild(this.playButton);

		// this.selectCharacterModal = new SelectCharacterModal();
		// this.selectCharacterModal.init();
		// this.selectCharacterModal.x = 113;
		// this.selectCharacterModal.y = 220;
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