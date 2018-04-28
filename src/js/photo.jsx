import React from "react";

class Photo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    addElement = () => {
        return {__html: this.props.description};
    };

    render () {
        return <div className = "post">
            <img className = "post-image" src = {this.props.url} alt = {this.props.id} />
            <div className = "post-data">
                <h3>{this.props.author}</h3>
                <span>{this.props.title}</span>
                <span>{this.props.date}</span>
                <p dangerouslySetInnerHTML = {this.addElement()}></p>
            </div>
        </div>
    }
}

export default Photo;