(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b81e19ea"],{"18f3":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("member-page",{attrs:{heading:"Artist Pass Subscription","show-title":!1}},[a("div",[a("div",[a("p",[e._v("Once payment is complete you will be emailed your Artist Pass confirmation and receipt.")])]),a("v-sheet",{staticClass:"border-yellow pa-2 my-2",attrs:{"max-width":"45%"}},[a("div",[a("strong",[e._v(e._s(e.user.data.organisation?"Organisation":"Individual"))])]),a("div",[e._v(e._s(e.formatPrice(e.price)))]),a("div",[e._v("Per Year, Billed Yearly")])]),a("div",[a("p",[a("strong",[e._v("Enter your card details. "),a("br"),e._v(" Your subscription will start immediately. ")])])]),a("div",[a("payment-input",{attrs:{"button-text":"Subscribe"},on:{success:e.susbcribed}})],1)],1),e.sub?a("v-dialog",{attrs:{persistent:"","max-width":"600px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"text-h5 text-break"},[e._v(" Your Artist Pass is Confirmed ")]),a("v-card-text",{staticClass:"black--text"},[a("div",[e._v(" Please check your email for your Artist Pass receipt. Please allow a few minutes for this email to arrive. You can now book spaces with Brand X at subsidised rates. ")]),a("div",{staticClass:"my-4 pa-4 border-yellow"},[a("div",{staticClass:"font-weight-bold"},[e._v("Artist Pass")]),a("div",[e._v("Subscriber Expiry: "+e._s(e.formatDate(e.sub.memberExpiry)))]),a("div",[e._v("Next Billing Date: "+e._s(e.formatDate(e.sub.memberExpiry))+"*")]),a("div",{staticClass:"mt-2 font-weight-bold"},[e._v("Receipt #: "+e._s(e.sub.reference))])]),a("div",[e._v("* You will be emailed 14 days and 48 hours prior to rewnewal")]),a("div",{staticClass:"mt-2"},[e._v("For any questions, contact us at bookings@brandx.org.au")])]),a("v-card-actions",[a("v-spacer"),a("base-button",{on:{click:e.goToBilling}},[e._v("Book a Space")])],1)],1)],1):e._e()],1)},r=[],i=a("1da1"),s=(a("96cf"),a("0ed6")),c=a("7c6a"),u=a("7af9"),o=a("ab47"),l=a("8240"),d=a("90ed"),v=a("d7af"),p=a("5eb3"),b=a("bf72"),m=Object(l["c"])({components:{PaymentInput:c["a"],MemberPage:o["a"],BaseButton:s["a"]},name:"SubscribePage",setup:function(){var e=Object(l["i"])(null),t=Object(l["i"])(0),a=Object(v["a"])(),n=a.router,r=Object(l["i"])(!0),s=Object(u["a"])(),c=s.refreshState,o=Object(u["a"])(),m=o.user;Object(l["e"])(Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,m.value.getSubscriptionPrice();case 2:t.value=e.sent;case 3:case"end":return e.stop()}}),e)}))));var f=function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c();case 2:n.push({name:d["a"].spaces.book});case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),g=function(t){e.value=t,r.value=!0};return{goToBilling:f,susbcribed:g,dialog:r,formatDate:p["a"],sub:e,formatPrice:b["a"],price:t,user:m}}}),f=m,g=a("0c7c"),w=a("6544"),h=a.n(w),x=a("b0af"),y=a("99d9"),j=a("169a"),O=a("8dd9"),_=a("2fa4"),k=Object(g["a"])(f,n,r,!1,null,null,null);t["default"]=k.exports;h()(k,{VCard:x["a"],VCardActions:y["a"],VCardText:y["b"],VCardTitle:y["c"],VDialog:j["a"],VSheet:O["a"],VSpacer:_["a"]})},"3e82":function(e,t,a){"use strict";a("cda5")},7737:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var n=a("1da1"),r=(a("96cf"),a("d3b7"),a("8240")),i=function(e){var t,a=Object(r["i"])(null!==(t=null===e||void 0===e?void 0:e.initial)&&void 0!==t&&t),i=function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(r){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a.value=!0,t.abrupt("return",new Promise((function(t){var i;setTimeout(Object(n["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r();case 3:n=e.sent,e.next=9;break;case 6:e.prev=6,e.t0=e["catch"](0),a.value=!1;case 9:a.value=!1,t(n);case 11:case"end":return e.stop()}}),e,null,[[0,6]])}))),null!==(i=null===e||void 0===e?void 0:e.delay)&&void 0!==i?i:0)})));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return{loading:a,withLoader:i}}},"7c6a":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"mt-4"},[a("v-expand-transition",[a("div",{directives:[{name:"show",rawName:"v-show",value:!e.loading,expression:"!loading"}]},[a("v-text-field",{attrs:{dense:"","hide-details":"auto",label:"Card Holder Name",outlined:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),a("div",{staticClass:"my-4",attrs:{id:"card-element"}}),a("v-expand-transition",[e.paymentError?a("div",{staticClass:"error--text"},[e._v(e._s(e.paymentError))]):e._e()])],1)]),a("div",{staticClass:"d-flex mt-4"},[a("v-spacer"),a("base-button",{attrs:{disabled:!e.valid,loading:e.loading},on:{click:e.subscribe}},[e._v(e._s(e.buttonText))])],1)],1)},r=[],i=a("1da1"),s=(a("96cf"),a("8240")),c=a("acaf"),u=a("bf8a"),o=a("0ed6"),l=a("b28c"),d=a("10d5"),v=a("7737"),p=Object(s["c"])({name:"PaymentInput",components:{StripeElementCard:c["StripeElementCard"],BaseButton:o["a"]},props:{buttonText:{type:String,default:"Pay Now"}},setup:function(e,t){var a=t.emit,n=Object(s["i"])(null),r=Object(s["i"])(null),c=Object(s["i"])(null),o=Object(s["i"])(""),p=Object(s["i"])(!1),b=Object(s["a"])((function(){return o.value.length>0&&p.value})),m=Object(s["i"])(null),f=Object(l["a"])(),g=f.getSetupIntent,w=Object(d["a"])(),h=w.post,x=Object(v["a"])(),y=x.loading,j=x.withLoader,O=function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){var t,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["a"])("pk_test_51MM8HcIXCAJsnajO0ipRj72hJvsYtDYdbXsQdmmv7LTXMQbea3PqR209PqQVPdVpw9qxx4pvbuflxc3V2a3jKMJG00Q5smtFzr");case 2:n.value=e.sent,t={hidePostalCode:!0,style:{base:{fontSize:"16px",fontFamily:"Roboto, sans-serif",textTransform:"capitalize",fontWeight:300}}},a=n.value.elements(),c.value=a.create("card",t),c.value.mount("#card-element"),c.value.on("change",(function(e){p.value=e.complete}));case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),_=function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,g();case 2:r.value=e.sent.intent;case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(s["e"])(Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,_();case 2:return e.next=4,O();case 4:case"end":return e.stop()}}),e)}))));var k=function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",j(Object(i["a"])(regeneratorRuntime.mark((function e(){var t,i,s,u,l,d,v,p;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return s=n.value,e.next=3,s.confirmCardSetup(null!==(t=null===(i=r.value)||void 0===i?void 0:i.client_secret)&&void 0!==t?t:"",{payment_method:{card:c.value,billing_details:{name:o.value}}});case 3:if(u=e.sent,l=u.setupIntent,d=u.error,!d){e.next=10;break}m.value=null!==(v=d.message)&&void 0!==v?v:null,e.next=14;break;case 10:return e.next=12,h("/subscriptions",{paymentMethodId:l.payment_method});case 12:p=e.sent,p&&a("success",p);case 14:case"end":return e.stop()}}),e)})))));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return{intent:r,subscribe:k,name:o,valid:b,loading:y,paymentError:m}}}),b=p,m=(a("3e82"),a("0c7c")),f=a("6544"),g=a.n(f),w=a("0789"),h=a("2fa4"),x=a("8654"),y=Object(m["a"])(b,n,r,!1,null,"4d7ab3f6",null);t["a"]=y.exports;g()(y,{VExpandTransition:w["a"],VSpacer:h["a"],VTextField:x["a"]})},bf72:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var n=function(e){return(e/100).toLocaleString("en-AU",{style:"currency",currency:"AUD"})}},cda5:function(e,t,a){}}]);
//# sourceMappingURL=chunk-b81e19ea.8e108abe.js.map