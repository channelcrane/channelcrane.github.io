"use strict";(()=>{var e={};e.id=404,e.ids=[404],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},209:e=>{e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},79348:e=>{e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},30412:e=>{e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},55315:e=>{e.exports=require("path")},61027:(e,r,t)=>{t.r(r),t.d(r,{GlobalError:()=>o.a,__next_app__:()=>d,pages:()=>u,routeModule:()=>c,tree:()=>p});var a=t(49442),s=t(10042),n=t(48190),o=t.n(n),i=t(63289),l={};for(let e in i)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>i[e]);t.d(r,l);let p=["",{children:["blog",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,47031)),"/Users/hyunchul/Projects/crane/app/blog/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,31543)),"/Users/hyunchul/Projects/crane/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(t.bind(t,75733)),"/Users/hyunchul/Projects/crane/app/not-found.tsx"]}],u=["/Users/hyunchul/Projects/crane/app/blog/page.tsx"],d={require:t,loadChunk:()=>Promise.resolve()},c=new a.AppPageRouteModule({definition:{kind:s.RouteKind.APP_PAGE,page:"/blog/page",pathname:"/blog",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:p}})},47031:(e,r,t)=>{t.r(r),t.d(r,{default:()=>l,metadata:()=>i});var a=t(47705),s=t(75732),n=t(11973),o=t(73808);let i=(0,t(79174).D)({title:"Blog"});function l(){let e=(0,n.ND)((0,n.O2)(o.R6)),r=e.slice(0,5),t={currentPage:1,totalPages:Math.ceil(e.length/5)};return(0,a.jsx)(s.default,{posts:e,initialDisplayPosts:r,pagination:t,title:"All Posts"})}},79174:(e,r,t)=>{t.d(r,{D:()=>n});var a=t(98687),s=t.n(a);function n({title:e,description:r,image:t,...a}){return{title:e,description:r||s().description,openGraph:{title:`${e} | ${s().title}`,description:r||s().description,url:"./",siteName:s().title,images:t?[t]:[s().socialBanner],locale:"en_US",type:"website"},twitter:{title:`${e} | ${s().title}`,card:"summary_large_image",images:t?[t]:[s().socialBanner]},...a}}}};var r=require("../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),a=r.X(0,[492,908,936,808,449],()=>t(61027));module.exports=a})();