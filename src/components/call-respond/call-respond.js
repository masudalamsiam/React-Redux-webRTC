import React from "react";
import { useSelector, useDispatch } from "react-redux"
import styles from './call-respond.module.css'

const CallRespond = (props) => {
    const rtc = useSelector(state => state.RTC)
    const { name, client, call_back, RTCSessionDescriptionInit } = useSelector(state => state.incoming_call)
    const Socket = useSelector(state => state.socket)
    const dispatch = useDispatch()

    const callAccept = () => {
        // retrieve and parse the SDP copied from the remote peer
        // set sdp as remote description
        rtc.setRemoteDescription(new RTCSessionDescription(RTCSessionDescriptionInit))
            .then(() => {
                rtc.createAnswer({ offerToReceiveAudio: 1, offerToReceiveVideo: 1 })
                    .then((sdp) => {
                        // set answer sdp as local description
                        rtc.setLocalDescription(sdp)
                        // console.log(JSON.stringify(sdp))
                        rtc.addEventListener('icecandidate', (e) => {
                            if (e.candidate) {
                                Socket.send(call_back, {
                                    client, // receive socket id
                                    RTCSessionDescriptionInit: sdp, // the Session Description 
                                    IceCandidate: e.candidate,
                                })
                                // console.log('ICE Candidate:', JSON.stringify(e.candidate))
                            }
                        })

                    }).catch((error) => {
                        console.log('createAnswer', error)
                    })
            }).catch((error) => {
                console.log('setRemoteDescription', error)
            })
        rtc.addEventListener('connectionstatechange', (e) => {
            if (e.currentTarget.connectionState === "connected") {
                console.log('connected')
                dispatch({ type: "INCOMING-CALL", payload: { incoming_call: false } })
            }
        })
    }

    const callDecline = () => {
        dispatch({ type: "INCOMING-CALL", payload: { incoming_call: false } })
    }

    return (
        <div className={styles.calling_modal}>
            <div className={styles.calling_info}>
                <p className={styles.calling_info_name}>{name}</p>
                Incoming Calling...
            </div>
            <button className={styles.calling_accept} onClick={callAccept}>Accept</button>
            <button className={styles.calling_decline} onClick={callDecline}>Decline</button>
        </div>
    );
};

export default React.memo(CallRespond)
