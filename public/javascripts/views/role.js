 
 var layer;
 var tree;
 var mobjList; //tree功能树data，一般不会改动，是固定的。
 var loadindex; //进度条
$(function(){
    Pagajax.Get('ajaxInitTree','');

    Pagajax.Get('ajaxPageInitGrid','');

    //查询功能
    $("#butSearch").click(function(){
      loadindex = layer.load(0);
      Pagajax.Get('ajaxInitGrid','');
    });

    //角色新增
    $("#butAdd").click(function(){
      Pagajax.Action('ajaxInsertRole');
    });
    //角色修改
    $("#butEdit").click(function(){
      Pagajax.Action('ajaxEditRole');
    });
    //角色删除
    $("#butDel").click(function(){
      Pagajax.Action('ajaxDelRole');
    });
});


//ajax Post
var Pagajax = {
  Get: function (action, data) {
      var ParamsData=Pagajax.ParamsData(action,data);  
      if (ParamsData == false) return;
      $.ajax({
          url: 'AjaxInit',
          dataType: "json",//返回json格式的数据
          type: 'get',
          async: false,//同步，有返回值再执行后面的js
          data: ParamsData,
          datadataType: 'json',
          success: function (objList) {   
            Pagajax.backDate(action,objList);
          }
          ,Error: function () {
              window.location.href = "login";  
          }
      });
  },

  Action:function(action){
    var txtRoleid = $("#txtRoleid").val();
    var txtRoleName = $("#txtRoleName").val();
    var drpState = $("#drpState").val();  
    Pagajax.Get(action,{ROLEID:txtRoleid,ROLENAME:txtRoleName,ROLESTATE:drpState});
  },

  //呼叫api需要的参数
  ParamsData:function(action, data){
    var ParamsData = { 'action': action}
    ParamsData.data = data;
    return ParamsData;
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
      case "ajaxinsertRoletoFun" ://新增角色功能
        layer.msg(data.ReturnData);  
        break;
      case "ajaxRoletoFun":  
        var treeAryy  = new Array(); 
        data.ReturnData.forEach(element => { 
          if(element.FUNACTIONID !=null){
            element.FUNACTIONID.split(',').forEach(elementchild=>{
              treeAryy.push(parseFloat(elementchild));
            });
          } 
        }); 
        tree.reload('treeId', {});  //重载实例,简单粗暴。
        tree.setChecked("treeId",treeAryy);//指定选中的节点  
        break;  
      case "ajaxInsertRole":
      case "ajaxEditRole":
      case "ajaxDelRole"://新增/修改/删除/角色功能
        layer.msg(data.ReturnData);  
        $("#butSearch").click();
        break;
    }
    if(loadindex !=null) 
      layer.close(loadindex);    //返回数据关闭loading
  }
} 

var Grid = {
  init:function(Griddata){
    layui.use(['table','tree'], function(){
      var table = layui.table;
      tree = layui.tree;
      table.render({
        elem: '#GridList'
        ,data:Griddata
        ,cols: [[
          {field:'ROLEID', title:'角色编号', align: 'center'}
          ,{field:'ROLENAME', title:'角色名称' , align: 'center'} 
          ,{field:'ROLESTATE', title:'角色状态', align: 'center', sort: true, templet: function(res){
            return Grid.formartSTATE(res.ROLESTATE);
          }} 
          ,{field:'ROLESTATE', hide:true} 
        ]]
        ,page: true
      });
      
      Grid.tableRowClick(table); 
    });
  },
  formartSTATE:function(ROLESTATE){
    let state ='启用';
    if(ROLESTATE==1)
      state ='停用'; 
    return state
  },
  tableRowClick:function(table){
    //监听行单击事件（单击事件为：rowDouble）
    table.on('row', function(obj){
        loadindex = layer.load(0);
        var data = obj.data;
        $("#txtRoleid").val(obj.data.ROLEID );
        $("#txtRoleName").val(obj.data.ROLENAME);
        $("#txtRoleFunName").val(obj.data.ROLEID +"-"+obj.data.ROLENAME);
        $("#drpState").val(obj.data.ROLESTATE); 
        $("#drpGameType").val(obj.data.ROLESTATE); 
        layui.form.render(); //刷新select选择框渲染  
        Pagajax.Get('ajaxRoletoFun',{"ROLEID":obj.data.ROLEID});
        //标注选中样式
        obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
    });
  }
}

var layuiTree = {
  init:function(objList){
    mobjList = objList;
    layuiTree.TreeList(objList,"#TreeList","treeId");
    // layuiTree.TreeList(gameType,"#GameList","GameId");//遗留，把游戏类别，也用tree来显示，个人觉得更直观。
  }

  ,TreeList:function(objList,objTreeList,treeId){
    layui.use(['tree', 'util'], function(){
      var tree = layui.tree
      ,layer = layui.layer
      ,util = layui.util; 
      //开启复选框
      tree.render({
        elem: objTreeList
        ,data: objList
        ,id: treeId
        ,spread: true//展开，默认是false；
        ,showCheckbox: true
        ,click: function(obj){
            var data = obj.data;  //获取当前点击的节点数据
            layer.msg('状态：'+ obj.state + '<br>节点数据：' + JSON.stringify(data));
          }
      }); 
      layuiTree.laydemo(util,tree,treeId);//按钮事件
    });
  }

  //按钮事件
  ,laydemo:function(util,tree,treeId){ 
    util.event('lay-demo', {
      getChecked: function(othis){
        var checkedData = tree.getChecked(treeId); //获取选中节点的数据  
        var ArraycheckValue = new Array(); //记录点选的功能和功能action 
        var row1 = {};  
        for (var i = 0; i < checkedData.length; i++) { 
          //遗留一个bug，有path的父节点的加载。
          if(checkedData[i].path==null || checkedData[i].path =="") 
              ArraycheckValue.push(layuiTree.Treerow1(checkedData[i].id,""));//第一层节点，没有action  

          for(var j = 0; j <checkedData[i].children.length;j++){ 
            var childflag="";
            var childValue="";
            for(var k = 0; k <checkedData[i].children[j].children.length;k++){ 
              var child = checkedData[i].children[j].children[k].id;
              childValue +=childflag+child;
              childflag=","; 
            }  
            ArraycheckValue.push(layuiTree.Treerow1(checkedData[i].children[j].id,childValue)); 
          } 
        } 
        var ParmData = {};
        ParmData.ROLEID = $("#txtRoleFunName").val().split("-")[0];
        ParmData.GAMEID = $("#drpGameType").val();
        ParmData.data = ArraycheckValue;
        Pagajax.Get('ajaxinsertRoletoFun',ParmData); //存档功能。
      } 
    });
  }
  
  ,Treerow1:function(FUNCTIONID,FUNACTIONID){
    row1 = {}; 
    row1.FUNCTIONID= FUNCTIONID; //功能编号
    row1.FUNACTIONID = FUNACTIONID; //功能action
    return row1;
  }
}

//暂时废弃tree的做法
var gameType=[
  {
    "title":"ALL",
    "id":"0"
  },
  {
      "title":"篮球",
      "id":"1"
  },{
    "title":"足球",
    "id":"2"
  },{
  "title":"拳击",
  "id":"2"
  }
]
