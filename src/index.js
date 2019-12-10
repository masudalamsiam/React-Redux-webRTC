import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function App() {
    const localVideo = useRef(null)
    const remoteVideo = useRef(null)
    const textRef = useRef(null)
    const pc = new RTCPeerConnection(null)

    useEffect(() => {
        // triggered when a new candidate is returned
        pc.onicecandidate = (e) => {
            // send the candidates to the remote peer
            // see addCandidate below to be triggered on the remote peer
            if (e.candidate) {
                console.log(JSON.stringify(e.candidate))
            }
        }

        // triggered when there is a change in connection state
        pc.oniceconnectionstatechange = (e) => { console.log(e) }

        // triggered when a stream is added to pc, see below - pc.addStream(stream)
        pc.onaddstream = (e) => remoteVideo.current.srcObject = e.stream

        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then((stream) => {
                localVideo.current.srcObject = stream
                pc.addStream(stream)
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
        console.log('Adding candidate:', desc)
        // set sdp as remote description
        pc.setRemoteDescription(new RTCSessionDescription(desc))
            .then(() => {

            }).catch((error) => {
                console.log('setRemoteDescription', error)
            })
    }

    const addCandidate = () => {
        // retrieve and parse the Candidate copied from the remote peer
        const candidate = JSON.parse(textRef.current.value)
        console.log('Adding candidate:', candidate)
        // add the candidate to the peer connection
        pc.addIceCandidate(new RTCIceCandidate(candidate))
            .then(() => {

            }).catch((error) => {
                console.log('addCandidate', error)
            })
    }

    return (
        <div className="App">
            <video className="video" ref={localVideo} autoPlay muted />
            <video className="video" ref={remoteVideo} autoPlay />
            <br />

            <button onClick={createOffer}>Offer</button>
            <button onClick={createAnswer}>Answer</button>

            <br />
            <textarea style={{ width: 450, height: 40 }} ref={textRef} />
            <br />
            <button onClick={setRemoteDescription}>Set Remote Desc</button>
            <button onClick={addCandidate}>Add Candidate</button>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
