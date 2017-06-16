class User {
    
    // 首次建立的socket的Id
    private socketId: string;
    // 全局资源是否加载完成
    private loadConfigFlag: boolean;
    // 与服务器连接的token
    private token: string;
    // 现在处于的房间编号
    private roomId: number;

    public constructor() {
        this.loadConfigFlag = false;
    }

    public setLoadConfigFlag(flag: boolean) {
        this.loadConfigFlag = flag;
    }

    public getLoadConfigFlag() {
        return this.loadConfigFlag;
    }

    public setSocketId(socketId: string) {
        this.socketId = socketId;
    }

    public getSocketId() {
        return this.socketId;
    }

    public setToken(token: string) {
        this.token = token;
    }

    public getToken() {
        return this.token;
    }

    public setRoomId(roomId:number) {
        this.roomId = roomId;
    }

    public getRoomId() {
        return this.roomId;
    }
}