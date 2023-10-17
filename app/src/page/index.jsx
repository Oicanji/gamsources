import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { Suspense, lazy } from "react";

const Home = lazy(() => import("./home/Home"));
const Collection = lazy(() => import("./collection/Collection"));
const AddSocial = lazy(() => import("./add-social/AddSocial"));
const AddTag = lazy(() => import("./add-tag/AddTag"));
const Profile = lazy(() => import("./profile/Profile"));
const Search = lazy(() => import("./search/Search"));
const ViewCollection = lazy(() => import("./view-collection/ViewCollection"));
const App = lazy(() => import("../App"));
const Terms = lazy(() => import("./terms/Terms"));
const NotFound = lazy(() => import("./not-found/NotFound"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <App>
            <Suspense>
              <Home />
            </Suspense>
          </App>
        }
      ></Route>
      <Route
        path="/profile"
        element={
          <App>
            <Suspense>
              <Profile />
            </Suspense>
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
        path="/collection-view"
        element={
          <App>
            <Suspense>
              <ViewCollection />
            </Suspense>
          </App>
        }
      ></Route>
      <Route
        path="/collection/:id"
        element={
          <App>
            <Suspense>
              <Collection />
            </Suspense>
          </App>
        }
      ></Route>
      <Route
        path="/social/add"
        element={
          <App>
            <Suspense>
              <AddSocial />
            </Suspense>
          </App>
        }
      ></Route>
      <Route
        path="/tag/add"
        element={
          <App>
            <Suspense>
              <AddTag />
            </Suspense>
          </App>
        }
      ></Route>
      <Route
        path="/terms"
        element={
          <App>
            <Suspense>
              <Terms />
            </Suspense>
          </App>
        }
      ></Route>

      <Route
        path="*"
        element={
          <App>
            <Suspense>
              <NotFound />
            </Suspense>
          </App>
        }
      ></Route>
    </>
  )
);

export default router;
