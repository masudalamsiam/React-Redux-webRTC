(this.webpackJsonpwebrtc=this.webpackJsonpwebrtc||[]).push([[0],{17:function(e,n,t){e.exports=t(28)},22:function(e,n,t){},28:function(e,n,t){"use strict";t.r(n);var c=t(0),a=t.n(c),o=t(7),i=t.n(o),l=(t(22),t(1)),r=t(8),s=t(16),u=t(2),d=Object(r.b)((function(e,n){var t=n.type,c=n.payload;switch(t){case"CREATE-SOCKET-CONNECTION":return Object(u.a)({},e,{socket:c});case"UPDATE-USER-NAME":return Object(u.a)({},e,{user:Object(u.a)({},e.user,{name:c})});case"SET-USERS":return Object(u.a)({},e,{users:c});case"ADD-USER":return Object(u.a)({},e,{users:[].concat(Object(s.a)(e.users),[c])});case"DELETE-USER":return Object(u.a)({},e,{users:e.users.filter((function(e){return e.socket_id===c}))});case"CALLING":case"CALL-END":return Object(u.a)({},e,{calling:Object(u.a)({},e.calling,{},c)});case"INCOMING-CALL":return Object(u.a)({},e,{incoming_call:Object(u.a)({},e.incoming_call,{},c)});default:return e}}),{RTC:new RTCPeerConnection,calling:{calling_status:!1,calling_profile:{name:""}},incoming_call:{incoming_call:!1,name:"",client:"",call_back:"",RTCSessionDescriptionInit:""},socket:null,user:{name:"Masud Alam",socket_id:null},users:[{name:"Siam Mridha",socket_id:"fdsfsdfsdfsdfsd"},{name:"Kawser Kham",socket_id:"fdsfsdfsadsdfsdfsd"},{name:"Masud Alam",socket_id:"fdsfsdfdsafsdfsdfsd"}]}),f=a.a.memo((function(e){var n=Object(l.c)((function(e){return e.user.name})),t=Object(l.c)((function(e){return e.socket})),c=Object(l.b)();return a.a.createElement(a.a.Fragment,null,t?e.children:a.a.createElement("div",null,a.a.createElement("div",null,"Enter Your Name"),a.a.createElement("input",{onChange:function(e){c({type:"UPDATE-USER-NAME",payload:e.target.value})},value:n}),a.a.createElement("button",{onClick:function(){if(n){console.log(n);var e=function(e){var n=new WebSocket(e),t=function(e,t,c){n.onmessage=function(e){try{var n=JSON.parse(e.data);if(t&&n.action){var c=new CustomEvent(n.action,{detail:{data:n.data,event:e}});window.dispatchEvent(c)}}catch(a){}},window.addEventListener(e,(function n(a){var o=a.detail,i=o.data,l=o.event;t(i,l),c&&window.removeEventListener(e,n)}))};return{on:t,send:function(e,c,a){var o="".concat(c&&c.call_back?c.call_back:"".concat(e,"callback"));c=Object(u.a)({},c,{call_back:o}),n.send(JSON.stringify({action:e,data:c})),a&&t(o,a,!0)},onConnect:function(e){n.onopen=function(n){e(n)}},onClose:function(e){n.onclose=function(n){e(n)}},onError:function(e){n.onerror=function(n){e(n)}}}}("wss://6d6qoei593.execute-api.us-east-2.amazonaws.com/Prod/?name=".concat(n));e.onConnect((function(n){console.log("onConnect ",n),c({type:"CREATE-SOCKET-CONNECTION",payload:e})}))}}},"Connect")))})),m=t(15),_=t(9),g=t.n(_),E=t(6),p=t.n(E),b=a.a.memo((function(){var e=Object(l.c)((function(e){return e.user})),n=Object(l.c)((function(e){return e.calling})).calling_profile,t=Object(l.c)((function(e){return e.RTC})),o=Object(l.b)(),i=Object(l.c)((function(e){return e.socket}));Object(c.useEffect)((function(){t.createOffer({offerToReceiveVideo:1}).then((function(c){t.setLocalDescription(c);var a={name:e.name,client:n.socket_id,call_back:"call-answer".concat(n.socket_id),RTCSessionDescriptionInit:c};i.send("call",a,(function(e){t.setRemoteDescription(new RTCSessionDescription(e.RTCSessionDescriptionInit)).then((function(){t.addIceCandidate(new RTCIceCandidate(e.IceCandidate)).catch((function(e){console.log("addCandidate",e)}))})).catch((function(e){console.log("setRemoteDescription",e)}))}))})).catch((function(e){console.log("createOffer",e)})),t.addEventListener("connectionstatechange",(function(e){"connected"===e.currentTarget.connectionState&&(console.log("connected"),o({type:"CALL-END",payload:{calling_status:!1,calling_profile:null}}))}))}));return a.a.createElement("div",{className:p.a.calling_modal},a.a.createElement("div",{className:p.a.calling_info},a.a.createElement("p",{className:p.a.calling_info_name},n.name),"Connecting..."),a.a.createElement("button",{className:p.a.calling_end,onClick:function(){o({type:"CALL-END",payload:{calling_status:!1,calling_profile:null}})}},"End"))})),C=t(5),v=t.n(C),O=a.a.memo((function(e){var n=Object(l.c)((function(e){return e.RTC})),t=Object(l.c)((function(e){return e.incoming_call})),c=t.name,o=t.client,i=t.call_back,r=t.RTCSessionDescriptionInit,s=Object(l.c)((function(e){return e.socket})),u=Object(l.b)();return a.a.createElement("div",{className:v.a.calling_modal},a.a.createElement("div",{className:v.a.calling_info},a.a.createElement("p",{className:v.a.calling_info_name},c),"Incoming Calling..."),a.a.createElement("button",{className:v.a.calling_accept,onClick:function(){n.setRemoteDescription(new RTCSessionDescription(r)).then((function(){n.createAnswer({offerToReceiveVideo:1}).then((function(e){n.setLocalDescription(e),n.addEventListener("icecandidate",(function(n){n.candidate&&s.send(i,{client:o,RTCSessionDescriptionInit:e,IceCandidate:n.candidate})}))})).catch((function(e){console.log("createAnswer",e)}))})).catch((function(e){console.log("setRemoteDescription",e)})),n.addEventListener("connectionstatechange",(function(e){"connected"===e.currentTarget.connectionState&&(console.log("connected"),u({type:"INCOMING-CALL",payload:{incoming_call:!1}}))}))}},"Accept"),a.a.createElement("button",{className:v.a.calling_decline,onClick:function(){u({type:"INCOMING-CALL",payload:{incoming_call:!1}})}},"Decline"))})),j=a.a.memo((function(){var e=Object(c.useRef)(null),n=Object(l.c)((function(e){return e.calling})).calling_status,t=Object(l.c)((function(e){return e.incoming_call})).incoming_call,o=Object(l.c)((function(e){return e.RTC})),i=Object(l.c)((function(e){return e.users})),r=Object(l.c)((function(e){return e.socket})),s=Object(l.b)();Object(c.useEffect)((function(){r.onError((function(e){console.log("onError ",e)})),r.send("get-users",null,(function(e){s({type:"SET-USERS",payload:e.users})})),r.on("user-connected",(function(e){var n=e.name,t=e.from;s({type:"ADD-USER",payload:{socket_id:t,name:n}})})),r.on("user-disconnected",(function(e){var n=e.from;s({type:"DELETE-USER",payload:n})})),r.on("call",(function(e){s({type:"INCOMING-CALL",payload:Object(u.a)({incoming_call:!0},e)})})),o.addEventListener("track",(function(n){var t=Object(m.a)(n.streams,1)[0];console.log("streams:",t),e.current.srcObject=t,e.current.muted=!1})),o.addEventListener("icecandidateerror",(function(e){console.log("IC Candidate Error:",e)})),navigator.mediaDevices.getUserMedia({audio:!0,video:{height:window.outerHeight}}).then((function(n){e.current.srcObject=n,e.current.setAttribute("playsinline",!0),e.current.setAttribute("controls",!0),e.current.onloadedmetadata=function(n){e.current.play()};var t=!0,c=!1,a=void 0;try{for(var i,l=n.getTracks()[Symbol.iterator]();!(t=(i=l.next()).done);t=!0){var r=i.value;o.addTrack(r,n)}}catch(s){c=!0,a=s}finally{try{t||null==l.return||l.return()}finally{if(c)throw a}}})).catch((function(e){alert("getUserMedia() error: ".concat(e))}))}),[r,s,o]);return a.a.createElement("div",{className:g.a.connected},a.a.createElement("video",{className:g.a.video,ref:e,autoPlay:!0,muted:!0}),a.a.createElement("div",{className:g.a.user_list},i.map((function(e){return a.a.createElement("button",{key:e.socket_id,onClick:function(){s({type:"CALLING",payload:{calling_status:!0,calling_profile:e}})}},"Call ",e.name)}))),n&&a.a.createElement(b,null),t&&a.a.createElement(O,null))})),N=function(){return a.a.createElement(l.a,{store:d},a.a.createElement(f,null,a.a.createElement(j,null)))},y=document.getElementById("root");i.a.render(a.a.createElement(N,null),y)},5:function(e,n,t){e.exports={calling_modal:"call-respond_calling_modal__2-Um5",calling_info:"call-respond_calling_info__3AiDw",calling_info_name:"call-respond_calling_info_name__2AcYm",calling_accept:"call-respond_calling_accept__1KCtJ",calling_decline:"call-respond_calling_decline__29uPU"}},6:function(e,n,t){e.exports={calling_modal:"call_calling_modal__2mgzD",calling_info:"call_calling_info__3WoZA",calling_info_name:"call_calling_info_name__4iY9T",calling_end:"call_calling_end__3nvRh"}},9:function(e,n,t){e.exports={connected:"connected_connected__3IFXd",video:"connected_video__2HNgJ",user_list:"connected_user_list__2qh8p"}}},[[17,1,2]]]);
//# sourceMappingURL=main.71077d3e.chunk.js.map