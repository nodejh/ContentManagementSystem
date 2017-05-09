const checkIsImage = (name) => {
  const nameArr = name.split('.');
  const extension = nameArr[nameArr.length - 1];
  const postfix = ['bmp', 'jpg', 'jpeg', 'png', 'gif', 'svg'];
  return extension && postfix.indexOf(extension.toLowerCase()) !== -1;
};


// < 20M
const checkSize = size => size < (20 * 1024 * 1024);

export {
  checkIsImage,
  checkSize,
};
