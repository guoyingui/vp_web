webpackJsonp([16],{1027:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=r(687),i=a(n),o=r(54),d=a(o),l=r(55),p=a(l),s=r(59),c=a(s),u=r(93),h=a(u),f=r(8),w=a(f),m=r(4);r(1028);var S=r(652),v=r(804),y=a(v),I=function(e){function t(e){(0,d["default"])(this,t);var r=(0,c["default"])(this,(t.__proto__||(0,i["default"])(t)).call(this,e));return r.listData=function(){(0,m.vpQuery)("{vpvrm}/vrm/traceMatrix/listPage",{viewcode:"all",entityid:41}).then(function(e){r.setColumns(e.data),r.setState({listData:e.data})})},r.setColumns=function(e){e.map(function(e){null!=r.busReqCache[e.iid]?r.busReqCache[e.iid]++:r.busReqCache[e.iid]=1,e.reqScheduleId&&(null!=r.rowCache[e.reqScheduleId]?r.rowCache[e.reqScheduleId]++:r.rowCache[e.reqScheduleId]=1)});var t=r.rowCache,a=r.busReqCache,n=0,i=0,o=0,d=0,l=0,p=0,s=[{title:"需求名称",dataIndex:"reqName",key:"reqName",width:"150",render:function(e,t,r){var n={children:e,props:{}};return r===p&&(n.props.rowSpan=a[t.iid],l=r,p+=a[t.iid]),r>l&&r<p&&(n.props.rowSpan=0),n}},{title:"需求类型",dataIndex:"iprjflag",key:"iprjflag",width:"100",render:function(e,t,r){var n={children:e,props:{}};return r===l&&(n.props.rowSpan=a[t.iid]),r>l&&r<p&&(n.props.rowSpan=0),n}},{title:"需求提出部门",dataIndex:"rapprDept",key:"rapprDept",width:"120",render:function(e,t,r){var n={children:e,props:{}};return r===l&&(n.props.rowSpan=a[t.iid]),r>l&&r<p&&(n.props.rowSpan=0),n}},{title:"需求牵头人",dataIndex:"rleader",key:"rleader",width:"100",render:function(e,t,r){var n={children:e,props:{}};return r===l&&(n.props.rowSpan=a[t.iid]),r>l&&r<p&&(n.props.rowSpan=0),n}},{title:"项目名称",dataIndex:"prjs",key:"prjs",width:"120",render:function(e,t,r){var n={children:e,props:{}};return r===l&&(n.props.rowSpan=a[t.iid]),r>l&&r<p&&(n.props.rowSpan=0),n}},{title:"需求受理日期",dataIndex:"dcreatordate",key:"dcreatordate",width:"120",render:function(e,t,r){var n={children:e,props:{}};return r===l&&(n.props.rowSpan=a[t.iid]),r>l&&r<p&&(n.props.rowSpan=0),n}},{title:"立项日期",dataIndex:"dprjBuildDate",key:"dprjBuildDate",width:"120",render:function(e,t,r){var n={children:e,props:{}};return r===l&&(n.props.rowSpan=a[t.iid]),r>l&&r<p&&(n.props.rowSpan=0),n}},{title:"当前状态",dataIndex:"now_phase",key:"now_phase",width:"100",render:function(e,t,r){var n={children:e,props:{}};return r===l&&(n.props.rowSpan=a[t.iid]),r>l&&r<p&&(n.props.rowSpan=0),n}},{title:"需求状态",dataIndex:"istatusid_name",key:"istatusid_name",width:"100",render:function(e,t,r){var n={children:e,props:{}};return r===l&&(n.props.rowSpan=a[t.iid]),r>l&&r<p&&(n.props.rowSpan=0),n}},{title:"合同名称",dataIndex:"contracts",key:"contracts",width:"100",render:function(e,t,r){var n={children:e,props:{}};return r===l&&(n.props.rowSpan=a[t.iid]),r>l&&r<p&&(n.props.rowSpan=0),n}},{title:r.colRender("实施情况",["批次","计划投产日期","应用系统","开发状态"]),colSpan:4,dataIndex:"batchId",key:"batchId",width:"140",render:function(e,r,a){var o={children:e,props:{}};return a===n&&(o.props.rowSpan=t[r.reqScheduleId]||1,i=a,n+=t[r.reqScheduleId]||1),a>i&&a<n&&(o.props.rowSpan=0),o}},{title:"",colSpan:0,dataIndex:"startupTime",key:"startupTime",width:"100",render:function(e,r,a){var n={children:e,props:{}};return a===o&&(n.props.rowSpan=t[r.reqScheduleId]||1,d=a,o+=t[r.reqScheduleId]||1),a>d&&a<o&&(n.props.rowSpan=0),n}},{title:"",colSpan:0,dataIndex:"sysName",key:"sysName",width:"100"},{title:"",colSpan:0,dataIndex:"status",key:"status",width:"100"}];r.setState({columns:s})},r.colRender=function(e,t){return w["default"].createElement("div",{className:"text-center column-block"},w["default"].createElement("p",{className:"fir-floor"},e),w["default"].createElement("p",null,t.map(function(e,r){return w["default"].createElement("span",{key:r,className:"sec-block",style:{width:100/t.length+"%"}},e)})))},r.closeRightModal=function(){r.setState({showRightBox:!1})},r.state={listData:[],showRightBox:!1,loading:!1,columns:[]},r.rowCache={},r.busReqCache={},r}return(0,h["default"])(t,e),(0,p["default"])(t,[{key:"componentWillMount",value:function(){this.listData()}},{key:"render",value:function(){var e=this;return w["default"].createElement("div",{className:"full-height bg-white scroll-y"},w["default"].createElement("div",{className:"full-height p-sm"},w["default"].createElement("div",{className:"title p-tb-sm clearfix"},w["default"].createElement("span",null,"跟踪矩阵")),w["default"].createElement(m.VpSpin,{spinning:this.state.loading,size:"large"},w["default"].createElement(m.VpTable,{ref:function(t){return e.VpTable=t},columns:this.state.columns,dataSource:this.state.listData,pagination:!1,resize:!0}))),w["default"].createElement(S.RightBox,{max:!0,button:w["default"].createElement("div",{className:"icon p-xs",onClick:this.closeRightModal.bind(this)},w["default"].createElement(m.VpTooltip,{placement:"top",title:y["default"].drawerSpinIcon[window.LOCALE]},w["default"].createElement(m.VpIcon,{type:"right"}))),show:this.state.showRightBox}))}}]),t}(w["default"].Component);t["default"]=I},1028:function(e,t,r){var a=r(1029);"string"==typeof a&&(a=[[e.id,a,""]]);var n={hmr:!0};n.transform=void 0;r(439)(a,n);a.locals&&(e.exports=a.locals)},1029:function(e,t){}});