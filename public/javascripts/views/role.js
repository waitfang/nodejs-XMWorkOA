 
$(function(){  
   
    Pagajax.Get('','');
});

//ajax Post
var Pagajax = {
  Get: function (action, data) {
      // var ParamsDat={} ;  
      $.ajax({
          url: 'AjaxInit',
          dataType: "json",//返回json格式的数据
          type: 'get',
          async: false,//同步，有返回值再执行后面的js
          // data: ParamsData,
          datadataType: 'json',
          success: function (objList) {   
            layuiTree.init(objList.Treedata);  
          }
          ,Error: function () {
              window.location.href = "login"; 
          }
      });
  }
}


var layuiTree = {
  init:function(objList){
    layui.use(['tree', 'util'], function(){
      var tree = layui.tree
      ,layer = layui.layer
      ,util = layui.util       
      //开启复选框
      tree.render({
        elem: '#TreeList'
        ,data: objList
        ,id: 'demoId1'
        ,showCheckbox: true
        ,click: function(obj){
            var data = obj.data;  //获取当前点击的节点数据
            layer.msg('状态：'+ obj.state + '<br>节点数据：' + JSON.stringify(data));
          }
      });
  
      tree.setChecked('demoId1', [12, 6]);//指定选中的节点
    
      //按钮事件
      util.event('lay-demo', {
        getChecked: function(othis){
          var checkedData = tree.getChecked('demoId1'); //获取选中节点的数据 
          layer.alert(JSON.stringify(checkedData), {shade:0});
          // console.log(checkedData);
        } 
      });

    });
  }
}



