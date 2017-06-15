class ChangeSceneEvent extends egret.Event {
    public static CHANGE_SCENE_EVENT: string = "ChangeSceneEvent";
    public thisScene: string;
    public nextScene: string;
    public constructor(thisScene: string, nextScene:string, bubbles:boolean = false, cancelable:boolean = false) {
        super("ChangeSceneEvent", bubbles, cancelable);
        this.thisScene = thisScene;
        this.nextScene = nextScene;
    }
}