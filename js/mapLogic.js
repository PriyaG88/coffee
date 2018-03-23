const container = document.getElementById('map');
const nyBounds = [
    [-74.04728500751165, 40.68392799015035],
    [-73.91058699000139, 40.87764500765852]
];

mapboxgl.accessToken = 'pk.eyJ1IjoicHJpeWFnODgiLCJhIjoiY2plcTVnNjljMDRhNTJ3cDcwOWw0ZHNqNiJ9.jwdjwmFREhCQkLrWTE_Mvg';
const map = new mapboxgl.Map({
container,
style: 'mapbox://styles/mapbox/streets-v9',
center: [-73.9654, 40.7829],
zoom: 13,
maxBounds: nyBounds
});

map.on('load', () => {
  map.addLayer({
    id: 'locations',
    type: 'symbol',
    source: {
      type: 'geojson',
      data: formattedData
    },
    layout: {
      'icon-image': 'cafe-15',
      'icon-allow-overlap': true,
    }
  });
  buildLocationList(formattedData);
});

map.on('click', 'locations', e => {
  map.flyTo({
    center: e.features[0].geometry.coordinates
  });
});

function moveToLocation(location) {
  map.flyTo({
    center: location.geometry.coordinates,
    zoom: 18
  });
}

function buildLocationList(data) {
  data.features.forEach((feature, i) => {
    const locations = document.getElementsByClassName('locations')[0];
    const location = locations.appendChild(document.createElement('div'));
    const name = location.appendChild(document.createElement('p'));
    const number = location.appendChild(document.createElement('p'));
    location.classList.add('location-item');
    name.innerHTML = feature.properties.title;
    number.innerHTML = feature.properties.phoneNumber;

    location.addEventListener('click', () => {
      const clicked = data.features[i];
      moveToLocation(clicked);
    });
  });
}
