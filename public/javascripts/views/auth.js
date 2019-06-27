 
 var table, layer; 
 var loadindex; //进度条
$(function(){
    Grid.init([]); 

    setTimeout("$('#butSearch').click()","50");
    
    //查询功能
    $("#butSearch").click(function(){
      Pagajax.Get(RoutParm.ajaxSearchUser,'');
    });

    //新增功能
    $("#butAdd").click(function(){
      active.setTop(); 
    });

    //角色分配功能
    $("#butUserToRole").click(function(){
      var checkStatus = table.checkStatus('GridList')
      ,data = checkStatus.data;
      if(data.length==0){
        layer.msg("请选择需要分配的【账号】！");
        return;
      } 
      active.setUserToRole(data[0].USERID); 
    });

    //删除功能
    $("#butDel").click(function(){ 
      var checkStatus = table.checkStatus('GridList')
      ,data = checkStatus.data;
      if(data.length==0){
        layer.msg("请选择需要删除的数据！");
        return;
      } 
      Pagajax.Get(RoutParm.ajaxDelUser,{USERID:data[0].USERID});
    });
})

//呼叫api的action
var RoutParm={
    ajaxSearchUser:"ajaxSearchUser"
    ,ajaxAddUser:"ajaxAddUser"
    ,ajaxDelUser:"ajaxDelUser"
};

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
      switch(action){
          case RoutParm.ajaxSearchUser:
          break;
      }
      ParamsData.data = data;
      return ParamsData;
    },
    //成功后的数据处理
    backDate:function(action, data){
      switch(action){ 
        case RoutParm.ajaxSearchUser:
            Grid.init(data.ReturnData); 
            break;
        case RoutParm.ajaxAddUser: //新增/修改/删除/角色功能
        case RoutParm.ajaxDelUser:
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
            ,{field:'USERID', title:'账号'}
            ,{field:'USERNAME', title:'名称' , align: 'center'} 
            ,{field:'USERPASSWORD', title:'密码', align: 'center'} 
            ,{field:'EMAIL', title:'EMAIL'}
            ,{field:'TELEPHONE', title:'电话'}
            ,{field:'STATE', title:'状态', align: 'center', sort: true, templet: function(res){
              return Grid.formartSTATE(res.ROLESTATE);
            }}
            ,{field:'REMARKS', title:'备注'}
            ,{field:'STATE', hide:true} 
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
       
        //头工具栏事件
        table.on('toolbar(GridList)', function(obj){
            var checkStatus = table.checkStatus(obj.config.id);
            switch(obj.event){
            case 'getCheckData':
                var data = checkStatus.data;
                layer.alert(JSON.stringify(data));
            break;
            case 'getCheckLength':
                var data = checkStatus.data;
                layer.msg('选中了：'+ data.length + ' 个');
            break;
            case 'isAll':
                layer.msg(checkStatus.isAll ? '全选': '未全选');
            break;
            };
        });
    }
  }
  

  //触发事件
  var active = {
    setTop: function(){
      var that = this; 
      //多窗口模式，层叠置顶
      layer.open({
        type: 2 //此处以iframe举例
        ,title: '人员管理'
        ,area: ['890px', '560px']
        ,shade: 0
        ,maxmin: true 
        ,content: 'authChildInit'//链接url 
        ,btn: ['保存', '关闭'] //btn1=yes,btn2 
        ,yes: function(index, layero){ 
          var contentWindow= $(layero).find('iframe')[0].contentWindow;
          var jsonData = {};
          jsonData.USERID =  contentWindow.txtUSERID.value; 
          jsonData.USERNAME =contentWindow.txtUSERNAME.value; 
          jsonData.USERPASSWORD =contentWindow.txtUSERPASSWORD.value; 
          jsonData.STATE =contentWindow.drpState.value; 
          jsonData.TELEPHONE =contentWindow.txtTELEPHONE.value; 
          jsonData.EMAIL =contentWindow.txtEMAIL.value; 
          jsonData.REMARKS =contentWindow.txtMARK.value;  
          
          Pagajax.Get(RoutParm.ajaxAddUser,jsonData);//更新DB
          layer.closeAll();
        }
        ,btn2: function(){
          layer.closeAll();
        } 
        ,btnAlign: 'c' //按钮居中
        ,zIndex: layer.zIndex //重点1
        ,success: function(layero){
          //初始化赋值。
          // $(layero).find('iframe')[0].contentWindow.txtUSERID.value = '000000';
          layer.setTop(layero); //重点2
        }
      });
    },
    setUserToRole: function(USERID){ 
      var that = this; 
      //多窗口模式，层叠置顶
      layer.open({
        type: 2 //此处以iframe举例
        ,title: '账号角色管理'
        ,area: ['1090px', '660px']
        ,shade: 0
        ,maxmin: true 
        ,content: 'authToRoleInit'//链接url 
        ,btn: ['关闭'] //btn1=yes,btn2 
        ,yes: function(index, layero){   
          layer.closeAll();
        }
        ,btn2: function(){
          layer.closeAll();
        } 
        ,btnAlign: 'c' //按钮居中
        ,zIndex: layer.zIndex //重点1
        ,success: function(layero){
          //初始化赋值。
          $(layero).find('iframe')[0].contentWindow.txtUSERID.value =USERID;
          layer.setTop(layero); //重点2
        }
      });
    }
  }