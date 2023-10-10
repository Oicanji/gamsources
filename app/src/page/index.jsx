import * as React from "react";
import {
  Routes,
  Route,
  useNavigation,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./home/Home";
import AddCollection from "./add-collection/AddCollection";
import AddSocial from "./add-social/AddSocial";
import AddTag from "./add-tag/AddTag";
import Profile from "./profile/Profile";
import Search from "./search/Search";
import ViewEditCollection from "./view-edit-collection/ViewEditCollection";
import App from "../App";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <App>
            <Home />
          </App>
        }
      ></Route>
      <Route
        path="/profile"
        element={
          <App>
            <Profile />
          </App>
        }
      ></Route>
      <Route
        path="/search"
        element={
          <App>
            <Search />
          </App>
        }
      ></Route>
      <Route
        path="/collection"
        element={
          <App>
            <ViewEditCollection />
          </App>
        }
      ></Route>
      <Route
        path="/collection/add"
        element={
          <App>
            <AddCollection />
          </App>
        }
      ></Route>
      <Route
        path="/social/add"
        element={
          <App>
            <AddSocial />
          </App>
        }
      ></Route>
      <Route
        path="/tag/add"
        element={
          <App>
            <AddTag />
          </App>
        }
      ></Route>
    </>
  )
);

export default router;
