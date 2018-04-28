import React from "react";
import ReactDOM from 'react-dom';
import Sass from "./scss/main.scss";

//imports

import Gallery from "./js/gallery.jsx";

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <Gallery/>,
        document.getElementById("root")
    )
});



