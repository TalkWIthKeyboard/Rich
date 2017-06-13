class User {
    
    private socketId;
    private token;

    public constructor() {
        
    }

    public setSocketId(socketId) {
        this.socketId = socketId;
    }

    public getSocketId() {
        return this.socketId;
    }

    public setToken(token) {
        this.token = token;
    }

    public getToken() {
        return this.token;
    }
}