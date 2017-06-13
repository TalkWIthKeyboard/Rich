var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Socket = (function () {
    function Socket(main, type, roomId, socketId) {
        this.main = main;
        var url = "ws://localhost:5000?type=" + type;
        url +=
            type === 'Room' || type === 'Play'
                ? "&roomId=" + roomId + "&socketId=" + socketId
                : '';
        this.socket = io.connect(url);
        switch (type) {
            case 'Hall':
                this.workTypeHall();
                break;
            case 'Room':
                this.workTypeRoom();
                break;
            case 'Play':
                this.workTypePlay();
                break;
        }
    }
    Socket.prototype.workTypeHall = function () {
        var _this = this;
        this.socket.on('socketId', function (socketId) {
            _this.main.me.setSocketId(socketId);
            console.log(socketId);
        });
        this.socket.on('roomNumber', function (message) {
            var msg = JSON.parse(message);
            console.log(msg);
        });
        this.socket.on('create', function () {
        });
        this.socket.on('error', function () {
        });
    };
    Socket.prototype.workTypeRoom = function () {
        this.socket.on('enter', function (message) {
            var msg = JSON.parse(message);
        });
        this.socket.on('join', function (message) {
            var msg = JSON.parse(message);
        });
        this.socket.on('ready', function (socketId) {
        });
        this.socket.on('noReady', function (socketId) {
        });
        this.socket.on('disconnect', function (socketId) {
        });
        this.socket.on('error', function () {
        });
    };
    Socket.prototype.workTypePlay = function () {
        this.socket.on('state', function (message) {
        });
        this.socket.on('error', function () {
        });
    };
    /**
     * 接收消息
     */
    Socket.prototype.onReceiveMessage = function (e) {
        var msg = this.socket.readUTF();
        var obj = JSON.parse(msg);
    };
    return Socket;
}());
__reflect(Socket.prototype, "Socket");
//# sourceMappingURL=Socket.js.map