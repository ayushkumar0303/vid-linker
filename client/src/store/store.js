import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const USER_INITIAL_STATE = {
  error: null,
  loading: false,
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: USER_INITIAL_STATE,
  reducers: {
    signInStart: (state, action) => {
      state.error = null;
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.error = null;
      state.loading = false;
      state.currentUser = action.payload;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.currentUser = null;
    },
    updateStart: (state) => {
      state.error = null;
      state.loading = true;
    },
    updateError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateSuccess: (state, action) => {
      state.error = null;
      state.loading = false;
      state.currentUser = action.payload;
    },
    deleteStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteSuccess: (state, action) => {
      state.error = null;
      state.loading = false;
      state.currentUser = null;
    },
    signOutSuccess: (state) => {
      state.error = null;
      state.loading = false;
      state.currentUser = null;
    },
    fetchUserStart: (state) => {
      state.error = null;
      state.loading = true;
    },
    fetchUserError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    fetchUserSuccess: (state, action) => {
      state.error = null;
      state.loading = false;
      state.currentUser = action.payload;
    },
  },
});

export const {
  signInFailure,
  signInSuccess,
  signInStart,
  updateStart,
  updateError,
  updateSuccess,
  deleteFailure,
  deleteStart,
  deleteSuccess,
  signOutSuccess,
  fetchUserError,
  fetchUserSuccess,
  fetchUserStart,
} = userSlice.actions;

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

const persistConfig = { key: "root", storage, version: 1 };

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;

export const persistor = persistStore(store);
