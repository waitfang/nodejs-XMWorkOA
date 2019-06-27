var table, layer; 
var loadindex; //进度条
$(function(){
    Grid.init([]);
    
    setTimeout("page.init()","100");
})

var page={
    init:function(){
        Pagajax.Get('ajaxInitGrid','');
        layer.close(loadindex);    //返回数据关闭loading
    }
}
  
var Grid = {
    init:function(Griddata){
      layui.use(['table'], function(){
        table = layui.table
        ,layer = layui.layer ;
        table.render({
          elem: '#GridList'
          ,id: 'GridList'
          ,data:Griddata
          ,toolbar: '#toolbarGrid'
          ,cols: [[
            {type: 'checkbox', fixed: 'center' }
            ,{field:'ROLEID', title:'角色编号', align: 'center'}
            ,{field:'ROLENAME', title:'角色名称' , align: 'center'} 
            ,{field:'#', title:'操作', align: 'center', sort: true, templet: function(res){
              return Grid.formartSTATE(res.ROLESTATE);
            }} 
          ]]
          ,page: true
        });
        
        Grid.tableRowClick(table); 

        loadindex = layer.load(0); 
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
            //标注选中样式
            obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
        }); 
        
    }
  }
  

  
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
      var ParamsData = { 'action': action} 
      ParamsData.data = data;
      return ParamsData;
    },
    //成功后的数据处理
    backDate:function(action, data){
      switch(action){  
        case "ajaxInitGrid":
            Grid.init(data.Griddata);  
            break;
      } 
    } 
  } 
  