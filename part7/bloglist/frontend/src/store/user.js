import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		setUserData: (state, action) => action.payload,
		clearUserData: () => null,
	}
});

export const { setUserData, clearUserData } = slice.actions;
export default slice.reducer;
