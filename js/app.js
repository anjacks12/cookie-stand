'use strict';

// create object seattle to store min/max hourly customers and avg cookies per customer
let seattle = {
  minCustomer: 23, // minimum number of avg customers
  maxCustomer: 65, // maximum number of avg customers
  avgCookieSale: 6.3, // avg cookies sold per hour

  // 6 am to 7 pm = 14 hours total (hoursArray)
  hoursArray: ['6 a.m.', '7 a.m.', '8 a.m.', '9 a.m.', '10 a.m.', '11 a.m.', '12 p.m.', '1 p.m.', '2 p.m.', '3 p.m.', '4 p.m.', '5 p.m.', '6 p.m.', '7 p.m.'],

  // this function used to get random number of customers/hour by using minCustomer and maxCustomer
  randomCustomerNumber: function () {
    //Math.ceil(min); rounds number to highest integer/moves a number to the right on x-axis (5.23 = 6)
    //Math.floor(max); rounds number to lowest integer/moves a number to the left on x-axis (5.32 = 5)
    return Math.floor(Math.random() * (this.maxCustomer - this.minCustomer + 1) + this.minCustomer);
  },

  // need to create an empty array (cookiesSoldArray) that stores numbers of cookies sold and the hour it was sold(?); needs total sold at end
  cookiesSoldArray: [],

  // [GOT HELP FROM SHEYNA] make method that gets # of cookies purchased for each hour (avgCookieSale * randomCustomerNumber) then push into array to store
  numberOfCookiesPerHour: function () {   //put for loop at top of function to allow loop to iterate through 14 times
    for (let i = 0; i < this.hoursArray.length; i++) {
      let numberOfCookiesPerHour = Math.ceil((this.avgCookieSale * this.randomCustomerNumber()));
      this.cookiesSoldArray.push(numberOfCookiesPerHour);
      //console.log(this.cookiesSoldArray[i]);
    }
  },
  
  // need to render "results" = number of cookies sold for each hour of day with total at bottom loaded onto index.html page //needs for loop
  render: function () {
    for (let i = 0; i < this.hoursArray.length; i++) {
      const div = document.getElementById('cookiesSoldData');
      //console.log(div);
      let section = document.createElement('section');
      div.appendChild(section);
      let ul = document.createElement('ul');
      section.appendChild(ul);
      let li = document.createElement('li');   // 1. create element for ul and li
      li.textContent = `${this.hoursArray[i]}: ${this.cookiesSoldArray[i]}`;         // 2. give it content of numbers of cookies sold at a certain hour
      ul.appendChild(li);                      // 3. append it to the DOM via the <ul>
    }
  },
  // need to get total number of cookies sold for the day by summing all 14 values cookiesSoldArray
  totalCookies: function () {
    let startCookies = 0;
    let dailyCookieTotal = startCookies;
    dailyCookieTotal += (startCookies + this.cookiesSoldArray[i]);
    console.log(`Here's the day's total ${dailyCookieTotal}`);
  }
};
seattle.totalCookies();
seattle.numberOfCookiesPerHour();
seattle.render();

//console.log(seattle.storeCookiesPerHour());
