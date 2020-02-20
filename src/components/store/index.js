import { createStore } from "redux";
import reducer from "./reducer"

export default createStore(reducer, {
    RTC: new RTCPeerConnection(),
    calling: { calling_status: false, calling_profile: { name: '' } },
    incoming_call: {
        incoming_call: false,
        name: '', // sender user name
        client: '', // receive socket id
        call_back: '', // custom callback url
        RTCSessionDescriptionInit: '' // the Session Description 
    },
    socket: null,
    user: { name: 'Masud Alam', socket_id: null },
    users: [
        { name: 'Siam Mridha', socket_id: 'fdsfsdfsdfsdfsd' },
        { name: 'Kawser Kham', socket_id: 'fdsfsdfsadsdfsdfsd' },
        { name: 'Masud Alam', socket_id: 'fdsfsdfdsafsdfsdfsd' }
    ]
})