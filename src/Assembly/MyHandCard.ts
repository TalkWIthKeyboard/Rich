class MyHandCard extends eui.Panel {

	public myCards;
	public selectnum: number;
	public user;

	public constructor() {
		super();
		this.height = 300;
		this.width = 550;
		this.myCards = [];
	}
	
	public reset(msg) {
		this.clear();
		this.user = msg.socketId;
		for(let i = 0; i < msg.length; i++) {
			let card = new MyCard(this, i, msg);
			this.addChild(card.group);
			this.myCards.push(card);
		}
	}

	private　clear() {
		for(let x in this.myCards) {
			let card = this.myCards[x];
			this.removeChild(card.group);
			card.removeEventListener();
		}
		this.myCards.splice(0, this.myCards.length);
		this.selectnum = null;
	}

	public selectOne(card: MyCard) {
		if(this.selectnum != card.num) {
			if(this.selectnum != null) {
				this.myCards[this.selectnum].off();
			}
			card.on();
			this.selectnum = card.num;
			if(Coder.CARD_INFO[this.myCards[this.selectnum].cardName].cost  > parseInt((<PlayScene>this.parent).myPlayerModal.coinNum.text))
				(<PlayScene>this.parent).playButton.enabled = false;
			else
				(<PlayScene>this.parent).playButton.enabled = true;
		}
		else {
			card.off();
			this.selectnum = null;
			(<PlayScene>this.parent).playButton.enabled = false;
		}
	}

}
