import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../Services/Api"
import { toast } from "react-toastify"

const initialState = {
    loading: false,
    redirectLog: null,
    redirectTo: null,
    LogoutToggle: false
}

export const registerUser = createAsyncThunk(
    'register', async (user) => {
        try {
            const resp = await axiosInstance.post('/user/signup', user)
            return resp?.data
        }
        catch (error) {
            console.log(error);
        }
    }
)

export const loginuser=createAsyncThunk(
    'login', async(user)=>{
        try {
            const resp=await axiosInstance.post('/user/signin')
            return resp?.data
        }
        catch (error) {
            toast.error("Invalid Credentials")
            console.log(error);
        }
    }
)

export const AuthSlice = createSlice({
    name: 'crud_auth',
    initialState,
    reducers: {
        checkToken: (state, {payload})=>{
            let token=localStorage.getItem('token')
            if( token !==null && token !==undefined ) {
                state.LogoutToggle=true
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state)=>{
                state.loading=true
                state.error= null
            })
            .addCase(registerUser.fulfilled, (state, action)=>{
                if(action.payload.status == 200){
                    localStorage.setItem("name",action?.payload?.data?.first_name)
                    toast.success("Register successfully")
                    state.redirectLog="/login"
                }
            })
            .addCase(registerUser.rejected, (state, action)=>{
                state.loading=false
                state.error=action?.payload
            })
    }
})

export const {
    checkToken
}=AuthSlice.actions