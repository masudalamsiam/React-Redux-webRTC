import { withOAuth } from 'aws-amplify-react';
import React, { Component } from 'react';

class OAuthButton extends React.Component {
    render() {
        return (
            <button onClick={this.props.OAuthSignIn}>
                Sign in with AWS
                {console.log(this.props)}
            </button>
        )
    }
}

export default withOAuth(OAuthButton);