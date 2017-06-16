class CenterController {

    private users: PlayUser[];
    private cards: Card[];
    // 现在使用了多少张卡片
    private cardNum: number;
    private state: string;

    public constructor() {
        this.cardNum = 0;
    }

    // 初始阶段
    private workStartStage() {
        // 1. 洗牌
        // 2. 发牌,发钱
        for (let i = 0; i < this.users.length; i++) {
            this.users[i].drawCards(this.cards[this.cardNum]);
            this.users[i].setGold(this.users[i].getGold() + 2);
            this.cardNum ++;
        }
    }

    // 游戏阶段
    private workPlayStage() {
        while (!this.gameOver()) {
            this.chooseRole();
        }
    }

    // 游戏阶段-选角色
    private chooseRole() {
    }

    // 游戏阶段-执行
    private executeGame() {
    }

    // 游戏阶段-执行-发资源
    private distributeResource() {
    }

    // 游戏阶段-执行-建房子
    private buildHouse() {
    }

    // 游戏阶段-执行-使用技能
    private useSkill() {
    }

    // 判断游戏是否已经结束
    private gameOver(): boolean {
        for (let i = 0; i < this.users.length; i++) 
            if (this.users[i].getRegion().length >= 8)
                return true;
        return false;
    }
}