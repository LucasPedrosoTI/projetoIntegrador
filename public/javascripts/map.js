function map() {
  var longitude = -46.675374;
  var latitude = -23.602278;

  function mapToken() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibHVjYXNwZWRyb3NvdGkiLCJhIjoiY2s3czdncXpyMGJuNTNmbzVzMWtkd3k5ayJ9.fgW0dfdOAaDbrGjlWb5rCg";
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/lucaspedrosoti/ck964vgif10uy1ipfg06khg8r",
      center: [longitude, latitude], //starting position
      zoom: 15, //starting zoom
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
      "bottom-right"
    );

    var geocoder = new MapboxGeocoder({
      // Initialize the geocoder
      accessToken: mapboxgl.accessToken, // Set the access token
      country: "br",
      language: "pt",
      limit: 3,
      placeholder: "Procure por postos na sua região",
      bbox: [
        -73.77493776908774,
        -32.98057295306361,
        -34.256190424496054,
        4.7638483197232375,
      ], // boundary for Brazil
      proximity: {
        longitude: -46.63662662966749,
        latitude: -23.551037985162353,
      },
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      marker: true, // Do not use the default marker style
    });
    /*
    // Add the geocoder to the map
    map.addControl(geocoder, "top-left");
    */

    var directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      placeholderOrigin: "Clique na sua posição inicial",
      placeholderDestination: "Clique no posto escolhido",
      geocoder: geocoder,
      country: "br",
    });

    map.addControl(directions, "top-left");
  }

  var options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    longitude = pos.coords.longitude;
    latitude = pos.coords.latitude;

    mapToken();
  }

  function error() {
    window.alert(
      "Atenção, é necessário ativar localização para encontrar os postos próximos a você"
    );

    mapToken();
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
}

map();
