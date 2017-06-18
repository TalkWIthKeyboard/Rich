class PlayScene extends egret.DisplayObjectContainer {

    private type;
    private socketIO: Socket;
    public controller;
	private selectCharacterModal: SelectCharacterModal;

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
        this.type = Coder.SCENE_TYPE.ROOM;
        // this.socketIO = new Socket(this, this.type, this.controller.me.getRoomId(), this.controller.me.getSocketId());

        let bg = new eui.Image();
        bg.source = 'resource/assets/background.png';
        this.addChild(bg);

		this.selectCharacterModal = new SelectCharacterModal();
		this.selectCharacterModal.init();
		this.selectCharacterModal.x = 113;
		this.selectCharacterModal.y = 220;

		this.showSelectCharacterModal();

        Util.workManyChild(this, [
        ], null);
    }

	public showSelectCharacterModal() {
		let msg = {'roles': { 
            normal: [ { roleName: 'ASSASSIN' },{ roleName: 'THIEF' },{ roleName: 'MAGICIAN' },{ roleName: 'BUSINESSMAN' } ],
            reversal:  { roleName: 'BISHOP' },
            front: [ { roleName: 'KING' }, { roleName: 'ARCHITECT' } ],
            choose: [ { roleName: 'WARLORD' }] 
        }};
        
		this.selectCharacterModal.reset(msg);
		this.addChild(this.selectCharacterModal);
	}

	public hideSelectCharacterModal() {
		this.addChild(this.selectCharacterModal);
	}
}