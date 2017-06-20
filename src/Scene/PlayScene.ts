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

    private getCardPanel: MyGetCardPanel;
    
    private selectCards;
    public selectCardFalg = false;
    public socketIO: Socket;
    public controller;
    public selectFlag = false;
    public user = null;
    public num = null;

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
        this.socketIO = new Socket(this, this.type, this.controller.me.getRoomId(), this.controller.me.getSocketId());

        let bg = new eui.Image();
        bg.source = 'resource/assets/background.png';
        this.addChild(bg);
    }

    // 点击卡牌，显示卡牌大图
    public showCardDetailsPanel(cardName: String) {
        //
    }

    // 显示选牌界面
    public showSelectCardModal(cards) {
        this.getCardPanel = new MyGetCardPanel(this, cards);
        this.addChild(this.getCardPanel);
        this.getCardPanel.init(1);
    }

    // 隐藏选牌界面
    public hideSelectCardModal() {
        this.removeChild(this.getCardPanel);
        this.getCardPanel = null;
    }

    // 显示选择人物界面
	public showSelectCharacterModal(roles) {
        this.selectCharacterModal = new SelectCharacterModal();
		this.selectCharacterModal.init();
		this.selectCharacterModal.x = 113;
		this.selectCharacterModal.y = 220;
        this.selectFlag = true;
		this.selectCharacterModal.reset(roles);
		this.addChild(this.selectCharacterModal);
	}

    // 隐藏选择人物界面
	public hideSelectCharacterModal() {
        this.selectFlag = false;
		this.removeChild(this.selectCharacterModal);
	}

    // 初始化界面
    public initPlayInterface(obj) {

        let bg1 = new eui.Image();
		bg1.source = "resource/assets/Game/panel.png";
        bg1.x = 16;
        bg1.y = 708;
        this.addChild(bg1);

        let user = null;

<<<<<<< HEAD
        // 显示手牌
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
=======
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
>>>>>>> 6049a07d4f91dd1ffad1793f2ef51bd0b4396b3c
        this.addChild(this.myHandCard);

        // 出牌按钮
        this.playButton = new eui.Button();
        this.playButton.skinName = "resource/eui_skins/jianzao.exml";
        this.playButton.width = 230;
        this.playButton.height = 70;
        this.playButton.x = 660;
        this.playButton.y = 836;
        this.playButton.addEventListener(egret.TouchEvent.TOUCH_TAP, () => this.myHandCard.reset(msg1), this.myHandCard);
        this.addChild(this.playButton);

        // 技能按钮
        this.skillButton = new eui.Button();
        this.skillButton.skinName = "resource/eui_skins/jineng.exml";
        this.skillButton.width = 230;
        this.skillButton.height = 70;
        this.skillButton.x = 660;
        this.skillButton.y = 741;
        this.addChild(this.skillButton);

        // 结束回合按钮
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
<<<<<<< HEAD
            playerModal.x = this.position[i].x;
            playerModal.y = this.position[i].y;
            playerModal.reset(obj.users[i]);
=======
            playerModal.x = this.position[i - 1].x;
            playerModal.y = this.position[i - 1].y;
            playerModal.reset(obj.msg[i]);
>>>>>>> 6049a07d4f91dd1ffad1793f2ef51bd0b4396b3c
            this.addChild(playerModal);
        }
    }

    // 选择金币的响应事件
    private selectCoinEvent() {
        this.socketIO.sendMessage(Coder.GAME_STATE[4], JSON.stringify({choose: 1}));
    }

    // 选择卡牌的响应事件
    private selectCardEvent() {
        this.showSelectCardModal(this.selectCards);
        // this.socketIO.sendMessage(Coder.GAME_STATE[4], JSON.stringify({choose: 2}));
    }

    // 添加选择卡牌的按钮
    public addSelectButton(cards) {
        this.selectCards = cards;
        this.selectCardFalg = true;
        this.addChild(this.selectCoinButton);        
        this.addChild(this.selectCardButton);        
    }

    // 删除选择卡牌的按钮
    public removeSelectButton() {
        this.selectCardFalg = false;
        this.removeChild(this.selectCoinButton);
        this.removeChild(this.selectCardButton); 
    }
}
