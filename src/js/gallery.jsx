import React from "react";

//imports
import Photo from "./photo.jsx";

const promise = new Promise((resolve, reject) => {});
const Loading = require('react-loading-animation');

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayOfUrls: [],
            isLoading: false,
            error: null,
            isLoadingGallery: true
        }

    }

    componentDidMount () {
        //set loading animation
        this.setState({
            isLoading: true
        });

        //fetch main API with dog pictures
        fetch("https://api.flickr.com/services/rest/?&method=flickr.groups.pools.getPhotos&api_key=b6caa427a3ef1d1d7474fed00902e930&group_id=467849@N23&format=json&nojsoncallback=1").then(resp => {
            if (resp.ok) {
                return resp;
            } else {
                throw new Error('Something went wrong ...');
            }
        }).then( resp => { resp.json().then( pic => {
                    //map all the photos in the response
                    pic.photos.photo.map ( (element, index) => {

                        //assign author to const
                        const author = element.ownername;

                        //assign title to const
                        let title = element.title;

                        //create API for picture
                        const pictureId = "https://api.flickr.com/services/rest/?&method=flickr.photos.getInfo&api_key=b6caa427a3ef1d1d7474fed00902e930&photo_id=" + element.id + "&format=json&nojsoncallback=1";

                        //fetch description for picture API
                        fetch(pictureId).then( resp => { resp.json().then( picture => {

                            //assign description to const
                            let description = picture.photo.description._content;

                            //assign date to const
                            const date = picture.photo.dates.taken;

                            //build the url adress for jpg
                            const elementId = element.farm;
                            const serverId = element.server;
                            const id = element.id;
                            const secret = element.secret;

                            //override lack of title
                            if (title === "") {
                                title = "no title was not provided"
                            }

                            //override lack of description
                            if(description === "") {
                               description = "description was not provided"
                            }

                            //create object with all necessary data for the post
                            const post = {
                                author: author,
                                url: "https://farm" + elementId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + ".jpg",
                                title: title,
                                description: description,
                                date: date
                            };

                            //inject object into array and kill loading animation
                            this.setState({
                                isLoading: false,
                                arrayOfUrls: [...this.state.arrayOfUrls, post]
                            })
                        })}).catch(error => this.setState({ error, isLoading: false }));
                    })
             });

        });
    };


    //render response or loader
    renderResponse = (array, bol, error) => {
        if (error) {
            return <p>{error.message}</p>;
        }
        if (bol) {
            return <div className = "loading-wrapper">
                <Loading/>
            </div>
        } else {
            return (
                <ul className = "list-of-images">
                    {array.map( (e,i) => {
                       return <Photo
                            key = {i}
                            url = {e.url}
                            author = {e.author}
                            title = {e.title}
                            description = {e.description}
                            date = {e.date}
                        />
                    })}
                </ul>
            )
        }
    };

    hideSpinner = () => {
        this.setState({
            isLoadingGallery: false,
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
        const { arrayOfUrls, isLoading, error } = this.state;
       return <div className = "gallery">
           {this.renderResponse(arrayOfUrls, isLoading, error)}
        </div>
    }
}

export default Gallery;