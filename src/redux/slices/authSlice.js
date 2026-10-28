import { createSlice } from '@reduxjs/toolkit';

const getInitialUser = () => {
  try {
    const saved = localStorage.getItem('orchid_auth_user');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const initialUser = getInitialUser();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser,
    isAuthenticated: Boolean(initialUser),
    isAdmin: Boolean(initialUser?.isAdmin || initialUser?.role === 'admin'),
  },
  reducers: {
    loginSuccess: (state, action) => {
      const user = {
        ...action.payload,
        isAdmin: true,
        role: 'admin',
      };
      state.user = user;
      state.isAuthenticated = true;
      state.isAdmin = true;
      try {
        localStorage.setItem('orchid_auth_user', JSON.stringify(user));
      } catch {
        // ignore
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      try {
        localStorage.removeItem('orchid_auth_user');
      } catch {
        // ignore
      }
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
