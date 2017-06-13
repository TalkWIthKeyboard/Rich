class Http {

	private url;

    public constructor(target: string, data: Object) {
        
        this.url = "http://localhost:5000";
		let url = this.url + target;
		console.log(url);
		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open(url, egret.HttpMethod.POST);
		request.setRequestHeader("Content-Type", "application/json");
		let params = JSON.stringify(data);
		console.log(params);
		request.send(params);
		request.addEventListener(egret.Event.COMPLETE,this.onPostComplete,this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
		request.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this);
    }

    private onPostComplete(event:egret.Event):void {
    	var request = <egret.HttpRequest>event.currentTarget;
    	console.log("get data : ",request.response);
    	var responseLabel = new egret.TextField();
	}

	private onPostIOError(event:egret.IOErrorEvent):void {
		console.log("get error : " + event);
	}

	private onPostProgress(event:egret.ProgressEvent):void {
		console.log("onPostProgress");
	}
}