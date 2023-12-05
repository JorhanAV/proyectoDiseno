//Primer uso de javaScript

var directionsService, directionsRenderer;

function iniciarMap() {
    var coord = {lat: 10.08288, lng: -84.20952};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: coord
    });
    var marker = new google.maps.Marker({
        position: coord,
        map: map
    });

    // Inicializar DirectionsService y DirectionsRenderer
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({map: map});
}

function trazarRutaDesdeMiUbicacion() {
  // Verificar si el navegador soporta geolocalización
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
          // Coordenadas de la ubicación actual del usuario
          var origen = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

          // Coordenadas de tu negocio
          var coord = {lat: 10.08288, lng: -84.20952};
          var destino = new google.maps.LatLng(coord.lat, coord.lng);

          // Configuración de la solicitud de dirección desde la ubicación actual hasta tu negocio
          var request = {
              origin: origen,
              destination: destino,
              travelMode: google.maps.TravelMode.DRIVING
          };

          // Llamada al servicio de direcciones para obtener la ruta
          directionsService.route(request, function (result, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                  // Muestra la ruta en el mapa
                  directionsRenderer.setDirections(result);
              } else {
                  console.error('Error al trazar la ruta:', status);
              }
          });
      }, function (error) {
          console.error('Error al obtener la ubicación:', error.message);
      });
  } else {
      console.error('La geolocalización no está soportada por este navegador.');
  }
}

