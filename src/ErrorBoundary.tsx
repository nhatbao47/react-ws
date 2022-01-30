import React from "react";

class ErrorBoundary extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        };
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }
    
    render(): React.ReactNode {
        if (this.state.error) {
            return (
                <div>
                    <h2>{'Something went wrong'}</h2>
                    <p className="red">
                        {this.state.error && this.state.error.toString()}
                    </p>
                    <div>{'Component Stack Error Details: '}</div>
                    <p className="red">{this.state.errorInfo.componentStack}</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;