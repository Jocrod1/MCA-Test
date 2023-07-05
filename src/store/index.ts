import { applyMiddleware, legacy_createStore as createStore } from 'redux';
// import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export default { store, persistor };
