import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { fakeAuth } from "../Services/CommonService";

class AuthorizedRoute extends Component {
    render(): React.ReactNode {
        return fakeAuth.isAuthenticated ? this.props.children: (<Navigate to={{pathname: '/login'}}/>);
    }
}

export default AuthorizedRoute;