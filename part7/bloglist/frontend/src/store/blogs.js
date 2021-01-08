import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		setBlogs: (state, action) => state.concat(action.payload),
		addBlog: (state, action) => void(state.push(action.payload)),
		likeBlog: (state, action) => {
			const { id, likes } = action.payload;
			const blog = state.find(blog => blog.id === id);
			if (blog) {
				blog.likes = likes;
			}
		},
		deleteBlog: (state, action) => state.filter(blog => blog.id !== action.payload),
		updateBlogData: (state, action) => {
			const { id, data } = action.payload;
			return state.map(blog => {
				if (blog.id === id) {
					return { ...blog, ...data };
				}
				return blog;
			})
		}
	}
});

export const { setBlogs, addBlog, likeBlog, deleteBlog, updateBlogData } = slice.actions;
export default slice.reducer;
