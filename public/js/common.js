
function $(id){
	return document.getElementById(id);
}

//ajax
//创建AJAX对象（xhr）
function createXhr(){
	var xhr = null;
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject("Microsoft.XMLHttp");//ie8
	}
	return xhr;
}



