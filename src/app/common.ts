export const getStringDateNow = () => {
  const dt = new Date();
  const year = dt.getFullYear();
  const month = ('00' + (dt.getMonth() + 1)).slice(-2);
  const day = ('00' + dt.getDate()).slice(-2);
  const hour = ('00' + dt.getHours()).slice(-2);
  const minute = ('00' + dt.getMinutes()).slice(-2);
  const second = ('00' + dt.getSeconds()).slice(-2);
  const result = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  return result;
};
