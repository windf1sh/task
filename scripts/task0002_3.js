//1.获取需要操作的元素
let oRight = document.querySelector(".right");
let oLeft = document.querySelector(".left");
let oUL = document.querySelector(".pics");
let oItems = document.querySelectorAll(".pics>li");
let oIndex = document.querySelector(".indexes");
let imgWidth = 500;
let currentIndex = 0;

//2.监听按钮的点击事件
oRight.onclick = function () {
    currentIndex++;
    if (currentIndex > oItems.length - 1) {
        currentIndex = 0;
        //快速跳转到第一张图片
        oUL.style.marginLeft = -currentIndex * imgWidth + "px";
        currentIndex++;
    }
    // oUL.style.marginLeft = -currentIndex * imgWidth + "px";
    easeAnimation(oUL, -currentIndex * imgWidth);
}

oLeft.onclick = function () {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = oItems.length - 1;
        //快速跳转到最后一张
        oUL.style.marginLeft = -currentIndex * imgWidth + "px";
        currentIndex--;
    }
    // oUL.style.marginLeft = -currentIndex * imgWidth + "px";
    easeAnimation(oUL, -currentIndex * imgWidth);

}

//3.缓动动画
let timerID = null;
function easeAnimation(ele, target) {
    clearInterval(timerID);
    timerID = setInterval(function () {
        //拿到当前元素的位置
        let begin = parseInt(ele.style.marginLeft) || 0;
        //定义变量记录步长
        let step = (target - begin) * 0.3;
        //计算新的位置
        begin += step;
        if (Math.abs(Math.floor(step)) < 1) {
            clearInterval(timerID);
            begin = target;
        }
        //重新设置元素的位置
        ele.style.marginLeft = begin + "px";
    }, 100);
}

//4.设置自动循环
let id = setInterval(function () {
        oRight.onclick()
}, 2000);

//5.设置图片对应的小点
