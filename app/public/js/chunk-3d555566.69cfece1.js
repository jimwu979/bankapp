(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3d555566"],{"74dce":function(e,t,s){"use strict";s("ab92")},"8bd5":function(e,t,s){"use strict";s.r(t);s("b0c0");var o=s("7a23");Object(o["w"])("data-v-ba381866");var a={class:"account"},i={class:"container"},l=Object(o["g"])("div",{class:"center"}," 帳號設定 ",-1),n={class:"right"},r=Object(o["h"])("登出"),c={class:"container"},g={class:"board"},b={class:"photo"},d={for:"uploadImage"},u=Object(o["g"])("div",null,"姓名",-1),p=Object(o["g"])("div",null,"信箱",-1),h={class:"lightbox"},O=Object(o["g"])("p",{class:"show"},"檔案大小不可大於10MB",-1),m={class:"btns"},w=Object(o["g"])("h2",null,"輸入姓名",-1),j={class:"btns"},v=Object(o["g"])("h2",null,"輸入email",-1),f={class:"btns"},x=Object(o["g"])("h2",null,"輸入密碼",-1),P=Object(o["g"])("div",null,"舊密碼",-1),E=Object(o["g"])("div",null,"新密碼",-1),k=Object(o["g"])("div",null,"確認新密碼",-1),y={class:"btns"};function S(e,t,s,S,C,I){var M=Object(o["A"])("cssIcon_arrowLeft"),N=Object(o["A"])("router-link"),L=Object(o["A"])("cssIcon_edit"),R=Object(o["B"])("clickStyle");return Object(o["t"])(),Object(o["f"])("div",a,[Object(o["g"])("header",null,[Object(o["g"])("div",i,[Object(o["K"])(Object(o["g"])("div",{class:"left",onClick:t[0]||(t[0]=function(){return I.back&&I.back.apply(I,arguments)})},[Object(o["i"])(M)],512),[[R]]),l,Object(o["K"])(Object(o["g"])("div",n,[Object(o["i"])(N,{to:"login",onClickCapture:I.logout},{default:Object(o["J"])((function(){return[r]})),_:1},8,["onClickCapture"])],512),[[R]])])]),Object(o["g"])("main",null,[Object(o["g"])("div",c,[Object(o["g"])("div",g,[Object(o["g"])("div",b,[Object(o["g"])("div",{style:Object(o["p"])({"background-image":"url("+I.storeAccount.photo+")"})},[Object(o["g"])("input",{id:"uploadImage",type:"file",name:"file",onChange:t[1]||(t[1]=function(){return I.uploadImg&&I.uploadImg.apply(I,arguments)})},null,32),Object(o["g"])("label",d,[Object(o["g"])("div",null,[Object(o["i"])(L)])])],4)]),Object(o["g"])("ol",null,[Object(o["g"])("li",null,[u,Object(o["g"])("div",{onClick:t[2]||(t[2]=function(e){return I.openLightbox("name")})},Object(o["D"])(I.storeAccount.name),1)]),Object(o["g"])("li",null,[p,Object(o["g"])("div",{onClick:t[3]||(t[3]=function(e){return I.openLightbox("email")})},Object(o["D"])(I.storeAccount.email),1)])]),Object(o["g"])("div",{onClick:t[4]||(t[4]=function(e){return I.openLightbox("password")})},"修改密碼")])])]),Object(o["g"])("div",{class:Object(o["o"])(["fixbox",{open:C.lightbox.isOpen}])},[Object(o["g"])("div",h,[Object(o["g"])("div",{class:Object(o["o"])(["resetImg",{open:C.lightbox.resetImg.isOpen}])},[O,Object(o["g"])("div",m,[Object(o["g"])("div",{onClick:t[5]||(t[5]=function(){return I.closeLightbox&&I.closeLightbox.apply(I,arguments)})},"確定")])],2),Object(o["g"])("div",{class:Object(o["o"])(["resetName",{open:C.lightbox.resetName.isOpen}])},[w,Object(o["K"])(Object(o["g"])("input",{type:"text","onUpdate:modelValue":t[6]||(t[6]=function(e){return C.lightbox.resetName.val=e})},null,512),[[o["G"],C.lightbox.resetName.val]]),Object(o["g"])("p",{class:Object(o["o"])({show:C.lightbox.resetName.showErrorMessage})},"欄位不可空白",2),Object(o["g"])("div",j,[Object(o["g"])("div",{onClick:t[7]||(t[7]=function(){return I.closeLightbox&&I.closeLightbox.apply(I,arguments)})},"取消"),Object(o["g"])("div",{onClick:t[8]||(t[8]=function(e){return I.confirmReset("name")})},"確定")])],2),Object(o["g"])("div",{class:Object(o["o"])(["resetEmail",{open:C.lightbox.resetEmail.isOpen}])},[v,Object(o["K"])(Object(o["g"])("input",{type:"text","onUpdate:modelValue":t[9]||(t[9]=function(e){return C.lightbox.resetEmail.val=e})},null,512),[[o["G"],C.lightbox.resetEmail.val]]),Object(o["g"])("p",{class:Object(o["o"])({show:C.lightbox.resetEmail.showErrorMessage})},"欄位不可空白",2),Object(o["g"])("div",f,[Object(o["g"])("div",{onClick:t[10]||(t[10]=function(){return I.closeLightbox&&I.closeLightbox.apply(I,arguments)})},"取消"),Object(o["g"])("div",{onClick:t[11]||(t[11]=function(e){return I.confirmReset("email")})},"確定")])],2),Object(o["g"])("div",{class:Object(o["o"])(["resetPassword",{open:C.lightbox.resetPassword.isOpen}])},[x,Object(o["g"])("ol",null,[Object(o["g"])("li",null,[P,Object(o["K"])(Object(o["g"])("input",{type:"password","onUpdate:modelValue":t[12]||(t[12]=function(e){return C.lightbox.resetPassword.originalPassword.val=e})},null,512),[[o["G"],C.lightbox.resetPassword.originalPassword.val]]),Object(o["g"])("p",{class:Object(o["o"])({show:C.lightbox.resetPassword.originalPassword.showErrorMessage})},"密碼輸入錯誤",2)]),Object(o["g"])("li",null,[E,Object(o["K"])(Object(o["g"])("input",{type:"password","onUpdate:modelValue":t[13]||(t[13]=function(e){return C.lightbox.resetPassword.newPassword.val=e})},null,512),[[o["G"],C.lightbox.resetPassword.newPassword.val]]),Object(o["g"])("p",{class:Object(o["o"])({show:C.lightbox.resetPassword.newPassword.showErrorMessage})},"欄位不可空白",2)]),Object(o["g"])("li",null,[k,Object(o["K"])(Object(o["g"])("input",{type:"password","onUpdate:modelValue":t[14]||(t[14]=function(e){return C.lightbox.resetPassword.checkNewPassword.val=e})},null,512),[[o["G"],C.lightbox.resetPassword.checkNewPassword.val]]),Object(o["g"])("p",{class:Object(o["o"])({show:C.lightbox.resetPassword.checkNewPassword.showErrorMessage})},"新密碼輸入不一致",2)])]),Object(o["g"])("div",y,[Object(o["g"])("div",{onClick:t[15]||(t[15]=function(){return I.closeLightbox&&I.closeLightbox.apply(I,arguments)})},"取消"),Object(o["g"])("div",{onClick:t[16]||(t[16]=function(e){return I.confirmReset("password")})},"確定")])],2)])],2)])}Object(o["u"])();var C=s("a18c"),I=s("f1b8"),M=s("3ace"),N={name:"account",components:{cssIcon_arrowLeft:I["a"],cssIcon_edit:M["a"]},data:function(){return{img:{val:null},preview:null,image:null,name:"",email:"",lightbox:{isOpen:!1,resetImg:{isOpen:!1},resetName:{isOpen:!1,val:"",showErrorMessage:!1},resetEmail:{isOpen:!1,val:"",showErrorMessage:!1},resetPassword:{isOpen:!1,originalPassword:{val:"",showErrorMessage:!1},newPassword:{val:"",showErrorMessage:!1},checkNewPassword:{val:"",showErrorMessage:!1}}}}},computed:{storeAccount:function(){return this.$store.state.account}},methods:{uploadImg:function(){var e=this,t=event.target;if(t.files){var s=Math.round(t.files[0].size/1024/1024);if(s>10)this.openLightbox("img");else{var o=new FileReader;o.onload=function(t){e.img.val=t.target.result},this.image=t.files[0],o.readAsDataURL(t.files[0]);var a=new FormData,i=document.getElementById("uploadImage");a.append("email",localStorage.getItem("email")),a.append("loginCode",localStorage.getItem("loginCode")),a.append("file",i.files[0]);var l=this,n=new XMLHttpRequest;n.onreadystatechange=function(){4===n.readyState&&200===n.status&&l.$store.commit("resetPhoto","/photo/"+JSON.parse(n.response).fileName)},n.open("post","/album/upload",!1),n.send(a)}}},confirmReset:function(e){switch(e){case"name":var t=this.lightbox.resetName;if(0==t.val.length)t.showErrorMessage=!0;else{var s=this,o=new XMLHttpRequest;o.onreadystatechange=function(){4===o.readyState&&200===o.status&&JSON.parse(o.response).isSuccess&&s.$store.commit("resetName",t.val)},o.open("post","/api/resetName",!1),o.setRequestHeader("Content-type","application/json"),o.send(JSON.stringify({email:localStorage.getItem("email"),loginCode:localStorage.getItem("loginCode"),newName:t.val})),this.closeLightbox(),t.showErrorMessage=!1}break;case"email":var a=this.lightbox.resetEmail;if(0==a.val.length)a.showErrorMessage=!0;else{var i=this,l=new XMLHttpRequest;l.onreadystatechange=function(){4===l.readyState&&200===l.status&&JSON.parse(l.response).isSuccess&&(i.$store.commit("resetEmail",a.val),localStorage.setItem("email",a.val))},l.open("post","/api/resetEmail",!1),l.setRequestHeader("Content-type","application/json"),l.send(JSON.stringify({email:localStorage.getItem("email"),loginCode:localStorage.getItem("loginCode"),newEmail:a.val})),this.closeLightbox(),a.showErrorMessage=!1}break;case"password":var n=this.lightbox.resetPassword,r=n.originalPassword,c=n.newPassword,g=n.checkNewPassword;if(r.showErrorMessage=0==r.val.length,c.showErrorMessage=0==c.val.length,g.showErrorMessage=c.val!==g.val,!r.showErrorMessage&&!c.showErrorMessage&&!g.showErrorMessage){var b=this,d=new XMLHttpRequest;d.onreadystatechange=function(){4===d.readyState&&200===d.status&&(JSON.parse(d.response).isSuccess?(r.showErrorMessage=!1,b.closeLightbox()):r.showErrorMessage=!0)},d.open("post","/api/resetPassword",!1),d.setRequestHeader("Content-type","application/json"),d.send(JSON.stringify({email:localStorage.getItem("email"),loginCode:localStorage.getItem("loginCode"),oldPassword:r.val,newPassword:c.val}))}break}},openLightbox:function(e){switch(this.lightbox.isOpen=!0,e){case"img":this.lightbox.resetImg.isOpen=!0;break;case"name":this.lightbox.resetName.val=this.$store.state.account.name,this.lightbox.resetName.isOpen=!0;break;case"email":this.lightbox.resetEmail.val=this.$store.state.account.email,this.lightbox.resetEmail.isOpen=!0;break;case"password":var t=this.lightbox.resetPassword;t.originalPassword.val="",t.newPassword.val="",t.checkNewPassword.val="",t.isOpen=!0;break}},closeLightbox:function(){var e=this.lightbox;e.isOpen=!1,setTimeout((function(){e.resetImg.isOpen=!1,e.resetName.isOpen=!1,e.resetEmail.isOpen=!1,e.resetPassword.isOpen=!1}),300,e)},logout:function(){var e,t=new XMLHttpRequest;t.onreadystatechange=function(){4===t.readyState&&200===t.status&&(e=JSON.parse(t.response).isSuccess)},t.open("post","/api/logout",!1),t.setRequestHeader("Content-type","application/json"),t.send(JSON.stringify({email:localStorage.getItem("email"),loginCode:localStorage.getItem("loginCode")})),e&&(localStorage.removeItem("loginCode"),localStorage.removeItem("email"))},back:function(){C["a"].go(-1)}}};s("74dce");N.render=S,N.__scopeId="data-v-ba381866";t["default"]=N},ab92:function(e,t,s){}}]);
//# sourceMappingURL=chunk-3d555566.69cfece1.js.map