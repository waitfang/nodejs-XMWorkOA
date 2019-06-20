/**
 * 功能说明： 
 */
var url = ""; 
var action = "init";

$(function () {
    //注册登录事件
    $('#butLogin').click(function () {
        Pagajax.Post();
    }); 
})

//ajax Post
var Pagajax = {
    Post: function (action, data) {
        var ParamsData = Params.Data(action, data);
        window.location.href = "_main";
        return;
        if (ParamsData == false) return;
        $.ajax({
            url: url,
            dataType: "json",//返回json格式的数据
            type: 'post',
            async: false,//同步，有返回值再执行后面的js
            data: ParamsData,
            datadataType: 'json',
            success: function (objList) {
              
                ReturnValue.Data(action, objList)
            }
            ,Error: function () {
                window.location.href = "login";
            
            }
        });
    }
}

//POST需要的参数 
var Params = {
    Data: function (action, data) {
        var txtName = $("#txtName");
        var txtPWD = $("#txtPWD");
        if (txtName.val() == "" ) {
            alert("【账号】不能为空！！！！");
            return false;
        }
        if (txtPWD.val() == "") {
            alert("【密码】不能为空！");
            return false;
        }
        return { 'action': action, 'txtName': txtName.val(), 'txtPWD': txtPWD.val() };
    } 
}

//ajax回传值显示信息
var ReturnValue = {
    Data: function (action, objList) {
        //var objData = objList;//比赛资料 
        window.location.href = "default";
    } 
}

 
