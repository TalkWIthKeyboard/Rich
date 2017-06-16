class PlayUser {

    private name: string;
    private role: Role;
    private cards: Card[];
    private regions: Region[];
    private gold: number;

    public constructor(name) {
        this.gold = 0;
        this.regions = [];
        this.cards = [];
        this.role = null;
    }

    public getRole() {
        return this.role;
    }

    public setRole(role: Role) {
        this.role = role;
    }

    public getCards() {
        return this.cards;
    }

    public setCards(cards: Card[]) {
        this.cards = cards;
    }

    public getRegion() {
        return this.regions;
    }

    public setRegion(regions: Region[]) {
        this.regions = regions;
    }

    public getGold() {
        return this.gold;
    }

    public setGold(gold: number) {
        this.gold = gold;
    }

    // 抽卡
    public drawCards(card: Card) {
        this.cards.push(card);
    }

    // 出牌
    public playCard(index: number):boolean {
        if (this.gold >= this.cards[index].getCost()) {
            this.gold -= this.cards[index].getCost();
            this.cards.splice(index, 1);
            this.buildRegion(new Region());
            return true;
        } else 
            return false;
    }

    // 新建建筑
    public buildRegion(region: Region) {
        this.regions.push(region);
    }

}