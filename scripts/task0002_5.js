let dragged;

//拖动的目标会触发事件
document.addEventListener("drag", function (event) {

}, false);

document.addEventListener("dragstart", function (event) {
    //保存拖动元素的引用
    dragged = event.target;
    //使其半透明
    event.target.style.opacity = 0.5;
}, false);

document.addEventListener("dragend", function (event) {
    //重置透明度
    event.target.style.opacity = "";
})

//放下目标节点时触发事件
document.addEventListener("dragover", function (event) {
    //阻止默认动作
    event.preventDefault();
}, false);

document.addEventListener("drop", function (event) {
    //阻止默认动作
    event.preventDefault();
    //移动拖动的元素到所选择的放置目标节点
    if (event.target.className === "dropzone") {
        event.target.style.background = "";
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);
    }
}, false);