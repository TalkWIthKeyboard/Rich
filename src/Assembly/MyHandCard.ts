class MyHandCard extends eui.Panel {

	private myCards;
	private selectnum: number;

	public constructor() {
		super();
		this.height = 250;
		this.width = 600;
		this.myCards = [];
	}
	
	public reset(msg) {
		this.clear();
		console.log(msg);
		for(let i = 0; i < msg.length; i++) {
			let card = new MyCard(this, i, msg);
			this.addChild(card.group);
			this.myCards.push(card);
		}
	}

	private　clear() {
		for(let x in this.myCards) {
			let card = this.myCards[x];
			console.log(card);
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
		}
		else {
			card.off();
			this.selectnum = null;
		}
	}

}
