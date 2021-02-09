export function getUserLocation(success) {
  const options = {
    enableHighAccuracy: true,
  };

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  window.navigator.geolocation.getCurrentPosition(success, error, options);
}
