(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[0],{19:function(e,t,n){},26:function(e,t,n){e.exports=n(46)},31:function(e,t,n){},32:function(e,t,n){},46:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(6),o=n.n(c),u=(n(31),n(32),n(9));function s(e,t){return e.dayOfMonth===t.dayOfMonth&&e.month===t.month&&e.year===t.year}var i=n(5),l=n(3),p=n.n(l),d=n(4),f=n(2),m=n(23),h=function(){var e="https://mithril-almanac.azurewebsites.net/api/";e?e.endsWith("/")||(e+="/"):console.log("YOU MUST ADD THE FUNCTION BASE ADDRESS TO THE ENV FILE!");return e}();function v(e,t){return y.apply(this,arguments)}function y(){return(y=Object(d.a)(p.a.mark((function e(t,n){var r,a,c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=w(h+t,n),a={method:"GET"},e.next=4,O(r,a);case 4:return c=e.sent,e.abrupt("return",c);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function b(e,t){return E.apply(this,arguments)}function E(){return(E=Object(d.a)(p.a.mark((function e(t,n){var r,a,c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=w(h+t),a={method:"POST",body:JSON.stringify(n),headers:{"Content-Type":"application/json"}},e.next=4,O(r,a);case 4:return c=e.sent,e.abrupt("return",c);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(e,t){return j.apply(this,arguments)}function j(){return(j=Object(d.a)(p.a.mark((function e(t,n){var r,a,c,o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t,n);case 2:if(200!==(r=e.sent).status){e.next=21;break}if(!g(r)){e.next=18;break}return e.prev=5,e.next=8,r.json();case 8:return a=e.sent,e.abrupt("return",{success:!0,value:a});case 12:return e.prev=12,e.t0=e.catch(5),c={message:"ERR 1: Something went wrong parsing the Response JSON",status:r.status},e.abrupt("return",{success:!1,value:c});case 16:e.next=19;break;case 18:return e.abrupt("return",{success:!0,value:void 0});case 19:e.next=26;break;case 21:return console.log("Get the error obj",r),e.next=24,k(r);case 24:return o=e.sent,e.abrupt("return",{success:!1,value:o});case 26:case"end":return e.stop()}}),e,null,[[5,12]])})))).apply(this,arguments)}function w(e,t){var n=e;t&&(n=n+"?"+Object.keys(t).filter((function(e){return"undefined"!==typeof t[e]&&null!==t[e]})).map((function(e){var n=t[e];return n="[object Date]"===Object.prototype.toString.call(n)?n.toISOString():encodeURIComponent(n),encodeURIComponent(e)+"="+n})).join("&"));return n}function g(e){var t=e.headers.get("content-type");return!(!t||-1===t.indexOf("application/json"))}function k(e){return T.apply(this,arguments)}function T(){return(T=Object(d.a)(p.a.mark((function e(t){var n,r,a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.headers.get("content-type"),r={message:x(t.status),status:t.status},!n||!n.includes("application/json")){e.next=14;break}return e.prev=3,e.next=6,t.json();case 6:a=e.sent,r.message=a.message,a.errors&&(r.errors=a.errors),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(3),console.log("There was an exception parsing the error object",t,e.t0);case 14:return e.abrupt("return",r);case 15:case"end":return e.stop()}}),e,null,[[3,11]])})))).apply(this,arguments)}function x(e){return 401===e?"There was an unknown error with your request. Please make sure you are logged in.":"There was an unknown error with your request. Status code: "+e}function S(){return P.apply(this,arguments)}function P(){return(P=Object(d.a)(p.a.mark((function e(){var t,n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v("GetCalendar",{id:"9a865260-1f8f-11ea-97ed-9555018c1b02"});case 2:if(!(t=e.sent).success){e.next=8;break}if(n=t.value){e.next=7;break}return e.abrupt("return",void 0);case 7:return e.abrupt("return",n);case 8:return e.abrupt("return",void 0);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function N(e){return D.apply(this,arguments)}function D(){return(D=Object(d.a)(p.a.mark((function e(t){var n,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v("GetCalendarEvents",{id:t});case 2:if(!(n=e.sent).success){e.next=8;break}if(r=n.value){e.next=7;break}return e.abrupt("return",[]);case 7:return e.abrupt("return",r);case 8:return e.abrupt("return",[]);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function C(e){return M.apply(this,arguments)}function M(){return(M=Object(d.a)(p.a.mark((function e(t){var n,r,a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b("UpdateEvent",t);case 2:n=e.sent,console.log("NEW EVENT",n),n.success&&(r=n.value)&&(A.events.find((function(e){return e.id===r.id}))?(a=A.events.filter((function(e){return e.id!==r.id})),A.events=[r].concat(Object(m.a)(a))):A.events.push(r));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var Y=Object(f.k)({calendar:{id:"__BLANK__",currentYear:-1,months:[],weekLength:7},currentYear:-1,selectedDay:void 0,events:[],incrementYear:function(){return Y.currentYear++},decrementYear:function(){return Y.currentYear--},calendarEventEditId:""});function I(){return(I=Object(d.a)(p.a.mark((function e(){var t,n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S();case 2:if(!(t=e.sent)){e.next=11;break}return Y.calendar=t,-1===Y.currentYear&&(Y.currentYear=t.currentYear),e.next=8,N(t.id);case 8:n=e.sent,console.log("MY EVENTS",n),Y.events=n;case 11:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){I.apply(this,arguments)}();var A=Y,L=n(11),U=n(20),_=n(21),B=n(24),R=n(22),W=n(25);function G(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function J(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?G(Object(n),!0).forEach((function(t){Object(L.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):G(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var K=function(e){function t(){var e,n;Object(U.a)(this,t);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(n=Object(B.a)(this,(e=Object(R.a)(t)).call.apply(e,[this].concat(a)))).shouldShortPress=!0,n.moved=!1,n.state={touch:!0},n.startTimeout=function(){n.timeout=setTimeout(n.longPressed,n.props.time)},n.longPressed=function(){n.shouldShortPress=!1,n.props.onLongPress&&!1===n.moved&&n.props.onLongPress()},n.cancelTimeout=function(){clearTimeout(n.timeout)},n.onTouchStart=function(e){n.shouldShortPress=!0,n.moved=!1,n.startTimeout(),"function"===typeof n.props.onTouchStart&&n.props.onTouchStart(e)},n.onTouchEnd=function(e){n.cancelTimeout(),n.props.onPress&&n.shouldShortPress&&!1===n.moved&&n.props.onPress(),"function"===typeof n.props.onTouchEnd&&n.props.onTouchEnd(e)},n.onTouchCancel=function(e){n.cancelTimeout(),"function"===typeof n.props.onTouchCancel&&n.props.onTouchCancel(e)},n.onMove=function(e){n.moved=!0,"function"===typeof n.props.onTouchMove&&n.props.onTouchMove(e)},n}return Object(W.a)(t,e),Object(_.a)(t,[{key:"componentDidMount",value:function(){try{document.createEvent("TouchEvent")}catch(e){this.setState({touch:!1})}}},{key:"componentWillUnmount",value:function(){this.cancelTimeout()}},{key:"render",value:function(){var e=this.props,t=e.children,n=e.disabled;if(!this.state.touch||n)return t;var r={onContextMenu:function(e){return e.preventDefault()},onTouchStart:this.onTouchStart,onTouchEnd:this.onTouchEnd,onTouchMove:this.onMove,onTouchCancel:this.onTouchCancel,style:J({},t.props.style,{WebkitUserSelect:"none",WebkitTouchCallout:"none"})};return a.a.cloneElement(t,J({},t.props,{},r))}}]),t}(r.Component);K.defaultProps={time:500};var q=K,V=Object(i.a)((function(e){var t=A.events.filter((function(t){return s(t.fantasyDate,e.date)})),n=Object(r.useState)(!1),c=Object(u.a)(n,2),o=c[0],i=c[1],l=-1;var p=0===t.length?"day":"day has-events";return a.a.createElement(q,{time:500,onPress:function(){return i(!1)},onLongPress:function(){return i(!0)}},a.a.createElement("div",{className:p,onMouseEnter:function(){l=window.setTimeout((function(){l>0&&clearTimeout(l),i(!0)}),100)},onClick:function(){return A.selectedDay=e.date},onMouseLeave:function(){clearTimeout(l),i(!1)}},a.a.createElement("div",null,e.date.dayOfMonth),a.a.createElement("div",{className:o&&t.length?"day-events":"hide"},t.map((function(e){return a.a.createElement("div",{key:e.id},e.name)})))))}));var z=Object(i.a)((function(e){var t,n,r=A.calendar.months[e.monthNumber-1],c=Array.from({length:r.days},(function(e,t){return t+1})),o=(t=c,n=A.calendar.weekLength,t.reduce((function(e,t,r){var a=Math.floor(r/n);return e[a]||(e[a]=[]),e[a].push(t),e}),[]));return a.a.createElement("div",{className:"month"},a.a.createElement("div",null,r.name),a.a.createElement("div",{className:"month-days"},o.map((function(t,n){return a.a.createElement("div",{key:n,className:"week"},t.map((function(t,n){var r={year:A.currentYear,dayOfMonth:t,month:e.monthNumber};return a.a.createElement(V,{key:n,date:r})})))}))))})),F=n(13),H=n.n(F),$=(n(19),n(7)),Q=n(8);function X(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Z(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?X(Object(n),!0).forEach((function(t){Object(L.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):X(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var ee=Object(i.a)((function(e){var t=Object(r.useState)(e.event.name),n=Object(u.a)(t,2),c=n[0],o=n[1],s=Object(r.useState)(e.event.description),i=Object(u.a)(s,2),l=i[0],f=i[1];function m(){return(m=Object(d.a)(p.a.mark((function e(t){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:13===t.keyCode&&t.ctrlKey&&h();case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function h(){return v.apply(this,arguments)}function v(){return(v=Object(d.a)(p.a.mark((function t(){var n;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return A.calendarEventEditId="",n=Z({},e.event,{name:c,description:l}),t.next=4,C(n);case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return A.calendarEventEditId!==e.event.id?a.a.createElement("div",null,a.a.createElement("h3",null,c,"\xa0",a.a.createElement($.a,{icon:Q.c,onClick:function(){A.calendarEventEditId=e.event.id}})),a.a.createElement("div",{className:"event-description"},l.split("\n").map((function(e,t){return a.a.createElement("div",{style:{marginBottom:5},key:t},e)})))):a.a.createElement("div",{className:"edit-event-area"},a.a.createElement("div",null,a.a.createElement("input",{style:{fontSize:18},type:"string",value:c,onChange:function(e){return o(e.target.value)}})),a.a.createElement("textarea",{value:l,onKeyDown:function(e){return function(e){return m.apply(this,arguments)}(e)},onChange:function(e){return f(e.target.value)}}),a.a.createElement("button",{onClick:function(){return h()}},"Save"))}));var te=Object(i.a)((function(e){var t,n=A.calendar.months[e.date.month-1].name,r=A.events.filter((function(t){return s(e.date,t.fantasyDate)}));return a.a.createElement("div",{className:"day-detail"},a.a.createElement("h2",null,"".concat(n," ").concat((t=e.date.dayOfMonth,1===t?"1st":2===t?"2nd":3===t?"3rd":t+"th"),", ").concat(e.date.year)),a.a.createElement("div",null,r.map((function(e){return a.a.createElement("div",{key:e.id},a.a.createElement(ee,{defaultEdit:!e.id,event:e}))}))),!A.calendarEventEditId&&a.a.createElement("button",{onClick:function(){A.events.push({calendarId:A.calendar.id,fantasyDate:e.date,name:"Title",description:"",realDate:void 0,id:""})},className:"add-event-button"},a.a.createElement("span",null,"Add New Event")))})),ne=Object(i.a)((function(){var e=document.getElementById("calendar");return e&&H.a.setAppElement(e),a.a.createElement("div",{className:"calendar",id:"calendar"},a.a.createElement("div",{className:"year-header"},a.a.createElement($.a,{icon:Q.a,onClick:function(){return A.decrementYear()}}),a.a.createElement("span",{className:"year-number"},A.currentYear),a.a.createElement($.a,{icon:Q.b,onClick:function(){return A.incrementYear()}})),a.a.createElement("div",{className:"calendar-months"},A.calendar.months.map((function(e){return a.a.createElement(z,{key:e.position,monthNumber:e.position})}))),A.selectedDay&&a.a.createElement(H.a,{className:"event-modal",isOpen:!!A.selectedDay,onRequestClose:function(){return A.selectedDay=void 0,void(A.calendarEventEditId="")}},a.a.createElement(te,{date:A.selectedDay})))})),re=Object(i.a)((function(){return"__BLANK__"===A.calendar.id?a.a.createElement("div",null,"Loading..."):a.a.createElement("div",{className:"App",id:"app"},a.a.createElement("div",{className:"content"},a.a.createElement(ne,null)))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(re,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[26,1,2]]]);
//# sourceMappingURL=main.f962694f.chunk.js.map