import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

const Connected = () => {
    const name = useSelector(state => state.user.name)
    const users = useSelector(state => state.users)
    const Socket = useSelector(state => state.socket)
    const dispatch = useDispatch()

    useEffect(() => {
        Socket.onError((event) => {
            console.log('onError ', event)
        })
        Socket.send('get-users', '', (event) => {
            dispatch({ type: "SET-USERS", payload: event.users })
        })
        Socket.on('user-connected', ({ name, from }) => {
            dispatch({ type: "ADD-USER", payload: { socket_id: from, name } })
        })
        Socket.on('user-disconnected', ({ from }) => {
            dispatch({ type: "DELETE-USER", payload: from })
        })
        Socket.on('call', (args) => {
            alert(`call from: ${args}`)
        })
        Socket.on('call-accept', (args) => {
            alert(`call-accept: ${args}`)
        })
        Socket.on('call-decline', (args) => {
            alert(`call-decline: ${args}`)
        })
    }, [Socket, dispatch])

    const call = (client) => {
        console.log(client)
        Socket.sendTo('call', client, 'test', (args) => {
            console.log('call ', args)
        })
    }

    const acceptCall = (client) => {
        Socket.sendTo('call-accept', client, 'test', (args) => {
            console.log('call-accept ', args)
        })
    }

    const declineCall = (client) => {
        Socket.sendTo('call-decline', client, 'test', (args) => {
            console.log('call-decline ', args)
        })
    }

    return (
        <div>
            <div>Hello {name} you are now connected.</div>
            <button onClick={acceptCall}>Accept Call</button>
            <button onClick={declineCall}>Decline Call</button>
            {users.map((user) =>
                <button key={user.socket_id} onClick={() => call(user.socket_id)}>
                    Call {user.name}
                </button>
            )}
        </div>
    );
};

export default React.memo(Connected)
