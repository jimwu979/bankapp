(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-18e6b04a"],{"5cd8":function(c,t,e){"use strict";e("a298")},a298:function(c,t,e){},f37f:function(c,t,e){"use strict";e.r(t);var n=e("7a23"),o={class:"statistics"},s={class:"container"},a={class:"center"},r={class:"container"},i={class:"board"},l={class:"list"},u={class:"information"},b={class:"text"},O={class:"class"},j={class:"number"};function d(c,t,e,d,m,f){var h=this,g=Object(n["A"])("cssIcon_arrowLeft"),v=Object(n["A"])("monthlyCalendar"),p=Object(n["A"])("router-link"),w=Object(n["B"])("clickStyle");return Object(n["t"])(),Object(n["f"])("div",o,[Object(n["g"])("header",null,[Object(n["g"])("div",s,[Object(n["J"])(Object(n["g"])("div",{class:"left",onClick:t[0]||(t[0]=function(){return f.back&&f.back.apply(f,arguments)})},[Object(n["i"])(g)],512),[[w]]),Object(n["g"])("div",a,[Object(n["i"])(v)])])]),Object(n["g"])("main",null,[Object(n["g"])("div",r,[Object(n["g"])("div",i,[Object(n["g"])("h2",null,Object(n["D"])(f.IncomeOrCost)+"列表",1),Object(n["g"])("div",l,[(Object(n["t"])(!0),Object(n["f"])(n["a"],null,Object(n["z"])(m.costList,(function(t,e){return Object(n["J"])((Object(n["t"])(),Object(n["d"])(p,{key:e,to:{path:"classDetail",query:{year:c.nowYear,month:c.nowMonth,isIncome:h.$route.query.isIncome,class:t.class}}},{default:Object(n["I"])((function(){return[Object(n["g"])("div",{class:Object(n["o"])(["icon","color_"+t.color,"icon_"+t.icon])},null,2),Object(n["g"])("div",u,[Object(n["g"])("div",b,[Object(n["g"])("div",O,[Object(n["h"])(Object(n["D"])(t.class),1),Object(n["g"])("span",null,Object(n["D"])(f.calculatePercentage[e])+"%",1)]),Object(n["g"])("div",j,Object(n["D"])(t.number),1)]),Object(n["g"])("hr",{class:"lineChart",style:Object(n["p"])({width:f.calculatePercentage[e]+"%"})},null,4)])]})),_:2},1032,["to"])),[[w]])})),128))])])])])])}e("159b");var m=e("5e83"),f=e("f1b8"),h=e("a18c"),g={name:"statistics",components:{monthlyCalendar:m["a"],cssIcon_arrowLeft:f["a"]},data:function(){return{costList:[{class:"正餐",icon:0,color:0,number:4820},{class:"生活費",icon:1,color:1,number:2749},{class:"其他",icon:2,color:2,number:2522},{class:"酒精",icon:3,color:3,number:1240},{class:"儲糧",icon:4,color:4,number:962},{class:"電話費",icon:5,color:5,number:609},{class:"飲料",icon:6,color:6,number:508},{class:"零時",icon:7,color:7,number:465}],year:2021,month:8,isIncome:JSON.parse(this.$route.query.isIncome)}},computed:{IncomeOrCost:function(){return this.isIncome?"收入":"支出"},totalCost:function(){var c=0;return this.costList.forEach((function(t){c+=t.number})),c},calculatePercentage:function(){var c=this,t=[];return this.costList.forEach((function(e){var n=e.number/c.totalCost*100;n=Math.round(n),t.push(n)})),t}},mounted:function(){},methods:{back:function(){h["a"].go(-1)}}};e("5cd8");g.render=d;t["default"]=g}}]);
//# sourceMappingURL=chunk-18e6b04a.f29bb858.js.map