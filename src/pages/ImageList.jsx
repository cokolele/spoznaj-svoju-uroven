import { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "src/state/gallerySlice.js";
import api, { base } from "src/utils/api/api.js";

import Gallery from "src/components/gallery.jsx";
import Card from "src/components/card.jsx";
import LazyImage from "src/components/lazy-image.jsx";
import { AddPhotoIcon } from "src/components/icon.jsx";
import ModalAddPhoto from "src/components/modal/add-photo.jsx";
import ModalPhoto from "src/components/modal/photo.jsx";

import defaultPhoto from "src/images/default-photo.jpg";

function ImageList() {
   const dispatch = useDispatch();
   const history = useHistory();

   const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
   const [showAddModal, setShowAddModal] = useState(false);
   const [showPhotoModal, setShowPhotoModal] = useState(false);
   const [modalImageUrl, setModalImageUrl] = useState("");
   const [thumbnailWidth, setThumbnailWidth] = useState(null);
   const itemWidthRef = useRef();

   const { category: urlCategory } = useParams();
   const { photo: urlPhotoId } = useParams();
   const category = useSelector(state => state.gallery.categoryList[encodeURI(urlCategory)]);

   const loadCategory = async () => {
      const loadedCategory = await api.get("/gallery/" + urlCategory);

      switch (loadedCategory.response.status) {
         case 200:
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
      setThumbnailWidth(Math.ceil(itemWidthRef.current.clientWidth * window.devicePixelRatio));

      if (!category)
         loadCategory();
   }, [])

   useEffect(() => {
      if (!backgroundImageUrl && category?.image && thumbnailWidth)
         setBackgroundImageUrl(`${base}/images/${thumbnailWidth}x0/${category.image.fullpath}`);
   }, [category, thumbnailWidth]);

   useEffect(() => {
      if (urlPhotoId !== undefined && category?.images[urlPhotoId]) {
         setShowPhotoModal(true);
         setModalImageUrl(base + "/images/0x0/" + category.images[urlPhotoId].fullpath);
      }
   }, [urlPhotoId, category]);

   const onImageClick = (e, id) => {
      history.replace("/category/" + urlCategory + "/" + id);
      e.preventDefault();
   }

   return (
      <Gallery
         title="Fotogaléria"
         location={urlCategory}
         locationBackTo="/"
         backgroundImageUrl={backgroundImageUrl}
      >
         {
            category && category.images && category.images.map((image, i) => (
               <Card key={i}
                  id={i}
                  Image={
                     <LazyImage
                        placeholder={defaultPhoto}
                        full={thumbnailWidth && `${base}/images/${thumbnailWidth}x0/${image.fullpath}`}
                     />
                  }
                  href={`/category/${urlCategory}/${i}`}
                  onClick={onImageClick}
               />
            ))
         }
         <Card
            onClick={() => { setShowAddModal(true) }}
            actionName={"Pridať fotky"}
            actionIcon={<AddPhotoIcon/>}
         />
         <div ref={itemWidthRef}></div>
         {
            showAddModal &&
            <ModalAddPhoto
               category={urlCategory}
               onAdded={() => { loadCategory() }}
               onClose={() => { setShowAddModal(false) }}
            />
         }
         {
            showPhotoModal &&
            <ModalPhoto
               image={modalImageUrl}
               onClose={() => {
                  history.replace("/category/" + urlCategory);
                  setShowPhotoModal(false);
               }}
               onPrevious={() => {
                  const id = parseInt(urlPhotoId) - 1;
                  if (category.images[id])
                     history.replace("/category/" + urlCategory + "/" + id);
               }}
               onNext={() => {
                  const id = parseInt(urlPhotoId) + 1;
                  if (category.images[id])
                     history.replace("/category/" + urlCategory + "/" + id);
               }}
               hasNext={() => {
                  const id = parseInt(urlPhotoId) + 1;
                  return !!category.images[id]
               }}
               hasPrevious={() => {
                  const id = parseInt(urlPhotoId) - 1;
                  return !!category.images[id]
               }}
            />
         }
      </Gallery>
   )
}

export default ImageList;
