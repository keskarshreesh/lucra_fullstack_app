import React, { FC, useContext } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { AppContext } from '../../context/AppContext';

const LoadingIndicator = () => {
  
  const { spinner } = useContext(AppContext) ?? {};

  if (!spinner?.processing) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default LoadingIndicator;
