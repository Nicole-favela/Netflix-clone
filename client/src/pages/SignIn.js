import React from 'react'
import "./SignIn.css"

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from "@mui/system";
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
function SignIn() {
    const register = (event) => {
        event.preventDefault(); //prevents refresh when entering info
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
      };
    const signIn=(event) =>{
        event.preventDefault()
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
         
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={register} noValidate sx={{ mt: 1,  }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            
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
                <Link href="#" variant="body2" sx={{color: "white"}}>
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