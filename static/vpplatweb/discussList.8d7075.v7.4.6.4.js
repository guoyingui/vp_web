webpackJsonp([3],{958:function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function l(){return[{title:"归属实体",dataIndex:"entityid",key:"entityid",width:"",fixed:""},{title:"归属实例",dataIndex:"iitemid",key:"iitemid",width:"",fixed:""},{title:"用户",dataIndex:"userid",key:"userid",width:"",fixed:""},{title:"内容",dataIndex:"sremark",key:"sremark",width:"",fixed:""},{title:"创建时间",dataIndex:"dcreatetime",key:"dcreatetime",width:"",fixed:""}]}Object.defineProperty(t,"__esModule",{value:!0});var n=a(688),d=i(n),s=a(54),r=i(s),c=a(55),o=i(c),u=a(59),f=i(u),h=a(93),m=i(h),p=a(8),w=i(p),y=a(4),b=a(652),v=a(841),x=i(v),E=function(e){function t(e){(0,r["default"])(this,t);var a=(0,f["default"])(this,(t.__proto__||(0,d["default"])(t)).call(this,e));return a.handlesearch=function(e){a.setState({searchData:e,showRightBox:!1,isAdd:!0})},a.onRowClick=function(e,t){a.setState({entityid:e.ientityid,iid:e.projectid,showRightBox:!0})},a.closeRightModal=function(){a.setState({showRightBox:!1},function(){a.tableRef.getTableData()})},a.addnewdom=function(){return w["default"].createElement(y.VpTabs,{defaultActiveKey:"0",onChange:a.tabsChange},w["default"].createElement(y.VpTabPane,{tab:"项目讨论",key:0},w["default"].createElement(x["default"],{entityid:a.state.entityid,iid:a.state.iid})))},a.state={searchData:"",entityid:"",iid:""},a}return(0,m["default"])(t,e),(0,o["default"])(t,[{key:"componentWillMount",value:function(){}},{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this;return w["default"].createElement("div",{className:"business-container pr full-height"},w["default"].createElement("div",{className:"subAssembly b-b bg-white"},w["default"].createElement(y.VpRow,{gutter:10},w["default"].createElement(y.VpCol,{className:"gutter-row",span:4},w["default"].createElement(b.SeachInput,{onSearch:this.handlesearch})))),w["default"].createElement("div",{className:"business-wrapper p-t-sm full-height"},w["default"].createElement("div",{className:"p-sm bg-white entity-list"},w["default"].createElement(y.VpTable,{ref:function(t){return e.tableRef=t},dataUrl:"/{vpplat}/vfrm/entity/allDiscuss",columns:l(),params:{searchData:this.state.searchData},onRowClick:this.onRowClick,bindThis:this}))),w["default"].createElement("div",{className:"drawer-fixed p-sm hide"},w["default"].createElement("div",{className:"pr full-height"},w["default"].createElement("div",{className:"spin-icon",onclick:"closeDrawer"},w["default"].createElement(y.VpIcon,{type:"verticle-left"})),w["default"].createElement("div",{className:"drawer-box"}))),w["default"].createElement(b.RightBox,{max:!this.state.isAdd,button:w["default"].createElement("div",{className:"icon p-xs",onClick:this.closeRightModal},w["default"].createElement(y.VpTooltip,{placement:"top",title:""},w["default"].createElement(y.VpIcon,{type:"right"}))),show:this.state.showRightBox},this.state.showRightBox?this.addnewdom():""))}}]),t}(p.Component);t["default"]=E=(0,y.VpFormCreate)(E)}});