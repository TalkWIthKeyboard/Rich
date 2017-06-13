class TextInput extends egret.TextField {

    public constructor(type, text, height, width, x, y) {
        super();

        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;

        if (type === 'INPUT') {
            this.type = egret.TextFieldType.INPUT;        
        }
    }
}