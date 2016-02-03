/* =====================
# Lab 2, Part 2 — Underscore Each Function

## Introduction

Up to this point, we have used Javascript's for loop to loop through data. Underscore's _.each function provides us with an easy to read, simple way to accomplish the same goal.

## Task

Find two previous labs that use for loops. Rewrite these labs to use _.each.

## Syntax
You can see an example of how to use ._each in the underscore documentation: http://underscorejs.org/#each and in the code below.

var myArray = [1, 10, 100, 1000];

_.each(myArray, function(value, key, list) {
  console.log(value, key, list);
});
===================== */





//Week 2 - Lab 1 - Part 4
//create a new array that only contains locations with more than 20 docks.

//specify array of data
var array = bikeArrayClean;
//specify new array that will contain locations with more than 20 docks
var filteredArray = [];
//use _.each instead of a for loop
_.each(array, function(i){
  if (i[3] > 20){
    filteredArray.push(i);
  }
  //console.log(tempArray);
  return filteredArray;
});
//print the filteredArray to the console
console.log(filteredArray);






//Week 2 - Lab 2 - Part 1
//find the sum of the numbers and number of characters within a string using


// Here's an array of numbers and strings
var array = ['A short story.', 42, {'place': 'LA'}, 55, ['Another story'], 23, 12, 2, 4, 5, 6, 'bar', 'foo'];

// Variable to hold count of numbers
var numberSum = 0;
// Variable to hold count of string characters
var stringSum = 0;

//use _.each instead of a for loop
_.each(array, function(i){
  if (typeof i === 'string'){
    stringSum += + i.length;
  }
  else if (typeof i === 'number'){
    numberSum += + i;
  }
  //else {
    //console.log("Not sure how to proceed with value:", i);
  //}
});
console.log(stringSum + numberSum);
