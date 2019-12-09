import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function App() {
    const video = useRef(null)
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then((stream) => {
                video.current.srcObject = stream
            }).catch((error) => {
                alert(`getUserMedia() error: ${error}`)
            })
    })
    return (
        <div className="App">
            <video ref={video} playsInline autoPlay muted />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
