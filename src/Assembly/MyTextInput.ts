class MyTextInput extends eui.TextInput{
	public constructor(prompt: string, width: number, height: number, px: number, py: number, alpha: number = 1) {
        super();
        this.alpha = alpha
        this.width = width;
        this.height = height;
        this.x = px;
        this.y = py;
        this.maxChars = 16;
        this.prompt = prompt;
        this.textColor = 0xC59266;// 0xF5F5F5 0xC59266;
        this.skinName = 'resource/eui_skins/TextInputSkin.exml'
    }
}
