import React from 'react';
import '../App.css';

class HomepageComtainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }
    componentDidMount() {
        console.log("Homepage Container mounted");
    }

    render() {
        return (
            <p>I'm a homepage container!</p>
        )
    }
}

export default HomepageComtainer;