class PlayScene extends egret.DisplayObjectContainer {

    private type;
	private selectCharacterModal: SelectCharacterModal;
    private myHandCard: MyHandCard;
    public playButton: eui.Button;
    private skillButton: eui.Button;
    private passButton: eui.Button;
    private playerModals: Array<PlayerModal>;
    public myPlayerModal: MyPlayerModal;
    private selectCoinButton: eui.Button;
    private selectCardButton: eui.Button;
    private playerModalList: PlayerModal[] = [];

    public nowPlayerLabel: eui.Label;

    private cardPanel: eui.Panel;

    private getCardPanel: MyGetCardPanel;
    
    private selectCards;
    public selectCardFalg = false;
    public socketIO: Socket;
    public controller;
    public selectFlag = false;
    public user = null;
    public num = null;

    public limit = null;

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
        this.width = 1440;
        this.height = 1024;
        this.socketIO = new Socket(this, this.type, this.controller.me.getRoomId(), this.controller.me.getSocketId());
        this.skilling = false;
        let bg = new eui.Image();
        bg.source = 'resource/assets/background.png';
        this.addChild(bg);

        let bg1 = new eui.Image();
		bg1.source = "resource/assets/Game/panel.png";
        bg1.x = 16;
        bg1.y = 708;
        this.addChild(bg1);

        this.myHandCard = new MyHandCard();
        this.myHandCard.x = 64;
        this.myHandCard.y = 725;
        this.addChild(this.myHandCard);

        // 出牌按钮
        this.playButton = new eui.Button();
        this.playButton.skinName = "resource/eui_skins/jianzao.exml";
        this.playButton.width = 230;
        this.playButton.height = 70;
        this.playButton.x = 660;
        this.playButton.y = 836;
        this.playButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchPlayButton, this);
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
        this.passButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectEndEvent, this);

        // 选择金币的按钮
        this.selectCoinButton = new eui.Button();
        this.selectCoinButton.skinName = "resource/eui_skins/huodejinbi.exml";
        this.selectCoinButton.width = 230;
        this.selectCoinButton.height = 70;
        this.selectCoinButton.x = 456;
        this.selectCoinButton.y = 598;
        this.selectCoinButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectCoinEvent ,this);

        // 选择卡牌的按钮
        this.selectCardButton = new eui.Button();
        this.selectCardButton.skinName = "resource/eui_skins/huodekapai.exml";
        this.selectCardButton.width = 230;
        this.selectCardButton.height = 70;
        this.selectCardButton.x = 777;
        this.selectCardButton.y = 598;
        this.selectCardButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectCardEvent ,this);
        
        this.myPlayerModal = new MyPlayerModal(this);
        this.myPlayerModal.x = 948;
        this.myPlayerModal.y = 708;
        this.addChild(this.myPlayerModal);


        let msg = {users: [{name: '123', score: '345'}, {name: '123', score: '345'},{name: '123', score: '345'},{name: '123', score: '345'},{name: '123', score: '345'},{name: '123', score: '345'},{name: '123', score: '345'},]}
        // this.showScorePanel(msg);

        this.nowPlayerLabel = new eui.Label("现在是 xx 玩家的回合");
        this.nowPlayerLabel.x = 450;
        this.nowPlayerLabel.y = 480;
        this.nowPlayerLabel.textColor = 0x533502;
        this.nowPlayerLabel.size = 48;
        this.addChild(this.nowPlayerLabel);
    }

    public showScorePanel(msg) {
        let scorePanel = new ScorePanel(this);
        scorePanel.reset(msg);
        this.addChild(scorePanel);
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

    // 显示选牌界面
    public showSelectCardModal(cards) {
        this.getCardPanel = new MyGetCardPanel(this);
        this.addChild(this.getCardPanel);
        this.getCardPanel.init(cards);
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
        this.selectCharacterModal = null;
	}

    // 初始化界面
    public initPlayInterface(obj) {

        let user = null;

        // 显示手牌
        for (let i = 0; i < obj.users.length; i++) {
            if (obj.users[i].socketId === this.controller.me.getSocketId()) {
                user = obj.users[i];
                obj.users.splice(i, 1);
                break;
            }
        }

        this.playButton.enabled = false;
        this.skillButton.enabled = false;
        this.passButton.enabled = false;

        this.myHandCard.reset(user.cards);

        this.myPlayerModal.reset(user);

        this.playerModals = new Array<PlayerModal>();

        for(let i = 0; i < obj.users.length; i++) {
            let playerModal = new PlayerModal(this);
            playerModal.x = this.position[i].x;
            playerModal.y = this.position[i].y;
            playerModal.reset(obj.users[i]);
            this.addChild(playerModal);
            this.playerModalList.push(playerModal);
        }
    }

    public resetPlayerModal(obj) {
        let flag = 0;
        for(let i = 0; i < obj.users.length; i++) {
            if (obj.users[i].socketId === this.controller.me.getSocketId()) {
                this.myPlayerModal.reset(obj.users[i]);
                this.myHandCard.reset(obj.users[i].cards);
                flag = 1;
            } else this.playerModalList[i - flag].reset(obj.users[i]);            
        }
    }

    // 出牌事件
    private onTouchPlayButton() {
        this.socketIO.sendMessage(Coder.GAME_STATE[5], JSON.stringify({
            user: this.user,
            num: this.num,
            card: this.myHandCard.myCards[this.myHandCard.selectnum].cardName
        }))
        this.playButton.enabled = false;
        this.passButton.enabled = false;
    }

    // 结束回合的按钮
    private selectEndEvent() {
        this.socketIO.sendMessage(Coder.GAME_STATE[5], JSON.stringify({
            user: this.user,
            num: this.num
        }))
        this.passButton.enabled = false;
        this.playButton.enabled = false;
    }

    // 选择金币的响应事件
    private selectCoinEvent() {
        this.socketIO.sendMessage('ChooseCard', JSON.stringify({
            user: this.user,
            num: this.num,
            choose: 1
        }));
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
        this.passButton.enabled = true;
    }

    // 删除选择卡牌的按钮
    public removeSelectButton() {
        this.selectCardFalg = false;
        this.removeChild(this.selectCoinButton);
        this.removeChild(this.selectCardButton); 
    }

    public setPlayButtonEnable() {
        this.playButton.enabled = true;
    }

    public setPlayButtonNotEnable() {
        this.playButton.enabled = false;
    }
}
