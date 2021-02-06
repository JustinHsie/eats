export function getDistance(userLocation, places) {
  const userLat = userLocation.lat;
  const userLng = userLocation.lng;
  const google = window.google;

  const origin = new google.maps.LatLng(userLat, userLng);
  const destinations = places.map(place => {
    const lat = place.location.mapCenter.lat;
    const lng = place.location.mapCenter.lng;
    return { lat, lng };
  });

  const service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: destinations,
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.IMPERIAL,
    },
    callback
  );

  function callback(response, status) {
    console.log(response);
  }
}
