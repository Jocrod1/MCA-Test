import { Outlet, useNavigate } from 'react-router-dom';
import { StoreStateType } from './actions';
import { useSelector } from 'react-redux';

const Layout = () => {
  const loadingState = useSelector<StoreStateType, boolean>(
    (state) => state.loadingState
  );
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-zinc-100">
        <div className="sticky bg-white shadow py-5 top-0 z-50">
          <div className="relative flex flex-row mr-10 items-center justify-center">
            <h1
              onClick={() => navigate('/')}
              className=" flex-1 ml-20 text-blue-600 font-semibold text-2xl cursor-pointer hover:drop-shadow-lg transition-all"
            >
              Podcaster
            </h1>
            {loadingState && <span className="loader" />}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
