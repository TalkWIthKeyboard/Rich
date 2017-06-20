class MyGetCardPanel extends eui.Panel {
	
	private getCardGroup1: eui.Group;
	private card1: eui.Image;
	private bg1: eui.Image;
	private getCardGroup2: eui.Group;
	private card2: eui.Image;
	private bg2: eui.Image;
	private selectnum: number;
	private selectButton: eui.Button;
	private playScene: PlayScene;

	public constructor(playScene: PlayScene) {
		super();
		
		this.playScene = playScene;
		this.height = 1024;
		this.width = 1440;

		let bg = new eui.Image();
		bg.source = "resource/assets/Game/选择手牌模态框.png";
		this.addChild(bg);

		this.selectButton = new eui.Button();
		this.selectButton.skinName = "resource/eui_skins/ButtonSkin.exml";
		this.selectButton.width = 200;
		this.selectButton.height = 70;
		this.selectButton.label = '确认';
		this.selectButton.horizontalCenter = "0";
		this.selectButton.y = 820;
		this.selectButton.addEventListener(egret.TouchEvent.TOUCH_END, this.finish, this);
		this.selectButton.enabled = false;
		this.addChild(this.selectButton);

		this.getCardGroup1 = new eui.Group();
		this.getCardGroup1.x = 335;
		this.getCardGroup1.y = 250;
		this.getCardGroup1.width = 390;
		this.getCardGroup1.height = 584;
		this.card1 = new eui.Image();
		this.card1.horizontalCenter = "0";
		this.card1.verticalCenter = "0";
<<<<<<< HEAD
		this.card1.source = `resource/assets/BigCards/${Coder.CARD_INFO[cards[0].cardName].cn_name}.png`;
=======
>>>>>>> 9e384345f9041ed617a61c0014ca93335c0e67ce
		this.getCardGroup1.addChild(this.card1);
		this.bg1 = new eui.Image();
		this.bg1.alpha = 0.3;
		this.bg1.source = "resource/assets/Card/bg.png";
		this.addChild(this.getCardGroup1);

		this.getCardGroup2 = new eui.Group();
		this.getCardGroup2.x = 760;
		this.getCardGroup2.y = 250;
		this.getCardGroup2.width = 390;
		this.getCardGroup2.height = 584;
		this.card2 = new eui.Image();
		this.card2.horizontalCenter = "0";
		this.card2.verticalCenter = "0";
<<<<<<< HEAD
		this.card2.source = `resource/assets/BigCards/${Coder.CARD_INFO[cards[1].cardName].cn_name}.png`;
=======
>>>>>>> 9e384345f9041ed617a61c0014ca93335c0e67ce
		this.getCardGroup2.addChild(this.card2);
		this.bg2 = new eui.Image();
		this.bg2.alpha = 0.3;
		this.bg2.source = "resource/assets/Card/bg.png";
		this.addChild(this.getCardGroup2);
	}

	public init(cards) {
		this.card1.source = `resource/assets/BigCards/${Coder.CARD_INFO[cards[0].cardName].cn_name}.png`;
		this.card1.addEventListener(egret.TouchEvent.TOUCH_END, () => this.select(1), this);
		this.card2.source = `resource/assets/BigCards/${Coder.CARD_INFO[cards[1].cardName].cn_name}.png`;
		this.card2.addEventListener(egret.TouchEvent.TOUCH_END, () => this.select(2), this);
	}

	private select(x: number) {
		console.log(x);
		if(x != this.selectnum) {
			if(this.selectnum != null) {
				if (this.selectnum == 1) {
					this.getCardGroup1.removeChild(this.bg1);
					this.getCardGroup2.addChildAt(this.bg2, 0);
				}
				else {
					this.getCardGroup2.removeChild(this.bg2);
					this.getCardGroup1.addChildAt(this.bg1, 0);
				}
			}
			else {
				if (x == 1) {
					this.getCardGroup1.addChildAt(this.bg1, 0);
				}
				else {
					this.getCardGroup2.addChildAt(this.bg2, 0);
				}
				this.selectable();
			}
			this.selectnum = x;
		}
		else {
			if (x == 1) {
				this.getCardGroup1.removeChild(this.bg1);
			}
			else {
				this.getCardGroup2.removeChild(this.bg2);
			}
			this.selectnum = null;
			this.notSelectable();
		}
	}

	private removeCardListener() {
		this.card1.addEventListener(egret.TouchEvent.TOUCH_END, () => this.select(1), this);
		this.card2.addEventListener(egret.TouchEvent.TOUCH_END, () => this.select(2), this);
	}

	private selectable() {
		this.selectButton.enabled = true;
	}
	
	private notSelectable() {
		this.selectButton.enabled = false;
	}


	private removeListener() {
		this.selectButton.removeEventListener(egret.TouchEvent.TOUCH_END, this.finish, this);
	}
	
	private addListener() {
		this.selectButton.addEventListener(egret.TouchEvent.TOUCH_END, this.finish, this);
	}

	private finish() {
		console.log(" => " + this.selectnum);
		this.removeListener();
		this.removeCardListener();
		this.playScene.hideSelectCardModal();
	}
}