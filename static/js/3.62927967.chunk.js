"use strict";(self.webpackChunksocial_network=self.webpackChunksocial_network||[]).push([[3],{8003:function(e,s,n){n.r(s),n.d(s,{default:function(){return A}});var i=n(4487),a=(n(2791),"Dialogs_dialogs__BB1qu"),t="Dialogs_dialogsItems__8+FdD",o="Dialogs_dialog__jVVwe",r="Dialogs_active__c925e",d="Dialogs_messages__WctAz",u="Dialogs_message__lxVC8",l=n(1523),c=n(184),g=function(e){var s="/dialogs/"+e.id;return(0,c.jsx)("div",{className:o+" "+r,children:(0,c.jsx)(l.OL,{to:s,children:e.name})})},m=function(e){return(0,c.jsx)("div",{children:(0,c.jsx)("div",{className:u,children:e.message})})},f=n(9271),h=n(6139),_=n(704),j=n(1117),x=n(3079),v=(0,x.D)(30),D=(0,_.Z)({form:"dialogAddMessageForm"})((function(e){return(0,c.jsxs)("form",{onSubmit:e.handleSubmit,children:[(0,c.jsx)(h.Z,{as:"textarea",component:j.W,placeholder:"Enter you message",name:"newMessageBody",validate:[x.C,v]}),(0,c.jsx)("div",{children:(0,c.jsx)("button",{type:"submit",children:"Send"})})]})})),p=n(364),b=n(7781),w=n(2932),A=(0,b.qC)((0,p.$j)((function(e){return{dialogsPage:e.dialogsPage}}),(function(e){return{addMessage:function(s){e((0,i.C)(s))}}})),w.D)((function(e){var s=e.dialogsPage.dialogs.map((function(e){return(0,c.jsx)(g,{name:e.name,id:e.id},e.id)})),n=e.dialogsPage.messages.map((function(e){return(0,c.jsx)(m,{message:e.message},e.id)}));return e.isAuth?(0,c.jsxs)("div",{className:a,children:[(0,c.jsx)("div",{className:t,children:s}),(0,c.jsx)("div",{className:d,children:(0,c.jsx)("div",{children:n})}),(0,c.jsx)(D,{onSubmit:function(s){e.addMessage(s.newMessageBody)}})]}):(0,c.jsx)(f.l_,{to:"/login"})}))},2932:function(e,s,n){n.d(s,{D:function(){return l}});var i=n(8683),a=n(5987),t=(n(2791),n(9271)),o=n(364),r=n(184),d=["isAuth"],u=function(e){return{isAuth:e.auth.isAuth}};function l(e){return(0,o.$j)(u)((function(s){var n=s.isAuth,o=(0,a.Z)(s,d);return n?(0,r.jsx)(e,(0,i.Z)({},o)):(0,r.jsx)(t.l_,{to:"/login"})}))}}}]);
//# sourceMappingURL=3.62927967.chunk.js.map