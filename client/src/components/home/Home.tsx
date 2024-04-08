import React, { useContext, useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { fetchUserByAccessToken } from '../../services/auth/auth';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography, alpha } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { createChat, getLatestChat } from '../../services/chat/chat';

const Home = () => {

    const { user, setUserDetails, spinner, toast } = useContext(AppContext) ?? {};

    const [confirmStartNewChat, setConfirmStartNewChat] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(user == null)
        {
            const access_token = localStorage.getItem("jwt");
            if(access_token)
            {
                spinner?.handleProcessing(true);
                fetchUserByAccessToken()
                    .then(response => {
                        spinner?.handleProcessing(false);
                        if(setUserDetails)
                            setUserDetails({
                                username: response.data.username,
                                firstname: response.data.firstname,
                                lastname: response.data.lastname,
                                email: response.data.email,
                            })
                    })
                    .catch(error => {
                        spinner?.handleProcessing(false);
                        if(error.response && error.response.status === 401)
                        {
                            //Re-login
                            localStorage.removeItem("jwt");
                            navigate("/login");
                        }
                        else toast?.handleToastProps({
                            show: true,
                            message: "Unexpected error, please try again",
                            severity: "error",
                        })
                    })
            }
            else navigate("/login")
        }
    },[user,navigate])

    const handleStartNewChat = () => {
        spinner?.handleProcessing(true);
        createChat(user?.username ?? "")
            .then(response => {
                spinner?.handleProcessing(false);
                navigate(`/chat?${createSearchParams({
                    id: response.data.id.toString()
                }).toString()}`);
            })
            .catch(error => {
                spinner?.handleProcessing(false);
                if(error.response && error.response.status === 401)
                {
                    localStorage.removeItem("jwt");
                    if(setUserDetails) setUserDetails(null);
                }
                else toast?.handleToastProps({
                    show: true,
                    message: "Unexpected error, please try again",
                    severity: "error",
                })
            })
    }

    const handleGetLastChat = () => {
        spinner?.handleProcessing(true);
        getLatestChat(user?.username ?? "")
            .then(response => {
                spinner?.handleProcessing(false);
                navigate(`/chat?${createSearchParams({
                    id: response.data.id.toString()
                }).toString()}`);
            })
            .catch(error => {
                spinner?.handleProcessing(false);
                if(error.response && error.response.status === 401)
                {
                    localStorage.removeItem("jwt");
                    if(setUserDetails) setUserDetails(null);
                }
                else setConfirmStartNewChat(true);
            })
    }

    const handleCloseConfirmStartNewChat = () => {
        setConfirmStartNewChat(false);
    }

    const handleConfirmStartNewChat = () => {
        setConfirmStartNewChat(false);
        handleStartNewChat();
    }

    // Set user details to null in app context and remove JWT in local storage
    const handleLogout = () => {
        localStorage.removeItem("jwt");
        if(setUserDetails) setUserDetails(null);
    }

    if(user == null)
        return <div />
    
    return (
        <Box
            id="hero"
            sx={(theme) => ({
                width: '100%',
                backgroundImage:
                    theme.palette.mode === 'light'
                        ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                        : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
                backgroundSize: '100% 20%',
                backgroundRepeat: 'no-repeat',
            })}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'end',
                    width: "100%",
                    marginLeft: 65
                }}
            >
                <Button onClick={handleLogout}>
                    <Logout/>
                </Button>
            </Container>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: { xs: 14, sm: 20 },
                    pb: { xs: 8, sm: 12 },
                }}
            >
                <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
                    <Typography
                        variant="h1"
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignSelf: 'center',
                            textAlign: 'center',
                            fontSize: 'clamp(3.5rem, 10vw, 4rem)',
                        }}
                    >
                        HFChat&nbsp;
                        <Typography
                            component="span"
                            variant="h1"
                            sx={{
                                fontSize: 'clamp(3rem, 10vw, 4rem)',
                                color: (theme) =>
                                theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                            }}
                        >
                        Mistral
                        </Typography>
                    </Typography>
                    <Typography
                        textAlign="center"
                        color="text.secondary"
                        sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
                    >
                        Chat with Mistral on HuggingFace
                    </Typography>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        alignSelf="center"
                        spacing={1}
                        useFlexGap
                        sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
                    >
                        <Button variant="contained" color="primary" onClick={handleStartNewChat}>
                            Start new chat
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleGetLastChat}>
                            Continue Last chat
                        </Button>
                    </Stack>
                </Stack>
            </Container>
            <Dialog
                open={confirmStartNewChat}
                onClose={handleCloseConfirmStartNewChat}
            >
                <DialogTitle>
                    {"Start a New Chat?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Previous chats not found, please confirm if you would
                        like to start a new chat.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirmStartNewChat}>No</Button>
                    <Button onClick={handleConfirmStartNewChat} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Home;