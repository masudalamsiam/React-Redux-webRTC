import axios from 'axios'
import moment from 'moment'
import jwt from 'jsonwebtoken'

export default () => {
    console.log('is signed in: ', signedIn())
    if (signedIn()) {
        const { id_token } = JSON.parse(localStorage.getItem('token'))
        if (id_token && jwt.decode(id_token)) {
            const expiry = jwt.decode(id_token).exp;
            const now = new Date();
            const hasTokenExpired = now.getTime() > expiry * 1000;
            console.log(moment.unix(expiry).format('lll'))
            if (hasTokenExpired) {
                console.log('token expired. Need to refresh token')
                return id_token
            } else {
                return id_token
            }
        }

    }
    console.log("not sign is. Need to sign in")
    signIn()
}
const signedIn = () => {
    if (localStorage.getItem('token')) {
        return true
    }
    return false
}
const signIn = () => {
    const href = window.location.href.split('?')[0]
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code')
    if (code) {
        axios.get(`https://uisusrlsfd.execute-api.us-east-2.amazonaws.com/GoogleOauth?redirect_uri=${href}&code=${code}`)
            .then((res) => {
                console.log("sign in success")
                localStorage.setItem('token', JSON.stringify(res.data.tokens))
                console.log(res.data.tokens)
                window.location.replace(href)
            }).catch((error) => {
                console.log("sign in error")
                console.log(error)
            })
    } else {
        window.location.replace(`https://uisusrlsfd.execute-api.us-east-2.amazonaws.com/GoogleOauth?redirect_uri=${href}`)
    }

}
