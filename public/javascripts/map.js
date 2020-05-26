var request = new XMLHttpRequest();
let postos = { type: "FeatureCollection", features: [] };
request.open("GET", "http://localhost:3000/posto/index", true);
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach((posto) => {
      let novoPosto = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [posto.longitude, posto.latitude],
        },
        properties: {
          address: posto.endereco,
          city: posto.cidade,
          country: "Brasil",
          postalCode: posto.cep,
          state: posto.estado,
        },
      };

      postos.features.push(novoPosto);
    });
  } else {
    console.log(data);
  }
};
request.send();
// console.log(postos);

let params = new URLSearchParams(document.location.search.substring(1));
var latitude = params.get('latitude');
var longitude = params.get('longitude');
if (!latitude && !longitude) {
  var longitude = -47.92972;
  var latitude = -15.77972;
}

var options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  longitude = pos.coords.longitude;
  latitude = pos.coords.latitude;
}

function error() {
  // window.alert(
  //   "Atenção, é necessário ativar localização para encontrar os postos próximos a você"
  // );
}

navigator.geolocation.getCurrentPosition(success, error, options);

mapboxgl.accessToken =
  'pk.eyJ1IjoibHVjYXNwZWRyb3NvdGkiLCJhIjoiY2s3czdncXpyMGJuNTNmbzVzMWtkd3k5ayJ9.fgW0dfdOAaDbrGjlWb5rCg';

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  center: [longitude, latitude], //starting position
  zoom: 13, //starting zoom
});

postos.features.forEach(function (posto, i) {
  posto.properties.id = i;
});

map.on("load", function (e) {
  /* Add the data to your map as a layer */
  map.addLayer({
    id: "locations",
    type: "symbol",
    /* Add a GeoJSON source containing place coordinates and information. */
    source: {
      type: "geojson",
      data: postos,
    },
    layout: {
      "icon-image": "fuel-15",
      "icon-allow-overlap": true,
    },
  });

  /**
   * Add things to the page:
   * - The location listings on the side of the page
   */
  buildLocationList(postos);
});

/**
 * Listen to the map and when it is clicked, do three things:
 * 1. Query the map to determine if a feature in the
 *    "locations" layer exists at that point.
 * 2. If yes, then:
 *   a. Fly to the point
 *   b. Close all other popups and display popup for clicked store
 *   c. Highlight listing in sidebar (and remove highlight for all other listings)
 **/
map.on("click", function (e) {
  /* Query the map to determine if a feature in the "locations" layer exists at that point. */
  var features = map.queryRenderedFeatures(e.point, {
    layers: ["locations"],
  });

  /* If yes, then: */
  if (features.length) {
    var clickedPoint = features[0];

    /* Fly to the point */
    flyToStore(clickedPoint);

    /* Close all other popups and display popup for clicked store */
    createPopUp(clickedPoint);

    /* Highlight listing in sidebar (and remove highlight for all other listings) */
    var activeItem = document.getElementsByClassName("active");
    if (activeItem[0]) {
      activeItem[0].classList.remove("active");
    }
    var listing = document.getElementById(
      "listing-" + clickedPoint.properties.id
    );
    listing.classList.add("active");
  }
});

/**
 * Add a listing for each store to the sidebar.
 **/
function buildLocationList(data) {
  data.features.forEach(function (store, i) {
    /**
     * Create a shortcut for `store.properties`,
     * which will be used several times below.
     **/
    var prop = store.properties;

    /* Add a new listing section to the sidebar. */
    var listings = document.getElementById("listings");
    var listing = listings.appendChild(document.createElement("div"));
    /* Assign a unique `id` to the listing. */
    listing.id = "listing-" + data.features[i].properties.id;
    /* Assign the `item` class to each listing for styling. */
    listing.className = "item";

    /* Add the link to the individual listing created above. */
    var link = listing.appendChild(document.createElement("a"));
    link.href = "#";
    link.className = "title";
    link.dataPosition = i;
    link.innerHTML = prop.address;

    /* Add details to the individual listing. */
    var details = listing.appendChild(document.createElement("div"));
    details.innerHTML = prop.city;
    if (prop.phone) {
      details.innerHTML += " &middot; " + prop.phoneFormatted;
    }
    if (prop.distance) {
      var roundedDistance = Math.round(prop.distance * 100) / 100;
      details.innerHTML +=
        "<p><strong>" + roundedDistance + " miles away</strong></p>";
    }

    /**
     * Listen to the element and when it is clicked, do four things:
     * 1. Update the `currentFeature` to the store associated with the clicked link
     * 2. Fly to the point
     * 3. Close all other popups and display popup for clicked store
     * 4. Highlight listing in sidebar (and remove highlight for all other listings)
     **/
    link.addEventListener("click", function (e) {
      var clickedListing = data.features[this.dataPosition];
      flyToStore(clickedListing);
      createPopUp(clickedListing);
      var activeItem = document.getElementsByClassName("active");
      if (activeItem[0]) {
        activeItem[0].classList.remove("active");
      }
      this.parentNode.classList.add("active");
    });
  });
}

/**
 * Use Mapbox GL JS's `flyTo` to move the camera smoothly
 * a given center point.
 **/
function flyToStore(currentFeature) {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 15,
  });
}

/**
 * Create a Mapbox GL JS `Popup`.
 **/
function createPopUp(currentFeature) {
  var popUps = document.getElementsByClassName("mapboxgl-popup");
  if (popUps[0]) popUps[0].remove();

  var popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(
      "<h3>Sweetgreen</h3>" +
        "<h4>" +
        currentFeature.properties.address +
        "</h4>"
    )
    .addTo(map);
}

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

// Add the geocoder to the map
map.addControl(geocoder, "top-left");

// var directions = new MapboxDirections({
//   accessToken: mapboxgl.accessToken,
//   unit: 'metric',
//   placeholderOrigin: 'Clique na sua posição inicial',
//   placeholderDestination: 'Clique no posto escolhido',
//   geocoder: geocoder,
//   country: 'br',
// });

// map.addControl(directions, 'top-left');
