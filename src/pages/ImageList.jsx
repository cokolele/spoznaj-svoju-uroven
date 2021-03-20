import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCategory, setBackgroundImageUrl } from "src/state/gallerySlice.js";
import { setModal } from "src/state/appSlice.js";
import api, { base } from "src/utils/api/api.js";

import Gallery from "src/components/gallery.jsx";
import Card from "src/components/card.jsx";
import LazyImage from "src/components/lazy-image.jsx";
import { AddPhotoIcon } from "src/components/icon.jsx";

function ImageList() {
   const dispatch = useDispatch();

   const { category: urlCategory } = useParams();
   const category = useSelector(state => state.gallery.categoryList[urlCategory]);

   const loadCategory = async () => {
      const loadedCategory = await api.get("/gallery/" + urlCategory);

      switch (loadedCategory.response.status) {
         case 200:
            dispatch(setBackgroundImageUrl(base + "/imasges/265x0/" + loadedCategory.json.images[0]?.fullpath));
            dispatch(setCategory({
               id: loadedCategory.json.gallery.path,
               category: {
                  ...loadedCategory.json.gallery,
                  images: loadedCategory.json.images,
                  image: loadedCategory.json.images[0]
               }
            }));
            break;

         case 404:
         case 500:
         case -1:
            break;
      }
   }

   useEffect(() => {
      if (!category)
         loadCategory();
   }, []);

   const onImageClick = (e, id) => {
      console.log(id + "th image clicked");
   }

   return (
      <Gallery
         title="Fotogaléria"
         location={urlCategory}
         locationBackTo="/"
      >
         {
            category && category.images && category.images.map((image, i) => {
               const Image = (
                  <LazyImage
                     background
                     placeholder={"/images/default-photo.jpg"}
                     full={base + "/images/265x0/" + image.fullpath}
                  />
               )

               return (
                  <Card key={i}
                     id={image.fullpath}
                     Image={Image}
                     onClick={onImageClick}
                  />
               )
            })
         }
         <Card
            onClick={() => dispatch(setModal("addPhoto"))}
            actionName={"Pridať fotky"}
            actionIcon={<AddPhotoIcon/>}
         />
      </Gallery>
   )
}

export default ImageList;
