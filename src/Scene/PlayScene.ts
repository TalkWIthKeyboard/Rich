class PlayScene extends egret.DisplayObjectContainer {

    private type;
	private selectCharacterModal: SelectCharacterModal;
    private myHandCard: MyHandCard;
    private playButton: eui.Button;
    private skillButton: eui.Button;
    private passButton: eui.Button;
    private playerModals: Array<PlayerModal>;
    private selectCoinButton: eui.Button;
    private selectCardButton: eui.Button;

    private getCardPanel: MyGetCardPanel;

    public selectCardFalg = false;
    public socketIO: Socket;
    public controller;
    public selectFlag = false;
    public user = null;
    public num = null;

    private position = [{x: 1000, y: 715}, {x: 45, y: 360}, {x: 45, y: 30}, {x: 395, y: 30}, {x: 745, y: 30}, {x: 1095, y: 30}, {x: 1095, y: 360}];

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
        // this.socketIO = new Socket(this, this.type, this.controller.me.getRoomId(), this.controller.me.getSocketId());

        let bg = new eui.Image();
        bg.source = 'resource/assets/background.png';
        this.addChild(bg);
        this.showSelectCardModal();
    }

    public showSelectCardModal() {
        this.getCardPanel = new MyGetCardPanel(this);
        this.addChild(this.getCardPanel);
        this.getCardPanel.init(1);
    }

    public releSegetCardPanel() {
        this.removeChild(this.getCardPanel);
        this.getCardPanel = null;
    }

	public showSelectCharacterModal(roles) {
        this.selectCharacterModal = new SelectCharacterModal();
		this.selectCharacterModal.init();
		this.selectCharacterModal.x = 113;
		this.selectCharacterModal.y = 220;
        this.selectFlag = true;
		this.selectCharacterModal.reset(roles);
		this.addChild(this.selectCharacterModal);
	}

	public hideSelectCharacterModal() {
        this.selectFlag = false;
		this.removeChild(this.selectCharacterModal);
	}

    public initPlayInterface(obj) {

        let bg1 = new eui.Image();
		bg1.source = "resource/assets/Game/panel.png";
        bg1.x = 50;
        bg1.y = 700;
        this.addChild(bg1);

        let user = null;

        for (let i = 0; i < obj.users.length; i++) {
            if (obj.users[i].socketId === this.controller.me.getSocketId()) {
                user = obj.users[i];
                break;
            }
        }

        this.myHandCard = new MyHandCard();
        this.myHandCard.reset(user.cards);
        this.myHandCard.x = 50;
        this.myHandCard.y = 700;
        this.addChild(this.myHandCard);

        this.playButton = new eui.Button();
        this.playButton.skinName = "resource/eui_skins/ExitButton.exml";
        this.playButton.width = 230;
        this.playButton.height = 70;
        this.playButton.x = 715;
        this.playButton.y = 750;
        let msg1 = [{ cardName: 'Castle' }, { cardName: 'Castle' }, { cardName: 'Castle' }, { cardName: 'Castle' }, { cardName: 'Castle' }];
        this.playButton.addEventListener(egret.TouchEvent.TOUCH_TAP, () => this.myHandCard.reset(msg1), this.myHandCard);
        this.addChild(this.playButton);

        this.skillButton = new eui.Button();
        this.skillButton.skinName = "resource/eui_skins/ExitButton.exml";
        this.skillButton.width = 230;
        this.skillButton.height = 70;
        this.skillButton.x = 715;
        this.skillButton.y = 837;
        this.addChild(this.skillButton);

        this.passButton = new eui.Button();
        this.passButton.skinName = "resource/eui_skins/ExitButton.exml";
        this.passButton.width = 230;
        this.passButton.height = 70;
        this.passButton.x = 715;
        this.passButton.y = 925;
        this.addChild(this.passButton);

        // 选择金币的按钮
        this.selectCoinButton = new eui.Button();
        this.selectCoinButton.skinName = "resource/eui_skins/ExitButton.exml";
        this.selectCoinButton.width = 230;
        this.selectCoinButton.height = 70;
        this.selectCoinButton.x = 715;
        this.selectCoinButton.y = 525;
        this.selectCoinButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectCoinEvent ,this);

        // 选择卡牌的按钮
        this.selectCardButton = new eui.Button();
        this.selectCardButton.skinName = "resource/eui_skins/ExitButton.exml";
        this.selectCardButton.width = 230;
        this.selectCardButton.height = 70;
        this.selectCardButton.x = 715;
        this.selectCardButton.y = 625;
        this.selectCardButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectCardEvent ,this);

        this.playerModals = new Array<PlayerModal>();

        for(let i = 0; i < 7; i++) {
            let playerModal = new PlayerModal();
            playerModal.x = this.position[i].x;
            playerModal.y = this.position[i].y;
            this.addChild(playerModal);
        }
    }

    private selectCoinEvent() {
        this.socketIO.sendMessage(Coder.GAME_STATE[4], JSON.stringify({choose: 1}));
    }

    private selectCardEvent() {
        this.socketIO.sendMessage(Coder.GAME_STATE[4], JSON.stringify({choose: 2}));
    }

    public addSelectButton() {
        this.selectCardFalg = true;
        this.addChild(this.selectCoinButton);        
        this.addChild(this.selectCardButton);        
    }

    public removeSelectButton() {
        this.selectCardFalg = false;
        this.removeChild(this.selectCoinButton);
        this.removeChild(this.selectCardButton); 
    }

}
