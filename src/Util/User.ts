class User {
    
    // 首次建立的socket的Id
    private socketId: string;
    // 全局资源是否加载完成
    private loadConfigFlag:Boolean;

    public constructor() {
        this.loadConfigFlag = false;
    }

    public setLoadConfigFlag(flag) {
        this.loadConfigFlag = flag;
    }

    public getLoadConfigFlag() {
        return this.loadConfigFlag;
    }

    public setSocketId(socketId) {
        this.socketId = socketId;
    }

    public getSocketId() {
        return this.socketId;
    }
}