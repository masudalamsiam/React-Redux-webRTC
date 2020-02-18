import React, { useEffect, useState } from "react";
import webSocket from './web-socket-client'

const App = () => {
    const [socket, setSocket] = useState(null)
    useEffect(() => {
        let Socket = webSocket("wss://lmwtkfmvhh.execute-api.us-east-2.amazonaws.com/Prod/")
        Socket.onConnect((event) => {
            console.log('onConnect ', event)
        })
        Socket.onError((event) => {
            console.log('onError ', event)
        })
        Socket.onClose((event) => {
            console.log('onClose ', event)
        })

        Socket.on('user-disconnected', (args) => {
            console.log('user-disconnected ', args)
        })

        Socket.on('user-connected', (args) => {
            console.log('user-connected ', args)
        })

        Socket.on('call', (args) => {
            console.log('incoming-call ', args)
        })

        Socket.on('call-accept', (args) => {
            console.log('accept ', args)
        })

        Socket.on('call-decline', (args) => {
            console.log('decline ', args)
        })

        setSocket(Socket)
    }, [])

    const call = () => {
        socket.sendTo('call', 'IFMdRfIiCYcCFjw=', { 'Test': 'test' }, (args) => {
            console.log('call ', args)
        })
    }

    const acceptCall = () => {
        socket.sendTo('call-accept', 'test', (args) => {
            console.log('call-accept ', args)
        })
    }

    const declineCall = () => {
        socket.sendTo('call-decline', 'test', (args) => {
            console.log('call-decline ', args)
        })
    }

    return (
        <div>
            <div>LandingPage</div>
            <button onClick={call}>Call</button>
            <button onClick={acceptCall}>Accept Call</button>
            <button onClick={declineCall}>Decline Call</button>
        </div>
    );
}

export default App
