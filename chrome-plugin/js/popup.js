// Copyright 2019 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

(function() {
  insertBtn()
  chrome.storage.local.set({ loginToken: 'login-token' }, function () {
    console.log('保存成功')
  })
  chrome.storage.local.get('loginToken', function(items) {
    console.log(items);
  });
  chrome.cookies.getAll({}, function(cookies) {
    console.log(cookies)
  });
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('收到来自content-script的消息：');
    console.log(request, sender, sendResponse);
    sendResponse('popup收到的消息：' + JSON.stringify(request));
  });
})();

function insertBtn() {
  let submitForm = document.getElementById('submit');
  submitForm.onclick = function () {
    let queryParams = {
      userName: $('#userName').val(),
      password: $('#password').val()
    }
    $.ajax({
      type: 'POST',
      dateType: 'JSON',
      url: 'http://106.15.227.164:31597/zuanjiang/user/login',
      data: JSON.stringify(queryParams),
      headers: {'Content-Type': 'application/json;charset=UTF-8'},
      success: function (data) {
        $("#login-form").hide();
        $("#login-success").show();
        $("#login-error").hide();
        alert('success' + JSON.stringify(data))
        // chrome.storage.sync
        // chrome.storage.managed
      },
      error: function (data) {
        $("#login-form").hide();
        $("#login-success").hide();
        $("#login-error").show();
        alert('error' + JSON.stringify(data))
      }
    })
  }
}
