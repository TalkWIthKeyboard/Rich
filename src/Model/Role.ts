class Role extends egret.DisplayObject {

    private number: number;
    private type: string;
    private skills;
    private img:MyBitmap;

    public constructor(number: number, type: string, skills, img: string, px:number, py:number) {
        super();

        this.number = number;
        this.type = type;
        this.skills = skills;
        this.img = new MyBitmap('', '', px, py, 1, 1);
    }
}