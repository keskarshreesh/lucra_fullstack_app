import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import SelfMessage from './message/SelfMessage'
import OtherMessage from './message/OtherMessage'
import { MessageProps, MessageType } from '../../types/chat/message/message';
import { AppContext } from '../../context/AppContext';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { chat_with_ai, get_messages } from '../../services/message/message';
import { Alert } from '@mui/material';
import AppTitle from './AppTitle';

const Chat = () => {

    const [messages, setMessages] = useState<MessageType[]>([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [messagesFetchError, setMessagesFetchError] = useState(false);

    const { user, setUserDetails, toast, spinner } = useContext(AppContext) ?? {};
    
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    let chat_id = searchParams.get("id") ? Number(searchParams.get("id")) : -1;

    const Message:FC<MessageProps> = ({message}) => {
        if(message.role === "user")
            return <SelfMessage message={message} />
        return <OtherMessage message={message} />
    };

    useEffect(() => {
        if (user == null) {
            navigate('/login');
        }
    }, [user, navigate]);

    useEffect(() => {
        if(chat_id === -1) navigate("/home")
    },[navigate,searchParams])

    useEffect(() => {

        spinner?.handleProcessing(true);
        get_messages(user?.username ?? "",chat_id)
        .then(response => {
            setMessagesFetchError(false);
            setMessages(response.data);
            spinner?.handleProcessing(false);
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
    }, []);

    const handleCurrentMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentMessage(event.target.value);
    };

    const handleSendMessage = () => {
        setMessages(prevMessages => [
            ...prevMessages,
            {
                message: currentMessage,
                role: "user",
                timestamp: Date.now().toString(),
                local: true,
            }
        ])
        spinner?.handleProcessing(true);
        chat_with_ai(
            user?.username ?? "",
            chat_id,
            currentMessage,
        )
        .then(response => {
            spinner?.handleProcessing(false);
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    message: response.data.message,
                    role: response.data.role,
                    timestamp: response.data.timestamp,
                }
            ])
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
        setCurrentMessage("");
    };

    const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter") {
            event.preventDefault();
            handleSendMessage();
        }
    };

    if(user === null)
        return <div/>;

    return (
        <div style={{
            backgroundColor: '#E5E4E2',
            backgroundSize: 'cover',
            minHeight: '100vh'
        }}>
            <AppTitle/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '5vh',
                }}
            >
                <Paper
                    sx={{
                        width: "90vw",
                        height: "80vh",
                        padding: 2,
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        backgroundImage: 'url(/chat_bg.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {messagesFetchError &&
                        <Alert severity="error">
                            Couldn't fetch messages
                        </Alert>
                    }
                    <div style={{
                        height: "85%",
                        overflowY: "scroll",
                        marginTop: 2,
                    }}>
                        {messages.map((msg: MessageType, index: number) => 
                            <Message message={msg} key={index}/>
                        )}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "15%"
                        }}
                    >
                        <TextField
                            margin="normal"
                            size="small"
                            id="new-message"
                            autoComplete="new-message"
                            autoFocus
                            sx={{
                                width: '100%',
                                marginRight: "8px",
                                backgroundColor: "white",
                                color: "black",
                            }}
                            onChange={handleCurrentMessageChange}
                            value={currentMessage}
                            onKeyDown={handleEnterPress}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                height: '40px',
                                marginBottom: -1
                            }}
                            onClick={handleSendMessage}
                            disabled={currentMessage === ""}
                        >
                            <SendIcon />
                        </Button>
                    </div>
                </Paper>
            </Box>
        </div>
    )
}

export default Chat;