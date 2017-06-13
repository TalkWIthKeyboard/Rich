var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Socket = (function () {
    function Socket(main, type, roomId, socketId) {
        var url = "ws://localhost:5000?type=" + type;
        url +=
            type === 'Room' || type === 'Play'
                ? "&roomId=" + roomId + "&socketId=" + socketId
                : '';
        this.socket = io.connect(url);
        this.socket.emit('join', 'hahaha');
    }
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