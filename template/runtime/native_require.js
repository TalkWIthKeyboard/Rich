
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/eui/eui.js",
	"libs/modules/socket/socket.js",
	"libs/modules/socket.io/socket.io.js",
	"polyfill/promise.js",
	"bin-debug/Model/Role.js",
	"bin-debug/Assembly/MyArc.js",
	"bin-debug/Assembly/MyBitmap.js",
	"bin-debug/Assembly/MyButton.js",
	"bin-debug/Assembly/MyCard.js",
	"bin-debug/Assembly/MyCreateRoom.js",
	"bin-debug/Assembly/MyGetCardPanel.js",
	"bin-debug/Assembly/MyHandCard.js",
	"bin-debug/Assembly/MyPlayerModal.js",
	"bin-debug/Assembly/MyRoomItem.js",
	"bin-debug/Assembly/MyRoomList.js",
	"bin-debug/Assembly/MyRoomUser.js",
	"bin-debug/Assembly/MyTextInput.js",
	"bin-debug/Assembly/PlayerModal.js",
	"bin-debug/Assembly/ScorePanel.js",
	"bin-debug/Assembly/SelectCharacterModal.js",
	"bin-debug/Assembly/TextInput.js",
	"bin-debug/Game/CenterController.js",
	"bin-debug/Main.js",
	"bin-debug/Util/Util.js",
	"bin-debug/Model/Card.js",
	"bin-debug/Model/PlayUser.js",
	"bin-debug/Model/Region.js",
	"bin-debug/Assembly/Modal.js",
	"bin-debug/Model/roomModel.js",
	"bin-debug/Scene/HallScene.js",
	"bin-debug/Scene/LoginScene.js",
	"bin-debug/Scene/PlayScene.js",
	"bin-debug/Scene/RegisterScene.js",
	"bin-debug/Scene/RoomScene.js",
	"bin-debug/Server/ChangeSceneEvent.js",
	"bin-debug/Server/ResManage.js",
	"bin-debug/Util/Coder.js",
	"bin-debug/Util/Http.js",
	"bin-debug/Util/LoadingUI.js",
	"bin-debug/Util/Socket.js",
	"bin-debug/Util/User.js",
	"bin-debug/Model/AssassinRole.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 1440,
		contentHeight: 1024,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};