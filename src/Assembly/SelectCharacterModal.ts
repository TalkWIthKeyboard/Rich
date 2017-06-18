class SelectCharacterModal extends eui.Panel{
	
	private select: eui.Button;
	private bg: eui.Image;
	private selectnum: number;
	private characterList: Array<eui.Group>;
	private roles;

	public constructor() {
		super();
		this.width = 1213;
		this.height = 598;
		this.characterList = new Array<eui.Group>();
		for(let i = 0; i < 8; i++) {
			let group = new eui.Group();
			group.x = 61 + i * 140;
			group.y = 200;
			group.width = 140;
			group.height = 210;
			this.characterList.push(group);
			this.addChild(group);
		}
	}

	public init() {
		let bg = new eui.Image();
		bg.source = "resource/assets/Game/selectModal.png";
		this.addChild(bg);

		let title = new eui.Label('轮到您选择本局角色');
		title.horizontalCenter="0";
		title.size = 48;
		title.textColor = 0x543503;
		title.y = 64;
		this.addChild(title);

		this.select = new eui.Button();
		this.select.skinName = "resource/eui_skins/ButtonSkin.exml";
		this.select.label = '选择角色'
		this.select.horizontalCenter="0";
		this.select.y = 440;
		this.select.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);

		this.bg = new eui.Image();
		this.bg.source = "resource/assets/Game/bg.png";
		this.bg.alpha = 0.5;
		this.bg.horizontalCenter="0";
	}

	public reset(roles) {
		this.roles = roles;

		let disable = this.characterList[0];
		this.resetGroup(this.characterList[0], 0);
		let img = new eui.Image();
		img.source = "resource/assets/Game/none.png";
		img.horizontalCenter="0";
		img.y = 10;
		disable.addChild(img);
		let bg1 = new eui.Image();
		bg1.source = "resource/assets/Game/bg1.png";
		bg1.alpha = 0.3;
		bg1.horizontalCenter="0";
		bg1.y = 10;
		disable.addChild(bg1);
		let status = new eui.Label('(反面弃置)');
		status.horizontalCenter="0";
		status.y = 180;
		status.size = 18;
		status.textColor = 0x543503;
		disable.addChild(status);
		this.addChild(disable);

		let count = 1;
		
		for (let now = count; now <= roles.front.length; now++) {
			let group = this.characterList[now];
			this.resetGroup(this.characterList[now], now);
			let img = new eui.Image();
			img.source = "resource/assets/Game/" + Coder.ROLE_TYPE[roles.front[now - 1].roleName].cn_name + ".png";
			img.horizontalCenter="0";
			img.y = 10;
			group.addChild(img);
			let bg1 = new eui.Image();
			bg1.source = "resource/assets/Game/bg1.png";
			bg1.alpha = 0.3;
			bg1.horizontalCenter="0";
			bg1.y = 10;
			group.addChild(bg1);
			let name = new eui.Label(Coder.ROLE_TYPE[roles.front[now - 1].roleName].cn_name);
			name.horizontalCenter="0";
			name.y = 140;
			name.size = 36;
			name.textColor = 0x543503;
			group.addChild(name);
			let status = new eui.Label('(正面弃置)');
			status.horizontalCenter="0";
			status.y = 180;
			status.size = 18;
			status.textColor = 0x543503;
			group.addChild(status);
			count = now;

			this.addChild(group);
		}
		
		for (let now = ++count; now <= roles.front.length + roles.choose.length; now++) {

			let group = this.characterList[now];
			this.resetGroup(this.characterList[now], now);
			let img = new eui.Image();
			img.source = "resource/assets/Game/none.png";
			img.horizontalCenter="0";
			img.y = 10;
			group.addChild(img);
			let bg1 = new eui.Image();
			bg1.source = "resource/assets/Game/bg1.png";
			bg1.alpha = 0.3;
			bg1.horizontalCenter="0";
			bg1.y = 10;
			group.addChild(bg1);
			let status = new eui.Label('(已被选择)');
			status.horizontalCenter="0";
			status.y = 180;
			status.size = 18;
			status.textColor = 0x543503;
			group.addChild(status);
			count = now;

			this.addChild(group);
		}
		
		for (let now = this.roles.choose.length === 0 ? count : ++count; now < 8; now++) {
			let group = this.characterList[now];
			this.resetGroup(this.characterList[now], now);
			let img = new eui.Image();
			img.source = "resource/assets/Game/" + Coder.ROLE_TYPE[roles.normal[now - count].roleName].cn_name + ".png";
			img.horizontalCenter="0";
			img.y = 10;
			group.addChild(img);
			let bg1 = new eui.Image();
			bg1.source = "resource/assets/Game/bg1.png";
			bg1.alpha = 0.3;
			bg1.horizontalCenter="0";
			bg1.y = 10;
			group.addChild(img);
			let name = new eui.Label(Coder.ROLE_TYPE[roles.normal[now - count].roleName].cn_name);
			name.horizontalCenter="0";
			name.y = 140;
			name.size = 36;
			name.textColor = 0x543503;
			group.addChild(name);
			let status = new eui.Label('(可以选择)');
			status.horizontalCenter="0";
			status.y = 180;
			status.size = 18;
			status.textColor = 0x543503;
			group.addChild(status);
			
			group.addEventListener(egret.TouchEvent.TOUCH_END, () => {
				this.selectCharacter(now);
			}
			, group);

			this.addChild(group);
		}
	}

	private resetGroup(group: eui.Group, i: number) {
		// this.characterList.splice(i, 1);
		group.removeChildren();
		this.removeChild(group);
		group = new eui.Group();
		group.x = 61 + i * 140;
		group.y = 200;
		group.width = 140;
		group.height = 210;
		// this.characterList.splice(i, 0, group);
		this.addChild(group);
	}

	private selectCharacter(i) {
		if(this.selectnum != null) {
			this.characterList[this.selectnum].removeChild(this.bg);
			if(this.selectnum != i) {;
				this.characterList[i].addChildAt(this.bg, 0);
				this.selectnum = i;
			}
			else {
				this.selectnum = null;
				this.removeChild(this.select);
			}
		}
		else {
			this.characterList[i].addChildAt(this.bg, 0);
			this.selectnum = i;
			this.addChild(this.select);
		}
	}

	private onTouch(evt:egret.TouchEvent) {
		let selectIndex = this.selectnum - this.roles.front.length - this.roles.choose.length - 1;
		let roleName =  this.roles.normal[selectIndex];
		this.roles.choose.push(roleName);		
		this.roles.normal.splice(selectIndex, 1);	
		let scene = (<PlayScene>this.parent);
		
		scene.socketIO.sendMessage(Coder.GAME_STATE[2], JSON.stringify({
			num: scene.num,
			role: roleName,
			roles: this.roles
		}))
	}
}