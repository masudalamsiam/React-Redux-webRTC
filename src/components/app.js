import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Authentication from './authentication/authentication'
import Connected from './connected/connected'


const App = () => {
    return (
        <Provider store={store}>
            {/* <Authentication >
                <Connected />
            </Authentication> */}
        </Provider>
    )
}

export default App
