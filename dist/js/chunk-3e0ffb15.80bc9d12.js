(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3e0ffb15"],{2505:function(t,e,a){},"671e":function(t,e,a){"use strict";a("2505")},6903:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-main",[a("v-container",{staticClass:"pa-0",attrs:{fluid:""}},[a("v-layout",[a("base-router")],1)],1)],1)],1)},n=[],r=a("6c2d"),o=a("fae0"),i=a("8240"),u=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-sheet",t._g({staticClass:"nav-icon d-flex justify-center align-center",class:{dark:t.dark,light:t.light},attrs:{height:"75",width:"75"}},t.$listeners),[a("div",[a("svg",{attrs:{width:"32",height:"32",viewBox:"0 0 45 32",fill:"none",xmlns:"http://www.w3.org/2000/svg"}},[a("line",{attrs:{y1:"1",x2:"45",y2:"1",stroke:t.stroke,"stroke-width":"2"}}),a("line",{attrs:{y1:"11",x2:"45",y2:"11",stroke:t.stroke,"stroke-width":"2"}}),a("line",{attrs:{y1:"21",x2:"45",y2:"21",stroke:t.stroke,"stroke-width":"2"}}),a("line",{attrs:{y1:"31",x2:"45",y2:"31",stroke:t.stroke,"stroke-width":"2"}})])])])},c=[],l=Object(i["c"])({name:"AppBarIcon",props:{light:{type:Boolean,required:!1},dark:{type:Boolean,required:!1}},setup:function(t){var e=Object(i["a"])((function(){return t.light?"black":(t.dark,"white")}));return{stroke:e}}}),h=l,b=(a("671e"),a("0c7c")),m=a("6544"),d=a.n(m),f=a("8dd9"),p=Object(b["a"])(h,u,c,!1,null,"53e4f403",null),v=p.exports;d()(p,{VSheet:f["a"]});var g=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-sheet",{staticClass:"fill-height",attrs:{color:"yellow"}},[t._l(t.items,(function(e,s){return[t.shouldShowItem(e)?a("v-list-item",{key:s,attrs:{to:{name:e.to},"active-class":"active-tab","exact-path":""}},[a("v-list-item-title",{staticClass:"font-weight-bold text-h5 text-right"},[t._v(t._s(e.text))])],1):t._e()]})),t.isAuthed?a("v-list-item",{on:{click:t.logout}},[a("v-list-item-title",{staticClass:"font-weight-bold text-h5 text-right"},[t._v("Logout")])],1):t._e(),a("div",{staticClass:"px-4 mt-8"},[t.isAuthed?t._e():a("base-button",{staticClass:"mb-4",attrs:{black:"",block:"",to:{name:t.routeNames.auth.login}}},[t._v(" Login ")]),!t.isMember&&t.isAuthed?a("base-button",{staticClass:"mb-4",attrs:{black:"",block:"",to:{name:t.routeNames.profile.billing}}},[t._v(" Get Artist Pass ")]):t._e(),a("base-button",{attrs:{block:"",href:"https://www.brandx.org.au",target:"_blank"}},[t._v("Brand X Home")])],1)],2)},k=[],w=a("1da1"),x=(a("96cf"),a("0ed6")),y=a("7af9"),_=a("0d59"),j=a("90ed"),B=a("d7af"),O=Object(i["c"])({components:{BaseButton:x["a"]},name:"SubscriptionMenu",setup:function(){var t=Object(y["a"])(),e=t.isAuthed,a=t.isMember,s=Object(B["a"])(),n=s.router,r=[{text:"View Calendar",to:j["a"].home,guest:!0},{text:"Book a Space",to:j["a"].spaces.book,auth:!1,member:!0},{text:"View Spaces",to:j["a"].spaces.all,auth:!1,member:!0},{text:"My Bookings",to:j["a"].my.bookings,auth:!0,member:!0},{text:"My Profile",to:j["a"].profile.details,auth:!0,member:!1},{text:"FAQ & Help",to:j["a"].help,auth:!1,member:!0},{text:"Contact",to:j["a"].contact,auth:!1,member:!1}],o=function(t){return!(!t.guest||a.value)||(!t.guest||!a.value)&&(!(t.auth&&!e.value)&&!(t.member&&!a.value))},i=function(){var t=Object(w["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,_["a"].logout();case 2:n.push("/");case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return{items:r,isAuthed:e,logout:i,shouldShowItem:o,routeNames:j["a"],isMember:a}}}),A=O,C=(a("a635"),a("da13")),S=a("5d23"),M=Object(b["a"])(A,g,k,!1,null,null,null),V=M.exports;d()(M,{VListItem:C["a"],VListItemTitle:S["b"],VSheet:f["a"]});var I=Object(i["c"])({components:{AppBarIcon:v,ScheduleSelectInput:o["a"],BaseRouter:r["a"],SubscriptionMenu:V,BaseButton:x["a"]},name:"SubscriptionLayout",setup:function(){var t=Object(i["i"])(!1),e=function(){t.value=!t.value},a=Object(y["a"])(),s=a.isAuthed,n=a.isMember,r=Object(B["a"])(),o=r.router,u=function(){return s.value&&n.value?void o.push({name:j["a"].dashboard}):o.push("/")};return{nav:t,toggleNav:e,routeNames:j["a"],isAuthed:s,isMember:n,goHome:u}}}),L=I,N=(a("bf61"),a("a523")),$=a("a722"),E=a("f6c4"),H=Object(b["a"])(L,s,n,!1,null,"dcbf663a",null);e["default"]=H.exports;d()(H,{VContainer:N["a"],VLayout:$["a"],VMain:E["a"]})},8451:function(t,e,a){},a635:function(t,e,a){"use strict";a("f5ee")},bf61:function(t,e,a){"use strict";a("8451")},f5ee:function(t,e,a){}}]);
//# sourceMappingURL=chunk-3e0ffb15.80bc9d12.js.map