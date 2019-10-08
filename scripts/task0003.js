

/*左侧列表*/

//获取需要操作的对象
let oItems = document.querySelectorAll(".item>p");
let oCreateItem = document.querySelector("#create-item");
let oDirectory = document.querySelector(".directory");
let oRemoveItems = document.querySelectorAll(".remove");

//遍历oItems对象
//进入页面默认选中默认分类
let preIndex = oItems.length - 1;//默认分类的索引
for (let i = 0; i < oItems.length; i++) {
    let eleId = "no" + i;
    let item = oItems[i];
    item.onclick = function () {
        //展示文件的功能
        showFile(this, eleId);
        //选中分类的功能
        let preItem = oItems[preIndex];
        preItem.setAttribute("id", "");
        this.setAttribute("id", "current");
        preIndex = i;
    }
    //每个分类名字后都显示当前分类下的未完成任务数量
}

//展示文件的函数
function showFile(obj, noID) {
    let oItem = document.getElementById(noID);
    if (oItem.className === "no") {
        oItem.className = "";
    } else {
        oItem.className = "no";
    }
}

//增加子分类的功能
oCreateItem.onclick = function () {
    createItem();
}

//增加子分类的函数
function createItem() {
    let oCurrent = document.querySelector("#current");
    let itemName = prompt("请输入分类名称");
    if (oCurrent !== null && oCurrent !== oItems[oItems.length - 1]) {
        if (itemName !== null && itemName !== "") {
            let nextEle = oCurrent.nextElementSibling;
            let oP = document.createElement("p");
            oP.innerHTML = '<img src="../images/file.png" alt=""><span>' + itemName + '</span>';
            nextEle.appendChild(oP);
        } else {
            alert("请输入分类名称");
            return false;
        }
    }
}

//遍历oRemoveItems对象
for (let j = 0; j < oRemoveItems.length; j++) {
    //删除分类功能
    oRemoveItems[j].onclick = function (event) {
        event = event || window.event;
        //阻止事件冒泡
        if (event.cancelBubble) {
            event.cancelBubble = true;
        } else {
            event.stopPropagation();
        }
        removeItem(this.parentNode.parentNode);
    }
}

//删除分类的函数
function removeItem(obj) {
    let msg = confirm("是否删除该分类");
    if (msg === true) {
        oDirectory.removeChild(obj);
    }
}


/*中间列表*/

//获取需要操作的对象
let allTask = document.querySelector("#all-task");
let dates = document.querySelectorAll(".date");
let oCreateFile = document.querySelector("#create-file");
let oCreatePage = document.querySelector("#create-page");
let oTasks = document.querySelectorAll(".task");
let oDetailPage = document.querySelector("#detail-page");
let oTaskName = document.querySelector("#task-name");
let oTaskDate = document.querySelector("#task-date");
let oTaskContent = document.querySelector("#task-content");
let oBtns = document.querySelectorAll("#filter>span");

//任务列表按升序排列
// let dateArr = [];
// for (let i = 0; i < oDates.length; i++) {
//     dateArr.push(oDates[i].innerHTML);
// }
// dateArr.sort(function (a, b) {
//     return a - b;
// });

let previousIndex = 0;
for (let i = 0; i < oBtns.length; i++) {
    let btn = oBtns[i];
    btn.onclick = function() {
        let preBtn = oBtns[previousIndex];
        preBtn.setAttribute("id", "");
        this.setAttribute("id", "selected");
        previousIndex = i;
        //遍历所有任务
        for (let j = 0; j < oTasks.length; j++) {
            let task = oTasks[j];
            //所有任务/未完成任务/已完成任务
            if (this === oBtns[0]) {
                task.style.display = "block";
            } else if (this === oBtns[1]) {
                if (task.className.includes("no")) {
                    task.style.display = "block";
                } else {
                    task.style.display = "none";
                }
            } else if (this === oBtns[2]) {
                if (task.className.includes("yes")) {
                    task.style.display = "block";
                } else {
                    task.style.display = "none";
                }
            }
        }
    }
}

//新增/编辑页面的任务名称、日期、内容和按钮
let oTitle = document.querySelector("#title");
let oDate = document.querySelector("#date");
let reg = /\d{4}-\d{2}-\d{2}/;
let oContent = document.querySelector("#content");
let oConfirm = document.querySelector("#confirm");
let oCancel = document.querySelector("#cancel");

//新增任务功能
oCreateFile.onclick = function () {
    oDetailPage.style.display = "none";
    oCreatePage.style.display = "block";
    oTitle.value = "";
    oDate.value = "";
    oContent.value = "";
    //新建任务
    let newTask = document.createElement("p");
    newTask.setAttribute("class", "task");
    newTask.className = newTask.className + " no";
    oConfirm.onclick = function () {
        if (oTitle.value !== "") {
            newTask.innerHTML = oTitle.value;
            oTaskName.innerHTML = oTitle.value;
        } else {
            alert("请输入标题");
            return false;
        }

        if (reg.test(oDate.value)) {
            //新增div容器
            let newContent = document.createElement("div");
            //新增日期段落
            let newDate = document.createElement("p");
            newContent.setAttribute("class", "content");
            newDate.setAttribute("class", "date");
            allTask.appendChild(newContent);
            newContent.appendChild(newDate);
            //设置日期
            newDate.innerHTML = oDate.value;
            newContent.appendChild(newTask);
            oTaskDate.innerHTML = "任务日期：" + oDate.value;
        } else {
            alert("请按照格式输入日期");
            return false;
        }

        if (oContent.value !== "") {
            oTaskContent.innerHTML = oContent.value;
        } else {
            alert("请输入内容");
            return false;
        }

        // //详细信息页面
        oDetailPage.style.display = "block";
        // //新增/编辑任务页面
        oCreatePage.style.display = "none";
    }
}

//单击某任务右侧显示详细信息
//完成和编辑按钮
let finishBtn = document.querySelector("#finish");
let editBtn = document.querySelector("#edit");

for (let i = 0; i < oTasks.length; i++) {
    let task = oTasks[i];
    task.onclick = function () {
        //新增业务页面
        oCreatePage.style.display = "none";
        //详细信息页面
        oDetailPage.style.display = "block";
        let taskParent = this.parentElement;
        //任务名称
        oTaskName.innerHTML = this.innerHTML;
        //任务时间
        oTaskDate.innerHTML = "任务日期：" + taskParent.firstElementChild.innerHTML;
        //任务内容
        oTaskContent.innerHTML = "task3";
        if (this.className.includes("yes")) {
            finishBtn.style.display = "none";
            editBtn.style.display = "none";
        } else if (this.className.includes("no")){
            finishBtn.style.display = "block";
            editBtn.style.display = "block";
            //完成任务功能
            finishBtn.onclick = function () {
                let msg = confirm("确认完成该任务吗？");
                if (msg === true) {
                    task.className = task.className.replace("no", "yes");
                    finishBtn.style.display = "none";
                    editBtn.style.display = "none";
                }
            }
            //编辑任务功能
            editBtn.onclick = function () {
                //详细信息页面
                oDetailPage.style.display = "none";
                //新增/编辑任务页面
                oCreatePage.style.display = "block";
                oTitle.value = oTaskName.innerHTML;
                oDate.value = taskParent.firstElementChild.innerHTML;
                oContent.innerHTML = oTaskContent.innerHTML;

                //确认修改功能
                oConfirm.onclick = function () {
                    if (oTitle.value !== "") {
                        task.innerHTML = oTitle.value;
                        oTaskName.innerHTML = task.innerHTML;
                    } else {
                        alert("请输入标题");
                        return false;
                    }

                    if (reg.test(oDate.value)) {
                        oTaskDate.innerHTML = "任务日期：" + oDate.value;
                    } else {
                        alert("请按照格式输入日期");
                        return false;
                    }

                    if (oContent.value !== "") {
                        oTaskContent.innerHTML = oContent.value;
                    } else {
                        alert("请输入内容");
                        return false;
                    }

                    //详细信息页面
                    oDetailPage.style.display = "block";
                    //新增/编辑任务页面
                    oCreatePage.style.display = "none";
                }

                //取消修改功能
                oCancel.onclick = function () {
                    //详细信息页面
                    oDetailPage.style.display = "block";
                    //新增/编辑任务页面
                    oCreatePage.style.display = "none";
                }
            }
        }
    }
}

/*右侧列表*/

