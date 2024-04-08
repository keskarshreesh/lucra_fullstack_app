import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Alert, IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { signup } from '../../services/auth/auth';
import { AppContext } from '../../context/AppContext';
import { SignupDetails } from '../../types/auth/auth';

const Signup = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [signupError, setSignupError] = useState(false);

    const { spinner } = useContext(AppContext) ?? {};

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<SignupDetails>({
        mode: "onBlur"
    });

    const handleSignup: SubmitHandler<SignupDetails> = (data,event) => {
        event?.preventDefault();
        const { firstname, lastname, email, username, password } = data;
        spinner?.handleProcessing(true);
        signup({
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: password,
        })
        .then(response => {
            spinner?.handleProcessing(false);
            setSignupSuccess(true);
            setSignupError(false);
            console.log(response); //For dev purposes, should be removed in production
        })
        .catch(error => {
            spinner?.handleProcessing(false);
            setSignupSuccess(false);
            setSignupError(true);
            console.log(error); //For dev purposes, should be removed in production
        })
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
                    {signupSuccess &&
                        <Alert severity="success">
                            Sign up successful! <Link href="/login">Proceed to Login</Link>
                        </Alert>
                    }
                    {signupError &&
                        <Alert severity="error">
                            Sign up failed, please try again or contact support
                        </Alert>
                    }
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <form onSubmit={handleSubmit(handleSignup)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="firstname"
                                        label="First Name"
                                        autoComplete="firstname"
                                        autoFocus
                                        {...register('firstname', { required: true })}
                                        error={!!errors.firstname}
                                        helperText={errors.firstname ? 'First Name is required' : ''}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="lastname"
                                        label="Last Name"
                                        autoComplete="lastname"
                                        autoFocus
                                        {...register('lastname', { required: true })}
                                        error={!!errors.lastname}
                                        helperText={errors.lastname ? 'Last Name is required' : ''}
                                    />
                                </Grid>
                                <Grid item xs={12}>
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
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        autoComplete="email"
                                        autoFocus
                                        {...register('email', { required: true })}
                                        error={!!errors.username}
                                        helperText={errors.username ? 'Email is required' : ''}
                                    />
                                </Grid>
                                <Grid item xs={12}>
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
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={!isValid}
                            >
                                Sign Up
                            </Button>
                        </form>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    {"Already have an account? Log In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default Signup;