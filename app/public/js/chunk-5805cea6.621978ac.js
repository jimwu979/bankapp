(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5805cea6"],{"25f0":function(t,e,a){"use strict";var c=a("6eeb"),n=a("825a"),s=a("577e"),o=a("d039"),r=a("ad6d"),l="toString",i=RegExp.prototype,u=i[l],d=o((function(){return"/a/b"!=u.call({source:"a",flags:"b"})})),b=u.name!=l;(d||b)&&c(RegExp.prototype,l,(function(){var t=n(this),e=s(t.source),a=t.flags,c=s(void 0===a&&t instanceof RegExp&&!("flags"in i)?r.call(t):a);return"/"+e+"/"+c}),{unsafe:!0})},"2f86":function(t,e,a){},8418:function(t,e,a){"use strict";var c=a("a04b"),n=a("9bf2"),s=a("5c6c");t.exports=function(t,e,a){var o=c(e);o in t?n.f(t,o,s(0,a)):t[o]=a}},"85ae":function(t,e,a){"use strict";a("a770")},"8aec":function(t,e,a){"use strict";a("2f86")},"9f44":function(t,e,a){"use strict";a.r(e);a("a4d3"),a("e01a");var c=a("7a23");Object(c["w"])("data-v-213b374c");var n={class:"index"},s={class:"container"},o={class:"center"},r={class:"container"},l={key:0,class:"dashboard board"},i=Object(c["g"])("span",null,"日均餘額",-1),u={key:1,class:"total board"},d=Object(c["g"])("span",null,"收入",-1),b=Object(c["g"])("span",null,"支出",-1),h={class:"totalType"},O=Object(c["g"])("span",null,"結餘",-1),j={class:"title"},f=Object(c["h"])("收支: "),v={class:"cost_list"},g={class:"class"},p={class:"number"};function y(t,e,a,y,m,D){var I=Object(c["A"])("cssIcon_hamburger"),M=Object(c["A"])("monthlyCalendar"),_=Object(c["A"])("router-link"),w=Object(c["A"])("cssIcon_add"),L=Object(c["B"])("clickStyle");return Object(c["t"])(),Object(c["f"])("div",n,[Object(c["g"])("header",null,[Object(c["g"])("div",s,[Object(c["K"])(Object(c["g"])("div",{class:"left",onClick:e[0]||(e[0]=function(){return D.openNav&&D.openNav.apply(D,arguments)})},[Object(c["i"])(I)],512),[[L]]),Object(c["g"])("div",o,[Object(c["i"])(M,{onSelectOtherMonth:D.switchMonth,parentYear:m.selectYear,parentMonth:m.selectMonth},null,8,["onSelectOtherMonth","parentYear","parentMonth"])])])]),Object(c["g"])("main",null,[Object(c["g"])("div",r,[m.selectYear==m.today.year&&m.selectMonth==m.today.month?(Object(c["t"])(),Object(c["f"])("div",l,[Object(c["g"])("div",{class:Object(c["o"])(D.averageBalanceMode)},[i,Object(c["g"])("span",null,Object(c["D"])(D.dashboard.averageBalance),1)],2),Object(c["g"])("ul",null,[Object(c["g"])("li",null,"收入: "+Object(c["D"])(D.dashboard.income),1),Object(c["g"])("li",null,"支出: "+Object(c["D"])(D.dashboard.cost),1),Object(c["g"])("li",null,"餘額: "+Object(c["D"])(D.dashboard.balance),1),Object(c["g"])("li",null,"本月剩餘天數: "+Object(c["D"])(D.dashboard.remainDays),1)])])):(Object(c["t"])(),Object(c["f"])("div",u,[Object(c["i"])(_,{class:"totalType",to:{path:"/statistics",query:{year:m.selectYear,month:m.selectMonth,isIncome:!0}}},{default:Object(c["J"])((function(){return[d,Object(c["g"])("span",null,Object(c["D"])(D.total.income),1)]})),_:1},8,["to"]),Object(c["i"])(_,{class:"totalType",to:{path:"/statistics",query:{year:m.selectYear,month:m.selectMonth,isIncome:!1}}},{default:Object(c["J"])((function(){return[b,Object(c["g"])("span",null,Object(c["D"])(D.total.cost),1)]})),_:1},8,["to"]),Object(c["g"])("div",h,[O,Object(c["g"])("span",null,Object(c["D"])(D.total.balance),1)])])),(Object(c["t"])(!0),Object(c["f"])(c["a"],null,Object(c["z"])(m.costList,(function(t,e){return Object(c["K"])((Object(c["t"])(),Object(c["f"])("div",{class:"day board",key:e},[Object(c["g"])("div",j,[Object(c["g"])("div",null,Object(c["D"])(m.selectMonth)+"/"+Object(c["D"])(e+1)+" 週"+Object(c["D"])(D.dayOfTheWeek[e]),1),Object(c["g"])("div",null,[f,Object(c["g"])("span",null,Object(c["D"])(D.dailyCost[e]),1)])]),Object(c["g"])("div",v,[(Object(c["t"])(!0),Object(c["f"])(c["a"],null,Object(c["z"])(m.costList[e],(function(t,e){return Object(c["K"])((Object(c["t"])(),Object(c["d"])(_,{class:"cost_item",key:e,to:{path:"recordDetail",query:{id:t._id}}},{default:Object(c["J"])((function(){return[Object(c["g"])("div",{class:Object(c["o"])(["icon","color_"+t.iconColor,"icon_"+t.iconImg])},null,2),Object(c["g"])("div",g,[Object(c["h"])(Object(c["D"])(t.className),1),Object(c["g"])("span",null,Object(c["D"])(t.description),1)]),Object(c["g"])("div",p,Object(c["D"])(t.value),1)]})),_:2},1032,["to"])),[[L]])})),128))])],512)),[[c["H"],t.length>0]])})),128))])]),Object(c["i"])(_,{class:"add_record",to:"/addRecord"},{default:Object(c["J"])((function(){return[Object(c["i"])(w)]})),_:1})])}Object(c["u"])();a("a9e3"),a("d3b7"),a("25f0"),a("fb6a"),a("159b"),a("4de4");var m=a("5e83");Object(c["w"])("data-v-4447d5a9");var D={class:"cssIcon cssIcon_hamburger"},I=Object(c["g"])("hr",null,null,-1),M=Object(c["g"])("hr",null,null,-1),_=Object(c["g"])("hr",null,null,-1),w=[I,M,_];function L(t,e,a,n,s,o){return Object(c["t"])(),Object(c["f"])("div",D,w)}Object(c["u"])();var Y={name:"cssIcon_hamburger"};a("85ae");Y.render=L,Y.__scopeId="data-v-4447d5a9";var k=Y;Object(c["w"])("data-v-3be588c1");var C={class:"cssIcon cssIcon_add"};function N(t,e,a,n,s,o){return Object(c["t"])(),Object(c["f"])("div",C)}Object(c["u"])();var x={name:"cssIcon_add"};a("8aec");x.render=N,x.__scopeId="data-v-3be588c1";var S=x,q=(a("c1df"),a("a18c"),{name:"index",components:{monthlyCalendar:m["a"],cssIcon_hamburger:k,cssIcon_add:S},data:function(){return{classList:[],costList:[],selectYear:0,selectMonth:0,CalendarIsOpen:!1,clickItemsIndex:[null,null],today:{year:0,month:0,day:0}}},beforeMount:function(){var t=new Date;this.today.year=t.getFullYear(),this.today.month=t.getMonth()+1,this.today.day=t.getDate(),this.selectYear=void 0!==this.$route.query.year?Number(this.$route.query.year):(new Date).getFullYear(),this.selectMonth=void 0!==this.$route.query.month?Number(this.$route.query.month):(new Date).getMonth()+1,this.init()},computed:{averageBalanceMode:function(){var t="";return t=this.dashboard.averageBalance>600?"green":this.dashboard.averageBalance>300?"yellow":"red",t},dashboard:function(){for(var t=this.costList.length,e=0,a=0,c=0;c<t;c++)for(var n=this.costList[c].length,s=0;s<n;s++){var o=this.costList[c][s];o.typeIsIncome?e+=o.value:a+=o.value}a=Math.abs(a);var r=e-a,l=new Date,i=new Date(l.getFullYear(),l.getMonth()+1,0).getDate(),u=i-l.getDate(),d=(r/u).toString();return d=d.slice(0,d.indexOf(".")),{income:e,cost:a,balance:r,averageBalance:d,remainDays:u}},total:function(){for(var t=this.costList.length,e=0,a=0,c=0;c<t;c++)for(var n=this.costList[c].length,s=0;s<n;s++){var o=this.costList[c][s];o.typeIsIncome?e+=o.value:a+=o.value}a=Math.abs(a);var r=e-a;return{income:e,cost:a,balance:r}},dailyCost:function(){for(var t=this.costList.length,e=[],a=0;a<t;a++){var c=0;this.costList[a].forEach((function(t){c+=t.value})),e.push(c)}return e},dayOfTheWeek:function(){for(var t=this.selectYear,e=this.selectMonth,a=new Date(t,e,0).getDate(),c=[],n=1;n<=a;n++){var s=new Date(t+"/"+e+"/"+n).getDay();c.push(["日","一","二","三","四","五","六"][s])}return c}},methods:{openNav:function(){this.$emit("openNav")},switchMonth:function(t){this.selectYear=t.selectYear,this.selectMonth=t.selectMonth,this.init()},init:function(){this.costList=[];for(var t=new Date(this.selectYear,this.selectMonth,0).getDate(),e=0;e<t;e++)this.costList.push([]);var a=this,c=new XMLHttpRequest;c.onreadystatechange=function(){if(4===c.readyState&&200===c.status){var t=JSON.parse(c.response);a.classList=t.classList,t.record.forEach((function(t){var e=a.classList.filter((function(e){return e._id==t.classId}));t.iconColor=e[0].iconColor,t.iconImg=e[0].iconImg,t.className=e[0].className,t.value=t.typeIsIncome?t.value:-1*t.value,a.costList[t.day-1].push(t)}))}},c.open("post","/api/readRecord_aMonth",!1),c.setRequestHeader("Content-type","application/json"),c.send(JSON.stringify({email:localStorage.getItem("email"),loginCodeName:localStorage.getItem("loginCodeName"),year:this.selectYear,month:this.selectMonth}))}}});a("a577");q.render=y,q.__scopeId="data-v-213b374c";e["default"]=q},a577:function(t,e,a){"use strict";a("a70f")},a70f:function(t,e,a){},a770:function(t,e,a){},ad6d:function(t,e,a){"use strict";var c=a("825a");t.exports=function(){var t=c(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},fb6a:function(t,e,a){"use strict";var c=a("23e7"),n=a("861d"),s=a("e8b5"),o=a("23cb"),r=a("50c4"),l=a("fc6a"),i=a("8418"),u=a("b622"),d=a("1dde"),b=d("slice"),h=u("species"),O=[].slice,j=Math.max;c({target:"Array",proto:!0,forced:!b},{slice:function(t,e){var a,c,u,d=l(this),b=r(d.length),f=o(t,b),v=o(void 0===e?b:e,b);if(s(d)&&(a=d.constructor,"function"!=typeof a||a!==Array&&!s(a.prototype)?n(a)&&(a=a[h],null===a&&(a=void 0)):a=void 0,a===Array||void 0===a))return O.call(d,f,v);for(c=new(void 0===a?Array:a)(j(v-f,0)),u=0;f<v;f++,u++)f in d&&i(c,u,d[f]);return c.length=u,c}})}}]);
//# sourceMappingURL=chunk-5805cea6.621978ac.js.map