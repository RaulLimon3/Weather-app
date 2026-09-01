const setTime = (unixValue) => {
    return dateFormat(new Date(unixValue * 1000));
};

const dateFormat = (date) => {
    return date.toLocaleTimeString('es-MX', { hour12: true, hour: 'numeric', minute: '2-digit' });
};

export default setTime;