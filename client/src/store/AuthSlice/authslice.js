import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formdata,
        {
          withCredentials: true,
        }
      );
       console.log("inside create async thunk", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Registration failed"
      );
    }
  }
);


export const loginUser= createAsyncThunk(
  "auth/login",
  async(formdata,{rejectWithValue})=>{
    try{
      const response=await axios.post(
        "http://localhost:5000/api/auth/login",
        formdata,
        {
          withCredentials: true,
        }
      );
      console.log("inside create async thunk", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Login failed"
      );
    }
  }
);


export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Logout failed"
      );
    }
  }
);




export const CheckAuthenticatedUser = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/check-auth",
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Authentication check failed"
      );
    }
  }
);


const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = action.payload.user;
        console.log("User registered successfully action payload:", action.payload.user);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        console.log("User logged in successfully action payload:", action.payload.user.role);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(CheckAuthenticatedUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        console.log("CheckAuthenticatedUser action payload:", action.payload.user);
      })
      .addCase(CheckAuthenticatedUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(CheckAuthenticatedUser.pending, (state, action) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.user = null;
      }); 
  },
});

export const { setUser } = AuthSlice.actions;
export default AuthSlice.reducer;
