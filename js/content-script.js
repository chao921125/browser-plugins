'use strict';

(function() {
    /*document.addEventListener('DOMContentLoaded', function () {
        injectDmp();
    });*/
    let initHtml = setInterval(function () {
        if (document.getElementsByClassName('realtime-filter').length > 0) {
            ckBtn() ? blackFn() : setBtn()
        }
    }, 2000);
    let ckHtml = setTimeout(function () {
        if (!ckBtn()) {
            clearInterval(initHtml);
            clearTimeout(ckHtml);
        } else {
            ckHtml;
        }
    }, 120000);

    getMessageForBackground();
})();

function blackFn() {

}

// 模拟绑定事件
function setBtn() {
    document.cookie
    let btn = document.createElement('button');
    btn.setAttribute('class', 'p-getBtn');
    btn.innerHTML  = '测试调用后端数据';
    btn.addEventListener('click', function () {
        /*let formData = new FormData()
        // formData.append('_tb_token_', 'y43APMpNl7zA24')
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://zhaoshang.tmall.com/tmallwork/shopManage.do?_tb_token_='+getCookie('_tb_token_'), false)
        xhr.onload = function(e) {
            if(this.status === 200||this.status === 304){
                alert(this.responseText);
            }
        };
        xhr.send(formData)*/

        // 'https://subway.simba.taobao.com/bpenv/getLoginUserInfo.htm'
        /*$.ajax({
            type: 'POST',
            dateType: 'JSON',
            url: 'https://subway.simba.taobao.com/bpenv/getLoginUserInfo.htm',
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            success: function (data) {
                alert('success' + data.result.outsideNumID + sendMessageToBackground(data.result.outsideNumID));
                alert('success' + JSON.stringify(data));
            },
            error: function (data) {
                alert('error' + JSON.stringify(data));
            }
        })*/

        sendMessageToBackground('111')
    })
    document.getElementsByClassName('realtime-filter')[0].append(btn);
}

function ckBtn() {
    return document.getElementsByClassName('p-getBtn').length > 0;
}

async function sendMessageToBackground(message) {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({greeting: message || '你好，我是content-script呀，我主动发消息给后台！'}, function(response) {
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

