(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c8818a2"],{"8bd5":function(e,t,s){"use strict";s.r(t);s("b0c0");var o=s("7a23"),i={class:"account"},a={class:"container"},l=Object(o["g"])("div",{class:"center"}," 帳號設定 ",-1),r={class:"right"},n=Object(o["h"])("登出"),c={class:"container"},b={class:"board"},g={class:"photo"},h={for:"uploadImage"},u=Object(o["g"])("div",null,"姓名",-1),d=Object(o["g"])("div",null,"信箱",-1),O={class:"lightbox"},j=Object(o["g"])("p",{class:"show"},"檔案大小不可大於10MB",-1),w={class:"btns"},p=Object(o["g"])("h2",null,"輸入姓名",-1),v={class:"btns"},m=Object(o["g"])("h2",null,"輸入email",-1),f={class:"btns"},x=Object(o["g"])("h2",null,"輸入密碼",-1),k=Object(o["g"])("div",null,"舊密碼",-1),P=Object(o["g"])("div",null,"新密碼",-1),E=Object(o["g"])("div",null,"確認新密碼",-1),M={class:"btns"};function L(e,t,s,L,y,N){var I=Object(o["A"])("cssIcon_arrowLeft"),C=Object(o["A"])("router-link"),J=Object(o["A"])("cssIcon_edit"),R=Object(o["B"])("clickStyle");return Object(o["t"])(),Object(o["f"])("div",i,[Object(o["g"])("header",null,[Object(o["g"])("div",a,[Object(o["J"])(Object(o["g"])("div",{class:"left",onClick:t[0]||(t[0]=function(){return N.back&&N.back.apply(N,arguments)})},[Object(o["i"])(I)],512),[[R]]),l,Object(o["J"])(Object(o["g"])("div",r,[Object(o["i"])(C,{to:"login"},{default:Object(o["I"])((function(){return[n]})),_:1})],512),[[R]])])]),Object(o["g"])("main",null,[Object(o["g"])("div",c,[Object(o["g"])("div",b,[Object(o["g"])("div",g,[Object(o["g"])("div",{style:Object(o["p"])({"background-image":"url("+y.img.val+")"})},[Object(o["g"])("input",{id:"uploadImage",type:"file",onChange:t[1]||(t[1]=function(){return N.uploadImg&&N.uploadImg.apply(N,arguments)})},null,32),Object(o["g"])("label",h,[Object(o["g"])("div",null,[Object(o["i"])(J)])])],4)]),Object(o["g"])("ol",null,[Object(o["g"])("li",null,[u,Object(o["g"])("div",{onClick:t[2]||(t[2]=function(e){return N.openLightbox("name")})},Object(o["D"])(y.name),1)]),Object(o["g"])("li",null,[d,Object(o["g"])("div",{onClick:t[3]||(t[3]=function(e){return N.openLightbox("email")})},Object(o["D"])(y.email),1)])]),Object(o["g"])("div",{onClick:t[4]||(t[4]=function(e){return N.openLightbox("password")})},"修改密碼")])])]),Object(o["g"])("div",{class:Object(o["o"])(["fixbox",{open:y.lightbox.isOpen}])},[Object(o["g"])("div",O,[Object(o["g"])("div",{class:Object(o["o"])(["resetImg",{open:y.lightbox.resetImg.isOpen}])},[j,Object(o["g"])("div",w,[Object(o["g"])("div",{onClick:t[5]||(t[5]=function(){return N.closeLightbox&&N.closeLightbox.apply(N,arguments)})},"確定")])],2),Object(o["g"])("div",{class:Object(o["o"])(["resetName",{open:y.lightbox.resetName.isOpen}])},[p,Object(o["J"])(Object(o["g"])("input",{type:"text","onUpdate:modelValue":t[6]||(t[6]=function(e){return y.lightbox.resetName.val=e})},null,512),[[o["G"],y.lightbox.resetName.val]]),Object(o["g"])("p",{class:Object(o["o"])({show:y.lightbox.resetName.showErrorMessage})},"欄位不可空白",2),Object(o["g"])("div",v,[Object(o["g"])("div",{onClick:t[7]||(t[7]=function(){return N.closeLightbox&&N.closeLightbox.apply(N,arguments)})},"取消"),Object(o["g"])("div",{onClick:t[8]||(t[8]=function(e){return N.confirmReset("name")})},"確定")])],2),Object(o["g"])("div",{class:Object(o["o"])(["resetEmail",{open:y.lightbox.resetEmail.isOpen}])},[m,Object(o["J"])(Object(o["g"])("input",{type:"text","onUpdate:modelValue":t[9]||(t[9]=function(e){return y.lightbox.resetEmail.val=e})},null,512),[[o["G"],y.lightbox.resetEmail.val]]),Object(o["g"])("p",{class:Object(o["o"])({show:y.lightbox.resetEmail.showErrorMessage})},"欄位不可空白",2),Object(o["g"])("div",f,[Object(o["g"])("div",{onClick:t[10]||(t[10]=function(){return N.closeLightbox&&N.closeLightbox.apply(N,arguments)})},"取消"),Object(o["g"])("div",{onClick:t[11]||(t[11]=function(e){return N.confirmReset("email")})},"確定")])],2),Object(o["g"])("div",{class:Object(o["o"])(["resetPassword",{open:y.lightbox.resetPassword.isOpen}])},[x,Object(o["g"])("ol",null,[Object(o["g"])("li",null,[k,Object(o["J"])(Object(o["g"])("input",{type:"password","onUpdate:modelValue":t[12]||(t[12]=function(e){return y.lightbox.resetPassword.originalPassword.val=e})},null,512),[[o["G"],y.lightbox.resetPassword.originalPassword.val]]),Object(o["g"])("p",{class:Object(o["o"])({show:y.lightbox.resetPassword.originalPassword.showErrorMessage})},"密碼輸入錯誤",2)]),Object(o["g"])("li",null,[P,Object(o["J"])(Object(o["g"])("input",{type:"password","onUpdate:modelValue":t[13]||(t[13]=function(e){return y.lightbox.resetPassword.newPassword.val=e})},null,512),[[o["G"],y.lightbox.resetPassword.newPassword.val]]),Object(o["g"])("p",{class:Object(o["o"])({show:y.lightbox.resetPassword.newPassword.showErrorMessage})},"欄位不可空白",2)]),Object(o["g"])("li",null,[E,Object(o["J"])(Object(o["g"])("input",{type:"password","onUpdate:modelValue":t[14]||(t[14]=function(e){return y.lightbox.resetPassword.checkNewPassword.val=e})},null,512),[[o["G"],y.lightbox.resetPassword.checkNewPassword.val]]),Object(o["g"])("p",{class:Object(o["o"])({show:y.lightbox.resetPassword.checkNewPassword.showErrorMessage})},"新密碼輸入不一致",2)])]),Object(o["g"])("div",M,[Object(o["g"])("div",{onClick:t[15]||(t[15]=function(){return N.closeLightbox&&N.closeLightbox.apply(N,arguments)})},"取消"),Object(o["g"])("div",{onClick:t[16]||(t[16]=function(e){return N.confirmReset("password")})},"確定")])],2)])],2)])}var y=s("a18c"),N=s("f1b8"),I=s("3ace"),C={name:"account",components:{cssIcon_arrowLeft:N["a"],cssIcon_edit:I["a"]},data:function(){return{img:{val:null},preview:null,image:null,name:"吳新蓁",email:"jimwu979@gmail.com",lightbox:{isOpen:!1,resetImg:{isOpen:!1},resetName:{isOpen:!1,val:"",showErrorMessage:!1},resetEmail:{isOpen:!1,val:"",showErrorMessage:!1},resetPassword:{isOpen:!1,originalPassword:{val:"",showErrorMessage:!1},newPassword:{val:"",showErrorMessage:!1},checkNewPassword:{val:"",showErrorMessage:!1}}}}},mounted:function(){},methods:{uploadImg:function(){var e=this,t=event.target;if(t.files){var s=Math.round(t.files[0].size/1024/1024);if(s<=10){var o=new FileReader;o.onload=function(t){e.img.val=t.target.result},this.image=t.files[0],o.readAsDataURL(t.files[0])}else this.openLightbox("img")}},confirmReset:function(e){switch(e){case"name":var t=this.lightbox.resetName;t.val.length>0?(this.name=t.val,this.closeLightbox(),t.showErrorMessage=!1):t.showErrorMessage=!0;break;case"email":var s=this.lightbox.resetEmail;s.val.length>0?(this.email=s.val,this.closeLightbox(),s.showErrorMessage=!1):s.showErrorMessage=!0;break;case"password":var o=this.lightbox.resetPassword,i=o.originalPassword,a=o.newPassword,l=o.checkNewPassword;i.showErrorMessage=0==i.val.length,a.showErrorMessage=0==a.val.length,l.showErrorMessage=a.val!==l.val,i.showErrorMessage||a.showErrorMessage||l.showErrorMessage||this.closeLightbox();break}},openLightbox:function(e){switch(this.lightbox.isOpen=!0,e){case"img":this.lightbox.resetImg.isOpen=!0;break;case"name":this.lightbox.resetName.val=this.name,this.lightbox.resetName.isOpen=!0;break;case"email":this.lightbox.resetEmail.val=this.email,this.lightbox.resetEmail.isOpen=!0;break;case"password":var t=this.lightbox.resetPassword;t.originalPassword.val="",t.newPassword.val="",t.checkNewPassword.val="",t.isOpen=!0;break}},closeLightbox:function(){var e=this.lightbox;e.isOpen=!1,setTimeout((function(){e.resetImg.isOpen=!1,e.resetName.isOpen=!1,e.resetEmail.isOpen=!1,e.resetPassword.isOpen=!1}),300,e)},back:function(){y["a"].go(-1)}}};s("b323");C.render=L;t["default"]=C},b0c0:function(e,t,s){var o=s("83ab"),i=s("9bf2").f,a=Function.prototype,l=a.toString,r=/^\s*function ([^ (]*)/,n="name";o&&!(n in a)&&i(a,n,{configurable:!0,get:function(){try{return l.call(this).match(r)[1]}catch(e){return""}}})},b323:function(e,t,s){"use strict";s("fa4d")},fa4d:function(e,t,s){}}]);
//# sourceMappingURL=chunk-6c8818a2.f3ac1c50.js.map