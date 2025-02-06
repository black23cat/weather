const context = require.context('./bg-body', true, /.jpg$/);

const obj = {
  getBgImage(hour) {
    if (hour >= 5 && hour <= 6) {
      return this['bg-body-sunrise'];
    } else if (hour >= 17 && hour <= 18) {
      return this['bg-body-dusk'];
    } else if (hour >= 7 && hour <= 16) {
      return this['bg-body-day'];
    } else {
      return this['bg-body-night'];
    }
  },
};

context.keys().forEach((key) => {
  const backgroundImages = key
    .split('./')
    .pop() // remove the first 2 characters
    .substring(0, key.length - 6); // remove the file extension
  obj[backgroundImages] = context(key);
});

export default obj;
