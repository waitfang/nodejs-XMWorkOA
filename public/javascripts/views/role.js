 
$(function(){
    Pagajax.Get('ajaxInitTree','');

    Pagajax.Get('ajaxPageInitGrid','');

    //查询功能
    $("#butSearch").click(function(){
      Pagajax.Get('ajaxInitGrid','');
    });
});

//ajax Post
var Pagajax = {
  Get: function (action, data) {
      var ParamsDat=Pagajax.ParamsData(action,data);  
      if (ParamsDat == false) return;
      $.ajax({
          url: 'AjaxInit',
          dataType: "json",//返回json格式的数据
          type: 'get',
          async: false,//同步，有返回值再执行后面的js
          data: ParamsDat,
          datadataType: 'json',
          success: function (objList) {   
            Pagajax.backDate(action,objList);
          }
          ,Error: function () {
              window.location.href = "login"; 
          }
      });
  },
  //呼叫api需要的参数
  ParamsData:function(action, data){
    return { 'action': action};
  },
  //成功后的数据处理
  backDate:function(action, data){
    switch(action){
      case "ajaxInitTree" :
        layuiTree.init(data.Treedata);  
        break;
      case "ajaxPageInitGrid" ://初始化一个表头
        Grid.init([ ]);  
        break;
      case "ajaxInitGrid" :
        Grid.init(data.Griddata);  
        break;
    }
      
  }
} 
var Grid = {
  init:function(Griddata){
    layui.use('table', function(){
      var table = layui.table;
      
      table.render({
        elem: '#GridList'
        ,data:Griddata
        ,cols: [[
          {field:'ROLEID', title:'角色编号', align: 'center'}
          ,{field:'ROLENAME', title:'角色名称' , align: 'center'} 
          ,{field:'ROLESTATE', title:'角色状态', align: 'center', sort: true, templet: function(res){
            return Grid.formartSTATE(res);
          }} 
          ,{field:'ROLESTATE', hide:true} 
        ]]
        ,page: true
      });
      
      //监听行单击事件（单击事件为：rowDouble）
      table.on('row', function(obj){
        var data = obj.data;
        
        layer.alert(data.state + JSON.stringify(data.ROLESTATE), {
          title: '当前行数据：'
        });
        
        //标注选中样式
        obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
      });
      
    });
  },
  formartSTATE:function(res){
    let state ='启用';
    if(res.ROLESTATE==1)
      state ='停用'; 
    return state
  },
  tableRowClick:function(){

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



