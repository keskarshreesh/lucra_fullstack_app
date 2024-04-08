export type MessageProps = {
    message: {
        message: string;
        role: string;
        timestamp: string;
        local?: boolean;
    };
};

export type MessageType = {
    message: string;
    role: string;
    timestamp: string;
}