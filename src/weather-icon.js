// Get folder containing weather icons
//Specifed the icon extensions
const context = require.context('./icon', true, /.svg$/);

// Create object literal with method to get the required icon
const obj = {
  getIcon(iconName) {
    return this[iconName];
  },
};

//loop for every icon found on icon folders
context.keys().forEach((key) => {
  // Clear string for obj key
  const weatherIcon = key
    .split('./')
    .pop() // remove the first 2 characters
    .substring(0, key.length - 6); // remove the file extension
  // icon file name will be assigned as object key and icon url will be the value
  obj[weatherIcon] = context(key);
});

export default obj;
