const checkIsImage = (name) => {
  const nameArr = name.split('.');
  console.log('nameArr: ', nameArr);
  const extension = nameArr[nameArr.length - 1];
  console.log('extension: ', extension);
  const postfix = ['bmp', 'jpg', 'jpeg', 'png', 'gif', 'svg'];
  return extension && postfix.indexOf(extension.toLowerCase()) !== -1;
};


// < 20M
const checkSize = size => size < (20 * 1024 * 1024);

export {
  checkIsImage,
  checkSize,
};
