const formatTemperature = (value) => value == null ? 'N/D' : `${value}°`;

const formatDistance = (value) => value == null ? 'N/D' : `${value} km`;

const formatWindSpeed = (value) => value == null ? 'N/D' : `${value} m/s`;

const formatPercentage = (value) => value == null ? 'N/D' : `${value}%`;

const formatPressure = (value) => value == null ? 'N/D' : `${value} hPa`;

export {
    formatTemperature, formatDistance, formatWindSpeed, formatPercentage, formatPressure
};