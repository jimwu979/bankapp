(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-052664c6"],{c8b2:function(e,t,c){"use strict";c.r(t);var s=c("7a23");Object(s["w"])("data-v-6bd59200");var n={class:"settingClass"},l={class:"container"},o=Object(s["g"])("div",{class:"center"}," 類別設置 ",-1),i={class:"container"},a={class:"tabs"},r={class:"listbox"},b={class:"olbox"},g={key:0,ref:"nullClassTag"},u=["onClick"],d={class:"className"},O={class:"move"},j=["onClick"],f=["onClick"],m={class:"olbox"},p=["onClick"],h={class:"className"},v={class:"move"},C=["onClick"],k=["onClick"],I=Object(s["h"])("+添加新類別"),T={class:"lightbox"},w=Object(s["g"])("h2",null,"警告",-1),y=Object(s["g"])("p",null,"刪除此類別也會將此類別中的所有紀錄一併刪除",-1);function L(e,t,c,L,$,_){var x=Object(s["A"])("cssIcon_arrowLeft"),H=Object(s["A"])("router-link"),D=Object(s["B"])("clickStyle");return Object(s["t"])(),Object(s["f"])("div",n,[Object(s["g"])("header",null,[Object(s["g"])("div",l,[Object(s["K"])(Object(s["g"])("div",{class:"left",onClick:t[0]||(t[0]=function(){return _.back&&_.back.apply(_,arguments)})},[Object(s["i"])(x)],512),[[D]]),o])]),Object(s["g"])("main",{class:Object(s["o"])({showIncome:$.showIncome})},[Object(s["g"])("div",i,[Object(s["g"])("div",a,[Object(s["g"])("div",{onClick:t[1]||(t[1]=function(e){return _.toggleIncome(!1)})},"支出"),Object(s["g"])("div",{onClick:t[2]||(t[2]=function(e){return _.toggleIncome(!0)})},"收入")]),Object(s["g"])("div",r,[Object(s["g"])("div",null,[Object(s["g"])("div",b,[Object(s["g"])("ol",{style:Object(s["p"])({height:(e.$store.state.classList.cost.length>0?e.$store.state.classList.cost.length:1)*$.listItemHeight+"px"})},[0==e.$store.state.classList.cost.length?(Object(s["t"])(),Object(s["f"])("li",g,"尚未建立支出類別")):Object(s["e"])("",!0),(Object(s["t"])(!0),Object(s["f"])(s["a"],null,Object(s["z"])(e.$store.state.classList.cost,(function(e,t){return Object(s["t"])(),Object(s["f"])("li",{key:t,ref:"firstCostClassLi",style:Object(s["p"])({top:$.listItemHeight*t+"px"})},[Object(s["g"])("div",{class:"delete",onClick:function(t){return _.deleteClass("cost",e._id)}},null,8,u),Object(s["g"])("div",{class:Object(s["o"])(["icon",["color_"+e.iconColor,"icon_"+e.iconImg]])},null,2),Object(s["g"])("div",d,Object(s["D"])(e.className),1),Object(s["g"])("div",O,[Object(s["g"])("span",{onClick:function(e){return _.moveToTop(!1,!0,t)}},null,8,j),Object(s["g"])("span",{onClick:function(e){return _.moveToTop(!1,!1,t)}},null,8,f)])],4)})),128))],4)]),Object(s["g"])("div",m,[Object(s["g"])("ol",{style:Object(s["p"])({height:(e.$store.state.classList.income.length>0?e.$store.state.classList.income.length:1)*$.listItemHeight+"px"})},[Object(s["K"])(Object(s["g"])("li",null,"尚未建立收入類別",512),[[s["H"],0==e.$store.state.classList.income.length]]),(Object(s["t"])(!0),Object(s["f"])(s["a"],null,Object(s["z"])(e.$store.state.classList.income,(function(e,t){return Object(s["t"])(),Object(s["f"])("li",{key:t,style:Object(s["p"])({top:$.listItemHeight*t+"px"})},[Object(s["g"])("div",{class:"delete",onClick:function(t){return _.deleteClass("income",e._id)}},null,8,p),Object(s["g"])("div",{class:Object(s["o"])(["icon",["color_"+e.iconColor,"icon_"+e.iconImg]])},null,2),Object(s["g"])("div",h,Object(s["D"])(e.className),1),Object(s["g"])("div",v,[Object(s["g"])("span",{onClick:function(e){return _.moveToTop(!0,!0,t)}},null,8,C),Object(s["g"])("span",{onClick:function(e){return _.moveToTop(!0,!1,t)}},null,8,k)])],4)})),128))],4)])])]),Object(s["i"])(H,{to:"addClass"},{default:Object(s["J"])((function(){return[I]})),_:1})])],2),Object(s["g"])("div",{class:Object(s["o"])(["fixbox",{open:$.deleteTarget.warn}])},[Object(s["g"])("div",T,[w,y,Object(s["g"])("div",null,[Object(s["g"])("span",{onClick:t[3]||(t[3]=function(){return _.cancelDelete&&_.cancelDelete.apply(_,arguments)})},"取消"),Object(s["g"])("span",{onClick:t[4]||(t[4]=function(){return _.confirmDelete&&_.confirmDelete.apply(_,arguments)})},"確定")])])],2)])}Object(s["u"])();c("4de4");var $=c("a18c"),_=c("f1b8"),x={name:"settingClass",components:{cssIcon_arrowLeft:_["a"]},data:function(){return{showIncome:!1,listItemHeight:null,deleteTarget:{type:"",id:"",order:-1,warn:!1},dragClass:{mouseDown:!1,start:0,moveTo:0}}},mounted:function(){this.listItemHeight=this.$refs.nullClassTag?this.$refs.nullClassTag.clientHeight:this.$refs.firstCostClassLi.clientHeight},methods:{moveToTop:function(e,t,c){this.$store.commit("resetClassOrder",{isIncome:e,directionIsTop:t,itemIndex:c})},toggleIncome:function(e){this.showIncome=e},deleteClass:function(e,t){var c=this.$store.state.classList[e].filter((function(e){return e._id==t}))[0].order;this.deleteTarget={type:e,id:t,order:c,warn:!0}},confirmDelete:function(){var e=this,t=new XMLHttpRequest;t.onreadystatechange=function(){4===t.readyState&&200===t.status&&JSON.parse(t.response).isSuccess&&(e.$store.commit("reloadClass"),e.deleteTarget.warn=!1)},t.open("post","/api/deleteClass",!1),t.setRequestHeader("Content-type","application/json"),t.send(JSON.stringify({email:localStorage.getItem("email"),loginCode:localStorage.getItem("loginCode"),classId:this.deleteTarget.id,isIncome:"income"==this.deleteTarget.type,order:this.deleteTarget.order}))},cancelDelete:function(){this.deleteTarget.warn=!1},back:function(){$["a"].go(-1)}}};c("ce25");x.render=L,x.__scopeId="data-v-6bd59200";t["default"]=x},ce25:function(e,t,c){"use strict";c("f30a")},f30a:function(e,t,c){}}]);
//# sourceMappingURL=chunk-052664c6.be98c240.js.map