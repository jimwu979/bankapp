(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-16bc76d3"],{"25f0":function(t,e,c){"use strict";var a=c("6eeb"),n=c("825a"),s=c("577e"),o=c("d039"),r=c("ad6d"),i="toString",l=RegExp.prototype,u=l[i],b=o((function(){return"/a/b"!=u.call({source:"a",flags:"b"})})),d=u.name!=i;(b||d)&&a(RegExp.prototype,i,(function(){var t=n(this),e=s(t.source),c=t.flags,a=s(void 0===c&&t instanceof RegExp&&!("flags"in l)?r.call(t):c);return"/"+e+"/"+a}),{unsafe:!0})},"2f86":function(t,e,c){},"729a":function(t,e,c){},"85ae":function(t,e,c){"use strict";c("a770")},"8aec":function(t,e,c){"use strict";c("2f86")},"9f44":function(t,e,c){"use strict";c.r(e);c("a4d3"),c("e01a");var a=c("7a23");Object(a["w"])("data-v-3e3a9bfc");var n={class:"index"},s={class:"container"},o={class:"center"},r={class:"container"},i={key:0,class:"dashboard board"},l=Object(a["g"])("span",null,"日均餘額",-1),u={key:1,class:"total board"},b=Object(a["g"])("span",null,"收入",-1),d=Object(a["g"])("span",null,"支出",-1),O={class:"totalType"},h=Object(a["g"])("span",null,"結餘",-1),j={class:"title"},f=Object(a["h"])("收支: "),v={class:"cost_list"},g={class:"class"},p={class:"number"};function y(t,e,c,y,m,D){var I=Object(a["A"])("cssIcon_hamburger"),_=Object(a["A"])("monthlyCalendar"),L=Object(a["A"])("router-link"),w=Object(a["A"])("cssIcon_add"),M=Object(a["B"])("clickStyle");return Object(a["t"])(),Object(a["f"])("div",n,[Object(a["g"])("header",null,[Object(a["g"])("div",s,[Object(a["K"])(Object(a["g"])("div",{class:"left",onClick:e[0]||(e[0]=function(){return D.openNav&&D.openNav.apply(D,arguments)})},[Object(a["i"])(I)],512),[[M]]),Object(a["g"])("div",o,[Object(a["i"])(_,{onSelectOtherMonth:D.init},null,8,["onSelectOtherMonth"])])])]),Object(a["g"])("main",null,[Object(a["g"])("div",r,[t.$store.state.selectMonth.year==m.today.year&&t.$store.state.selectMonth.month==m.today.month?(Object(a["t"])(),Object(a["f"])("div",i,[Object(a["g"])("div",{class:Object(a["o"])(D.averageBalanceMode)},[l,Object(a["g"])("span",null,Object(a["D"])(D.dashboard.averageBalance),1)],2),Object(a["g"])("ul",null,[Object(a["g"])("li",null,"收入: "+Object(a["D"])(D.dashboard.income),1),Object(a["g"])("li",null,"支出: "+Object(a["D"])(D.dashboard.cost),1),Object(a["g"])("li",null,"餘額: "+Object(a["D"])(D.dashboard.balance),1),Object(a["g"])("li",null,"本月剩餘天數: "+Object(a["D"])(D.dashboard.remainDays),1)])])):(Object(a["t"])(),Object(a["f"])("div",u,[Object(a["i"])(L,{class:"totalType",to:{path:"/statistics",query:{isIncome:!0}}},{default:Object(a["J"])((function(){return[b,Object(a["g"])("span",null,Object(a["D"])(D.total.income),1)]})),_:1}),Object(a["i"])(L,{class:"totalType",to:{path:"/statistics",query:{isIncome:!1}}},{default:Object(a["J"])((function(){return[d,Object(a["g"])("span",null,Object(a["D"])(D.total.cost),1)]})),_:1}),Object(a["g"])("div",O,[h,Object(a["g"])("span",null,Object(a["D"])(D.total.balance),1)])])),(Object(a["t"])(!0),Object(a["f"])(a["a"],null,Object(a["z"])(m.costList,(function(e,c){return Object(a["K"])((Object(a["t"])(),Object(a["f"])("div",{class:"day board",key:c},[Object(a["g"])("div",j,[Object(a["g"])("div",null,Object(a["D"])(t.$store.state.selectMonth.month)+"/"+Object(a["D"])(c+1)+" 週"+Object(a["D"])(D.dayOfTheWeek[c]),1),Object(a["g"])("div",null,[f,Object(a["g"])("span",null,Object(a["D"])(D.dailyCost[c]),1)])]),Object(a["g"])("div",v,[(Object(a["t"])(!0),Object(a["f"])(a["a"],null,Object(a["z"])(m.costList[c],(function(t,e){return Object(a["K"])((Object(a["t"])(),Object(a["d"])(L,{class:"cost_item",key:e,to:{path:"recordDetail",query:{id:t._id}}},{default:Object(a["J"])((function(){return[Object(a["g"])("div",{class:Object(a["o"])(["icon","color_"+t.iconColor,"icon_"+t.iconImg])},null,2),Object(a["g"])("div",g,[Object(a["h"])(Object(a["D"])(t.className),1),Object(a["g"])("span",null,Object(a["D"])(t.description),1)]),Object(a["g"])("div",p,Object(a["D"])(t.value),1)]})),_:2},1032,["to"])),[[M]])})),128))])],512)),[[a["H"],e.length>0]])})),128))])]),Object(a["i"])(L,{class:"add_record",to:"/addRecord"},{default:Object(a["J"])((function(){return[Object(a["i"])(w)]})),_:1})])}Object(a["u"])();c("d3b7"),c("25f0"),c("fb6a"),c("159b"),c("99af"),c("4de4");var m=c("5e83");Object(a["w"])("data-v-4447d5a9");var D={class:"cssIcon cssIcon_hamburger"},I=Object(a["g"])("hr",null,null,-1),_=Object(a["g"])("hr",null,null,-1),L=Object(a["g"])("hr",null,null,-1),w=[I,_,L];function M(t,e,c,n,s,o){return Object(a["t"])(),Object(a["f"])("div",D,w)}Object(a["u"])();var k={name:"cssIcon_hamburger"};c("85ae");k.render=M,k.__scopeId="data-v-4447d5a9";var C=k;Object(a["w"])("data-v-3be588c1");var $={class:"cssIcon cssIcon_add"};function x(t,e,c,n,s,o){return Object(a["t"])(),Object(a["f"])("div",$)}Object(a["u"])();var A={name:"cssIcon_add"};c("8aec");A.render=x,A.__scopeId="data-v-3be588c1";var B=A,N=(c("c1df"),c("a18c"),{name:"index",components:{monthlyCalendar:m["a"],cssIcon_hamburger:C,cssIcon_add:B},data:function(){return{classList:[],costList:[],CalendarIsOpen:!1,clickItemsIndex:[null,null],today:{year:0,month:0,day:0}}},beforeMount:function(){var t=new Date;this.today.year=t.getFullYear(),this.today.month=t.getMonth()+1,this.today.day=t.getDate(),this.init()},computed:{selectMonth:function(){return this.$store.state.selectMonth},averageBalanceMode:function(){var t="";return t=this.dashboard.averageBalance>600?"green":this.dashboard.averageBalance>300?"yellow":"red",t},dashboard:function(){for(var t=this.costList.length,e=0,c=0,a=0;a<t;a++)for(var n=this.costList[a].length,s=0;s<n;s++){var o=this.costList[a][s];o.typeIsIncome?e+=o.value:c+=o.value}c=Math.abs(c);var r=e-c,i=this.$store.state.selectMonth,l=new Date(i.year,i.month,0).getDate(),u=l-(new Date).getDate()+1,b=(r/u).toString();return b=b.slice(0,b.indexOf(".")),{income:e,cost:c,balance:r,averageBalance:b,remainDays:u}},total:function(){for(var t=this.costList.length,e=0,c=0,a=0;a<t;a++)for(var n=this.costList[a].length,s=0;s<n;s++){var o=this.costList[a][s];o.typeIsIncome?e+=o.value:c+=o.value}c=Math.abs(c);var r=e-c;return{income:e,cost:c,balance:r}},dailyCost:function(){for(var t=this.costList.length,e=[],c=0;c<t;c++){var a=0;this.costList[c].forEach((function(t){a+=t.value})),e.push(a)}return e},dayOfTheWeek:function(){for(var t=this.$store.state.selectMonth,e=new Date(t.year,t.month,0).getDate(),c=[],a=1;a<=e;a++){var n=new Date(t.year+"/"+t.month+"/"+a).getDay();c.push(["日","一","二","三","四","五","六"][n])}return c}},methods:{openNav:function(){this.$emit("openNav")},switchMonth:function(){this.init()},init:function(){var t=this.$store.state.selectMonth;this.costList=[];for(var e=new Date(t.year,t.month,0).getDate(),c=0;c<e;c++)this.costList.push([]);var a=this,n=this.$store.state.classList;this.classList=n.income.concat(n.cost),this.$store.state.recordList.forEach((function(t){var e=a.classList.filter((function(e){return e._id==t.classId}));t.iconColor=e[0].iconColor,t.iconImg=e[0].iconImg,t.className=e[0].className,t.value=t.typeIsIncome?t.value:-1*t.value,a.costList[t.day-1].push(t)}))}}});c("bc1e");N.render=y,N.__scopeId="data-v-3e3a9bfc";e["default"]=N},a770:function(t,e,c){},ad6d:function(t,e,c){"use strict";var a=c("825a");t.exports=function(){var t=a(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},bc1e:function(t,e,c){"use strict";c("729a")},fb6a:function(t,e,c){"use strict";var a=c("23e7"),n=c("861d"),s=c("e8b5"),o=c("23cb"),r=c("50c4"),i=c("fc6a"),l=c("8418"),u=c("b622"),b=c("1dde"),d=b("slice"),O=u("species"),h=[].slice,j=Math.max;a({target:"Array",proto:!0,forced:!d},{slice:function(t,e){var c,a,u,b=i(this),d=r(b.length),f=o(t,d),v=o(void 0===e?d:e,d);if(s(b)&&(c=b.constructor,"function"!=typeof c||c!==Array&&!s(c.prototype)?n(c)&&(c=c[O],null===c&&(c=void 0)):c=void 0,c===Array||void 0===c))return h.call(b,f,v);for(a=new(void 0===c?Array:c)(j(v-f,0)),u=0;f<v;f++,u++)f in b&&l(a,u,b[f]);return a.length=u,a}})}}]);
//# sourceMappingURL=chunk-16bc76d3.976ea62e.js.map