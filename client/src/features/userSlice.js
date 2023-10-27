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
    recentlyPlayed: [], //stores recently played movie data
    isPlaying: false,
    trailer: null,
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
    },
    setPlayingMovie: (state, action)=>{
      state.currentlyPlaying = action.payload;
      state.isPlaying = true;

    },
    stopPlayingMovie: (state)=>{
      state.currentlyPlaying = null;
      state.isPlaying = false;

    },
    setRecentlyPlayedMovie: (state, action)=>{
      state.recentlyPlayed = state.recentlyPlayed.concat(action.payload); //concatenate new payload to array
      

    },
    addTrailerUrl: (state, action) => {
      state.trailer.push(action.payload);
    },
  },
});
//export our actions
export const { login, logout, addMovie, setPlayingMovie, stopPlayingMovie, addTrailerUrl, setRecentlyPlayedMovie } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.user.user;
export const selectMovies = (state) => state.user.movies;
export const selectCurrentlyPlaying = (state) => state.user.currentlyPlaying;
export const selectIsPlaying = (state) => state.user.isPlaying;
export const selectTrailer = (state)=> state.user.trailer
export const selectRecentlyPlayed = (state)=> state.user.recentlyPlayed


export default userSlice.reducer;
