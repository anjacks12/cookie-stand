'use strict';

// create object seattle to store min/max hourly customers and avg cookies per customer
let seattle = {
  minCustomer: 23, // minimum number of avg customers
  maxCustomer: 65, // maximum number of avg customers
  avgCookieSale: 6.3, // avg cookies sold per hour
  startOfDaySales: 0,
  storeLocation: 'Seattle',

  // need to an empty array to store numbers of cookies sold and the hour
  cookiesSoldArray: [],

  // 6 am to 7 pm = 14 hours total (hoursArray)
  hoursArray: ['6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm'],

  // this function used to get random number of customers/hour by using minCustomer and maxCustomer
  randomCustomerNumber: function () {
    //Math.ceil(min); rounds number to highest integer/moves a number to the right on x-axis (5.23 = 6)
    //Math.floor(max); rounds number to lowest integer/moves a number to the left on x-axis (5.32 = 5)
    return Math.floor(Math.random() * (this.maxCustomer - this.minCustomer + 1) + this.minCustomer);
  },

  // [GOT HELP FROM SHEYNA] make method that gets # of cookies purchased for each
  //hour (avgCookieSale * randomCustomerNumber) then push into array to store
  numberOfCookiesPerHour: function () {
    //put for loop at top of function to allow loop to iterate through 14 times
    for (let i = 0; i < this.hoursArray.length; i++) {
      let numberOfCookiesPerHour = Math.ceil((this.avgCookieSale * this.randomCustomerNumber()));
      this.cookiesSoldArray.push(numberOfCookiesPerHour);
      // need to get total number of cookies sold for the day by summing all 14 values cookiesSoldArray
      //this.startOfDaySales holds 0 value + totalCookiesSold
      let totalCookiesSold = (numberOfCookiesPerHour + this.startOfDaySales);
      this.startOfDaySales = totalCookiesSold;
    }
  },

  render: function () {
    this.numberOfCookiesPerHour();
    // window into the DOM for name of store
    // give content to heading
    // render "results" of # cookies sold for each hour of the day
    // window into the DOM
    const div = document.getElementById('cookiesSoldData');
    // 1. create element for section
    let section = document.createElement('section');
    div.appendChild(section);
    // 1. create element for ul for li
    let ul = document.createElement('ul');
    ul.textContent = `${this.storeLocation}`;
    section.appendChild(ul);
    for (let i = 0; i < this.hoursArray.length; i++) {
      // 1. create element for li to list sales of cookies/hour
      let li = document.createElement('li');
      // 2. give it content of numbers of cookies sold at a certain hour
      li.textContent = `${this.hoursArray[i]}: ${this.cookiesSoldArray[i]} cookies`;
      // 3. append it to the DOM via the <ul>
      ul.appendChild(li);
      //with total at bottom loaded onto index.html page //needs for loop
    }
    let totalCookies = document.createElement('li');
    totalCookies.textContent = `Total: ${this.startOfDaySales} cookies`;
    ul.appendChild(totalCookies);
  }
};

seattle.render();


