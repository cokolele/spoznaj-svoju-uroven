//css
import "normalize.css";
import "src/styles/main.scss";

//react
import { render } from "react-dom";

//redux
import store from "src/state/store.js";
import { Provider } from "react-redux";

//router
import { BrowserRouter, Switch, Route } from "react-router-dom";

//app
import ModalManager from "src/components/modal.jsx";
import CategoryList from "src/pages/CategoryList.jsx";
import ImageList from "src/pages/ImageList.jsx";

render(
   <Provider store={store}>
      <ModalManager />
      {/*<SnackBar />*/}

      <BrowserRouter>
         <Switch>
            <Route exact path={["/", "/category"]}>
               <CategoryList />
            </Route>

            <Route exact path="/category/:category">
               <ImageList />
            </Route>

            <Route path="*">
               <div>404</div>
            </Route>
         </Switch>
      </BrowserRouter>

   </Provider>,
   document.querySelector("#app")
);
