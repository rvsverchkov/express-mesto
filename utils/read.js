const fsPromises = require('fs').promises;

module.exports = (pathUrl) => { //Файл, отвечающий за чтение данных из файлов с расширением .json
  return fsPromises.readFile(pathUrl, { encoding: 'utf8'})
    .then(file => {
      console.log(file);
      return JSON.parse(file);
    })
}