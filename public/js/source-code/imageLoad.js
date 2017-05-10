/**
 * Created by coin on 4/1/17.
 */
window.onerror = function(err) {
    log('window.onerror: ' + err)
}

function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
            callback(WebViewJavascriptBridge)
        }, false)
    }
}

let params = function(bridge) {
    var uniqueId = 1
    function log(message, data) {
        var log = document.getElementById('log')
        var el = document.createElement('div')
        el.className = 'logLine'
        el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
        if (log.children.length) { log.insertBefore(el, log.children[0]) }
        else { log.appendChild(el) }
    }
    bridge.init(function(message, responseCallback) {
        log('JS got a message', message)
        var data = { 'Javascript Responds':'Wee!' }
        log('JS responding with', data)
        responseCallback(data)
    })

    bridge.registerHandler('start', function(data, responseCallback) {
// 			alert(data);
        var responseData = { 'Javascript Says':'start' }
        responseCallback(responseData)
    })
    bridge.registerHandler('imagesDownloadComplete', function(data, responseCallback) {
        console.log(data);
        var responseData = { 'Javascript Says':'imagesDownloadComplete' }
        var allImage = document.querySelectorAll("img");
        allImage = Array.prototype.slice.call(allImage, 0);
        var pOldUrl = data[0];
        var pNewUrl = data[1];
        allImage.forEach(function(image) {
            if (image.getAttribute("esrc") == pOldUrl || image.getAttribute("esrc") == decodeURIComponent(pOldUrl)) {
                console.log("寻找到了esrc")
                image.src = pNewUrl;
            }else console.log("没有寻找到esrc");
        });
        responseCallback(responseData)
    })
};
connectWebViewJavascriptBridge(params);

function onLoaded() {
    $('img').addClass('img-responsive')
    connectWebViewJavascriptBridge(function(bridge) {
        var allImage = document.querySelectorAll("img");
        allImage = Array.prototype.slice.call(allImage, 0);
        var imageUrlsArray = new Array();
        allImage.forEach(function(image) {
            var esrc = image.getAttribute("esrc");
            if(esrc){
                var newLength = imageUrlsArray.push(esrc);
            }
        });
        bridge.send(imageUrlsArray);
    });
}
function onImageClick(picUrl){
    connectWebViewJavascriptBridge(function(bridge) {
        var allImage = document.querySelectorAll("img[esrc]");
        allImage = Array.prototype.slice.call(allImage, 0);
        var urls = new Array();
        var index = -1;
        var x = 0;
        var y = 0;
        var width = 0;
        var height = 0;
        allImage.forEach(function(image) {
            var imgUrl = image.getAttribute("esrc");
            var newLength = urls.push(imgUrl);
            if(imgUrl == picUrl || imgUrl == decodeURIComponent(picUrl)){
                index = newLength-1;
                x = image.getBoundingClientRect().left;
                y = image.getBoundingClientRect().top;
                x = x + document.documentElement.scrollLeft;
                y = y + document.documentElement.scrollTop;
                width = image.width;
                height = image.height;
                console.log("x:"+x +";y:" + y+";width:"+image.width +";height:"+image.height);
            }
        });
        console.log("检测到点击");
        bridge.callHandler('imageDidClicked', {'index':index,'x':x,'y':y,'width':width,'height':height}, function(response) {
            console.log("JS已经发出imgurl和index，同时收到回调，说明OC已经收到数据");
        });
    });
}
