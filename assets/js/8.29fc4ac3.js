(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{426:function(e,t,o){},444:function(e,t,o){"use strict";o(426)},473:function(e,t,o){"use strict";o.r(t);var s=o(0),n={__name:"four",props:{msg:String,from:String},setup(e){const t=e,o=Object(s.getCurrentInstance)(),n=Object(s.ref)(!0);let i=Object(s.reactive)({name:o.proxy.$hero.format("嘻嘻")});return Object(s.onMounted)(()=>{console.log(t)}),Object(s.onUnmounted)(()=>{console.log("销毁--basic")}),{__sfc:!0,props:t,ins:o,dialogVisible:n,handleClose:e=>{o.proxy.$resolve({msg:"弹窗"})},hero:i}}},i=(o(444),o(20)),l=Object(i.a)(n,(function(){var e=this._self._c,t=this._self._setupProxy;return e("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible,width:"30%","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e}}},[e("span",[this._v("这是一段信息"+this._s(t.hero.name))]),this._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:t.handleClose}},[this._v("取 消")]),this._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.handleClose}},[this._v("确 定")])],1)])}),[],!1,null,"28f328c2",null);t.default=l.exports}}]);