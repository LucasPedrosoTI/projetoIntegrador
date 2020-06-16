const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const lat = urlParams.get("latitude");
const lng = urlParams.get("longitude");
const search = urlParams.get("search");
var latitude;
var longitude;

document.addEventListener("DOMContentLoaded", function () {
  navigator.geolocation.getCurrentPosition(
    async function (pos) {
      latitude = lat || pos.coords.latitude;
      longitude = lng || pos.coords.longitude;

      if (search) {
        const response = await fetch(
          `http://localhost:3000/posto/consulta?search=${search}`
        );
        const data = await response.json();

        latitude = data[0].geometry.lat;
        longitude = data[0].geometry.lng;
      }

      console.log("params: ", latitude, longitude);

      renderMap(latitude, longitude);
    },
    function () {
      alert(
        "Ooops, precisamos de sua localização para mostrar os postos próximos"
      );
    }
  );
});

function renderMap(latitude, longitude) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibHVjYXNwZWRyb3NvdGkiLCJhIjoiY2s3czdncXpyMGJuNTNmbzVzMWtkd3k5ayJ9.fgW0dfdOAaDbrGjlWb5rCg";

  // let params = new URLSearchParams(document.location.search.substring(1));

  // if (params) {
  //   latitude = params.get("latitude");
  //   longitude = params.get("longitude");
  // }

  var request = new XMLHttpRequest();
  const postos = { type: "FeatureCollection", features: [] };
  request.open(
    "GET",
    `http://localhost:3000/posto/index?latP=${latitude}&longP=${longitude}`,
    true
  );
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      data.forEach(function (posto) {
        let novoPosto = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [posto.longitude, posto.latitude],
          },
          properties: {
            id: posto.id,
            name: posto.nome,
            address: posto.endereco,
            city: posto.cidade,
            country: "Brasil",
            postalCode: posto.cep,
            state: posto.estado,
            bandeira: posto.bandeira,
            produto: posto.produtos[0].nome,
            preco: posto.produtos[0].postos_produtos.preco
              .toLocaleString("pt-br", { style: "currency", currency: "BRL" })
              .replace(".", ","),
          },
        };

        postos.features.push(novoPosto);
      });
    } else {
      console.log(data);
    }
  };
  request.send();

  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v10",
    center: [longitude, latitude], //starting position
    zoom: 15, //starting zoom
  });

  // postos.features.forEach(function (posto, i) {
  //   posto.properties.id = i;
  // });

  map.loadImage("../images/icone-semfundo.png", function (error0, image0) {
    if (error0) throw error0;
    map.addImage("icon-map", image0, {
      sdf: "true",
    });
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
        "icon-image": "icon-map",
        "icon-size": 0.3,
        "icon-allow-overlap": true,
      },
      paint: {
        "icon-color": "#e14242",
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
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["locations"],
    });

    /* If yes, then: */
    if (features.length) {
      const clickedPoint = features[0];
      /* Fly to the point */
      flyToStore(clickedPoint);

      /* Close all other popups and display popup for clicked store */
      createPopUp(clickedPoint);

      /* Highlight listing in sidebar (and remove highlight for all other listings) */
      const activeItem = document.getElementsByClassName("active-posto");
      if (activeItem[0]) {
        activeItem[0].classList.remove("active-posto");
      }
      const listing = document.getElementById(
        "listing-" + clickedPoint.properties.id
      );
      listing.classList.add("active-posto");
    }
  });

  /**
   * Add a listing for each store to the sidebar.
   **/
  function buildLocationList(postos) {
    postos.features.forEach(function (posto, i) {
      /**
       * Create a shortcut for `posto.properties`,
       * which will be used several times below.
       **/
      const prop = posto.properties;

      /* Add a new listing section to the sidebar. */
      // var listings = document.querySelector("listings");
      let listing = document.getElementById(
        "listing-" + postos.features[i].properties.id
      );

      /* Add the link to the individual listing created above. */
      let link =
        listing.firstElementChild.firstElementChild.lastElementChild
          .lastElementChild.children[3];
      link.dataPosition = i;
      link.href = "#";
      link.classList.add("endereco");

      let linkNomePosto =
        listing.firstElementChild.firstElementChild.lastElementChild
          .lastElementChild.children[2];
      linkNomePosto.dataPosition = i;
      linkNomePosto.href = "#";
      linkNomePosto.classList.add("posto-nome");
      /**
       * Listen to the element and when it is clicked, do four things:
       * 1. Update the `currentFeature` to the store associated with the clicked link
       * 2. Fly to the point
       * 3. Close all other popups and display popup for clicked store
       * 4. Highlight listing in sidebar (and remove highlight for all other listings)
       **/

      [link, linkNomePosto].forEach(function (element) {
        element.addEventListener("click", function (e) {
          let clickedListing = postos.features[this.dataPosition];

          flyToStore(clickedListing);
          createPopUp(clickedListing);
          let activeItem = document.getElementsByClassName("active-posto");
          if (activeItem[0]) {
            activeItem[0].classList.remove("active-posto");
          }
          this.parentNode.parentNode.parentNode.parentNode.parentNode.classList.add(
            "active-posto"
          );
          if (screen.width <= 1070) {
            document.getElementById("sidebar").classList.add("d-none");
          }
        });
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
        "<div class='d-flex'><div class='img-popup'> <img src='/images/" +
        currentFeature.properties.bandeira
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(" distribuidora s.a.", "") +
        ".png'> </div> <div class='info-popup'>" +
        "<h6>" +
        currentFeature.properties.bandeira +
        "</h6>" +
        "<p>" +
        currentFeature.properties.address +
        "</p> <strong>" +
        currentFeature.properties.produto +
        "&mdash;" +
        currentFeature.properties.preco +
        "</strong> <br>" +
        //       '<a class="btn btn-success" href="geo:' +
        '<a class="btn btn-success" href="https://www.google.com/maps/@' +
        currentFeature.geometry.coordinates[1] +
        "," +
        currentFeature.geometry.coordinates[0] +
        ",17z" + //Comentar essa linha se utilizar o geo:
          '"target="_blank">Ir</a> </div> </div>' // Alterar para _system se utilizar o geo
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
}
