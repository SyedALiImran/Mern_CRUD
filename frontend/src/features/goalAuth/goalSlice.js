import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import goalService from '../goalAuth/goalServices'

const initialState= {
    allGoals:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}


// create new goal 
export const createGoal = createAsyncThunk('goals/create',async(goalData,thunkApi)=>{
    try {
        const token = thunkApi.getState().auth.user.token;
        
        return await goalService.createGoal(goalData,token);
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkApi.rejectWithValue(message);
    }
})
// get all goal 
export const getGoal = createAsyncThunk('goals/getall',async(_,thunkApi)=>{
    try {
        const token = thunkApi.getState().auth.user.token;
        
        return await goalService.getGoal(token);
    } catch (error) {
        const message = (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkApi.rejectWithValue(message);
    }
})


export const goalSlice = createSlice({
    name:'goal',
    initialState,
    reducers:{
        reset:(state)=> initialState
        
    },
    extraReducers:(builder)=>{
        builder.addCase(createGoal.pending,(state)=>{state.isLoading=true})
        builder.addCase(createGoal.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.allGoals.push(action.payload)
        })
        builder.addCase(createGoal.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message = action.payload
        })
        builder.addCase(getGoal.pending,(state)=>{state.isLoading=true})
        builder.addCase(getGoal.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.allGoals=action.payload
        })
        builder.addCase(getGoal.rejected,(state,action)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
            state.message = action.payload
        })
    }       
})



export const {reset} = goalSlice.actions
export default  goalSlice.reducer