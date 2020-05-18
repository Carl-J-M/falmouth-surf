import React from 'react';
import '../App.css';

class HomepageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
        this.initializeSpots = this.initializeSpots.bind(this);
    }
    componentDidMount() {
        console.log("Homepage Container mounted");
        this.initializeSpots();
        
    }
    initializeSpots() {
        const url =
          "https://cors-anywhere.herokuapp.com/https://s3.eu-west-2.amazonaws.com/lpad-public-assets/software-test/all-spots.json";
        fetch(url)
        .then(res => res.json())
        .then(apiData =>
            this.setState({
                data: apiData
            })
        )
    }

    render() {
        return (
            <p>I'm a homepage container!</p>
        )
    }
}

export default HomepageContainer;