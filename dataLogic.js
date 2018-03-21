let formattedData;

(async function fetchStarbucksData() {
  const URL = 'https://gist.githubusercontent.com/lbud/35e4847d13e5524d08d3e547318cf689/raw/d44940c13e70b2bb683345c511f85d249ee5ccfc/starbucks.csv';
  const data = await fetch(URL)
    .then(res => res.text());
  formatGeoJson(data);
})();

const formatGeoJson = data => {
  const separatedData = data.split('\n');
  separatedData.pop(); // remove trailing new line
  const COL_HEADERS = separatedData.shift().split(','); // separate headers from rest of data
  const ROW_DATA = [];
  const latitudeIdx = COL_HEADERS.indexOf('Latitude');
  const longitudeIdx = COL_HEADERS.indexOf('Longitude');
  const storeNameIdx = COL_HEADERS.indexOf('Name');
  const storeIdIdx = COL_HEADERS.indexOf('Store ID');
  const geoJson = {
    type: 'FeatureCollection',
    features: []
  };

  separatedData.forEach(storeData => ROW_DATA.push(storeData.split(',')));
  ROW_DATA.forEach(row => {
    let tempObj = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: []
      },
      properties: {
        title: null,
        storeId: null
      }
    };
    tempObj.geometry.coordinates.push(parseFloat(row[longitudeIdx]), parseFloat(row[latitudeIdx]));
    tempObj.properties.title = row[storeNameIdx];
    tempObj.properties.storeId = row[storeIdIdx];
    geoJson.features.push(tempObj);

  });
  formattedData = geoJson;
};
