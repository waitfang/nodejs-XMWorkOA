var table, layer,form; 
var loadindex; //进度条
var mROLEID;//记录当前行的角色编号
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
      layui.use(['table','form'], function(){
        table = layui.table,form = layui.form
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

        //监听指定开关
        form.on('switch(switchTest)', function(data){ 
          var json={};
          json.USERID = $("#txtUSERID").val();//账号
          json.ROLEID =mROLEID;//角色编号
          if(this.checked)
            Pagajax.Get('ajaxAddUserToRole',json);
          else
            Pagajax.Get('ajaxDelUserToRole',json);
          layer.tips((this.checked ? '授权' : '取消'), data.othis)
        });

      });
    },
    formartSTATE:function(ROLESTATE){
      let state ='<input type="checkbox" name="close" lay-skin="switch" lay-filter="switchTest"  lay-text="授权|取消">';
      if(ROLESTATE==1)
        state ='<input type="checkbox" checked="" name="open" lay-skin="switch" lay-filter="switchTest" lay-text="授权|取消">'; 
        
      return state;
    },
    tableRowClick:function(table){
        //监听行单击事件（单击事件为：rowDouble）
        table.on('row', function(obj){ 
            //标注选中样式
            obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
            mROLEID = obj.data.ROLEID;
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
  