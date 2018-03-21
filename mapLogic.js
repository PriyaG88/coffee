const container = document.getElementById('map');
const nyBounds = [
    [-74.04728500751165, 40.68392799015035],
    [-73.91058699000139, 40.87764500765852]
];

mapboxgl.accessToken = 'pk.eyJ1IjoicHJpeWFnODgiLCJhIjoiY2plcTVnNjljMDRhNTJ3cDcwOWw0ZHNqNiJ9.jwdjwmFREhCQkLrWTE_Mvg';
const map = new mapboxgl.Map({
container,
style: 'mapbox://styles/mapbox/streets-v9',
zoom: 13,
maxBounds: nyBounds
});

map.on('load', () => {
  map.addLayer({
    id: 'locations',
    type: 'symbol',
    source: {
      type: 'geojson',
      data: 'https://api.myjson.com/bins/19lqoz'
    },
    layout: {
      'icon-image': 'cafe-15',
      'icon-allow-overlap': true,
    }
  });
});

map.on('click', 'locations', e => {
  map.flyTo({
    center: e.features[0].geometry.coordinates
  });
});