/**
 * Created by coin on 3/31/17.
 */

/**
 * JS - Objective-C Bridge
 */

//v6.0.2
setupWebViewJavascriptBridgeV6_0_2 = function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(window.WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
};

//v4.1.5
setupWebViewJavascriptBridgeV4_1_5 = function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
            callback(window.WebViewJavascriptBridge)
        }, false)
    }
};

/**
 * JS - Java Bridge
 */
window.setupJSBridge = window.setupWebViewJavascriptBridgeV6_0_2;

window.connectWebViewJavascriptBridge = function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(window.WebViewJavascriptBridge)
    } else {
        document.addEventListener(
            'WebViewJavascriptBridgeReady'
            , function() {
                callback(window.WebViewJavascriptBridge)
            },
            false
        );
    }
}
