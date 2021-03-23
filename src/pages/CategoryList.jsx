import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategories, setCategory } from "src/state/gallerySlice.js";
import api, { base } from "src/utils/api/api.js";

import Gallery from "src/components/gallery.jsx";
import Card from "src/components/card.jsx";
import LazyImage from "src/components/lazy-image.jsx";
import { AddIcon } from "src/components/icon.jsx";
import ModalAddCategory from "src/components/modal/add-category.jsx";

import defaultFolder from "src/images/default-folder.jpg";

const getCountLabel = (count) => {
   if (count == 1)
      return "1 fotka";
   else if (count > 1 && count < 5)
      return count + " fotky";
   else
      return count + " fotiek";
}

function CategoryList() {
   const dispatch = useDispatch();

   const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
   const [showAddModal, setShowAddModal] = useState(false);
   const [thumbnailWidth, setThumbnailWidth] = useState(null);
   const itemWidthRef = useRef();

   const categoryIds = useSelector(state => state.gallery.categoryIds);
   const categoryList = useSelector(state => state.gallery.categoryList);
   const categoryListComplete = useSelector(state => state.gallery.categoryListComplete);

   const loadCategories = async () => {
      const loadedCategories = await api.get("/gallery");

      switch (loadedCategories.response.status) {
         case 200:
            dispatch(setCategories(loadedCategories.json.galleries));
            break;

         case 500:
         case -1:
            break;
      }
   }

   const loadCategory = async (id) => {
      const loadedCategory = await api.get("/gallery/" + categoryList[id].path);

      switch (loadedCategory.response.status) {
         case 200:
            if (!categoryList[id].image)
               loadedCategory.json.image = loadedCategory.json.images[0];

            dispatch(setCategory({
               id,
               category: loadedCategory.json
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
   }, [])

   useEffect(() => {
      if (categoryListComplete && thumbnailWidth) {
         const firstCategory = Object.values(categoryList)[0];
         if (firstCategory?.image)
               setBackgroundImageUrl(`${base}/images/${thumbnailWidth}x0/${firstCategory.image.fullpath}`);
      }
   }, [categoryListComplete, thumbnailWidth]);

   useEffect(() => {
      if (!categoryListComplete)
         loadCategories();
      else
         categoryIds.forEach(id => loadCategory(id));
   }, [categoryListComplete]);

   const onCategoryMouseEnter = async (e, id) => {
      if (categoryList[id]?.image?.fullpath)
         setBackgroundImageUrl(`${base}/images/${thumbnailWidth}x0/${categoryList[id].image.fullpath}`);
   }

   return (
      <Gallery
         title="Fotogaléria"
         location="Kategórie"
         backgroundImageUrl={backgroundImageUrl}
      >
         {
            categoryIds.map((id, i) => (
               <Card key={i}
                  id={id}
                  linkTo={"/category/" + categoryList[id].path}
                  Image={
                     <LazyImage
                        background
                        placeholder={defaultFolder}
                        full={thumbnailWidth && categoryList[id].image?.fullpath && `${base}/images/${thumbnailWidth}x0/${categoryList[id].image.fullpath}`}
                     />
                  }
                  name={categoryList[id].name}
                  description={categoryList[id].images !== undefined ? getCountLabel(categoryList[id].images.length) : "loading..."}
                  onMouseEnter={onCategoryMouseEnter}
               />
            ))
         }
         <Card
            onClick={() => { setShowAddModal(true) }}
            actionName={"Pridať kategóriu"}
            actionIcon={<AddIcon/>}
         />
         <div ref={itemWidthRef}></div>
         {
            showAddModal &&
            <ModalAddCategory onClose={() => { setShowAddModal(false) }} onAdded={() => { loadCategories() }}/>
         }
      </Gallery>
   )
}

export default CategoryList;
