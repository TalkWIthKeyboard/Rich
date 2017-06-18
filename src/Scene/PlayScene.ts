class PlayScene extends egret.DisplayObject {

    private type;

    public controller;    

    public constructor(controller) {
        super();

        let resManage = new ResManage(controller, 'preload', () => {
            this.init(controller);
            this.controller.addChild(this);
        }, null);
    }

    private init(controller) {
        this.controller = controller;
    }
    
}