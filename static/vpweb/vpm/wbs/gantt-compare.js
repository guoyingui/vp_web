try{
	Ext.define("Assignment",{extend:"Gnt.model.Assignment",belongsTo:"Task"});
	Ext.define("Task",{extend:"Gnt.model.Task",associations:[{model:"Assignment",name:"assignments",type:"hasMany",primaryKey:"Id",foreignKey:"TaskId",associationKey:"assignments"}]});
	
	vpGantt.resourceStore=Ext.create("Ext.data.JsonStore",{model:"Gnt.model.Resource",proxy:{type:"memory",reader:{type:"json"}}});
	vpGantt.assignmentStore=Ext.create("Ext.data.JsonStore",{model:"Assignment",autoLoad:false,resourceStore:vpGantt.resourceStore,proxy:{type:"memory",reader:{type:"json"}}});
	vpGantt.taskStore=Ext.create("Gnt.data.TaskStore",{buffered:false,model:"Task",autoLoad:false,proxy:{type:"memory",reader:{type:"json"}}});
	
	vpGantt.openNextLevelWin=function(objectID,projectId,taskId){
		var taskname="";
		jQuery.ajax({
			url:"/project/wbs/ganttLoadAction.do",
			data:{themethod:"getRealTaskId", projectId:projectId, taskId:taskId},
			type:"post",
			async:false,
			success:function(res){
				var ss=res.split(";;;");
				taskId=ss[0];
				taskname=ss[1]
			},
			dataType:"text"
		});
	
	    Common.WBS.open2ndWin("1",objectID,taskId,"",{wbsObjectID:objectID,objectID:objectID,taskID:taskId,projectID:projectId,workItemID:taskId,detailobjectid:taskId,loadextramenu:"1",iid:taskId,eid:objectID,taskname:taskname})
	};
	    
	vpGantt.getData=function(projectId,taskId){
		var data;
	
		var params = {projectID: projectId, wbsObjId: taskId, relentityId: relentityId, type:'compare'};
		vpPostAjax(getVpmPath() + '/vpmwbs/loadEditGanttData', params, "POST", function(rst) {
			data = rst.data;
			vpGantt.reload(data);
			vpGantt.scrollToDate(new Date())
		});
		
	    return data
	};
	
	vpGantt.assignmentEditor=Ext.create("Gnt.widget.AssignmentCellEditor",{
		assignmentStore:vpGantt.assignmentStore,resourceStore:vpGantt.resourceStore
	});
	
	vpGantt.rendeIndicater=function(v){
		var lightsStr="",t1=v.charAt(1),t2,t3,t4=v.charAt(10),l1=v.charAt(1),l2=v.charAt(4),l3=v.charAt(7),l4=v.charAt(10);
		if(l1=="0"){
			l1="icon_wks.gif"
		}else{
			if(l1=="1"){
				l1="icon_jxz.gif"
			}else{
				l1="icon_ywc.gif"
			}
		}
		
		for(var i=0;i<vpGantt.stateList.length;i++){
			if(vpGantt.stateList[i].id==t1){
				t1=vpGantt.stateList[i].value;
				break
			}
		}
		if(l2=="0"){
			l2="icon_green.gif";
			t2="进度正常"
	    }else{
	    	if(l2=="1"){
	    		l2="icon_yellow.gif";
	    		t2="进度警告"
	    	}else{
	    		l2="icon_red.gif";
	    		t2="进度延迟"
	    	}
	    }
		if(l3=="0"){
			l3="icon_word_no.gif";
			t3="无文档"
	    }else{
	    	if(l3=="1"){
	    	    l3="icon_word_yes.gif";
	    	    t3="有文档"
	        }else{
	    	    l3="icon_word_no.gif";
	    	    t3="无文档"
	    	}
	    }
		
		if(l4=="0"){
			l4="icon_successful.gif"
		}else{
			if(l4=="1"){
				l4="icon_trouble.gif"
		    }else{
		    	l4="icon_problem.gif"
		    }
		}
		
		for(var i=0;i<vpGantt.progressList.length;i++){
			if(vpGantt.progressList[i].id==t4){
				t4=vpGantt.progressList[i].value;break
			}
		}
		
		return '<img  src="../../vpm/images/wbstask/'+l1+'" title="'+t1+'" /><img src="../../vpm/images/wbstask/'+l2+'" title="'+t2+'"  /><img src="../../vpm/images/wbstask/'+l4+'" title="'+t4+'" />'};
		
		vpGantt.columns=[{header:"ID",sortable:false,width:45,dataIndex:"Id",menuDisabled:true,renderer:function(v,m,r){return v},locked:true},{header:"标志",width:65,dataIndex:"IndicateLight",sortable:false,menuDisabled:true,renderer:vpGantt.rendeIndicater},{xtype:"treecolumn",header:"任务名称",sortable:false,menuDisabled:true,dataIndex:"Name",width:150,field:{allowBlank:false},renderer:function(value,metaData,record,rowIdx,colIdx,store){var objId=31;if(record.get("leaf")){metaData.tdCls="task";objId=33}if(record.get("Duration")==0){metaData.tdCls="milestone";objId=32}if(!record.get("leaf")){metaData.tdCls="abstract-task";objId=34}return'<lable href="#" onclick="vpGantt.openNextLevelWin('+objId+","+vpGantt.getProjectId()+","+record.get("Id")+');">'+value+"</lable>"}},{header:'<table class="head-table"><tr><td>开始日期</td></tr><tr><td>延迟</td></tr></table>',menuDisabled:true,sortable:false,width:75,renderer:function(value,metaData,record,rowIdx,colIdx,store){if(!record.get("StartDate")||!record.get("BaselineStartDate")){return""}else{var num=(record.get("StartDate").getTime()-record.get("BaselineStartDate").getTime())/86400000;num=Math.round(num*100)/100;return(num==0||num<0)?"":"延迟"+num+"天"}}},{header:'<table class="head-table"><tr><td>完成日期</td></tr><tr><td>延迟</td></tr></table>',menuDisabled:true,sortable:false,width:75,renderer:function(value,metaData,record,rowIdx,colIdx,store){if(!record.get("StartDate")||!record.get("BaselineStartDate")){return""}else{var num=(record.get("EndDate").getTime()-record.get("BaselineEndDate").getTime())/86400000;num=Math.round(num*100)/100;return(num==0||num<0)?"":"延迟"+num+"天"}}},{header:"资源",menuDisabled:true,sortable:false,width:120,editor:vpGantt.assignmentEditor,xtype:"resourceassigmentcolumn"}];
		
		vpGantt.ganttzoom={
				minValue:40,
				maxValue:240,
				increment:10,
				curValue:Sch.preset.Manager.getPreset("weekAndDayLetter").timeColumnWidth,
				changeBt:function(){
					if(vpGantt.ganttzoom.curValue==vpGantt.ganttzoom.maxValue){
						Ext.getCmp("gantt-zoom-bt").setDisabled(true)
					}else{
						if(vpGantt.ganttzoom.curValue==vpGantt.ganttzoom.minValue){
							Ext.getCmp("gantt-shrink-bt").setDisabled(true)
						}else{
							if(vpGantt.ganttzoom.curValue==(vpGantt.ganttzoom.minValue+50)){
								Ext.getCmp("gantt-shrink-bt").setDisabled(false)
							}else{
								if(vpGantt.ganttzoom.curValue==(vpGantt.ganttzoom.maxValue-50)){
									Ext.getCmp("gantt-zoom-bt").setDisabled(false)
								}
							}
						}
					}
				},
				add:function(){
					if(vpGantt.ganttzoom.curValue<vpGantt.ganttzoom.maxValue){
						vpGantt.ganttzoom.curValue+=50;
						vpGantt.ganttzoom.changeBt();
						vpGantt.gantt.setTimeColumnWidth(vpGantt.ganttzoom.curValue)
					}
				},
				sub:function(){
					if(vpGantt.ganttzoom.curValue>vpGantt.ganttzoom.minValue){
						vpGantt.ganttzoom.curValue-=50;
						vpGantt.ganttzoom.changeBt();
						vpGantt.gantt.setTimeColumnWidth(vpGantt.ganttzoom.curValue)
					}
				}
			};
		
		vpGantt.dateUnitChange={
			curUnit:3,
			unitList:["year","monthAndYear","weekDateAndMonth","weekAndDayLetter"],
			getCurVP:function(tend){
				if(tend==="-"){
					return this.unitList[--this.curUnit]
				}else{
					if(tend==="+"){
						return this.unitList[++this.curUnit]
					}else{
						return this.unitList[this.curUnit]
					}
				}
			},
			add:function(){
				vpGantt.gantt.switchViewPreset(this.getCurVP("+"),vpGantt.startDate,vpGantt.endDate,true);
				if(this.curUnit==(this.unitList.length-1)){
					Ext.getCmp("gantt-zoom-bt").setDisabled(true)
				}
				if(this.curUnit==1){
					Ext.getCmp("gantt-shrink-bt").setDisabled(false)
				}
			},
			sub:function(){
				vpGantt.gantt.switchViewPreset(this.getCurVP("-"),vpGantt.startDate,vpGantt.endDate,true);
				if(this.curUnit==0){
					Ext.getCmp("gantt-shrink-bt").setDisabled(true)
				}
				if(this.curUnit==(this.unitList.length-2)){
					Ext.getCmp("gantt-zoom-bt").setDisabled(false)
				}
			}
		};
		
		vpGantt.setCompareItem=function(){
			var me=this;
			var type=(me.getTaskId()==null)? "0":"1";
			var url="setCompareItem.html?relentityid=" + wbsId + "&projectId="+vpGantt.getProjectId();
			if(setCompareObj.loadDataBySetCompare=="1"){
				url+="&item1Version="+setCompareObj.item1Version+"&item1Type="+setCompareObj.item1Type+"&item2Version="+setCompareObj.item2Version+"&item2Type="+setCompareObj.item2Type
			}
			var width=450,height=220,x=(document.body.clientWidth-width)/2,y=(document.body.clientHeight-height)/2,src="";
			
			this.setCompareWin=Ext.create("Ext.Window",{width:width,height:height,title:"设置比较项",modal:true,x:x,y:30,headerPosition:"top",layout:"fit",items:{border:0,html:'<iframe src="'+url+'" style="text-align:center;width:100%;height:100%;" name="bottom" scrolling="NO" frameborder="0" noresize>'},closeAction:"destroy",closable:true,bodyBorder:false});
			this.setCompareWin.show()
		};
		
		vpGantt.resetCompareItem=function(obj){
			var href=window.location.href;
			var i=href.indexOf("loadDataBySetCompare");
			var urlAdded="loadDataBySetCompare=1&item1="+obj.i1.version+"@@"+obj.i1.type+"&item2="+obj.i2.version+"@@"+obj.i2.type+"&item1Text="+obj.i1.text+"&item2Text="+obj.i2.text+"&item1Version="+obj.i1.version+"&item2Version="+obj.i2.version+"&item1Type="+obj.i1.type+"&item2Type="+obj.i2.type;
			if(i>-1){
				window.location.href=href.substring(0,i)+urlAdded
			}else{
				window.location.href=href+"&"+urlAdded
			}
		};

	vpGantt.getDataBySetCI=function(){
		var me=this;
		var taskId=(me.getTaskId()==null)? "0":me.getTaskId();
		var projectId=me.getProjectId();
		var data;
		
		/*jQuery.ajax({
			url:"/project/wbs/ganttLoadAction.do",
			data:{themethod:"loadCompareGanttDataByType",projectId:projectId,taskId:taskId,i1:setCompareObj.item1,i2:setCompareObj.item2},
			type:"post",
			async:false,
			success:function(res){
				data=res;
				vpGantt.reload(data);
				vpGantt.scrollToDate(new Date())
			},dataType:"json"
		});*/
		//alert("i1:" + setCompareObj.item1 + "  i2:" + setCompareObj.item2);
		var params = {projectID: projectId, wbsObjId: taskId, relentityId: relentityId, i1type:setCompareObj.item1Type, item1Version:setCompareObj.item1Version, i2type:setCompareObj.item2Type , item2Version:setCompareObj.item2Version};
		vpPostAjax(getVpmPath() + '/vpmwbs/loadCompareGanttData', params, "POST", function(rst) {
			data = rst.data;
			vpGantt.reload(data);
			vpGantt.scrollToDate(new Date())
		});
		
		return data
	};
	
	vpGantt.closeSetCompareWin=function(){
		var me=this;
		if(me.setCompareWin){
			me.setCompareWin.close()
		}
	};
	
	var CItem={i1:"当前-计划",i2:"当前-预测"};
	if(setCompareObj.loadDataBySetCompare=="1"){
		CItem={i1:setCompareObj.item1Text,i2:setCompareObj.item2Text}
	}
	vpGantt.compareTip='<div  style="position:relative;left:0px;height:15px;font-size:12px;border:0px solid #000;"><table style="float:right;font-size:12px;height:17px;text-align:center;"><tr><td style="">偏差:</td><td >{'+CItem.i2+'}</td><td style="text-align:center;width:20px;"><div style="margin-left:auto;height:1px;margin-right:auto;width:12px;border-top:1px solid #000;font-size:0px;"></div></td><td>{'+CItem.i1+'}</td><td >&nbsp;&nbsp;&nbsp;&nbsp;</td></tr></table>	<div style="background-image: url(../../vpm/vframe/images/other/icon_tip.gif);float:right;width:18px;height:15px;font-size:10px;border:0px solid #000;top:2px;position:relative;"></div></div>';
	vpGantt.buttons=[{
		text:"设置比较项",
		iconCls:"gantt-setcompare-bt",
		id:"gantt-setcompareitem-bt",
		width:90,
		disabled:false,
		handler:function(){
			    vpGantt.setCompareItem()
			}
	    },{
	    	text:"放大",
	    	iconCls:"gantt-zoom-bt",
	    	id:"gantt-zoom-bt",
	    	width:60,disabled:true,
	    	handler:function(){
	    		vpGantt.dateUnitChange.add()
	    	}
	    },{
	    	text:"缩小",
	    	iconCls:"gantt-shrink-bt",
	    	id:"gantt-shrink-bt",
	    	width:60,
	    	disabled:false,
	    	handler:function(){
	    		vpGantt.dateUnitChange.sub()
	    	}
	    },"->",vpGantt.compareTip];
	
	vpGantt.disableBt=function(bt){Ext.getCmp(bt).setDisabled(true)};
	vpGantt.enableBt=function(bt){Ext.getCmp(bt).setDisabled(false)};
	vpGantt.scrollToDate=function(date){try{var sd=Math.round(this.startDate.getTime()/86400000),ed=Math.round(this.endDate.getTime()/86400000),cd=Math.round(date.getTime()/86400000);if(sd<=cd&&cd<=ed){var distance=this.getNormalView().getXYFromDate(date,true)[0],unitNum=4,offsetRight=unitNum*22;var scrollerOwner=this.getNormalView().up("[scrollerOwner]"),hScroller=scrollerOwner.getHorizontalScroller();if(hScroller){hScroller.setScrollLeft(distance>offsetRight?distance-offsetRight:distance)}}}catch(e){}};
	
	Ext.onReady(function(){
		try{
			vpGantt.buildGantt()
		}catch(e){
			
		}
	});
	
	vpGantt.buildGantt=function(){
		vpGantt.buildGrid();
		setTimeout("vpGantt.loadData()",1)
	};
	
	vpGantt.dependencyStore=new Ext.data.JsonStore({idProperty:"Id",model:"Gnt.model.Dependency",proxy:{type:"memory",reader:{type:"json"}}});
	vpGantt.parseDate=function(str){
		var year=str.substring(0,4),month=str.substring(5,7),day=str.substring(8,10);
		return new Date(year,(parseInt(month,10)-1),day)
	};
	
	Date.prototype.changeWeekEnd=function(){if(this.getDay()!==0){this.setDate((this.getDate()+(7-this.getDay())))}};
	Date.prototype.changeWeekStart=function(){if(this.getDay()!==1){var offset=this.getDay()-1;this.setDate((this.getDate()-(offset==-1?6:offset)))}};
	
	vpGantt.setStateList=function(){this.stateList=arguments[0]};
	vpGantt.setProgressList=function(){this.progressList=arguments[0]};
	
	vpGantt.initDateScope=function(){
	    var params = {projectID:vpGantt.getProjectId(), wbsObjId:vpGantt.getTaskId()==null?0:vpGantt.getTaskId()};
		vpPostAjax(getVpmPath() + '/vpmwbs/getProjectInfos', params, "POST", function(rst) {
			vpGantt.startDate=vpGantt.parseDate(rst.data.projects[0].From);
			vpGantt.endDate=vpGantt.parseDate(rst.data.projects[0].To);
			vpGantt.setStateList(rst.data.statlists);
			vpGantt.setProgressList(rst.data.progresslists);
			//影响代码执行
			/*if(!vpGantt.startDate||!vpGantt.endDate||(vpGantt.endDate.getTime()<vpGantt.startDate.getTime())){
				alert("项目开始日期或完成日期异常，请检查项目的基本信息！");
				vpGantt.gridMask.hide()
			}
			if(!res.statlists||!res.progresslists||(res.statlists.length==0)||(res.progresslists.length==0)){
				alert("系统状态列表或进度状态列表配置异常，请检查！");
				vpGantt.gridMask.hide()
			}*/
		});
	};
	
	vpGantt.bindResize=function(){
		vpGantt.preWidth=document.body.clientWidth;
		if(window.addEventListener){
			window.addEventListener("resize",function(){
				if(document.body.clientWidth<vpGantt.preWidth){
					vpGantt.gantt.setWidth(document.body.clientWidth+17)
				}else{
					vpGantt.gantt.setWidth(document.body.clientWidth)
				}
				vpGantt.gantt.setHeight(document.body.clientHeight);
				vpGantt.preWidth=document.body.clientWidth
			},false)
		}else{
			window.attachEvent("onresize",function(){
				vpGantt.gantt.setWidth(document.body.clientWidth);
				vpGantt.gantt.setHeight(document.body.clientHeight)
			})
		}
	};
	
	vpGantt.buildGrid=function(){
		try{
			vpGantt.initDateScope();

			vpGantt.gantt=Ext.create("Gnt.panel.Gantt",{
				height:Gantt.height,
				width:Gantt.width,
				renderTo:Ext.get(vpGantt.ganttdiv),
				multiSelect:false,
				leftLabelField:{dataIndex:"Name",editor:{xtype:"textfield"}},
				showTodayLine:true,
				showBaseline:true,
				highlightWeekends:true,
				enableDependencyDragDrop:false,
				enableTaskDragDrop:false,
				startDate:vpGantt.startDate,
				endDate:vpGantt.endDate,
				viewPreset:"weekAndDayLetter",
				columns:vpGantt.columns,
				tbar:vpGantt.buttons,
				dependencyStore:vpGantt.dependencyStore,
				resourceStore:vpGantt.resourceStore,
				assignmentStore:vpGantt.assignmentStore,
				taskStore:vpGantt.taskStore,
				stripeRows:true
			});
			
			vpGantt.bindResize()
		}
		catch(e){
			
		}
	};
	
	vpGantt.reload=function(data){
		try{
			if(vpGantt.getTaskId()==null){
				this.taskStore.proxy.data=data.tasks
			}else{
				if(data.tasks.length<1){
					this.taskStore.proxy.data=data.tasks
				}else{
					this.taskStore.proxy.data=data.tasks[0].children
				}
			}
			this.resourceStore.proxy.data=data.resources;
			this.assignmentStore.proxy.data=data.assignments;
			this.dependencyStore.proxy.data=data.dependencies;
			this.assignmentStore.load();
			this.resourceStore.load();
			this.taskStore.load();
			this.dependencyStore.load();
			this.gridMask.hide()
		}catch(e){
			
		}
	};
	
	vpGantt.loadData=function(){
		var data;
		if(setCompareObj.loadDataBySetCompare=="0"){
			data=vpGantt.getData(vpGantt.getProjectId(),vpGantt.getTaskId()==null?0:vpGantt.getTaskId())
        }else{
			data=vpGantt.getDataBySetCI()
		}
	};
	
	vpGantt.getRootNode=function(){
		if(!this.rootNode){
			this.rootNode=this.gantt.getTaskStore().getRootNode()
		}
		return this.rootNode
	};
	
	vpGantt.getGanttView=function(){
		return this.gantt.getView()
	};
	vpGantt.getNormalView=function(){
		return this.gantt.normalGrid.getView()
	};
	
	vpGantt.accessAllNodes=function(node,callObj){
		callObj.func(node);
		if(node.childNodes){
			for(var i=0;i<node.childNodes.length;i++){
				this.accessAllNodes(node.childNodes[i],callObj)
			}
		}
	};
	
	vpGantt.toggleKeyPath=function(fromRowClick){
		this.isEditingKeyPath=true;
		this.keyPathShow=(!!!this.keyPathShow);
		var css=document.getElementById("grid-select-css"),show=this.keyPathShow,rootNode=this.getRootNode(),view=this.getGanttView(),nView=this.getNormalView();
		if(show){
			css.setAttribute("href","../../vpm/css/gantt-key-path-selected.css")
		}else{
			css.setAttribute("href","../../vpm/css/gantt-key-path-normal.css")
		}
		vpGantt.accessAllNodes(rootNode,{show:show,func:function(snode){
			if(snode.isRoot()){return}
			nView.deselect(snode,true,false);
			if(snode.get("KeyTask")){
				if(show){
					nView.addRowCls(snode,"key-path-cls");
				    nView.select(snode,true,false)
				}else{
					nView.removeRowCls(snode,"key-path-cls");
					nView.deselect(snode,true,false)
				}
			}
			}
		});
		this.isEditingKeyPath=false
	}
}catch(e){
	alert(e.message)
};
