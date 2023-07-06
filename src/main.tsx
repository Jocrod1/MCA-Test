import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import Layout from './Layout.tsx';
import './index.css';
import Main from './pages/Main.tsx';
import NotFound from './pages/NotFound.tsx';
import Podcast from './pages/Podcast.tsx';
import { ValidateEpisode, ValidatePodcast } from './pages/Validators.tsx';
import store from './store/index.ts';

// const router = createBrowserRouter([
//   {RouterProvider,
//     path: "/",
//     element: Layout,
//     children: [{ index: true, element: <Main /> }],
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persistor}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="podcast" element={<ValidatePodcast />}>
              <Route path=":id" element={<Podcast />}></Route>
              <Route path=":id/episode">
                <Route path=":idEpisode" element={<ValidateEpisode />}></Route>
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </PersistGate>
  </Provider>
);
