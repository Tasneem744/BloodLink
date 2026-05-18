import { configureStore } from '@reduxjs/toolkit';
import requestReducer from '../features/requests/requestSlice';
import placeReducer from '../features/places/placeSlice';
import userReducer from '../features/user/userSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    request: requestReducer,
    place: placeReducer,
  },
});


