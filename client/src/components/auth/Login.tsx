import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Alert, IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginDetails } from '../../types/auth/auth';
import { AppContext } from '../../context/AppContext';
import { login } from '../../services/auth/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const { user, setUserDetails, spinner } = useContext(AppContext) ?? {};

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginDetails>({
        mode: "onBlur"
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (user !== null) {
            navigate('/home');
        }
    },[user,navigate])

    const handleLogin: SubmitHandler<LoginDetails> = (data, event) => {
        event?.preventDefault();
        const { username, password } = data;
        spinner?.handleProcessing(true);
        login({
            username: username,
            password: password,
        })
        .then(response => {
            spinner?.handleProcessing(false);
            setLoginError(false);
            // Set user details in app context and JWT in local storage
            if(setUserDetails) {
                setUserDetails({
                    username: response.data.username,
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    email: response.data.email,
                });
                localStorage.setItem('jwt', response.data.access_token);
            }
        })
        .catch(error => {
            spinner?.handleProcessing(false);
            setLoginError(true);
            console.log(error); //For dev purposes, should be removed in production
        })
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    if(user !== null)
        return null;

    return (
        <Container component="main" maxWidth="xs">
            <Paper
                sx={{
                    padding: 4,
                    marginTop: 8,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {loginError &&
                        <Alert severity="error">
                            Invalid username and/or password
                        </Alert>
                    }
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                autoComplete="username"
                                autoFocus
                                {...register('username', { required: true })}
                                error={!!errors.username}
                                helperText={errors.username ? 'Username is required' : ''}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                autoComplete="current-password"
                                {...register('password', { required: true })}
                                error={!!errors.password}
                                helperText={errors.password ? 'Password is required' : ''}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={togglePasswordVisibility}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={!isValid}
                            >
                                Sign In
                            </Button>
                        </form>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default Login;