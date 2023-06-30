import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col">
      <div className="flex-1 bg-zinc-100">
        <div className="sticky bg-white shadow-lg py-5 top-0">
          <h1 className="text-blue-600 font-semibold">PODCASTER</h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
