class MyBitmap extends egret.Bitmap {
    
    public constructor(name:string, type: string, px:number, py:number, sx:number, sy:number) {
        super();
        this.init(name, type, px, py, sx, sy);
    }

    /**
     * 初始化
     */
    private init(name:string, type: string, px:number, py:number, sx:number, sy:number) {
        let texture: egret.Texture = RES.getRes(name);
        if (type === 'BUTTON') 
            this.touchEnabled = true;
        this.texture = texture;
        this.x = px;
        this.y = py;
        this.scaleX = sx;
        this.scaleY = sy;
    }

    /**
     * 绑定触摸事件
     */
    public addTouchEvent(cb:Function, obj) {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, (evt:egret.TouchEvent) => {cb()}, obj);
    }
}