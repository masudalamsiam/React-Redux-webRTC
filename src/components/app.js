import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import LandingPage from './landing-page/landing-page'

const App = () => {
    // const [_socket, setSocket] = useState(null)
    // useEffect(() => {
    //     let socket = new WebSocket('wss://6d6qoei593.execute-api.us-east-2.amazonaws.com/Prod?name=siam mridha')
    //     socket.onmessage = (event) => {
    //         console.log(event)
    //     }

    //     socket.onopen = (event) => {
    //         console.log(event)
    //     }

    //     socket.onerror = (event) => {
    //         console.log(event)
    //     }

    //     socket.onclose = (event) => {
    //         console.log(event)
    //     }

    //     setSocket(socket)
    // }, [])

    // const call = () => {
    //     _socket.send(JSON.stringify({ action: 'sendmessage', data: { 'Test': 'test' } }))
    // }

    // const acceptCall = () => {
    //     _socket.send(JSON.stringify({ action: 'call-accept', data: { 'Test': 'test' } }))
    // }

    // const declineCall = () => {
    //     _socket.send(JSON.stringify({ action: 'call-decline', data: { 'Test': 'test' } }))
    // }

    return (
        <Provider store={store}>
            <LandingPage />
        </Provider>
    );
}

export default App
