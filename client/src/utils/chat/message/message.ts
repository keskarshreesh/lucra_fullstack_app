function usernameToColor(username: string) {
  let hash = 0;
  let i;

  for (i = 0; i < username.length; i += 1) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function getBrightness(color: string) {
  const rgb = parseInt(color.slice(1), 16);   // convert hex to integer
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >>  8) & 0xff;
  const b = (rgb >>  0) & 0xff;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}


function getFontColorFromBgColor(bgColor: string) {
  const brightness = getBrightness(bgColor);
  return brightness > 0.5 ? '#000000' : '#FFFFFF';
}

export function getAvatarStyles(userFirstName: string, userLastName: string) {
  
  const bgColor = usernameToColor(`${userFirstName} ${userLastName}`);
  
  return {
    sx: {
      bgcolor: bgColor,
      color: getFontColorFromBgColor(bgColor),
    }
  }
}

export function convertTimestampToLocalTimeString(timestampString: string) {
  const timestamp = parseInt(timestampString, 10);
  const date = new Date(timestamp);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Build the date components, ensuring zero-padding where necessary
  const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
  const dayOfMonth = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Convert 24-hour time to 12-hour format with AM/PM
  let hours = date.getHours();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const hoursFormatted = String(hours).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Construct the new date string in the local timezone but in the same format, with AM/PM
  return `${dayOfWeek}, ${dayOfMonth} ${month} ${year} ${hoursFormatted}:${minutes}:${seconds} ${amPm}`;
}

export function convertGMTToLocalDateString(gmtDateString: string) {
  // Parse the GMT date string
  const date = new Date(gmtDateString);

  // Array of month names
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Build the date components, ensuring zero-padding where necessary
  const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
  const dayOfMonth = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Convert 24-hour time to 12-hour format with AM/PM
  let hours = date.getHours();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const hoursFormatted = String(hours).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Construct the new date string in the local timezone but in the same format, with AM/PM
  return `${dayOfWeek}, ${dayOfMonth} ${month} ${year} ${hoursFormatted}:${minutes}:${seconds} ${amPm}`;
}