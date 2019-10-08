//JavaScript数据类型及语言基础

// 判断arr是否为一个数组，返回一个bool值

function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

// 判断fn是否为一个函数，返回一个bool值

function isFunction(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
}


// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等

function cloneObject(src) {
    let clone = src;

    //日期
    if (src instanceof Date) {
        clone = new Date(src.getDate());
        return clone;
    }

    //数组
    if (src instanceof Array) {
        clone = [];
        for (let key in src) {
            clone[key] = cloneObject(src[key]);
        }
        return clone;
    }

    //Object对象
    if (src instanceof Object) {
        clone = {};
        for (let key in src) {
            if (src.hasOwnProperty(key)) {
                clone[key] = cloneObject(src[key]);
            }
        }
        return clone;
    }

    //数字、字符串、布尔
    return src;
}

// 测试用例：
// var srcObj = {
//     a: 1,
//     b: {
//         b1: ["hello", "hi"],
//         b2: "JavaScript"
//     }
// };
// var abObj = srcObj;
// var tarObj = cloneObject(srcObj);
//
// srcObj.a = 2;
// srcObj.b.b1[0] = "Hello";
//
// console.log(abObj.a);
// console.log(abObj.b.b1[0]);
//
// console.log(tarObj.a);      // 1
// console.log(tarObj.b.b1[0]);    // "hello"


// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组

function uniqArray(arr) {
    //新建一个空数组用于存放元素
    let result = [];
    //遍历传入的数组
    for (let i = 0; i < arr.length; i ++) {
        //将不重复的元素加入到result中
        if (result.indexOf(arr[i]) < 0) {
            result.push(arr[i]);
        }
    }
    return result;
}

// 使用示例
// var a = [1, 3, 5, 7, 5, 3];
// var b = uniqArray(a);
// console.log(b); // [1, 3, 5, 7]


// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有
// 连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    //去除字符串头部的空白字符
    if (str[0] === ' ' || str[0] === '  ') {
        str = simpleTrim(str.slice(1, str.length));
    }
    //去除字符串尾部的空白字符
    if (str[str.length - 1] === ' ' || str[str.length - 1] === '    ') {
        str = simpleTrim(str.slice(0, str.length - 1));
    }
    return str;
}
// console.log("hi");
// console.log(simpleTrim(" hi "));


// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

// 使用示例
// var str = '   hi!  ';
// str = trim(str);
// console.log(str); // 'hi!'


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (let i = 0; i < arr.length; i ++) {
        fn(arr[i], i);
    }
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
// var arr = ['java', 'c', 'php', 'html'];
// function output(item) {
//     console.log(item)
// }
// each(arr, output);  // java, c, php, html
//
// // 使用示例
// var arr = ['java', 'c', 'php', 'html'];
// function output(item, index) {
//     console.log(index + ': ' + item)
// }
// each(arr, output);  // 0:java, 1:c, 2:php, 3:html


// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    let newObj = {};
    for (let key in obj) {
        newObj[key] = obj[key];
    }
    return Object.getOwnPropertyNames(newObj).length;
}

// 使用示例
// var obj = {
//     a: 1,
//     b: 2,
//     c: {
//         c1: 3,
//         c2: 4
//     }
// };
// console.log(getObjectLength(obj)); // 3


// 判断是否为邮箱地址
function isEmail(emailStr) {
    //末尾{2,4}中不能有空格，否则会报错
    let reg = /^([a-zA-Z0-9_\-\.])+\@([a-zA-Z0-9_\-\.])+\.([a-zA-Z0-9_\-]{2,4})$/;
    return reg.test(emailStr);
}


// 判断是否为手机号
function isMobilePhone(phone) {
    let reg = /^1[3456789]\d{9}$/;
    return reg.test(phone);
}


//DOM

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if (element.className === "") {
        element.className = newClassName;
    } else {
        element.className += " " + newClassName;
    }
    console.log(element.className);
}


// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    let reg = new RegExp("(\\s|^)" + oldClassName + "(\\s|$)");
    element.className = element.className.replace(reg, "");
    console.log(element.className);
}


// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}


// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    let actualLeft = element.offsetLeft;
    let actualTop = element.offsetTop;
    let current = element.offsetParent;

    while (current !== null) {
        actualLeft += current.offsetLeft;
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }

    let elementScrollLeft = document.documentElement.scrollLeft;
    let elementScrollTop = document.documentElement.scrollTop;

    return {
        x: actualLeft - elementScrollLeft,
        y: actualTop - elementScrollTop
    };
}


// 实现一个简单的Query
function $(selector) {
    //定义DOM变量
    let oDom;
    //找到当前文档内的所有标签
    let els = document.getElementsByTagName("*");

    switch (selector[0]) {
        //id选择器&复杂选择器
        case "#":
            if (selector.indexOf(".") < 0) {
                oDom = document.getElementById(selector.slice(1, selector.length));
            } else {
                let domIndex = selector.indexOf(".") + 1;
                oDom = document.getElementsByClassName(selector.slice(domIndex, selector.length));
            }
            break;

        //class选择器
        case ".":
            oDom = document.getElementsByClassName(selector.slice(1, selector.length))[0];
            break;

        //属性选择器
        case "[":

            break;

        //标签选择器
        default:
            oDom = document.getElementsByTagName(selector)[0];
    }
    return oDom;
}

// // 可以通过id获取DOM对象，通过#标示，例如
// $("#adom"); // 返回id为adom的DOM对象
//
// // 可以通过tagName获取DOM对象，例如
// $("a"); // 返回第一个<a>对象
//
// // 可以通过样式名称获取DOM对象，例如
// $(".classa"); // 返回第一个样式定义包含classa的对象
//
// // 可以通过attribute匹配获取DOM对象，例如
// $("[data-log]"); // 返回第一个包含属性data-log的对象
//
// $("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象
//
// // 可以通过简单的组合提高查询便利性，例如
// $("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象


//event

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // element.addEventListener(event, listener);
}

// 例如：
// function clicklistener(event) {
//
// }
// addEvent($("#doma"), "click", a);

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    element.removeEventListener(event, listener);
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    element.addEventListener(element, 'click', listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    element.addEventListener(element, 'keydown', function(e) {
        let event = e || window.event;
        let keyCode = event.which || event.keyCode;
        if (keyCode === 13) {
            listener.call(element, event);
        }
    });
}


//BOM

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    if (window.ActiveXObject) {
        return navigator.appVersion;
    } else {
        return -1;
    }
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    document.cookie = cookieName + " = " + cookieValue + "; expires = " + expiredays;
}

// 获取cookie值
function getCookie(cookieName) {
    let cookieArr = [];
    cookieArr.push(document.cookie.split(";"));
    for (let i = 0; i < cookieArr.length; i++) {
        if (cookieArr[i].indexOf(cookieName) === 0) {
            let equIndex = cookieArr[i].indexOf("=");
            return cookieArr[i].slice(equIndex);
        }
    }
}


//Ajax

function ajax(url, options) {

}

// 使用示例：
// ajax(
//     'http://localhost:8080/server/ajaxtest',
//     {
//         data: {
//             name: 'simon',
//             password: '123456'
//         },
//         onsuccess: function (responseText, xhr) {
//             console.log(responseText);
//         }
//     }
// );

//task0002_1
let oHobby = $("#hobby");
let oBtn = $("#submit");
let hobbyArr = [];
let oDiv = $("div");

//输入的爱好数量大于0小于10才能提交
oBtn.disabled = true;//此时按钮不可用
oHobby.oninput = function() {
    let hobbyString = oHobby.value;
    //将换行、逗号、顿号、分号等非字符都转换成逗号
    hobbyString = hobbyString.replace(/[\s\W]+/g, ",");
    hobbyArr = hobbyString.split(",");
    hobbyArr = uniqArray(hobbyArr);
    oBtn.disabled = !(hobbyArr.length > 0 && hobbyArr.length < 10);

    //发生异常按钮上方提示红色文字，正常后文字消失
    // let oAlert = document.createElement("p");
    // if (!(hobbyArr.length > 0 && hobbyArr.length < 10)) {
    //     // oAlert.innerHTML = "请输入1-10个兴趣爱好";
    //     // oAlert.style.color = "red";
    //     // oDiv.insertBefore(oAlert, oBtn);
    //     console.log("true");
    // } else {
    //     // oDiv.removeChild(oAlert);
    // }
}

oBtn.onclick = function () {
    let oP = document.createElement("p");
    oP.innerHTML = "兴趣爱好展示: ";
    oDiv.appendChild(oP);
    // for (let i = 0; i < hobbyArr.length; i++) {
    //     // hobbyArr[i] = trim(hobbyArr[i]);
    //     oP.innerHTML +=  hobbyArr[i] + " ";
    // }

    for (let i = 0; i < hobbyArr.length; i++) {
        let oCheckbox = document.createElement("input");
        oCheckbox.type = "checkbox";
        let oText = document.createTextNode(hobbyArr[i] + " ");
        oP.appendChild(oCheckbox);
        oP.appendChild(oText);
    }
};
