import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <div className="flex-1 bg-zinc-100">
        <div className="sticky bg-white shadow py-5 top-0">
          <h1
            onClick={() => navigate("/")}
            className="ml-20 text-blue-600 font-semibold text-2xl cursor-pointer hover:drop-shadow-lg transition-all"
          >
            Podcaster
          </h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
