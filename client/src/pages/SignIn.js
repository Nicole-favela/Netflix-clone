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
import Cookie from "js-cookie";
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
  const dispatch = useDispatch()
  
  const navigate = useNavigate()
    //create new user
    // const register = (event) => {
    //     event.preventDefault(); //prevents refresh when entering info
    //     // const data = new FormData(event.currentTarget);
    //     // console.log({
    //     //   email: data.get('email'),
    //     //   password: data.get('password'),
    //     // });
    //   };
    const signIn= async (event) =>{
        event.preventDefault()

        try{
        //get form data 
        //const data = new FormData(event.currentTarget);
        // const form = {
        //   email: data.get('email'),
        //   password: data.get('password'),
        // };
        const form = {
          email,
          password,
        }
        const res = await fetch('http://localhost:3001/api/login',{
            method:'POST',
            body: JSON.stringify(form),
            headers:{
                "content-type": "application/json"
            }
        })
        console.log(res)

        //check token from backend
        const {token, user} = await res.json();
        if(!user){
          console.log("user is null!")
        }
        console.log("user is: ", user.email)

        //if res is not ok, let user know pw or email was incorrect
       
      
        if(res.ok){
           alert('success, redirecting to home page...! user email is: ', user.email)
           Cookie.set("token", token);
           dispatch(login({
            email: user.email,
            password: user.password,
            loggedIn: true
          
          }));
           navigate('/') //show home page
          
        }
      }catch(e){
        alert('the password or email was incorrect, please try again')
        navigate('/') //show home page
      }
        // else{
        //   alert('the password or email was incorrect, please try again')
        //   navigate('/login') //show home page
        // }
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