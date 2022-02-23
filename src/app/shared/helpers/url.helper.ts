export function getQueryParam(prop) {
  var params = {};
  var search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 1));
  var definitions = search.split('&');
  definitions.forEach(function (val) {
    var parts = val.split('=', 2);
    params[parts[0]] = parts[1];
  });
  return (prop && prop in params) ? params[prop] : params;
}

export function removeSpace(element: string) {
  if (!element) return element;
  //Remove acentos e substitui-os por letras vazias. Substitui ". " por -, substituir espaços por -, substitui pontos finais por -, remove todos os chars excepto letra,s numeros e -, e remove o último -
  return element.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(". ", '-').replace(/\s+/g, '-').replace(".", '-').replace(/[^a-zA-Z0-9-]/g, "").replace(/-$/g, "").replace(/[-]{2,}/g, "-");
}