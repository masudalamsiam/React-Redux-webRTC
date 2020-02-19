import { createStore } from "redux";
import reducer from "./reducer"

export default createStore(reducer, {
    socket: null,
    user: { name: '', socket_id: null },
    users: []
})