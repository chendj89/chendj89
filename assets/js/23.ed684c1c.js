(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{410:function(module,__webpack_exports__,__webpack_require__){"use strict";var vue__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0);__webpack_exports__.a={__name:"vp-code",props:{code:String,cache:String},setup(__props){const props=__props,decodedCode=Object(vue__WEBPACK_IMPORTED_MODULE_0__.computed)(()=>decodeURIComponent(props.code||"")),decodedCache=Object(vue__WEBPACK_IMPORTED_MODULE_0__.computed)(()=>decodeURIComponent(props.cache||"[]")),cacheArr=JSON.parse(decodedCache.value);let runCode=Object(vue__WEBPACK_IMPORTED_MODULE_0__.computed)(()=>{let evalStr=decodedCode.value;cacheArr.map(e=>{decodedCode.value.includes(e.name)&&(evalStr=e.func+"\n"+evalStr,evalStr=evalStr.trim())});try{return eval(evalStr)}catch(e){return"渲染错误："+e}});return{__sfc:!0,props:props,decodedCode:decodedCode,decodedCache:decodedCache,cacheArr:cacheArr,runCode:runCode}}}},488:function(e,_,c){"use strict";c.r(_);var d=c(410).a,o=c(20),r=Object(o.a)(d,(function(){var e=this._self._c,_=this._self._setupProxy;return e("code",{staticClass:"vp-code"},[this._v("\n  "+this._s(_.runCode)+"\n")])}),[],!1,null,"15861553",null);_.default=r.exports}}]);