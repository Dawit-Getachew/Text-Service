const xlsxParser = require('xls-parser')

const getData = (file) => {
  return xlsxParser
    .onFileSelection(file)
    .then(data => {
      return { data }
    });
}

module.exports = { getData }