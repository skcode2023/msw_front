import { configureStore } from "@reduxjs/toolkit";
import web3InfoReducer from "./web3Info";
import stateReducer from "./state";

const store = configureStore({
  reducer: {
    web3Info: web3InfoReducer,
    state: stateReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
