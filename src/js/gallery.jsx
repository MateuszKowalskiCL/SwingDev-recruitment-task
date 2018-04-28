import React from "react";

//imports
import Photo from "./photo.jsx";

const promise = new Promise((resolve, reject) => {

});

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayOfUrls: [],
            isLoading: false,
            error: null
        }

    }

    componentDidMount () {
        //set loading
        this.setState({
            isLoading: true
        });

        // fetch main API with dog pictures
        fetch("https://api.flickr.com/services/rest/?&method=flickr.groups.pools.getPhotos&api_key=b6caa427a3ef1d1d7474fed00902e930&group_id=467849@N23&format=json&nojsoncallback=1").then(resp => {
            if (resp.ok) {
                return resp;
            } else {
                throw new Error('Something went wrong ...');
            }
        }).then( resp => { resp.json().then( pic => {
                    //map all the photos in response
                    pic.photos.photo.map ( (element, index) => {

                        //assign author to const
                        const author = element.ownername;

                        //assign title to const
                        const title = element.title;

                        // create API for author
                        const authorId = "https://api.flickr.com/services/rest/?&method=flickr.people.getInfo&api_key=b6caa427a3ef1d1d7474fed00902e930&user_id=" + element.owner + "&format=json&nojsoncallback=1";

                        // create API for picture
                        const pictureId = "https://api.flickr.com/services/rest/?&method=flickr.photos.getInfo&api_key=b6caa427a3ef1d1d7474fed00902e930&photo_id=" + element.id + "&format=json&nojsoncallback=1";

                        // fetch description
                        fetch(pictureId).then( resp => { resp.json().then( picture => {

                            //assign description to const
                            const description = picture.photo.description._content;

                            //assign date to const
                            const date = picture.photo.dates.taken;

                            //building the url adress for jpg
                            let elementId = element.farm;
                            let serverId = element.server;
                            let id = element.id;
                            let secret = element.secret;

                            //creating object with all necessary data for the post
                            let post = {
                                author: author,
                                url: "https://farm" + elementId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + ".jpg",
                                title: title,
                                description: description,
                                date: date
                            };

                            //injecting object into array
                            this.setState({
                                isLoading: false,
                                arrayOfUrls: [...this.state.arrayOfUrls, post]
                            })
                        })})
                    })
             });

        });
    };


    //render response or loader
    renderResponse = (array, bol) => {
        if (bol) {
            return <div>Shieeet is Loading...</div>
        } else {
            return (
                <div>
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
                </div>
            )
        }
    };

    render () {
        const { arrayOfUrls, isLoading } = this.state;
       return <div className = "gallery">
           {this.renderResponse(arrayOfUrls, isLoading)}
        </div>
    }
}

export default Gallery;