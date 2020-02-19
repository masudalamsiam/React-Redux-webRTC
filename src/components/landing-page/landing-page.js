import React from "react";
import { useDispatch, useSelector } from "react-redux"
import webSocket from '../web-socket-client'
import Connected from '../connected/connected'

const LandingPage = () => {
    const name = useSelector(state => state.user.name)
    const Socket = useSelector(state => state.socket)
    const dispatch = useDispatch()
    const handelConnect = () => {
        if (name) {
            console.log(name)
            const newSocket = webSocket(`wss://6d6qoei593.execute-api.us-east-2.amazonaws.com/Prod/?name=${name}`)
            newSocket.onConnect((e) => {
                console.log('onConnect ', e)
                dispatch({ type: "CREATE-SOCKET-CONNECTION", payload: newSocket })
            })
        }
    }
    const handleChange = (e) => {
        dispatch({
            type: "UPDATE-USER-NAME",
            payload: e.target.value
        })
    }
    return (
        <React.Fragment>
            {Socket ?
                <Connected /> :
                <div>
                    <div>Enter Your Name</div>
                    <input onChange={handleChange} value={name} />
                    <button onClick={handelConnect}>Connect</button>
                </div>
            }
        </React.Fragment >
    );
};

export default React.memo(LandingPage)
