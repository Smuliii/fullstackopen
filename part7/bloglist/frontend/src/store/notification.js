import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		setNotification: (state, action) => action.payload,
		removeNotification: () => null,
	}
});

export const { setNotification, removeNotification } = slice.actions;
export default slice.reducer;
