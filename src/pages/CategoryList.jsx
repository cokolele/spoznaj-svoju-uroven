import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategories, setCategory, addCategory, removeCategory, setBackgroundImageUrl } from "src/state/gallerySlice.js";
import { setModal } from "src/state/appSlice.js";
import api, { base } from "src/utils/api/api.js";

import Gallery from "src/components/gallery.jsx";
import Card from "src/components/card.jsx";
import LazyImage from "src/components/lazy-image.jsx";
import { AddIcon } from "src/components/icon.jsx";

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

   const categoryIds = useSelector(state => state.gallery.categoryIds);
   const categoryList = useSelector(state => state.gallery.categoryList);
   const categoryListComplete = useSelector(state => state.gallery.categoryListComplete);
   const backgroundImageUrl = useSelector(state => state.gallery.backgroundImageUrl);

   const loadCategories = async () => {
      const loadedCategories = await api.get("/gallery");

      switch (loadedCategories.response.status) {
         case 200:
            dispatch(setBackgroundImageUrl(base + "/images/265x0/" + loadedCategories.json.galleries[0]?.image?.fullpath));
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
      if (!categoryListComplete)
         loadCategories();
   }, []);

   const onCategoryMouseEnter = async (e, id) => {
      //loading category images (count) on category hover seems more efficient to me than querying all categories on loadup
      if (!categoryList[id].images)
         loadCategory(id);

      if (categoryList[id]?.image?.fullpath)
         dispatch(setBackgroundImageUrl(base + "/images/265x0/" + categoryList[id].image.fullpath));
   }

   return (
      <Gallery
         title="Fotogaléria"
         location="Kategórie"
      >
         {
            categoryIds.map((id, i) => {
               const Image = (
                  <LazyImage
                     background
                     placeholder={"/images/default-folder.jpg"}
                     full={categoryList[id].image?.fullpath && base + "/images/265x0/" + categoryList[id].image.fullpath}
                  />
               )

               return (
                  <Card key={i}
                     id={id}
                     linkTo={"/category/" + categoryList[id].path}
                     Image={Image}
                     name={categoryList[id].name}
                     description={categoryList[id].images !== undefined ? getCountLabel(categoryList[id].images.length) : "loading..."}
                     onMouseEnter={onCategoryMouseEnter}
                  />
               )
            })
         }
         <Card
            onClick={() => dispatch(setModal("addCategory"))}
            actionName={"Pridať kategóriu"}
            actionIcon={<AddIcon/>}
         />
      </Gallery>
   )
}

export default CategoryList;
