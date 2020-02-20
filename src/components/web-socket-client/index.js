export default (url) => {
    let socket = new WebSocket(url)

    const onConnect = (call_back) => {
        socket.onopen = (event) => {
            call_back(event)
        }
    }

    const onError = (call_back) => {
        socket.onerror = (event) => {
            call_back(event)
        }
    }

    const onClose = (call_back) => {
        socket.onclose = (event) => {
            call_back(event)
        }
    }

    const on = (action, call_back, signal) => {
        const listener = (e) => {
            const { data, event } = e.detail
            call_back(data, event)
            if (signal) {
                window.removeEventListener(action, listener)
            }
        }

        socket.onmessage = (event) => {
            // console.log(event)
            try {
                const data = JSON.parse(event.data)
                if (call_back && data.action) {
                    const e = new CustomEvent(data.action, { detail: { data: data.data, event } })
                    window.dispatchEvent(e)
                }
            } catch (err) {

            }
        }

        window.addEventListener(action, listener)
    }

    const send = (action, data, callbackFunction) => {
        const callback = `${data && data.call_back ? data.call_back : `${action}callback`}`
        data = {
            ...data,
            call_back: callback
        }
        socket.send(JSON.stringify({ action, data }))
        if (callbackFunction) {
            on(callback, callbackFunction, true)
        }
    }

    return { on, send, onConnect, onClose, onError }
}