class PlayScene extends egret.DisplayObjectContainer {

    private type;
	private selectCharacterModal: SelectCharacterModal;
    private myHandCard: MyHandCard;
    private playButton: eui.Button;
    private skillButton: eui.Button;
    private passButton: eui.Button;
    private playerModals: Array<PlayerModal>;
    private myPlayerModal: MyPlayerModal;
    private selectCoinButton: eui.Button;
    private selectCardButton: eui.Button;

    private cardPanel: eui.Panel;

    private getCardPanel: MyGetCardPanel;
    
    private selectCards;
    public selectCardFalg = false;
    public socketIO: Socket;
    public controller;
    public selectFlag = false;
    public user = null;
    public num = null;

    private skilling: boolean;

    private position = [{x: 16, y: 357}, {x: 16, y: 6}, {x: 375, y: 6}, {x: 734, y: 6}, {x: 1093, y: 6}, {x: 1093, y: 357}];
    private myPosition = {x: 900, y: 700};

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
        this.skilling = false;
        let bg = new eui.Image();
        bg.source = 'resource/assets/background.png';
        this.addChild(bg);
        
        let obj = {
	users: [1, 2, 3, 4, 5, 6, 7],
	msg: [
	{
		name: 'Name',
		cards: [1, 2, 3, 4, 5],
		regions: [
			{
				name: 'Market',
				star: 3,
				color: 'blue'
			},
			{
				name: 'Market',
				star: 3,
				color: 'yellow'
			},
			{
				name: 'Market',
				star: 3,
				color: 'purple'
			},
			{
				name: 'Market',
				star: 3,
				color: 'red'
			},
			{
				name: 'Market',
				star: 3,
				color: 'green'
			},
			{
				name: 'Market',
				star: 3,
				color: 'blue'
			}
		],
		gold: 5,
		role: { roleName: 'ARCHITECT' },
		socketId: '123',
        open: true
	},
	{
		name: 'Name',
		cards: [1, 2, 3, 4, 5],
		regions: [
			{
				name: 'Market',
				star: 3,
				color: 'blue'
			},
			{
				name: 'Market',
				star: 3,
				color: 'blue'
			}
		],
		gold: 5,
		role: { roleName: 'ASSASSIN' },
		socketId: '123',
        open: true
	},
	{
		name: 'Name',
		cards: [1, 2, 3, 4, 5],
		regions: [
			{
				name: 'Market',
				star: 3,
				color: 'blue'
			},
			{
				name: 'Market',
				star: 3,
				color: 'blue'
			}
		],
		gold: 5,
		role: { roleName: 'KING' },
		socketId: '123'
	},
	{
		name: 'Name',
		cards: [1, 2, 3, 4, 5],
		regions: [
		],
		gold: 5,
		role: { roleName: 'MAGICIAN' },
		socketId: '123'
	},
	{
		name: 'Name',
		cards: [1, 2, 3, 4, 5],
		regions: [
		],
		gold: 5,
		role: { roleName: 'THIEF' },
		socketId: '123'
	},{
		name: 'Name',
		cards: [1, 2, 3, 4, 5],
		regions: [
		],
		gold: 5,
        role: { roleName: 'WARLORD' },
		socketId: '123'
	},{
		name: 'Name',
		cards: [1, 2, 3, 4, 5],
		regions: [
		],
		gold: 5,
        role: { roleName: 'WARLORD' },
		socketId: '123',
        open: true
	}
]
}
        this.initPlayInterface(obj);
    }

    public showCardDetailsPanel(myArc: MyArc) {
        this.cardPanel = new eui.Panel();
        this.cardPanel.x = 478;
        this.cardPanel.y = 158;
        let bg = new eui.Image();
        bg.source = "resource/assets/Game/卡片模态框.png";
        this.cardPanel.addChild(bg);
        let img = new eui.Image();
        img.source = "resource/assets/BigCards/" + Coder.CARD_INFO[myArc.cardName].cn_name + ".png";
        img.x = 63;
        img.y = 69;
        this.cardPanel.addChild(img);
        let button = new eui.Button();
        button.skinName = "resource/eui_skins/DetailButton.exml";
        button.x = 122;
        button.y = 655;
        button.addEventListener(egret.TouchEvent.TOUCH_END, () => { this.removeChild(this.cardPanel); this.cardPanel = null; }, this);
        this.cardPanel.addChild(button);
        this.addChild(this.cardPanel);
    }

    public showCharacterDetailsPanel(name) {
        this.cardPanel = new eui.Panel();
        this.cardPanel.x = 478;
        this.cardPanel.y = 158;
        let bg = new eui.Image();
        bg.source = "resource/assets/Game/卡片模态框.png";
        this.cardPanel.addChild(bg);
        let img = new eui.Image();
        img.source = "resource/assets/BigCards/" + Coder.ROLE_TYPE[name].cn_name + ".png";
        img.x = 63;
        img.y = 69;
        this.cardPanel.addChild(img);
        let button = new eui.Button();
        button.skinName = "resource/eui_skins/DetailButton.exml";
        button.x = 122;
        button.y = 655;
        button.addEventListener(egret.TouchEvent.TOUCH_END, () => { this.removeChild(this.cardPanel); this.cardPanel = null; }, this);
        this.cardPanel.addChild(button);
        this.addChild(this.cardPanel);
    }

    public onArcClick(myArc: MyArc) {
        if(this.skilling) {

        }
        else {
            this.showCardDetailsPanel(myArc);
        }
    }

    public showSelectCardModal(cards) {
        this.getCardPanel = new MyGetCardPanel(this, cards);
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
        bg1.x = 16;
        bg1.y = 708;
        this.addChild(bg1);

        let user = null;

        // for (let i = 0; i < obj.users.length; i++) {
        //     if (obj.users[i].socketId === this.controller.me.getSocketId()) {
        //         user = obj.users[i];
        //         break;
        //     }
        // }

        let msg1 = [{ cardName: 'Castle' }, { cardName: 'Castle' }, { cardName: 'Castle' }, { cardName: 'Castle' }, { cardName: 'Castle' }, { cardName: 'Castle' }, { cardName: 'Castle' }, { cardName: 'Castle' }, { cardName: 'Castle' }, { cardName: 'Castle' }];
        this.myHandCard = new MyHandCard();
        this.myHandCard.reset(msg1);
        this.myHandCard.x = 64;
        this.myHandCard.y = 725;
        this.addChild(this.myHandCard);

        this.playButton = new eui.Button();
        this.playButton.skinName = "resource/eui_skins/jianzao.exml";
        this.playButton.width = 230;
        this.playButton.height = 70;
        this.playButton.x = 660;
        this.playButton.y = 836;
        this.playButton.addEventListener(egret.TouchEvent.TOUCH_TAP, () => this.myHandCard.reset(msg1), this.myHandCard);
        this.addChild(this.playButton);

        this.skillButton = new eui.Button();
        this.skillButton.skinName = "resource/eui_skins/jineng.exml";
        this.skillButton.width = 230;
        this.skillButton.height = 70;
        this.skillButton.x = 660;
        this.skillButton.y = 741;
        this.addChild(this.skillButton);

        this.passButton = new eui.Button();
        this.passButton.skinName = "resource/eui_skins/jieshu.exml";
        this.passButton.width = 230;
        this.passButton.height = 70;
        this.passButton.x = 660;
        this.passButton.y = 931;
        this.addChild(this.passButton);

        // 选择金币的按钮
        this.selectCoinButton = new eui.Button();
        this.selectCoinButton.skinName = "resource/eui_skins/huodejinbi.exml";
        this.selectCoinButton.width = 230;
        this.selectCoinButton.height = 70;
        this.selectCoinButton.x = 715;
        this.selectCoinButton.y = 525;
        this.selectCoinButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectCoinEvent ,this);

        // 选择卡牌的按钮
        this.selectCardButton = new eui.Button();
        this.selectCardButton.skinName = "resource/eui_skins/huodekapai.exml";
        this.selectCardButton.width = 230;
        this.selectCardButton.height = 70;
        this.selectCardButton.x = 715;
        this.selectCardButton.y = 625;
        this.selectCardButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectCardEvent ,this);

        this.myPlayerModal = new MyPlayerModal(this);
        this.myPlayerModal.x = 948;
        this.myPlayerModal.y = 708;
        this.myPlayerModal.reset(obj.msg[0]);
        this.addChild(this.myPlayerModal);

        this.playerModals = new Array<PlayerModal>();

        for(let i = 1; i < obj.users.length; i++) {
            let playerModal = new PlayerModal(this);
            playerModal.x = this.position[i - 1].x;
            playerModal.y = this.position[i - 1].y;
            playerModal.reset(obj.msg[i]);
            this.addChild(playerModal);
        }
    }

    private selectCoinEvent() {
        this.socketIO.sendMessage(Coder.GAME_STATE[4], JSON.stringify({choose: 1}));
    }

    private selectCardEvent() {
        this.showSelectCardModal(this.selectCards);
        // this.socketIO.sendMessage(Coder.GAME_STATE[4], JSON.stringify({choose: 2}));
    }

    public addSelectButton(cards) {
        this.selectCards = cards;
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
