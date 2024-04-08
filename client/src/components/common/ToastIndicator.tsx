import React, { FC, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Alert, Snackbar } from '@mui/material';

const ToastIndicator = () => {

    const { toast } = useContext(AppContext) ?? {};

    const handleClose = () => toast?.handleToastProps({
        show: false,
        message: "",
        severity: "info",
    })

    return (
        <Snackbar
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
            open={toast?.toastProps.show}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={toast?.toastProps.severity ?? "success"}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {}
            </Alert>
        </Snackbar>
    )
}

export default ToastIndicator;