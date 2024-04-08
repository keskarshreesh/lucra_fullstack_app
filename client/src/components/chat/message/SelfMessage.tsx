import { FC } from 'react';
import { styled } from '@mui/material/styles';
import { MessageProps } from '../../../types/chat/message/message';
import { convertGMTToLocalDateString, convertTimestampToLocalTimeString } from '../../../utils/chat/message/message';

const SelfMessageStyled = styled('div')(({ theme }) => ({
    position: "relative",
    marginRight: "20px",
    // marginBottom: "10px",
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#006A4E",
    width: "60%",
    textAlign: "left",
    font: "400 .9em 'Open Sans', sans-serif",
    border: "1px solid #568203",
    borderRadius: "10px",
    color:"white",
    '&:after': {
      content: "''",
      position: "absolute",
      width: "0",
      height: "0",
      borderTop: "10px solid #006A4E",
      borderLeft: "10px solid transparent",
      borderRight: "10px solid transparent",
      top: "0",
      right: "-10px"
    },
    '&:before': {
      content: "''",
      position: "absolute",
      width: "0",
      height: "0",
      borderTop: "12px solid #568203",
      borderLeft: "11px solid transparent",
      borderRight: "11px solid transparent",
      top: "-1px",
      right: "-12px"
    }
}));

const SelfMessage:FC<MessageProps> = ({message}) => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "flex-end"
        }}>
            <SelfMessageStyled>
                {message.message}
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    fontSize: ".85em",
                    color: "white"
                }}>
                    {message.local ? convertTimestampToLocalTimeString(message.timestamp) : convertGMTToLocalDateString(message.timestamp)}
                </div>
            </SelfMessageStyled>
        </div>
    );
}

export default SelfMessage;