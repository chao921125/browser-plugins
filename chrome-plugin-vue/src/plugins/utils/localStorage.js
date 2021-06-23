"use strict";

export default {
  getItem(key) {
    let item = localStorage.getItem(key);
    if (!item) return null;
    // 这点要判断是字符串还是对象
    let result = /^[{\\[].*[}\]]$/g.test(item);
    if (result) {
      return JSON.parse(item);
    } else {
      return item;
    }
  },
  setItem(key, value) {
    // 这点要判断是字符串还是对象
    if (typeof value === "string") {
      localStorage.setItem(key, value);
    } else {
      let item = JSON.stringify(value);
      localStorage.setItem(key, item);
    }
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
  getAll() {},
  clear() {
    localStorage.clear();
  },
  key(n) {},
  forEach(cb) {},
  has(key) {},
  deleteAllExpires() {},
  // 获取localstorage最大存储容量
  getMaxSpace() {
    if (!window.localStorage) {
      console.log("当前浏览器不支持localStorage!");
    }
    let test = "0123456789";
    let add = function (num) {
      num += num;
      if (num.length === 10240) {
        test = num;
        return;
      }
      add(num);
    };
    add(test);
    let sum = test;
    let show = setInterval(function () {
      sum += test;
      try {
        window.localStorage.removeItem("test");
        window.localStorage.setItem("test", sum);
        console.log(sum.length / 1024 + "KB");
      } catch (e) {
        console.log(sum.length / 1024 + "KB超出最大限制");
        clearInterval(show);
      }
    }, 0.1);
  },
  // 获取使用了的localstorage的空间
  getUsedSpace() {
    if (!window.localStorage) {
      console.log("浏览器不支持localStorage");
    }
    let size = 0;
    for (let item in window.localStorage) {
      if (window.localStorage.hasOwnProperty(item)) {
        size += window.localStorage.getItem(item).length;
      }
    }
    console.log("当前localStorage使用容量为" + (size / 1024).toFixed(2) + "KB");
  },
};
