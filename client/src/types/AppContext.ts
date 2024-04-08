import { AlertColor } from "@mui/material";
import { UserDetailsType } from "./user";

export type AppContextType = {
    user: UserDetailsType | null;
    setUserDetails: (userDetails: UserDetailsType) => void;
    spinner: {
        processing: boolean;
        handleProcessing: (isProcessing: boolean) => void;
    };
    toast: {
        toastProps: {
            show: boolean;
            message: string;
            severity: AlertColor;
        };
        handleToastProps: (toastProps: any) => void;
    };
};