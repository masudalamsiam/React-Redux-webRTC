import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import styles from './call.module.css'

const Call = () => {
    const user = useSelector(state => state.user)
    const { calling_profile } = useSelector(state => state.calling)
    const rtc = useSelector(state => state.RTC)
    const dispatch = useDispatch()
    const Socket = useSelector(state => state.socket)

    useEffect(() => {
        rtc.createOffer({ offerToReceiveAudio: 1, offerToReceiveVideo: 1 })
            .then((sdp) => {
                // set answer sdp as local description
                rtc.setLocalDescription(sdp)
                // console.log(JSON.stringify(sdp))
                const data = {
                    name: user.name, // sender user name
                    client: calling_profile.socket_id, // receive socket id
                    call_back: `call-answer${calling_profile.socket_id}`, // custom callback url
                    RTCSessionDescriptionInit: sdp, // the Session Description
                }
                Socket.send('call', data, (args) => {
                    rtc.setRemoteDescription(new RTCSessionDescription(args.RTCSessionDescriptionInit))
                        .then(() => {
                            rtc.addIceCandidate(new RTCIceCandidate(args.IceCandidate))
                                .catch((error) => {
                                    console.log('addCandidate', error)
                                })
                        })
                        .catch((error) => {
                            console.log('setRemoteDescription', error)
                        })
                    // console.log('call-answer ', args)
                })
            }).catch((error) => {
                console.log('createOffer', error)
            })

        rtc.addEventListener('connectionstatechange', (e) => {
            if (e.currentTarget.connectionState === "connected") {
                console.log('connected')
                dispatch({ type: "CALL-END", payload: { calling_status: false, calling_profile: null } })
            }
        })
    })

    const callEnd = () => {
        dispatch({ type: "CALL-END", payload: { calling_status: false, calling_profile: null } })
    }

    return (
        <div className={styles.calling_modal}>
            <div className={styles.calling_info}>
                <p className={styles.calling_info_name}>{calling_profile.name}</p>
                Connecting...
            </div>
            <button className={styles.calling_end} onClick={callEnd}>End</button>
        </div>
    );
};

export default React.memo(Call)
