import ReactDOM from "react-dom/client";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Main from "./pages/Main.tsx";
import Layout from "./Layout.tsx";

// const router = createBrowserRouter([
//   {RouterProvider,
//     path: "/",
//     element: Layout,
//     children: [{ index: true, element: <Main /> }],
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="podcast">
          <Route path=":id" element={"PODCASTS"} />
        </Route>
      </Route>
    </Routes>
  </Router>
);
