(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e425f88c"],{ad99:function(e,r,s){"use strict";s.r(r);var t=function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("div",[s("v-form",{model:{value:e.valid,callback:function(r){e.valid=r},expression:"valid"}},[s("v-text-field",{attrs:{dense:"",outlined:"",type:e.isCurrentPasswordVisible?"text":"password",label:"Current Password","append-icon":e.isCurrentPasswordVisible?e.icons.mdiEyeOffOutline:e.icons.mdiEyeOutline,rules:[e.rules.required],"error-messages":e.errors.currentPassword},on:{"click:append":function(r){e.isCurrentPasswordVisible=!e.isCurrentPasswordVisible}},model:{value:e.formData.currentPassword,callback:function(r){e.$set(e.formData,"currentPassword",r)},expression:"formData.currentPassword"}}),s("v-text-field",{attrs:{dense:"",outlined:"",type:e.isPasswordVisible?"text":"password",label:"New Password","append-icon":e.isPasswordVisible?e.icons.mdiEyeOffOutline:e.icons.mdiEyeOutline,rules:[e.rules.required,e.rules.minLength(8)],"error-messages":e.errors.password},on:{"click:append":function(r){e.isPasswordVisible=!e.isPasswordVisible}},model:{value:e.formData.Password,callback:function(r){e.$set(e.formData,"Password",r)},expression:"formData.Password"}})],1),s("div",{staticClass:"d-flex"},[s("v-spacer"),s("base-button",{attrs:{black:"",disabled:!e.valid,loading:e.loading},on:{click:e.reset}},[e._v("Reset")])],1),e.success?s("div",{staticClass:"mt-2"},[e._v("Your password has been reset.")]):e._e()],1)},a=[],n=s("1da1"),i=(s("96cf"),s("0ed6")),o=s("8240"),c=s("94ed"),u=s("e768"),d=s("7737"),l=s("10d5"),b=s("878b"),f=s("84a5"),p=s("90ed"),w=s("d7af"),m=Object(o["c"])({components:{BaseButton:i["a"]},name:"ProfilePasswordPage",setup:function(){var e=Object(o["i"])(!1),r=Object(o["i"])(!1),s=Object(o["i"])(!1),t=Object(o["i"])(!1),a=Object(l["a"])(),i=a.post,m=Object(w["a"])(),v=m.router,O=Object(f["a"])(),P=O.setMessage,j=Object(o["g"])({currentPassword:"",Password:""}),h=Object(d["a"])(),g=h.loading,k=h.withLoader,x=Object(u["b"])(j),V=x.errors,y=x.mapErrors,E=function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",k(Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i("/update-password",Object(b["b"])(j)).catch((function(e){return y(e)})).then((function(e){e&&(j.currentPassword="",j.Password="",t.value=!0,P("Password Updated. Redirecting to Dashboard..."),setTimeout((function(){v.push({name:p["a"].dashboard})}),1e3))}));case 2:case"end":return e.stop()}}),e)})))));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return{valid:e,formData:j,isCurrentPasswordVisible:r,isPasswordVisible:s,icons:{mdiEyeOffOutline:c["a"],mdiEyeOutline:c["b"]},errors:V,rules:u["a"],loading:g,reset:E,success:t}}}),v=m,O=s("0c7c"),P=s("6544"),j=s.n(P),h=s("4bd4"),g=s("2fa4"),k=s("8654"),x=Object(O["a"])(v,t,a,!1,null,null,null);r["default"]=x.exports;j()(x,{VForm:h["a"],VSpacer:g["a"],VTextField:k["a"]})},e768:function(e,r,s){"use strict";s.d(r,"b",(function(){return o})),s.d(r,"a",(function(){return c["a"]}));var t=s("2909"),a=s("3835"),n=(s("4fad"),s("d90f")),i=s("8240"),o=function(e){var r=Object(i["i"])(!1),s=function(){for(var r={},s=0,t=Object.entries(e);s<t.length;s++){var n=Object(a["a"])(t[s],1),i=n[0];r[i]=[]}return r},o=Object(i["i"])(s()),c=function(){o.value=s()},u=function(e){var r;if(422!==(null===(r=e.response)||void 0===r?void 0:r.status))throw new Error(e.message);for(var s=0,i=Object.entries(e.response.data.errors);s<i.length;s++){var c,u=Object(a["a"])(i[s],2),d=u[0],l=u[1];(c=o.value[Object(n["a"])(d)]).push.apply(c,Object(t["a"])(l))}};return Object(i["k"])(e,(function(){return c()})),{errors:o,mapErrors:u,valid:r}},c=s("e652")}}]);
//# sourceMappingURL=chunk-e425f88c.69747c46.js.map