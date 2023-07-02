import ReactDOM from "react-dom/client";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Main from "./pages/Main.tsx";
import Layout from "./Layout.tsx";
import Podcast from "./pages/Podcast.tsx";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import { PersistGate } from "redux-persist/integration/react";
import Episode from "./pages/Episode.tsx";
import PodcastLayout from "./pages/PodcastLayout.tsx";

// const router = createBrowserRouter([
//   {RouterProvider,
//     path: "/",
//     element: Layout,
//     children: [{ index: true, element: <Main /> }],
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persistor}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="podcast" element={<PodcastLayout />}>
              <Route path=":id" element={<Podcast />}></Route>
              <Route path=":id/episode">
                <Route path=":idEpisode" element={<Episode />}></Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </PersistGate>
  </Provider>
);
