// Get folder containing background for body
//Specifed the body background images extensions
const context = require.context('./bg-body', true, /.jpg$/);

// Create object literal with method to get the background images based on current hour
const obj = {
  getBgImage(hour) {
    if (hour >= 6 && hour <= 18) {
      return this['bg-body-sunrise'];
    } else {
      return this['bg-body-night'];
    }
  },
};

//loop for every background images found on bg folders
context.keys().forEach((key) => {
  // Clear string for obj key
  const backgroundImages = key
    .split('./')
    .pop() // remove the first 2 characters
    .substring(0, key.length - 6); // remove the file extension
  // bg images file name will be assigned as object key and icon url will be the value
  obj[backgroundImages] = context(key);
});

export default obj;
