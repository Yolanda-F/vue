let xhr = new XMLHttpRequest();
xhr.open("GET", "/config.json", false);
xhr.onload = function () {
  window["CONFIG"] = JSON.parse(xhr.responseText);
};
xhr.send(null);
