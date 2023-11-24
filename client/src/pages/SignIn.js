import React, {useState} from 'react'
import "./SignIn.css"

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux"
import {login, logout} from "../features/userSlice"
import { API_BASE_URL } from '../config/apiUrls';
import Cookies from "js-cookie";
const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});

  const buttontheme = createTheme({
    palette: {
      primary: {
        main: "#ff0000" // Red color
      },
      hover: {
        main: "#000000" // Black color
      }
    }
  });

//  for signing in or signing up
function SignIn({signup}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch()
  
  const navigate = useNavigate()
   
    const signIn= async (event) =>{
        event.preventDefault()
        try{
      
          const form = {
            email,
            password,
          }
          const res = await fetch(`${API_BASE_URL}/auth/api/login`,{
              method:'POST',
              body: JSON.stringify(form),
              headers:{
                  "content-type": "application/json"
              }
          })
          console.log(res)
          if(!res.ok){
            const errorData = await res.json();
            throw new Error(errorData.error);
          }
          //check token from backend
          const {token, user} = await res.json();
      
          Cookies.set("token", token);
          dispatch(login({
              email: user.email,
              password: user.password,
              loggedIn: true,
              user_id: user._id,

            
          }));
          navigate('/') 
  
      }catch(e){
        setError(e.message)
        navigate('/login') 
      }
     
    }
    
  return (
    <div className='signup'>
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'right',
            justifyContent: 'center',
          }}
        >
         {error && <p style={{ color: 'red', fontSize: '15px' }}>{error}</p>}
          {/* <Typography component="h1" variant="h5">
            Sign in
          </Typography> */}
          <Box component="form" onSubmit={signIn} noValidate sx={{ mt: 1,  }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <ThemeProvider theme={buttontheme}>
                <Button
                onClick={signIn}
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                     mt: 3, 
                     mb: 2, 
                     color: "white" , 
                     "&:hover": {
                        backgroundColor: buttontheme.palette.hover.main
                      }}}
                >
                Sign In
                </Button>
            </ThemeProvider>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/" variant="body2" sx={{color: "white"}}>
                  {"New to Netflix? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      
      </Container>
    </ThemeProvider>
        
        
     
    </div>
  )
}

export default SignIn