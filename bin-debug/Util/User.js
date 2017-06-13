var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var User = (function () {
    function User() {
    }
    User.prototype.setSocketId = function (socketId) {
        this.socketId = socketId;
    };
    User.prototype.getSocketId = function () {
        return this.socketId;
    };
    return User;
}());
__reflect(User.prototype, "User");
//# sourceMappingURL=User.js.map