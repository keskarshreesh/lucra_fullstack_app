import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Login from './components/auth/Login';
import Chat from './components/chat/Chat';
import { AppContext } from './context/AppContext';
import Signup from './components/auth/Signup';
import { UserDetailsType } from './types/user';
import LoadingIndicator from './components/common/LoadingIndicator';
import Home from './components/home/Home';
import ToastIndicator from './components/common/ToastIndicator';
import { AlertColor } from '@mui/material';

const App = () => {

  const [user,setUser] = useState<UserDetailsType | null>(null);
  const [processing, setProcessing] = useState(false);
  const [toastProps, setToastProps] = useState<{
    show: boolean;
    message: string;
    severity: AlertColor;
  }>({
    show: false,
    message: "",
    severity: "info"
  });

  const handleProcessing = (isProcessing: boolean) => {
    setProcessing(isProcessing);
  };

  const handleToastProps = (toastProps: any) => {
    setToastProps(toastProps);
  }

  const setUserDetails = (userDetails: UserDetailsType | null) => {
    setUser(userDetails);
  }

  return (
    <AppContext.Provider value={{
      user: user,
      setUserDetails: setUserDetails,
      spinner: {
        processing: processing,
        handleProcessing: handleProcessing,
      },
      toast: {
        toastProps: toastProps,
        handleToastProps: handleToastProps,
      },
    }}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
      <LoadingIndicator />
      <ToastIndicator />
    </AppContext.Provider>
  );
}

export default App;
