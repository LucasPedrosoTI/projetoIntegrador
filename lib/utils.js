module.exports = {
  capitalizeName: (name) => {
    return name.replace(/\b(\w)/g, (s) => s.toUpperCase());
  },

  roundHalf: (num) => {
    return Math.round(num * 2) / 2;
  },

  calcularDistancia: (latitudeP, longitudeP, latitude, longitude) => {
    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }

    function menorDistancia() {
      const radius = 6371;
      const dLat = deg2rad(latitude - latitudeP);
      const dLon = deg2rad(longitude - longitudeP);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(latitude)) *
          Math.cos(deg2rad(latitudeP)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const center = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var distancia = radius * center; // returns the distance in km
      return distancia;
    }

    return menorDistancia(latitudeP, longitudeP, latitude, longitude);
  },
};
