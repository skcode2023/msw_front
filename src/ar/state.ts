import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  loginVisible: boolean; //登录弹窗
  spining: number; //加载遮罩
  headerVisible: boolean; //菜单是否展示
}

//初始值
const initialState: initialStateType = {
  loginVisible: false,
  spining: 0,
  headerVisible: true,
};

export const state = createSlice({
  name: "state",
  initialState: initialState,
  reducers: {
    setLoginVisible: (state, action: PayloadAction<boolean>) => {
      state.loginVisible = action.payload;
    },
    addSpining: (state) => {
      state.spining += 1;
    },
    delSpining: (state) => {
      state.spining -= 1;
    },
    setHeaderVisible: (state, action: PayloadAction<boolean>) => {
      state.headerVisible = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoginVisible, addSpining, delSpining, setHeaderVisible } =
  state.actions;

export default state.reducer;
