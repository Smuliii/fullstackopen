import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import blogs from "./blogs";
import notification from "./notification";
import user from "./user";

const reducer = combineReducers({ blogs, notification, user });
const store = configureStore({ reducer })

export default store;
