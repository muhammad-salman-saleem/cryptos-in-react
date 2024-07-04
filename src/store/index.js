// third-party
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// project import
import reducers from './reducers';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const persistConfig = {
  key: 'root',
  storage
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, reducers);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer
});

// Create a persistor to persist the store
const persistor = persistStore(store);

const { dispatch } = store;

export { store, dispatch, persistor };
