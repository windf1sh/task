let oDiv = document.querySelector("div");
let oP = document.createElement("p");
let oInput = document.querySelector("#time");
let oBtn = document.querySelector("#submit");
oDiv.appendChild(oP);
let diffSecond;

//按格式输入年月日
oBtn.disabled = true;
oInput.oninput = function() {
  let reg = /\d{4}-\d{2}-\d{2}/g;
  oBtn.disabled = !reg.test(oInput.value);
};

oBtn.onclick = function() {
    //计算时间差
    function getDiffTime() {
        //获取当前时间
        let curDate = new Date();
        //获取输入的时间
        let furDate = new Date(oInput.value + " 00:00:00");
        //计算总的时间差(毫秒数/1000)
        diffSecond = (furDate - curDate) / 1000;
        //计算差的天数
        let day = Math.floor(diffSecond / (60 * 60 * 24));
        day = day >= 10 ? day : "0" + day;
        //计算差的小时
        let hour = Math.floor(diffSecond / (60 * 60) % 24);
        hour = hour >= 10 ? hour : "0" + hour;
        //计算差的分钟
        let minute = Math.floor(diffSecond / 60 % 60);
        minute = minute >= 10 ? minute : "0" + minute;
        //计算差的秒数
        let second = Math.floor(diffSecond % 60);
        second = second >= 10 ? second : "0" + second;
        return {
            day: day,
            hour: hour,
            minute: minute,
            second: second
        };
    }

    //设置时间差对象
    function setTime() {
        let obj = getDiffTime();
        oP.innerHTML = "倒计时：距离" + oInput.value.slice(0,4) + "年" + oInput.value.slice(5,7) + "月" +
                       oInput.value.slice(8) + "日还有" + obj.day + "天" + obj.hour + "小时" +
                       obj.minute + "分" + obj.second + "秒";
    }

    //开始倒计时
    let myTimer = setInterval(function () {
        setTime();
    }, 1000);

    //时差为0停止倒计时
};

