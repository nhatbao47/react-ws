import React, { Component } from "react";
import axios from "axios";

function Loader(WrappedComponent: any) {
    class HOC extends Component<any, any> {
        constructor(props: any) {
            super(props);
            this.state = { posts: [] };
        }
    
        componentDidMount() {
            axios.get(`https://www.reddit.com/r/reactjs.json`).then((res) => {
                const posts = res.data.data.children.map((obj: any) => obj.data);
                this.setState({ posts: posts });
            });
        }

        render(): React.ReactNode {
            const { posts } = this.state;
    
            if (posts.length === 0) {
                return <div>Loading...</div>;
            }
    
            return <WrappedComponent posts = {posts} />;
        }
    }

    return HOC;
}

export default Loader;