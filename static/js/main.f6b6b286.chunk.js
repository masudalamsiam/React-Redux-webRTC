(this.webpackJsonpwebrtc=this.webpackJsonpwebrtc||[]).push([[0],{17:function(e,n,c){e.exports=c(28)},22:function(e,n,c){},28:function(e,n,c){"use strict";c.r(n);var t=c(0),a=c.n(t),o=c(7),l=c.n(o),i=(c(22),c(1)),r=c(8),s=c(16),u=c(2),d=Object(r.b)((function(e,n){var c=n.type,t=n.payload;switch(c){case"CREATE-SOCKET-CONNECTION":return Object(u.a)({},e,{socket:t});case"UPDATE-USER-NAME":return Object(u.a)({},e,{user:Object(u.a)({},e.user,{name:t})});case"SET-USERS":return Object(u.a)({},e,{users:t});case"ADD-USER":return Object(u.a)({},e,{users:[].concat(Object(s.a)(e.users),[t])});case"DELETE-USER":return Object(u.a)({},e,{users:e.users.filter((function(e){return e.socket_id===t}))});case"CALLING":case"CALL-END":return Object(u.a)({},e,{calling:Object(u.a)({},e.calling,{},t)});case"INCOMING-CALL":return Object(u.a)({},e,{incoming_call:Object(u.a)({},e.incoming_call,{},t)});default:return e}}),{RTC:new RTCPeerConnection,calling:{calling_status:!1,calling_profile:{name:""}},incoming_call:{incoming_call:!1,name:"",client:"",call_back:"",RTCSessionDescriptionInit:""},socket:null,user:{name:"Masud Alam",socket_id:null},users:[{name:"Siam Mridha",socket_id:"fdsfsdfsdfsdfsd"},{name:"Kawser Kham",socket_id:"fdsfsdfsadsdfsdfsd"},{name:"Masud Alam",socket_id:"fdsfsdfdsafsdfsdfsd"}]}),f=a.a.memo((function(e){var n=Object(i.c)((function(e){return e.user.name})),c=Object(i.c)((function(e){return e.socket})),t=Object(i.b)();return a.a.createElement(a.a.Fragment,null,c?e.children:a.a.createElement("div",null,a.a.createElement("div",null,"Enter Your Name"),a.a.createElement("input",{onChange:function(e){t({type:"UPDATE-USER-NAME",payload:e.target.value})},value:n}),a.a.createElement("button",{onClick:function(){if(n){console.log(n);var e=function(e){var n=new WebSocket(e),c=function(e,c,t){n.onmessage=function(e){try{var n=JSON.parse(e.data);if(c&&n.action){var t=new CustomEvent(n.action,{detail:{data:n.data,event:e}});window.dispatchEvent(t)}}catch(a){}},window.addEventListener(e,(function n(a){var o=a.detail,l=o.data,i=o.event;c(l,i),t&&window.removeEventListener(e,n)}))};return{on:c,send:function(e,t,a){var o="".concat(t&&t.call_back?t.call_back:"".concat(e,"callback"));t=Object(u.a)({},t,{call_back:o}),n.send(JSON.stringify({action:e,data:t})),a&&c(o,a,!0)},onConnect:function(e){n.onopen=function(n){e(n)}},onClose:function(e){n.onclose=function(n){e(n)}},onError:function(e){n.onerror=function(n){e(n)}}}}("wss://6d6qoei593.execute-api.us-east-2.amazonaws.com/Prod/?name=".concat(n));e.onConnect((function(n){console.log("onConnect ",n),t({type:"CREATE-SOCKET-CONNECTION",payload:e})}))}}},"Connect")))})),m=c(15),_=c(9),g=c.n(_),E=c(6),p=c.n(E),b=a.a.memo((function(){var e=Object(i.c)((function(e){return e.user})),n=Object(i.c)((function(e){return e.calling})).calling_profile,c=Object(i.c)((function(e){return e.RTC})),o=Object(i.b)(),l=Object(i.c)((function(e){return e.socket}));Object(t.useEffect)((function(){c.createOffer({offerToReceiveVideo:1}).then((function(t){c.setLocalDescription(t);var a={name:e.name,client:n.socket_id,call_back:"call-answer".concat(n.socket_id),RTCSessionDescriptionInit:t};l.send("call",a,(function(e){c.setRemoteDescription(new RTCSessionDescription(e.RTCSessionDescriptionInit)).then((function(){c.addIceCandidate(new RTCIceCandidate(e.IceCandidate)).catch((function(e){console.log("addCandidate",e)}))})).catch((function(e){console.log("setRemoteDescription",e)}))}))})).catch((function(e){console.log("createOffer",e)})),c.addEventListener("connectionstatechange",(function(e){"connected"===e.currentTarget.connectionState&&(console.log("connected"),o({type:"CALL-END",payload:{calling_status:!1,calling_profile:null}}))}))}));return a.a.createElement("div",{className:p.a.calling_modal},a.a.createElement("div",{className:p.a.calling_info},a.a.createElement("p",{className:p.a.calling_info_name},n.name),"Connecting..."),a.a.createElement("button",{className:p.a.calling_end,onClick:function(){o({type:"CALL-END",payload:{calling_status:!1,calling_profile:null}})}},"End"))})),C=c(5),v=c.n(C),O=a.a.memo((function(e){var n=Object(i.c)((function(e){return e.RTC})),c=Object(i.c)((function(e){return e.incoming_call})),t=c.name,o=c.client,l=c.call_back,r=c.RTCSessionDescriptionInit,s=Object(i.c)((function(e){return e.socket})),u=Object(i.b)();return a.a.createElement("div",{className:v.a.calling_modal},a.a.createElement("div",{className:v.a.calling_info},a.a.createElement("p",{className:v.a.calling_info_name},t),"Incoming Calling..."),a.a.createElement("button",{className:v.a.calling_accept,onClick:function(){n.setRemoteDescription(new RTCSessionDescription(r)).then((function(){n.createAnswer({offerToReceiveVideo:1}).then((function(e){n.setLocalDescription(e),n.addEventListener("icecandidate",(function(n){n.candidate&&s.send(l,{client:o,RTCSessionDescriptionInit:e,IceCandidate:n.candidate})}))})).catch((function(e){console.log("createAnswer",e)}))})).catch((function(e){console.log("setRemoteDescription",e)})),n.addEventListener("connectionstatechange",(function(e){"connected"===e.currentTarget.connectionState&&(console.log("connected"),u({type:"INCOMING-CALL",payload:{incoming_call:!1}}))}))}},"Accept"),a.a.createElement("button",{className:v.a.calling_decline,onClick:function(){u({type:"INCOMING-CALL",payload:{incoming_call:!1}})}},"Decline"))})),j=a.a.memo((function(){var e=Object(t.useRef)(null),n=Object(i.c)((function(e){return e.calling})).calling_status,c=Object(i.c)((function(e){return e.incoming_call})).incoming_call,o=Object(i.c)((function(e){return e.RTC})),l=Object(i.c)((function(e){return e.users})),r=Object(i.c)((function(e){return e.socket})),s=Object(i.b)();Object(t.useEffect)((function(){r.onError((function(e){console.log("onError ",e)})),r.send("get-users",null,(function(e){s({type:"SET-USERS",payload:e.users})})),r.on("user-connected",(function(e){var n=e.name,c=e.from;s({type:"ADD-USER",payload:{socket_id:c,name:n}})})),r.on("user-disconnected",(function(e){var n=e.from;s({type:"DELETE-USER",payload:n})})),r.on("call",(function(e){s({type:"INCOMING-CALL",payload:Object(u.a)({incoming_call:!0},e)})})),o.addEventListener("track",(function(n){var c=Object(m.a)(n.streams,1)[0];console.log("streams:",c),e.current.srcObject=c,e.current.muted=!1})),o.addEventListener("icecandidateerror",(function(e){console.log("IC Candidate Error:",e)})),navigator.mediaDevices.getUserMedia({audio:!0,video:!0}).then((function(n){e.current.srcObject=n;var c=!0,t=!1,a=void 0;try{for(var l,i=n.getTracks()[Symbol.iterator]();!(c=(l=i.next()).done);c=!0){var r=l.value;o.addTrack(r,n)}}catch(s){t=!0,a=s}finally{try{c||null==i.return||i.return()}finally{if(t)throw a}}})).catch((function(e){alert("getUserMedia() error: ".concat(e))}))}),[r,s,o]);return a.a.createElement("div",{className:g.a.connected},a.a.createElement("video",{className:g.a.video,ref:e,autoPlay:!0,muted:!0}),a.a.createElement("div",{className:g.a.user_list},l.map((function(e){return a.a.createElement("button",{key:e.socket_id,onClick:function(){s({type:"CALLING",payload:{calling_status:!0,calling_profile:e}})}},"Call ",e.name)}))),n&&a.a.createElement(b,null),c&&a.a.createElement(O,null))})),N=function(){return a.a.createElement(i.a,{store:d},a.a.createElement(f,null,a.a.createElement(j,null)))},k=document.getElementById("root");l.a.render(a.a.createElement(N,null),k)},5:function(e,n,c){e.exports={calling_modal:"call-respond_calling_modal__2-Um5",calling_info:"call-respond_calling_info__3AiDw",calling_info_name:"call-respond_calling_info_name__2AcYm",calling_accept:"call-respond_calling_accept__1KCtJ",calling_decline:"call-respond_calling_decline__29uPU"}},6:function(e,n,c){e.exports={calling_modal:"call_calling_modal__2mgzD",calling_info:"call_calling_info__3WoZA",calling_info_name:"call_calling_info_name__4iY9T",calling_end:"call_calling_end__3nvRh"}},9:function(e,n,c){e.exports={connected:"connected_connected__3IFXd",video:"connected_video__2HNgJ",user_list:"connected_user_list__2qh8p"}}},[[17,1,2]]]);
//# sourceMappingURL=main.f6b6b286.chunk.js.map