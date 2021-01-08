import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import blogs from "./blogs";
import notification from "./notification";
import user from "./user";
import users from "./users";

const reducer = combineReducers({ blogs, notification, user, users });
const store = configureStore({ reducer })

export default store;
