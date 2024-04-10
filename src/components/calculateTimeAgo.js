export const calculateTimeAgo = (date) => {
  const currentDate = new Date();
  const givenDate = new Date(date);
  const difference = currentDate - givenDate;

  // Milisaniyeden dakikaya dönüştürme
  const minutes = Math.floor(difference / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hour ago`;
  } else if (days < 30) {
    return `${days} days ago`;
  } else {
    const months = Math.floor(days / 30);
    return `${months} month ago`;
  }
};
