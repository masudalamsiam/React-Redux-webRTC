const awsConfig = {
    aws_project_region: "us-east-2",
    aws_cognito_identity_pool_id: "",
    aws_cognito_region: "us-east-2",
    aws_user_pools_id: "us-east-2_UrHMs9h7s",
    aws_user_pools_web_client_id: "5tapqh7oc8uh4p0of0284q1454",
    oauth: {
        domain: "uisusrlsfd.auth.us-east-2.amazoncognito.com",
        scope: [
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        redirectSignIn: "http://localhost:3000/",
        redirectSignOut: "http://localhost:3000/",
        responseType: "code"
    },
    federationTarget: "COGNITO_USER_POOLS"
}

export default awsConfig