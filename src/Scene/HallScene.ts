class HallScene extends egret.DisplayObjectContainer {

    private roomList;
    private controller;

    public constructor(controller) {
        super();
        this.init(controller);
    }

    private init(controller) {
        this.controller = controller;
        let socket = new Socket(this, 'Hall', null, null);
    }

    private createScene() {
        // 通过场景的图片来渲染界面
        for (let i = 0; i < this.roomList.length; i++) {
            let room = new MyBitmap('', '', 10, 10, 10, 10);
            room.addTouchEvent((ev) => {
                // 进入房间的逻辑
            }, this);
        }
    }

}