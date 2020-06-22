var latitude;
var longitude;
var links = Array.from(document.querySelectorAll(".ir"));

navigator.geolocation.getCurrentPosition(function (pos) {
  latitude = pos.coords.latitude;
  longitude = pos.coords.longitude;

  links.forEach((link) => {
    link.href = link.href.replace("origin=", `origin=${latitude},${longitude}`);
  });
});
