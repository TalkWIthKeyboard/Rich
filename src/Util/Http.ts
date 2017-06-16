class Http {

	private url;
	private params;
	private success;
	private failure;

    public constructor(target: string, params: Object, success: Function, failure: Function) {
        
        this.url = target;
		this.params = JSON.stringify(params);
		this.success = success;
		this.failure = failure;
	}

	public send()  {
		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open(this.url, egret.HttpMethod.POST);
		request.setRequestHeader("Content-Type", "application/json");
		request.send(this.params);
		request.addEventListener(egret.Event.COMPLETE,this.onPostComplete,this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onPostIOError,this);
		request.addEventListener(egret.ProgressEvent.PROGRESS,this.onPostProgress,this);
 
	}

    private onPostComplete(event:egret.Event):void {
    	var request = <egret.HttpRequest>event.currentTarget;
    	console.log("get data : ",request.response);
		this.success(request.response);
	}

	private onPostIOError(event:egret.IOErrorEvent):void {
		console.log("get error : " + event);
		this.failure(event);
	}

	private onPostProgress(event:egret.ProgressEvent):void {
		console.log("onPostProgress");
	}
}