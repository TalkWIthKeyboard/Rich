class Util {


    public constructor() {

    }

    public workManyChild(scene, childs, priority) {
        if (priority)
            for (let i = 0; i < childs.length; i++) 
                scene.addChildAt(childs[i], priority[i]);     
        else
            for (let i = 0; i < childs.length; i++) 
                scene.addChild(childs[i]);
    }

}