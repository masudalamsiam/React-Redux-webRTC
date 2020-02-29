import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import styles from './connected.module.css'
import Call from '../call/call'
import CallRespond from '../call-respond/call-respond'

const Connected = () => {
    const video = useRef(null)
    const { calling_status } = useSelector(state => state.calling)
    const { incoming_call } = useSelector(state => state.incoming_call)
    const rtc = useSelector(state => state.RTC)
    const users = useSelector(state => state.users)
    const Socket = useSelector(state => state.socket)
    const dispatch = useDispatch()

    useEffect(() => {
        Socket.onError((event) => {
            console.log('onError ', event)
        })
        Socket.send('get-users', null, (event) => {
            dispatch({ type: "SET-USERS", payload: event.users })
        })
        Socket.on('user-connected', ({ name, from }) => {
            dispatch({ type: "ADD-USER", payload: { socket_id: from, name } })
        })
        Socket.on('user-disconnected', ({ from }) => {
            dispatch({ type: "DELETE-USER", payload: from })
        })
        Socket.on('call', (args) => {
            dispatch({ type: "INCOMING-CALL", payload: { incoming_call: true, ...args } })
        })
        rtc.addEventListener('track', ({ streams: [stream] }) => {
            console.log('streams:', stream)
            video.current.srcObject = stream
            video.current.muted = false
        })
        // rtc.addEventListener('iceconnectionstatechange', (e) => {
        //     console.log('IC Connection State Change:', e)
        // })
        rtc.addEventListener('icecandidateerror', (e) => {
            console.log('IC Candidate Error:', e)
        })

        navigator.mediaDevices.getUserMedia({ audio: true, video: { width: 3840, height: 2160 } })
            .then((stream) => {
                video.current.srcObject = stream
                for (const track of stream.getTracks()) {
                    rtc.addTrack(track, stream)
                }
            }).catch((error) => {
                alert(`getUserMedia() error: ${error}`)
            })
    }, [Socket, dispatch, rtc])

    const call = (client) => {
        dispatch({ type: "CALLING", payload: { calling_status: true, calling_profile: client } })
    }

    return (
        <div className={styles.connected}>
            <video className={styles.video} ref={video} autoPlay muted playsInline />
            <div className={styles.user_list}>
                {users.map((user) =>
                    <button key={user.socket_id} onClick={() => call(user)}>
                        Call {user.name}
                    </button>
                )}
            </div>
            {calling_status && <Call />}
            {incoming_call && <CallRespond />}
        </div>
    );
};

export default React.memo(Connected)
