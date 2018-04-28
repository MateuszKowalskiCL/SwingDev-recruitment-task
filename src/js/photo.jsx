import React from "react";

const Loading = require('react-loading-animation');

class Photo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           isLoading: true,
           display: "none"
        }
    }

    addElement = () => {
        return {__html: this.props.description};
    };

    hideSpinner = () => {
        this.setState({
            isLoading: false,
            display: "block"
        })
    };

    loadSpinner = () => {
      if (this.state.isLoading === true) {
          return <Loading className= "a"/>
      } else {
          return null;
      }
    };
    render () {
        return <div className = "post">
            <div className = "img-wrapper">
                {this.loadSpinner()}
                <img style = {{display:this.state.display}} className = "post-image" src = {this.props.url} alt = {this.props.id} onLoad={() => this.hideSpinner()}/>
            </div>
            <div className = "post-main-data">
                <h3> <span className = "holder">Author: </span>{this.props.author}</h3>
                <div> <span className = "holder">Title: </span>{this.props.title}</div>
                <div> <span className = "holder">Date: </span>{this.props.date}</div>
                <p className = "data-description">
                    <span className = "holder">Description: </span>
                    <span dangerouslySetInnerHTML = {this.addElement()}></span>
                </p>
            </div>
        </div>
    }
}

export default Photo;

