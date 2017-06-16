class Card extends egret.DisplayObject {
    
    private cost: number;
    private color: string;
    private cardName: string;

    public constructor(cost:number, color:string, cardName:string) {
        super();

        this.cost = cost;
        this.color = color;
        this.cardName = cardName;
    }

    public getCost() {
        return this.cost;
    }

    public getColor() {
        return this.color;
    }

    public getName() {
        return this.cardName;
    }
}