let formattedData;

(async function fetchStarbucksData() {
  const URL = 'https://gist.githubusercontent.com/lbud/35e4847d13e5524d08d3e547318cf689/raw/d44940c13e70b2bb683345c511f85d249ee5ccfc/starbucks.csv';
  const data = await fetch(URL)
    .then(res => res.text())
    .then(data => data);
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
        title: 'Starbucks',
        description: null
      }
    };
    tempObj.geometry.coordinates.push(parseFloat(row[longitudeIdx]));
    tempObj.geometry.coordinates.push(parseFloat(row[latitudeIdx]));
    tempObj.properties.description = row[storeNameIdx];
    geoJson.features.push(tempObj);

  });
  console.log(geoJson);
  formattedData = geoJson;
};

// const formatJson = data => {
//   const separatedData = data.split('\n');
//   const COL_HEADERS = separatedData.shift().split(',');
//   separatedData.pop();
//   const ROW_DATA = [];
//   const formattedData = {};
//   let tempObj = {};
//
//   separatedData.forEach(storeData => ROW_DATA.push(storeData.split(',')));
//
//   ROW_DATA.forEach((row, outterIdx) => {
//     let storeId;
//
//     ROW_DATA[outterIdx].forEach((storeData, innerIdx) => {
//       if (COL_HEADERS[innerIdx] === 'Store ID') {
//         storeId = ROW_DATA[outterIdx][innerIdx];
//       }
//       tempObj[COL_HEADERS[innerIdx]] = ROW_DATA[outterIdx][innerIdx];
//     });
//     formattedData[storeId] = tempObj;
//     tempObj = {};
//   });
//
//   return formattedData;
// };

/*

result after parsing
locations = {
  StoreId:  {
    Country: "",
    StoreId: 1,
    Name: "",
    Brand: "",
    StoreNumber: "",
    PhoneNumber: "",
    OwnershipType: "",
    StreetCombined: "",
    Street1: "",
    Street2: "",
    Street3: "",
    City: "",
    CountrySubdivision: "",
    PostalCode: 123132,
    Latitude: 234234,
    Longitude: 234234,
    Timezone: "",
    CurrentTimezoneOffset: 123,
    OlsonTimezone: ""
  }
}
*/
