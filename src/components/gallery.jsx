import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "src/styles/components/gallery.scss";

import LazyImage from "src/components/lazy-image.jsx";
import { ArrowLeftIcon } from "src/components/icon.jsx";

import defaultBackground from "src/images/default-background.jpg";

// biele rohy pri blur animacii by sa dali fixnut pouzitim bg img transition
// ff ale tento transition nepodporuje, v chrome sa transitionuje aj img size (kedze by bolo cover), a lazyimage ma celkovo lepsi ux vdaka bufferu
//const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

function Gallery({ children, title, locationBackTo, location, backgroundImageUrl }) {
   return (
      <div className="gallery-container">
         <div className="gallery-background">
            <div className="gallery-background-image-container">
               <LazyImage
                  background
                  placeholder={defaultBackground}
                  full={backgroundImageUrl}
               />
            </div>
         </div>
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
