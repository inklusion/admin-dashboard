export function filterRowsbyText(text: string, allList: any[], searchColumns: string[]) {
  if (allList.length == 0) {
    return allList;
  }
  const val = text.toLowerCase();
  var columns = Object.keys(allList[0]);

  if (searchColumns.length == 0) {
    var searchColumns = Object.keys(allList[0]);
  }


  searchColumns = searchColumns.map(x => x);
  columns = columns.map(x => x);

  columns = columns.filter(item => item != "imageUrl");
  if (!columns.length || val == "")
    return allList;


  return allList.filter(function f(o) {
    for (let i = 0; i <= columns.length; i++) {
      let columnName = columns[i];

      if (o[columnName] && o[columnName].toString().toLowerCase().indexOf(val) > -1) {
        if (searchColumns.includes(columnName)) {
          return true;
        }
      }

      if (isObject(o[columnName])) {
        if (filterObjects(o[columnName], val, searchColumns)) {
          return true;
        }
      };

      if (Array.isArray(o[columnName]) && o[columnName].length > 0) {
        if (o[columnName].filter(f).length) {
          return true;
        }
      }
    }
  })
}

function filterObjects(obj, text, searchColumns) {
  return Object.keys(obj).some(k => {
    if (Array.isArray(obj[k])) {
      var aux = Object.assign({}, obj[k]);
      return filterObjects(aux, text, searchColumns);
    }
    if (isObject(obj[k])) {
      return filterObjects(obj[k], text, searchColumns);
    }
    if (!obj[k]) return false
    if (!searchColumns.includes(k)) return false;
    return obj[k].toString().toLowerCase().indexOf(text) > -1
  });
}

const isObject = n => Object.prototype.toString.call(n) === '[object Object]'