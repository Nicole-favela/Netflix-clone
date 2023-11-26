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
    currentlyPlaying: null,
    
    isPlaying: false,
    currentMovieSelection: []
   
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
    addMovieToList: (state, action) => {
      state.movies.push(action.payload);
    },
    setPlayingMovie: (state, action)=>{
      state.currentlyPlaying = action.payload;
      state.isPlaying = true;

    },
    //TODO: one for selected movie id
    setMovieSelection: (state, action)=>{
      state.currentMovieSelection= action.payload;

    },
    //use for list of played movie id's
    //TODO: delete
    // setRecentlyPlayedMovie: (state, action)=>{
    //   state.recentlyPlayed = state.recentlyPlayed.concat(action.payload); //concatenate new payload to array
      

    // },
  
  },
});
//export our actions
export const { login, logout, addMovieToList, setPlayingMovie, stopPlayingMovie, setMovieSelection } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.user.user;
export const selectMovies = (state) => state.user.movies;
export const selectCurrentlyPlaying = (state) => state.user.currentlyPlaying;
export const selectIsPlaying = (state) => state.user.isPlaying;
export const selectCurrentMovie = (state)=>state.user.currentMovieSelection;

//export const selectRecentlyPlayed = (state)=> state.user.recentlyPlayed


export default userSlice.reducer;
