'use strict';

(function() {
    /*document.addEventListener('DOMContentLoaded', function () {
        injectDmp();
    });*/
    let initHtml = setInterval(function () {

        if (document.getElementsByClassName('s_l').length > 0) {
            ckBtn() ? blackFn() : setBtn()
        }
    }, 2000);
    let ckHtml = setTimeout(function () {
        if (ckBtn()) {
            clearInterval(initHtml);
            clearTimeout(ckHtml);
        }
    }, 2000);

    // getMessageForBackground();
})();

function blackFn() {

}

// 模拟绑定事件
function setBtn() {
    console.log(333333)
    let btn = document.createElement('button');
    btn.setAttribute('class', 'p-getBtn');
    btn.innerHTML  = '获取code以及对应编码';
    btn.addEventListener('click', function () {
        let str = "IDESPJLGNG";
        let num = 0;
        let bianhao = str + num;
        setTimeout(function () {
            num = Math.floor(Math.random()*100000);
            if (num !== 485554) {
                bianhao = str + num;
                getCode(bianhao);
            }
        },2000)
        /*requestServer('111').then(resp => {
            console.log(resp)
        })*/
    })
    document.getElementsByClassName('s_l')[0].append(btn);
}

function ckBtn() {
    return document.getElementsByClassName('p-getBtn').length > 0;
}
async function requestServer (message) {
    return await sendMessageToBackground(message)
}
function sendMessageToBackground(message) {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({message}, function(response) {
            console.log('收到来自后台的回复 = ' + response);
            resolve(response);
        })
    })
}
function getMessageForBackground() {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        console.log('收到来自 ' + (sender.tab ? "content-script(" + sender.tab.url + ")" : "popup或者background") + ' 的消息：', request);
        if(request.cmd == 'update_font_size') {
            var ele = document.createElement('style');
            ele.innerHTML = `* {font-size: ${request.size}px !important;}`;
            document.head.appendChild(ele);
        } else {
            tip(JSON.stringify(request));
            sendResponse('我收到你的消息了：'+JSON.stringify(request));
        }
        return true
    });
}

// 注入dmpjs，目前暂时不需要这样引入，通信太繁琐
function injectDmp(jsPath) {
    jsPath = jsPath || 'js/dmp.js'
    let js = document.createElement('script')
    js.setAttribute('type', 'text/javascript');
    js.src = chrome.extension.getURL(jsPath);
    document.body.appendChild(js);
}

function getCookie(name) {
    if(!name) return null;
    if(document.cookie.length < 1) return null;
    if(!document.cookie.includes(name)) return null;
    /*let start = document.cookie.indexOf(name) + name.length + 1
    let end = document.cookie.indexOf(';', start)
    if(end === -1) end = document.cookie.length
    return unescape(document.cookie.substring(start, end))*/
    let arr, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    arr = document.cookie.match(reg)
    if(arr)
        return unescape(arr[2]);
    else
        return null;
}

function getCode (bianhao) {
    const posturl = "http://pc.xz.cn/index.php?ac=ajax_checkCode";
    const is_domain = 0;
    $.ajax({
        type: "get",
        url:posturl,
        data: "bianhao=" + bianhao + "&yzm=" + undefined + "&is_domain=" + is_domain,
        beforeSend: function(XMLHttpRequest){
            //
        },
        success: function(data, textStatus){
            if (data.toString().includes('返回重查')) {
                return false;
            } else {
                console.log(bianhao);
                console.log(data);
                console.log("br");
                return true;
            }
        },
        complete: function(XMLHttpRequest, textStatus){
            //
        },
        error: function(){
            alert(error4);
            return false;
        }
    });
}