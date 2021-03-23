import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "src/styles/components/gallery.scss";

import defaultBackground from "src/images/default-background.jpg";

import LazyImage from "src/components/lazy-image.jsx";
import { ArrowLeftIcon } from "src/components/icon.jsx";

function Gallery({ children, title, locationBackTo, location, backgroundImageUrl }) {
   return (
      <div className="gallery-container">
         <LazyImage className="gallery-background"
            background
            placeholder={defaultBackground}
            full={backgroundImageUrl}
         />
         <div className="gallery">
            <header className="gallery-header">
               <h1>
                  {title}
               </h1>
               <nav>
                  {
                     locationBackTo ? (
                        <Link to={locationBackTo}>
                           <ArrowLeftIcon />
                           <h2>{location}</h2>
                        </Link>
                     ) : (
                        <h2>{location}</h2>
                     )
                  }
               </nav>
            </header>
            <section className="gallery-cardlist">
               {children}
            </section>
         </div>
      </div>
   )
}

export default Gallery;
