export const dateToLocale = val => new Date(val).toLocaleString()

export const sizeConversion = val => {
  const units = ["B", "KB", "MB", "GB"];
  let size = val;
  let unit = 0;
  while (size >= 1000 && unit < units.length - 1) {
    size /= 1000;
    unit++;
  }
  return `${~~(size * 100) / 100} ${units[unit]}`;
}

export const makeFakeAPI = (callback, min = 400, max = 800) => (...args) => new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      const data = callback(...args)
      resolve(data)
    }
    catch (err) { reject(err) }
  }, min + Math.random() * (max - min));
});
