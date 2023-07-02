import { legacy_createStore as createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk)),
);

const persistor = persistStore(store);


export default {store, persistor};
