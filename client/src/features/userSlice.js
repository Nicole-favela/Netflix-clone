import {  createSlice } from '@reduxjs/toolkit';




// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const userSlice = createSlice({
  name: 'user',
  initialState:{
    user: null,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) =>{
      console.log(action); //helps debugging
      state.user = action.payload;
    },
    logout: (state)=>{
      state.user = null;
    },
    addMovie: (state, action) => {
      state.movies.push(action.payload);
    }
  },
});
//export our actions
export const { login, logout, addMovie } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.user.user;
export const selectMovies = (state) => state.user.movies;



export default userSlice.reducer;
