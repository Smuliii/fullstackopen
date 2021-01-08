import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
	name: 'users',
	initialState: [],
	reducers: {
		setUsers: (state, action) => state.concat(action.payload),
	}
});

export const { setUsers } = slice.actions;
export default slice.reducer;
