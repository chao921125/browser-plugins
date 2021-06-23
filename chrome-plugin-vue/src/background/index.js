import "../assets/js/jquery-1.12.4.js";

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // eslint-disable-next-line no-undef
  $.ajax({
    type: 'POST',
    dateType: 'JSON',
    async: true,
    url: request.params.url,
    data: JSON.stringify(request.params),
    headers: {'Content-Type': 'application/json;charset=UTF-8'},
    success: function (data) {
      sendResponse(JSON.stringify(data));
    },
    error: function (data) {
      sendResponse(JSON.stringify(data));
    }
  });
  /*chrome.storage.local.get('loginToken', function (items) {
    sendResponse('background收到的消息：' + JSON.stringify(items));
  });*/
  return true;
});
