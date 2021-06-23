import Vue from "vue";
import {
    Dialog,
    Table,
    Button,
    Input,
    Message
} from 'element-ui';

Vue.use(Dialog);
Vue.use(Table);
Vue.use(Button);
Vue.use(Input);

Vue.prototype.$message = Message;

import BtnUpdateData from "./App/BtnUpdateData.vue";

// 发现element的字体文件无法通过打包加载，所以另外通过cdn来加载样式
let element_css = document.createElement('link');
element_css.href = 'https://unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css';
element_css.rel = 'stylesheet';
document.head.append(element_css);

window.setTimeout(() => {
    let ctrBtn = document.querySelector('#dataCollege > div.oui-card-header-wrapper');
    if (ctrBtn) {
        let createBtn = document.createElement('span');
        createBtn.id = 'btn-update-data';
        ctrBtn.append(createBtn);
        new Vue({
            el: "#btn-update-data",
            render: createElement => {
                return createElement(BtnUpdateData);
            }
        });
    }
}, 5000);

// eslint-disable-next-line
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
    alert(request);
    let url = "https://s.taobao.com/search?ie=utf8&initiative_id=staobaoz_20200408&stats_click=search_radio_all%3A1&js=1&imgfile=&q=%E8%A3%99%E5%AD%90%E5%A5%B3%E5%A4%8F&suggest=0_2&_input_charset=utf-8&wq=qun&suggest_query=qun&source=suggest";
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', url, true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            let json = httpRequest.responseText;//获取到json字符串，还需解析
            console.log(json);
        }
    };
    sendResponse('我收到了你的消息！');
});
