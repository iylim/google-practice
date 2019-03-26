// endpoint
var api = 'https://data.sfgov.org/resource/6a9r-agq8.json'
  
// cached dom elements
var map = document.getElementById('map');
var name = document.getElementById('name');

 // event listeners

 // functions
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.753717, lng: -122.388359},
      zoom: 14
    });
    
  };

function getAllFoodTrucks() {
    fetch(`${api}`)
    .then(response => response.json())
    .then(json => render(json));
}

function render(json) { 
   
    json.forEach(function(elem) {
        var latitude = elem.location.coordinates[1];
        var longitude = elem.location.coordinates[0];
        var applicant = elem.applicant;
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: map,
            applicant: applicant
        });
        var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">`${applicant}`</h1>'
      '</div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
          });
        marker.addListener('click', function() {
            infowindow.open(map, marker)
        });
    });
}

// function getName(applicant) {
//     console.log(marker.applicant);
//     name.innerHTML = marker.applicant;
// }
getAllFoodTrucks();
