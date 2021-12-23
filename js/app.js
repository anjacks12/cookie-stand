'use strict';

// create object seattle to store min/max hourly customers and avg cookies per customer
let seattle = {
  minCustomer: 23,
  maxCustomer: 65,
  avgCookieSale: 6.3,
  // this function used to get random number of customers/hour
  // this function includes the minCustomer and maxCustomer numbers
  randomCustomerNumber: function () {
    //min = Math.ceil(min); Question: why were these 2 lines not needed?
    //max = Math.floor(max); Is it because they are built in functions?
    return Math.floor(Math.random() * (this.maxCustomer - this.minCustomer + 1) + this.minCustomer);
  },
  // get cookies purchased for each hour by multiplying avgCookieSale to randomCustomerNumber to get numberOfCookies
  numberOfCookies: function () {
    return (this.avgCookieSale * this.randomCustomerNumber());
  },
  // need to create an empty array (cookiesSoldArray) that stores numbers of cookies sold and the hour it was sold(?); needs total sold at end
  // 6 am to 7 pm = 15 hours total (hoursArray)
  hoursArray: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  //for loop for hoursArray to cycle through all the hours
    for (let i = 0; i < hoursArray.length; i++) {
    }
};
console.log(seattle.numberOfCookies());

//return [hoursArray[i],numberOfCookies]? to get both values in text?
//need empty string to store data for cookies sold (cookiesSoldArray = [];)