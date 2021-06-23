// Copyright 2019 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

(function() {
    chrome.cookies.onChanged.addListener(function(info) {
        console.log("onChanged" + JSON.stringify(info));
    });


    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        /*chrome.storage.local.get('loginToken', function(items) {
            sendResponse('background收到的消息：' + JSON.stringify(items));
        });*/
        let queryParams = {
            userName: '13711248464',
            password: '581583'
        }
        $.ajax({
            type: 'POST',
            dateType: 'JSON',
            url: 'http://106.15.227.164:31597/zuanjiang/user/login',
            data: JSON.stringify(queryParams),
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            success: function (data) {
                sendResponse('background收到的消息：');
                alert('success======' + JSON.stringify(data))
            },
            error: function (data) {
                sendResponse('background收到的消息：');
                alert('error======' + JSON.stringify(data))
            }
        })
        // 将结果返回过去
        return true
    });
})();

// 获取活动tab
function getCurrentTabId(callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if(callback) callback(tabs.length ? tabs[0].id: null);
    });
}

function getDomainFromUrl(url){
    var host = "null";
    if(typeof url == "undefined" || null == url)
        url = window.location.href;
    var regex = /.*\:\/\/([^\/]*).*/;
    var match = url.match(regex);
    if(typeof match != "undefined" && null != match)
        host = match[1];
    return host;
}
