(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2839607e"],{"0c8c":function(t,e,i){t.exports=i.p+"img/artist_pass.31c2638e.png"},"0d59":function(t,e,i){"use strict";var a=i("ac3a");i.d(e,"a",(function(){return a["a"]}))},3521:function(t,e,i){"use strict";i("f34f")},"36a7":function(t,e,i){},"3e82":function(t,e,i){"use strict";i("cda5")},"406a":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"w-full main-section"},[a("div",{staticClass:"mt-2 mx-auto main-section d-flex justify-center",attrs:{"max-width":t.md?"1080px":"100%"}},[t._m(0),a("div",{staticClass:"form-section"},[a("v-sheet",{staticClass:"py-5 form-inner-section shadow"},["home"!=t.route.name?a("div",{staticClass:"d-flex mr-10 mt-3 justify-space-between pb-5"},[a("v-app-bar-title",{staticClass:"pa-2"},[a("v-img",{staticClass:"cursor-pointer logo-image",attrs:{src:i("dbd2"),height:"100%","max-height":"75px",width:"260px",contain:""},on:{click:t.goHome}})],1),a("router-link",{staticClass:"tab-title close-route",attrs:{to:{name:t.routeNames.home}}},[t._v("X")])],1):t._e(),t._t("default")],2)],1)])])},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"artist-section"},[a("img",{staticClass:"artist_pass",attrs:{alt:"artist_pass",src:i("0c8c")}})])}],r=i("8240"),s=i("2c28"),o=i("90ed"),c=i("d7af"),l=i("7af9"),u=Object(r["c"])({name:"SubscriptionPage",props:{title:{type:String,default:""},heading:{type:String,default:null,required:!1},titleClass:{type:String,default:"",required:!1},showTitle:{type:Boolean,default:!0,required:!1}},setup:function(){var t=Object(s["useBreakpoints"])(s["breakpointsTailwind"]),e=t.md,i=Object(c["a"])(),a=i.route,n=Object(l["a"])(),r=n.isAuthed,u=n.isMember,d=Object(c["a"])(),h=d.router,p=function(){return r.value&&u.value?void h.push({name:o["a"].dashboard}):h.push("/")};return{goHome:p,md:e,routeNames:o["a"],route:a}}}),d=u,h=(i("7ed0"),i("0c7c")),p=i("6544"),m=i.n(p),f=i("bb78"),v=i("adda"),b=i("8dd9"),g=Object(h["a"])(d,a,n,!1,null,null,null);e["a"]=g.exports;m()(g,{VAppBarTitle:f["a"],VImg:v["a"],VSheet:b["a"]})},5311:function(t,e,i){"use strict";var a=i("5607"),n=i("2b0e");e["a"]=n["default"].extend({name:"rippleable",directives:{ripple:a["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",t)):null}}})},"5f24":function(t,e,i){"use strict";i.d(e,"a",(function(){return y}));var a=i("8240"),n=Object(a["i"])(["Visual Arts","Performing Arts","Music/Sound","Film/Media","Technology","Festivals/Events","Writing/Publishing","Education/Workshops","Wellness/Fitness","Multi-Arts","Community","Other"]),r=["Sole Trader","Not For Profit entity","For Profit entity","Partnership","Trust"],s=[{key:"Artist",label:"I am an individual artist",rate:24},{key:"Arts_Organisation",label:"We are an arts organization",rate:33},{key:"General_Public",label:"I am neither, but I have a creative project",rate:66}],o=["Government","Not For Profit","For Profit"],c=Object(a["g"])({organisationName:"",organisationAbn:"",orgType:"",roleInOrg:"",organisationType:"",accountType:"",email:"",firstName:"",lastName:"",address:"",suburb:"",state:"",country:"",postcode:"",phone:"",artform:"",tcs:"",updates:!1,insurance:"",accurate:"",password:"",website:"",hear_from_us:""}),l=Object(a["i"])("individual"),u=Object(a["a"])((function(){return!!l.value})),d=Object(a["a"])((function(){return"organisation"===l.value})),h=Object(a["i"])(!1),p=Object(a["i"])(1),m=function(){return p.value++},f=function(){return p.value--},v=function(t){return p.value=t},b=Object(a["i"])(0),g=function(t){100!==b.value&&(b.value+=t)};Object(a["k"])(d,(function(t){t||(c.organisationAbn="",c.organisationType="",c.organisationName="")}));var y=function(){return{artforms:n,accountType:s,orgTypes:r,formData:c,type:l,typeSelected:u,isForOrganisation:d,emailExists:h,step:p,goToStep:v,next:m,prev:f,progress:b,organisation:o,updateProgress:g}}},"6ca7":function(t,e,i){},"7c6a":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"mt-4"},[i("v-expand-transition",[i("div",{directives:[{name:"show",rawName:"v-show",value:!t.loading,expression:"!loading"}]},[i("v-text-field",{attrs:{dense:"","hide-details":"auto",label:"Card Holder Name",outlined:""},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),i("div",{staticClass:"my-4",attrs:{id:"card-element"}}),i("v-expand-transition",[t.paymentError?i("div",{staticClass:"error--text"},[t._v(t._s(t.paymentError))]):t._e()])],1)]),i("div",{staticClass:"d-flex mt-4"},[i("v-spacer"),i("base-button",{attrs:{disabled:!t.valid,loading:t.loading},on:{click:t.subscribe}},[t._v(t._s(t.buttonText))])],1)],1)},n=[],r=i("1da1"),s=(i("96cf"),i("8240")),o=i("acaf"),c=i("bf8a"),l=i("0ed6"),u=i("b28c"),d=i("10d5"),h=i("7737"),p=Object(s["c"])({name:"PaymentInput",components:{StripeElementCard:o["StripeElementCard"],BaseButton:l["a"]},props:{buttonText:{type:String,default:"Pay Now"}},setup:function(t,e){var i=e.emit,a=Object(s["i"])(null),n=Object(s["i"])(null),o=Object(s["i"])(null),l=Object(s["i"])(""),p=Object(s["i"])(!1),m=Object(s["a"])((function(){return l.value.length>0&&p.value})),f=Object(s["i"])(null),v=Object(u["a"])(),b=v.getSetupIntent,g=Object(d["a"])(),y=g.post,x=Object(h["a"])(),_=x.loading,w=x.withLoader,O=function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){var e,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(c["a"])("pk_test_51MM8HcIXCAJsnajO0ipRj72hJvsYtDYdbXsQdmmv7LTXMQbea3PqR209PqQVPdVpw9qxx4pvbuflxc3V2a3jKMJG00Q5smtFzr");case 2:a.value=t.sent,e={hidePostalCode:!0,style:{base:{fontSize:"16px",fontFamily:"Roboto, sans-serif",textTransform:"capitalize",fontWeight:300}}},i=a.value.elements(),o.value=i.create("card",e),o.value.mount("#card-element"),o.value.on("change",(function(t){p.value=t.complete}));case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),j=function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,b();case 2:n.value=t.sent.intent;case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();Object(s["e"])(Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,j();case 2:return t.next=4,O();case 4:case"end":return t.stop()}}),t)}))));var S=function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",w(Object(r["a"])(regeneratorRuntime.mark((function t(){var e,r,s,c,u,d,h,p;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return s=a.value,t.next=3,s.confirmCardSetup(null!==(e=null===(r=n.value)||void 0===r?void 0:r.client_secret)&&void 0!==e?e:"",{payment_method:{card:o.value,billing_details:{name:l.value}}});case 3:if(c=t.sent,u=c.setupIntent,d=c.error,!d){t.next=10;break}f.value=null!==(h=d.message)&&void 0!==h?h:null,t.next=14;break;case 10:return t.next=12,y("/subscriptions",{paymentMethodId:u.payment_method});case 12:p=t.sent,p&&i("success",p);case 14:case"end":return t.stop()}}),t)})))));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return{intent:n,subscribe:S,name:l,valid:m,loading:_,paymentError:f}}}),m=p,f=(i("3e82"),i("0c7c")),v=i("6544"),b=i.n(v),g=i("0789"),y=i("2fa4"),x=i("8654"),_=Object(f["a"])(m,a,n,!1,null,"4d7ab3f6",null);e["a"]=_.exports;b()(_,{VExpandTransition:g["a"],VSpacer:y["a"],VTextField:x["a"]})},"7ed0":function(t,e,i){"use strict";i("cae2")},8547:function(t,e,i){"use strict";var a=i("2b0e"),n=i("80d2");e["a"]=a["default"].extend({name:"comparable",props:{valueComparator:{type:Function,default:n["j"]}}})},"894c":function(t,e,i){},"8a79":function(t,e,i){"use strict";var a=i("23e7"),n=i("e330"),r=i("06cf").f,s=i("50c4"),o=i("577e"),c=i("5a34"),l=i("1d80"),u=i("ab13"),d=i("c430"),h=n("".endsWith),p=n("".slice),m=Math.min,f=u("endsWith"),v=!d&&!f&&!!function(){var t=r(String.prototype,"endsWith");return t&&!t.writable}();a({target:"String",proto:!0,forced:!v&&!f},{endsWith:function(t){var e=o(l(this));c(t);var i=arguments.length>1?arguments[1]:void 0,a=e.length,n=void 0===i?a:m(s(i),a),r=o(t);return h?h(e,r,n):p(e,n-r.length,n)===r}})},"8efc":function(t,e,i){},a261:function(t,e,i){"use strict";i("894c")},ac7c:function(t,e,i){"use strict";var a=i("15fd"),n=i("5530"),r=(i("d3b7"),i("25f0"),i("6ca7"),i("ec29"),i("9d26")),s=i("c37a"),o=i("fe09"),c=["title"];e["a"]=o["a"].extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({},s["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(t){var e=this;this.$nextTick((function(){return e.inputIndeterminate=t}))},inputIndeterminate:function(t){this.$emit("update:indeterminate",t)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){var t=this.attrs$,e=(t.title,Object(a["a"])(t,c));return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(r["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",Object(n["a"])(Object(n["a"])({},e),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}})},adda:function(t,e,i){"use strict";var a=i("53ca"),n=(i("a9e3"),i("a15b"),i("8a79"),i("2ca0"),i("8efc"),i("90a2")),r=(i("36a7"),i("24b2")),s=i("58df"),o=Object(s["a"])(r["a"]).extend({name:"v-responsive",props:{aspectRatio:[String,Number],contentClass:String},computed:{computedAspectRatio:function(){return Number(this.aspectRatio)},aspectStyle:function(){return this.computedAspectRatio?{paddingBottom:1/this.computedAspectRatio*100+"%"}:void 0},__cachedSizer:function(){return this.aspectStyle?this.$createElement("div",{style:this.aspectStyle,staticClass:"v-responsive__sizer"}):[]}},methods:{genContent:function(){return this.$createElement("div",{staticClass:"v-responsive__content",class:this.contentClass},this.$slots.default)}},render:function(t){return t("div",{staticClass:"v-responsive",style:this.measurableStyles,on:this.$listeners},[this.__cachedSizer,this.genContent()])}}),c=o,l=i("7560"),u=i("d9f7"),d=i("d9bd"),h="undefined"!==typeof window&&"IntersectionObserver"in window;e["a"]=Object(s["a"])(c,l["a"]).extend({name:"v-img",directives:{intersect:n["a"]},props:{alt:String,contain:Boolean,eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:function(){return{root:void 0,rootMargin:void 0,threshold:void 0}}},position:{type:String,default:"center center"},sizes:String,src:{type:[String,Object],default:""},srcset:String,transition:{type:[Boolean,String],default:"fade-transition"}},data:function(){return{currentSrc:"",image:null,isLoading:!0,calculatedAspectRatio:void 0,naturalWidth:void 0,hasError:!1}},computed:{computedAspectRatio:function(){return Number(this.normalisedSrc.aspect||this.calculatedAspectRatio)},normalisedSrc:function(){return this.src&&"object"===Object(a["a"])(this.src)?{src:this.src.src,srcset:this.srcset||this.src.srcset,lazySrc:this.lazySrc||this.src.lazySrc,aspect:Number(this.aspectRatio||this.src.aspect)}:{src:this.src,srcset:this.srcset,lazySrc:this.lazySrc,aspect:Number(this.aspectRatio||0)}},__cachedImage:function(){if(!(this.normalisedSrc.src||this.normalisedSrc.lazySrc||this.gradient))return[];var t=[],e=this.isLoading?this.normalisedSrc.lazySrc:this.currentSrc;this.gradient&&t.push("linear-gradient(".concat(this.gradient,")")),e&&t.push('url("'.concat(e,'")'));var i=this.$createElement("div",{staticClass:"v-image__image",class:{"v-image__image--preload":this.isLoading,"v-image__image--contain":this.contain,"v-image__image--cover":!this.contain},style:{backgroundImage:t.join(", "),backgroundPosition:this.position},key:+this.isLoading});return this.transition?this.$createElement("transition",{attrs:{name:this.transition,mode:"in-out"}},[i]):i}},watch:{src:function(){this.isLoading?this.loadImage():this.init(void 0,void 0,!0)},"$vuetify.breakpoint.width":"getSrc"},mounted:function(){this.init()},methods:{init:function(t,e,i){if(!h||i||this.eager){if(this.normalisedSrc.lazySrc){var a=new Image;a.src=this.normalisedSrc.lazySrc,this.pollForSize(a,null)}this.normalisedSrc.src&&this.loadImage()}},onLoad:function(){this.getSrc(),this.isLoading=!1,this.$emit("load",this.src),this.image&&(this.normalisedSrc.src.endsWith(".svg")||this.normalisedSrc.src.startsWith("data:image/svg+xml"))&&(this.image.naturalHeight&&this.image.naturalWidth?(this.naturalWidth=this.image.naturalWidth,this.calculatedAspectRatio=this.image.naturalWidth/this.image.naturalHeight):this.calculatedAspectRatio=1)},onError:function(){this.hasError=!0,this.$emit("error",this.src)},getSrc:function(){this.image&&(this.currentSrc=this.image.currentSrc||this.image.src)},loadImage:function(){var t=this,e=new Image;this.image=e,e.onload=function(){e.decode?e.decode().catch((function(e){Object(d["c"])("Failed to decode image, trying to render anyway\n\n"+"src: ".concat(t.normalisedSrc.src)+(e.message?"\nOriginal error: ".concat(e.message):""),t)})).then(t.onLoad):t.onLoad()},e.onerror=this.onError,this.hasError=!1,this.sizes&&(e.sizes=this.sizes),this.normalisedSrc.srcset&&(e.srcset=this.normalisedSrc.srcset),e.src=this.normalisedSrc.src,this.$emit("loadstart",this.normalisedSrc.src),this.aspectRatio||this.pollForSize(e),this.getSrc()},pollForSize:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,a=function a(){var n=t.naturalHeight,r=t.naturalWidth;n||r?(e.naturalWidth=r,e.calculatedAspectRatio=r/n):t.complete||!e.isLoading||e.hasError||null==i||setTimeout(a,i)};a()},genContent:function(){var t=c.options.methods.genContent.call(this);return this.naturalWidth&&this._b(t.data,"div",{style:{width:"".concat(this.naturalWidth,"px")}}),t},__genPlaceholder:function(){if(this.$slots.placeholder){var t=this.isLoading?[this.$createElement("div",{staticClass:"v-image__placeholder"},this.$slots.placeholder)]:[];return this.transition?this.$createElement("transition",{props:{appear:!0,name:this.transition}},t):t[0]}}},render:function(t){var e=c.options.render.call(this,t),i=Object(u["a"])(e.data,{staticClass:"v-image",attrs:{"aria-label":this.alt,role:this.alt?"img":void 0},class:this.themeClasses,directives:h?[{name:"intersect",modifiers:{once:!0},value:{handler:this.init,options:this.options}}]:void 0});return e.children=[this.__cachedSizer,this.__cachedImage,this.__genPlaceholder(),this.genContent()],t(e.tag,i,e.children)}})},bb78:function(t,e,i){"use strict";var a=i("3206"),n=i("80d2"),r=i("0246"),s=Object(a["a"])("VAppBar","v-app-bar-title","v-app-bar");e["a"]=s.extend().extend({name:"v-app-bar-title",data:function(){return{contentWidth:0,left:0,width:0}},watch:{"$vuetify.breakpoint.width":"updateDimensions"},computed:{styles:function(){if(!this.contentWidth)return{};var t=this.width,e=this.contentWidth,i=Object(r["easeInOutCubic"])(Math.min(1,1.5*this.VAppBar.scrollRatio));return{width:Object(n["g"])(t+(e-t)*i),visibility:this.VAppBar.scrollRatio?"visible":"hidden"}}},mounted:function(){this.updateDimensions()},methods:{updateDimensions:function(){var t=this.$refs.placeholder.getBoundingClientRect();this.width=t.width,this.left=t.left,this.contentWidth=this.$refs.content.scrollWidth}},render:function(t){return t("div",{class:"v-toolbar__title v-app-bar-title"},[t("div",{class:"v-app-bar-title__content",style:this.styles,ref:"content"},[this.$slots.default]),t("div",{class:"v-app-bar-title__placeholder",style:{visibility:this.VAppBar.scrollRatio?"hidden":"visible"},ref:"placeholder"},[this.$slots.default])])}})},cae2:function(t,e,i){},cda5:function(t,e,i){},dbd2:function(t,e,i){t.exports=i.p+"img/brandx-black.7867f125.svg"},e768:function(t,e,i){"use strict";i.d(e,"b",(function(){return o})),i.d(e,"a",(function(){return c["a"]}));var a=i("2909"),n=i("3835"),r=(i("4fad"),i("d90f")),s=i("8240"),o=function(t){var e=Object(s["i"])(!1),i=function(){for(var e={},i=0,a=Object.entries(t);i<a.length;i++){var r=Object(n["a"])(a[i],1),s=r[0];e[s]=[]}return e},o=Object(s["i"])(i()),c=function(){o.value=i()},l=function(t){var e;if(422!==(null===(e=t.response)||void 0===e?void 0:e.status))throw new Error(t.message);for(var i=0,s=Object.entries(t.response.data.errors);i<s.length;i++){var c,l=Object(n["a"])(s[i],2),u=l[0],d=l[1];(c=o.value[Object(r["a"])(u)]).push.apply(c,Object(a["a"])(d))}};return Object(s["k"])(t,(function(){return c()})),{errors:o,mapErrors:l,valid:e}},c=i("e652")},ec29:function(t,e,i){},eddd:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("subscription-page",{attrs:{title:"Register"}},[i("register-form")],1)},n=[],r=i("0ed6"),s=i("8240"),o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("p",[t._v(" Create a Brand X Account ")]),i("p",[t._v(" To book a space or sign up for Artist Pass Access first make an account. ")]),i("p",[t._v(" Had an Artist Pass in the past? "),i("router-link",{attrs:{to:{name:t.routeNames.auth.login}}},[t._v("Log in")]),t._v(" to renew your Artist Pass ")],1)])},c=[],l=i("90ed"),u=Object(s["c"])({name:"RegisterText",setup:function(){return{routeNames:l["a"]}}}),d=u,h=i("0c7c"),p=Object(h["a"])(d,o,c,!1,null,null,null),m=p.exports,f=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:" px-4"},[i("div",{staticClass:"tab-title pt-4"},[t._v("Create a Brand X Account")]),i("div",{staticClass:"sub-title-normal py-sm-4"},[t._v("To book a space or sign up for Artist Pass Access first make an account.")]),i("div",{staticClass:"pt-3"},[i("v-form",{model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[i("v-expand-transition",[i("div",[i("div",[i("div",{staticClass:"sub-title-normal pb-2"},[i("span",{staticClass:"sub-title"},[t._v("First name:")]),t._v(" (required)")]),i("v-text-field",{staticClass:"custom-text-field",attrs:{dense:"",outlined:"",label:"",rules:[t.rules.required]},model:{value:t.formData.firstName,callback:function(e){t.$set(t.formData,"firstName",e)},expression:"formData.firstName"}}),i("div",{staticClass:"sub-title-normal pb-2"},[i("span",{staticClass:"sub-title"},[t._v("Last name:")]),t._v(" (required)")]),i("v-text-field",{staticClass:"custom-text-field",attrs:{dense:"",outlined:"",label:"",rules:[t.rules.required]},model:{value:t.formData.lastName,callback:function(e){t.$set(t.formData,"lastName",e)},expression:"formData.lastName"}}),i("div",{staticClass:"sub-title-normal pb-2"},[i("span",{staticClass:"sub-title"},[t._v("Email:")]),t._v(" (required)")]),i("v-text-field",{staticClass:"custom-text-field",attrs:{dense:"",outlined:"","error-messages":t.errors.email,rules:[t.rules.required],loading:t.loading},model:{value:t.formData.email,callback:function(e){t.$set(t.formData,"email",e)},expression:"formData.email"}}),t.emailExists&&t.formData.email?i("div",[i("p",[t._v(" Your email address is already registered. To proceed with subscribing, please "),i("router-link",{attrs:{to:{name:t.routeNames.auth.login}}},[t._v("login to renew.")])],1)]):t._e(),i("div",{staticClass:"sub-title-normal pb-2"},[i("span",{staticClass:"sub-title"},[t._v("Password:")]),t._v(" (required)")]),i("v-text-field",{staticClass:"custom-text-field",attrs:{dense:"",outlined:"",type:t.isPasswordVisible?"text":"password",label:"","append-icon":t.isPasswordVisible?t.icons.mdiEyeOffOutline:t.icons.mdiEyeOutline,rules:[t.rules.required,t.rules.minLength(8)]},on:{"click:append":function(e){t.isPasswordVisible=!t.isPasswordVisible}},model:{value:t.formData.password,callback:function(e){t.$set(t.formData,"password",e)},expression:"formData.password"}})],1),i("div",{staticClass:"d-flex"},[i("v-checkbox",{attrs:{color:"secondary","hide-details":"",rules:[t.rules.required],label:""},model:{value:t.formData.tcs,callback:function(e){t.$set(t.formData,"tcs",e)},expression:"formData.tcs"}}),i("div",{staticClass:"sub-title-normal "},[t._v(" I agree to Brand X "),i("a",{attrs:{href:"https://www.brandx.org.au/artist-pass-terms-and-conditions",target:"_blank"},on:{click:function(t){t.stopPropagation()}}},[t._v(" terms and conditions ")]),t._v(" and understand that I may receive official notices from Brand X from time to time. (Required) ")])],1),i("div",{staticClass:"d-flex justify-end pt-10"},[i("base-button",{attrs:{black:"",disabled:!t.valid,loading:t.loading},on:{click:t.register}},[t._v("Sign Up")])],1),i("v-sheet",{attrs:{height:"30px"}}),i("div",{staticClass:"d-flex justify-center px-20 sub-title-normal"},[t._v(" Already an Artist Pass Subscriber in the past? ")]),i("div",{staticClass:"d-flex justify-center sub-title-normal"},[i("router-link",{attrs:{to:{name:t.routeNames.auth.login}}},[t._v(" Log in to continue ")])],1)],1)])],1)],1)])},v=[],b=i("1da1"),g=(i("96cf"),i("e768")),y=i("e652"),x=i("3654"),_=i("0d59"),w=i("7737"),O=i("5f24"),j=i("94ed"),S=i("10d5"),C=i("878b"),k=i("7af9"),R=i("d7af"),A=Object(s["c"])({components:{RegisterText:m,BaseButton:r["a"]},name:"RegisterForm",setup:function(){var t=Object(s["i"])(!1),e=Object(s["i"])(!1),i=Object(w["a"])(),a=i.loading,n=i.withLoader,r=Object(O["a"])(),o=r.artforms,c=r.accountType,u=r.formData,d=r.type,h=r.typeSelected,p=r.isForOrganisation,m=r.emailExists,f=(r.next,Object(S["a"])()),v=f.post,A=Object(R["a"])(),E=A.router,V=Object(g["b"])(u),I=V.errors,$=V.mapErrors,P=function(){var t=Object(b["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",n(Object(b["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,_["a"].existsByEmail(u.email);case 2:m.value=t.sent;case 3:case"end":return t.stop()}}),t)})))));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),T=function(){var t=Object(b["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n(Object(b["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,v("/users",Object(C["b"])(u)).catch((function(t){return $(t)}));case 2:if(e=t.sent,console.log(e,"response"),void 0===e){t.next=8;break}return t.next=7,D(u.email,u.password);case 7:E.push({name:l["a"].subscriber});case 8:case"end":return t.stop()}}),t)}))));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),D=function(){var t=Object(b["a"])(regeneratorRuntime.mark((function t(e,i){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",n(Object(b["a"])(regeneratorRuntime.mark((function t(){var a,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,_["a"].login({email:e,password:i});case 2:a=t.sent,a&&(n=Object(k["a"])(),r=n.storeLogin,r(a));case 4:case"end":return t.stop()}}),t)})))));case 1:case"end":return t.stop()}}),t)})));return function(e,i){return t.apply(this,arguments)}}();return Object(x["debouncedWatch"])((function(){return u.email}),Object(b["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",P());case 1:case"end":return t.stop()}}),t)}))),{debounce:500,immediate:!0}),{type:d,errors:I,isForOrganisation:p,typeSelected:h,formData:u,rules:y["a"],valid:t,accountType:c,artforms:o,loading:a,emailExists:m,register:T,routeNames:l["a"],isPasswordVisible:e,icons:{mdiEyeOutline:j["b"]}}}}),E=A,V=(i("3521"),i("6544")),I=i.n(V),$=i("ac7c"),P=i("0789"),T=i("4bd4"),D=i("8dd9"),B=i("8654"),F=Object(h["a"])(E,f,v,!1,null,null,null),z=F.exports;I()(F,{VCheckbox:$["a"],VExpandTransition:P["a"],VForm:T["a"],VSheet:D["a"],VTextField:B["a"]});var N=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t._m(0),i("v-sheet",{staticClass:"border-yellow pa-2 my-2",attrs:{"max-width":"45%"}},[i("div",[i("strong",[t._v("Organisation")])]),i("div",[t._v("$100")]),i("div",[t._v("Per Year, Billed Yearly")])]),t._m(1),i("div",[i("payment-input",{attrs:{"button-text":"Subscribe"}})],1)],1)},W=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"text-h6 mt-4"},[t._v("Artist Pass Subscription")]),i("p",[t._v(" Once payment is complete you will automatically be emailed your Artist Pass details which will enable you to login and book spaces at subsidised rates. ")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("p",[i("strong",[t._v("Enter your card details. "),i("br"),t._v(" Your subscription will start immediately. ")])])])}],L=i("7c6a"),q=Object(s["c"])({components:{PaymentInput:L["a"]},name:"PaymentForm"}),M=q,H=Object(h["a"])(M,N,W,!1,null,null,null),X=H.exports;I()(H,{VSheet:D["a"]});var Y=i("406a"),J=Object(s["c"])({components:{RegisterText:m,BaseButton:r["a"],RegisterForm:z,PaymentForm:X,SubscriptionPage:Y["a"]},name:"RegisterPage",setup:function(){var t=Object(O["a"])(),e=t.step;return{step:e}}}),Q=J,G=(i("a261"),Object(h["a"])(Q,a,n,!1,null,"63842a1e",null));e["default"]=G.exports},f34f:function(t,e,i){},fe09:function(t,e,i){"use strict";i.d(e,"b",(function(){return o}));i("d3b7"),i("25f0"),i("4de4");var a=i("c37a"),n=i("5311"),r=i("8547"),s=i("58df");function o(t){t.preventDefault()}e["a"]=Object(s["a"])(a["a"],n["a"],r["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,i=this.internalValue;return this.isMultiple?!!Array.isArray(i)&&i.some((function(i){return t.valueComparator(i,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,i):Boolean(i):this.valueComparator(i,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=a["a"].options.methods.genLabel.call(this);return t?(t.data.on={click:o},t):t},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:o},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(t){this.onChange(),this.$emit("click",t)},onChange:function(){var t=this;if(this.isInteractive){var e=this.value,i=this.internalValue;if(this.isMultiple){Array.isArray(i)||(i=[]);var a=i.length;i=i.filter((function(i){return!t.valueComparator(i,e)})),i.length===a&&i.push(e)}else i=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(i,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(i,e)?null:e:!i;this.validate(!0,i),this.internalValue=i,this.hasColor=i}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}})}}]);
//# sourceMappingURL=chunk-2839607e.2768da4b.js.map