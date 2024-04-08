import { FC } from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { MessageProps } from '../../../types/chat/message/message';
import { convertGMTToLocalDateString, convertTimestampToLocalTimeString, getAvatarStyles } from '../../../utils/chat/message/message';

const OtherMessageStyled = styled('div')(({ theme }) => ({
    position: "relative",
    marginLeft: "20px",
    marginTop: "15px",
    padding: "10px",
    backgroundColor: "#343434",
    width: "60%",
    textAlign: "left",
    font: "400 .9em 'Open Sans', sans-serif",
    border: "1px solid #36454F",
    borderRadius: "10px",
    color: "white",
    "&:after": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "10px solid #343434",
        borderLeft: "10px solid transparent",
        borderRight: "10px solid transparent",
        top: "0",
        left: "-10px"
    },
    "&:before": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "12px solid #36454F",
        borderLeft: "11px solid transparent",
        borderRight: "11px solid transparent",
        top: "-1px",
        left: "-12px"
    }, 
}));

const OtherMessage:FC<MessageProps> = ({message}) => {
    return (
        <div style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
        }}>
            <Avatar
                alt="AI"
                src={`${process.env.PUBLIC_URL}/mistral-ai-icon.png`}
            />
            <OtherMessageStyled>
                <div style={{ color: "white" }}>
                    Mistral 7B
                </div>
                {message.message}
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    fontSize: ".85em",
                    color: "white"
                }}>
                    {convertGMTToLocalDateString(message.timestamp)}
                </div>
            </OtherMessageStyled>
        </div>
    )
}

export default OtherMessage;