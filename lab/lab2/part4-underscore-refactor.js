(function(){

  var map = L.map('map', {
    center: [39.9522, -75.1639],
    zoom: 14
  });
  var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  }).addTo(map);

  /* =====================

  # Lab 2, Part 4 — (Optional, stretch goal)

  ## Introduction

    You've already seen this file organized and refactored. In this lab, you will
    try to refactor this code to be cleaner and clearer - you should use the
    utilities and functions provided by underscore.js. Eliminate loops where possible.

  ===================== */

  // Mock user input
  // Filter out according to these zip codes:
  var acceptedZipcodes = [19106, 19107, 19124, 19111, 19118];
  // Filter according to enrollment that is greater than this variable:
  var minEnrollment = 300;

  /*

  //ORIGINAL CODE

  // clean data
  for (var i = 0; i < schools.length - 1; i++) {
    // If we have '19104 - 1234', splitting and taking the first (0th) element
    // as an integer should yield a zip in the format above
    if (typeof schools[i].ZIPCODE === 'string') {
      split = schools[i].ZIPCODE.split(' ');
      normalized_zip = parseInt(split[0]);
      schools[i].ZIPCODE = normalized_zip;
    }

    // Check out the use of typeof here — this was not a contrived example.
    // Someone actually messed up the data entry
    if (typeof schools[i].GRADE_ORG === 'number') {  // if number
      schools[i].HAS_KINDERGARTEN = schools[i].GRADE_LEVEL < 1;
      schools[i].HAS_ELEMENTARY = 1 < schools[i].GRADE_LEVEL < 6;
      schools[i].HAS_MIDDLE_SCHOOL = 5 < schools[i].GRADE_LEVEL < 9;
      schools[i].HAS_HIGH_SCHOOL = 8 < schools[i].GRADE_LEVEL < 13;
    } else {  // otherwise (in case of string)
      schools[i].HAS_KINDERGARTEN = schools[i].GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
      schools[i].HAS_ELEMENTARY = schools[i].GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
      schools[i].HAS_MIDDLE_SCHOOL = schools[i].GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
      schools[i].HAS_HIGH_SCHOOL = schools[i].GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
    }
  }
  */


  // clean data - CLEARER USING _.each
  _.each(schools, function(i){
    //clean zip codes
    if (typeof i.ZIPCODE === 'string'){
      split = i.ZIPCODE.split('');
      normalized_zip = parseInt(split[0]);
      i.ZIPCODE = normalized_zip;
    }
    //clean grade numbers (if number)
    if (typeof i.GRADE_ORG === 'number'){
      i.HAS_KINDERGARTEN = i.GRADE_LEVEL < 1;
      i.HAS_ELEMENTARY = 1 < i.GRADE_LEVEL < 6;
      i.HAS_MIDDLE_SCHOOL = 5 < i.GRADE_LEVEL < 9;
      i.HAS_HIGH_SCHOOL = 8 < i.GRADE_LEVEL < 13;
    }
    //clean grade numbers (if string)
    else {
      i.HAS_KINDERGARTEN = i.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
      i.HAS_ELEMENTARY = i.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
      i.HAS_MIDDLE_SCHOOL = i.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
      i.HAS_HIGH_SCHOOL = i.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
    }
  });





  /*

  //ORIGINAL CODE

  // filter data
  var filtered_data = [];
  var filtered_out = [];
  for (var i = 0; i < schools.length - 1; i++) {
    isOpen = schools[i].ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (schools[i].TYPE.toUpperCase() !== 'CHARTER' ||
                schools[i].TYPE.toUpperCase() !== 'PRIVATE');
    isSchool = (schools[i].HAS_KINDERGARTEN ||
                schools[i].HAS_ELEMENTARY ||
                schools[i].HAS_MIDDLE_SCHOOL ||
                schools[i].HAS_HIGH_SCHOOL);
    meetsMinimumEnrollment = schools[i].ENROLLMENT > minEnrollment;
    meetsZipCondition = acceptedZipcodes.indexOf(schools[i].ZIPCODE) >= 0;
    filter_condition = (isOpen &&
                        isSchool &&
                        meetsMinimumEnrollment &&
                        !meetsZipCondition);

    if (filter_condition) {
      filtered_data.push(schools[i]);
    } else {
      filtered_out.push(schools[i]);
    }
  }
  console.log('Included:', filtered_data.length);
  console.log('Excluded:', filtered_out.length);
  console.log(schools.length);
  //why are there only 549 objects when you add together the 'Included' and 'Excluded' data, but there are a  total number of 550 objects in the total dataset??

  */







  // filter data - CLEARER USING _.filter
  var filtered_data = [];
  var filtered_out = [];
  _.filter(schools, function(i) {
    isOpen = i.ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (i.TYPE.toUpperCase() !== 'CHARTER' ||
                i.TYPE.toUpperCase() !== 'PRIVATE');
    isSchool = (i.HAS_KINDERGARTEN ||
                i.HAS_ELEMENTARY ||
                i.HAS_MIDDLE_SCHOOL ||
                i.HAS_HIGH_SCHOOL);
    meetsMinimumEnrollment = i.ENROLLMENT > minEnrollment;
    meetsZipCondition = acceptedZipcodes.indexOf(i.ZIPCODE) >= 0;
    filter_condition = (isOpen &&
                        isSchool &&
                        meetsMinimumEnrollment &&
                        !meetsZipCondition);
    if (filter_condition === true){
      filtered_data.push(i);
    }
    else{
      filtered_out.push(i);
    }
  });
  console.log('Included:', filtered_data.length);
  console.log('Excluded:', filtered_out.length);
  console.log(schools.length);




  /*

  //ORIGINAL CODE

  // main loop
  var color;
  for (var i = 0; i < filtered_data.length - 1; i++) {
    isOpen = filtered_data[i].ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (filtered_data[i].TYPE.toUpperCase() !== 'CHARTER' ||
                filtered_data[i].TYPE.toUpperCase() !== 'PRIVATE');
    meetsMinimumEnrollment = filtered_data[i].ENROLLMENT > minEnrollment;

    // Constructing the styling  options for our map
    if (filtered_data[i].HAS_HIGH_SCHOOL){
      color = '#0000FF';
    } else if (filtered_data[i].HAS_MIDDLE_SCHOOL) {
      color = '#00FF00';
    } else {
      color = '##FF0000';
    }
    // The style options
    var pathOpts = {'radius': filtered_data[i].ENROLLMENT / 30,
                    'fillColor': color};
    L.circleMarker([filtered_data[i].Y, filtered_data[i].X], pathOpts)
      .bindPopup(filtered_data[i].FACILNAME_LABEL)
      .addTo(map);
  }

  */



  // main loop - CLEARER USING _.each

  var color;
  _.each(filtered_data, function(i){
    isOpen = i.ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (i.TYPE.toUpperCase() !== 'CHARTER' ||
                i.TYPE.toUpperCase() !== 'PRIVATE');
    meetsMinimumEnrollment = i.ENROLLMENT > minEnrollment;
    if (i.HAS_HIGH_SCHOOL){
      color = '#0000FF';
    } else if (i.HAS_MIDDLE_SCHOOL) {
      color = '#00FF00';
    } else {
      color = '##FF0000';
    }
    var pathOpts = {'radius': i.ENROLLMENT / 30,
                    'fillColor': color};
    L.circleMarker([i.Y, i.X], pathOpts)
      .bindPopup(i.FACILNAME_LABEL)
      .addTo(map);
  });



})();
