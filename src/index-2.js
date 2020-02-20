import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function App() {
    const localVideo = useRef(null)
    const remoteVideo = useRef(null)
    const textRef = useRef(null)
    const pc = new RTCPeerConnection()
    pc.addEventListener('icecandidate', (e) => {
        if (e.candidate) {
            console.log('ICE Candidate:', JSON.stringify(e.candidate))
        }
    })
    pc.addEventListener('iceconnectionstatechange', (e) => { console.log('IC Connection State Change:', e) })
    pc.addEventListener('icecandidateerror', (e) => { console.log('IC Candidate Error:', e) })
    pc.addEventListener('track', ({ streams: [stream] }) => { remoteVideo.current.srcObject = stream })
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then((stream) => {
                localVideo.current.srcObject = stream
                // pc.addStream(stream)
                for (const track of stream.getTracks()) {
                    pc.addTrack(track, stream)
                }
            }).catch((error) => {
                alert(`getUserMedia() error: ${error}`)
            })
    })

    const createOffer = () => {
        console.log('Offer')
        // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer
        // initiates the creation of SDP
        pc.createOffer({ offerToReceiveVideo: 1 })
            .then(sdp => {
                console.log(JSON.stringify(sdp))
                // set offer sdp as local description
                pc.setLocalDescription(sdp)
            }).catch((error) => {
                console.log('createOffer', error)
            })
    }

    const createAnswer = () => {
        console.log('Answer')
        pc.createAnswer({ offerToReceiveVideo: 1 })
            .then(sdp => {
                console.log(JSON.stringify(sdp))
                // set answer sdp as local description
                pc.setLocalDescription(sdp)
            }).catch((error) => {
                console.log('createAnswer', error)
            })
    }

    const setRemoteDescription = () => {
        // retrieve and parse the SDP copied from the remote peer
        const desc = JSON.parse(textRef.current.value)
        // set sdp as remote description
        pc.setRemoteDescription(new RTCSessionDescription(desc)).then(() => {
            pc.createAnswer({ offerToReceiveVideo: 1 })
                .then(sdp => {
                    console.log(JSON.stringify(sdp))
                    // set answer sdp as local description
                    pc.setLocalDescription(sdp)
                }).catch((error) => {
                    console.log('createAnswer', error)
                })
        })
            .catch((error) => {
                console.log('setRemoteDescription', error)
            })
    }

    const addCandidate = () => {
        // retrieve and parse the Candidate copied from the remote peer
        const candidate = JSON.parse(textRef.current.value)
        // add the candidate to the peer connection
        pc.addIceCandidate(new RTCIceCandidate(candidate))
            .catch((error) => {
                console.log('addCandidate', error)
            })
    }

    return (
        <div className="App">
            <video className="localVideo" ref={localVideo} autoPlay muted />
            <video className="remoteVideo" ref={remoteVideo} autoPlay />
            <button onClick={createOffer}>Offer</button>
            <button onClick={createAnswer}>Answer</button>
            <button onClick={setRemoteDescription}>Set Remote Desc</button>
            <button onClick={addCandidate}>Add Candidate</button>
            <textarea ref={textRef} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));