'use strict';

// window into the DOM
const div = document.getElementById('cookiesSoldData');
const table = document.getElementById('table');

// 6 am to 7 pm = 14 hours total (hoursArray)
let hoursArray = ['6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm'];

// create array for all cookie stores
let storeDataArray = [];

// create constructor function to replace object literals of stores
function Store (name, minCustomer, maxCustomer, avgCookieSale, startOfDaySales) {
  this.name = name;
  this.minCustomer = minCustomer;
  this.maxCustomer = maxCustomer;
  this.avgCookieSale = avgCookieSale;
  this.startOfDaySales = startOfDaySales;
  // need to an empty array to store numbers of cookies sold and the hour
  this.cookiesSoldArray = [];

  // method to generate random
  this.randomCustomerNumber = function () {
    return Math.floor(Math.random() * (this.maxCustomer - this.minCustomer + 1) + this.minCustomer);
  };

  // method to calculate cookies per hour
  this.numberOfCookiesPerHour = function () {
    for (let i = 0; i < hoursArray.length; i++) {
      let hourlyCookies = Math.ceil((this.avgCookieSale * this.randomCustomerNumber()));
      this.cookiesSoldArray.push(hourlyCookies);

      // need to get total number of cookies sold for the day by summing all 14 values cookiesSoldArray
      //this.startOfDaySales holds 0 value + totalCookiesSold
      let totalCookiesSold = (hourlyCookies + this.startOfDaySales);
      //console.log(hourlyCookies);
      this.startOfDaySales = totalCookiesSold;

    }
  };
  // method to render the cookies data
  this.render = function () {
    this.numberOfCookiesPerHour();
    // window into the DOM for name of store
    // give content to heading
    // render "results" of # cookies sold for each hour of the day

    // 1. create element for section
    let section = document.createElement('section');
    div.appendChild(section);
    // 1. create element for ul for li
    let ul = document.createElement('ul');
    ul.textContent = `${this.name}`;
    section.appendChild(ul);
    for (let i = 0; i < hoursArray.length; i++) {
      // 1. create element for li to list sales of cookies/hour
      let li = document.createElement('li');
      // 2. give it content of numbers of cookies sold at a certain hour
      li.textContent = `${hoursArray[i]}: ${this.cookiesSoldArray[i]} cookies`;
      // 3. append it to the DOM via the <ul>
      ul.appendChild(li);
      //with total at bottom loaded onto index.html page //needs for loop
    }
    let totalCookies = document.createElement('li');
    totalCookies.textContent = `Total: ${this.startOfDaySales} cookies`;
    ul.appendChild(totalCookies);
  };
  storeDataArray.push(this);
}


// constructor parameters (name, minCustomer, maxCustomer, avgCookieSale, startOfDaySales)
let seattle = new Store('Seattle', 23, 65, 6.3, 0);
//seattle.render();

let tokyo = new Store('Tokyo', 3, 24, 1.2, 0);
//tokyo.render();

let dubai = new Store('Dubai', 11, 38, 3.7, 0);
//dubai.render();

let paris = new Store('Paris', 20, 38, 2.3, 0);
//paris.render();

let lima = new Store('Lima', 2, 16, 4.6, 0);
//lima.render();


// create prototype to add store hours in table header
Store.prototype.renderHours = function () {
  let thead = document.createElement('thead');
  table.appendChild(thead);
  let trHeader = document.createElement('tr');
  thead.appendChild(trHeader);
  let thEmpty = document.createElement('th');
  trHeader.appendChild(thEmpty);
  for (let i = 0; i < hoursArray.length; i++) {
    let hoursRow = document.createElement('th');
    hoursRow.textContent = hoursArray[i];
    trHeader.appendChild(hoursRow);
  }
};

// create prototype to add cookie sales and store name to table body
Store.prototype.renderCookieSales = function() {
  let tbody = document.createElement('tbody');
  table.appendChild(tbody);
  let trBody = document.createElement('tr');
  tbody.appendChild(trBody);
  let storeName = document.createElement('td');
  storeName.textContent = `${this.name}`;
  trBody.appendChild(storeName);
  for (let i = 0; i < hoursArray.length; i++) {
    let tdBody = document.createElement('td');
    tdBody.textContent = this.cookiesSoldArray[i];
    trBody.appendChild(tdBody);
  }
};

// create prototype to add total hourly cookie sales in table footer
// render this the very last? do i need an array to get values? probably
Store.prototype.renderHourlySales = function() {
  let tfoot = document.createElement('tfoot');
  table.appendChild(tfoot);
  let trFoot = document.createElement('tr');
  tfoot.appendChild(trFoot);
  let hourlyTotal = document.createElement('td');
  hourlyTotal.textContent = 'something here';
  trFoot.appendChild(hourlyTotal);
};
// seattle.renderCookieSales();
// tokyo.renderCookieSales();
// dubai.renderCookieSales();
// paris.renderCookieSales();
// lima.renderCookieSales();

// to get store hours to show up in table
seattle.renderHours();

let hourlyArray = [];

for (let i = 0; i < storeDataArray.length; i++) {
  storeDataArray[i].render();
  storeDataArray[i].renderCookieSales();
  hourlyArray.push(storeDataArray[i].cookiesSoldArray[0]);
  let hour1 = hourlyArray[0] + hourlyArray[1] + hourlyArray[2] + hourlyArray [3] + hourlyArray [4];
  //console.log(storeDataArray[i].cookiesSoldArray[i]);
  console.log(hour1);
}











// create object seattle to store min/max hourly customers and avg cookies per customer
// let seaTown = {
//   minCustomer: 23, // minimum number of avg customers
//   maxCustomer: 65, // maximum number of avg customers
//   avgCookieSale: 6.3, // avg cookies sold per hour
//   startOfDaySales: 0,
//   storeLocation: 'Seattle',

//   // this function used to get random number of customers/hour by using minCustomer and maxCustomer
//   randomCustomerNumber: function () {
//     //Math.ceil(min); rounds number to highest integer/moves a number to the right on x-axis (5.23 = 6)
//     //Math.floor(max); rounds number to lowest integer/moves a number to the left on x-axis (5.32 = 5)
//     return Math.floor(Math.random() * (this.maxCustomer - this.minCustomer + 1) + this.minCustomer);
//   },

//   // [GOT HELP FROM SHEYNA] make method that gets # of cookies purchased for each
//   //hour (avgCookieSale * randomCustomerNumber) then push into array to store
//   numberOfCookiesPerHour: function () {
//     //put for loop at top of function to allow loop to iterate through 14 times
//     for (let i = 0; i < hoursArray.length; i++) {
//       let numberOfCookiesPerHour = Math.ceil((this.avgCookieSale * this.randomCustomerNumber()));
//       cookiesSoldArray.push(numberOfCookiesPerHour);
//       // need to get total number of cookies sold for the day by summing all 14 values cookiesSoldArray
//       //this.startOfDaySales holds 0 value + totalCookiesSold
//       let totalCookiesSold = (numberOfCookiesPerHour + this.startOfDaySales);
//       console.log(numberOfCookiesPerHour);
//       this.startOfDaySales = totalCookiesSold;
//     }
//   },

//   render: function () {
//     this.numberOfCookiesPerHour();
//     // window into the DOM for name of store
//     // give content to heading
//     // render "results" of # cookies sold for each hour of the day
//     // window into the DOM
//     const div = document.getElementById('cookiesSoldData');
//     // 1. create element for section
//     let section = document.createElement('section');
//     div.appendChild(section);
//     // 1. create element for ul for li
//     let ul = document.createElement('ul');
//     ul.textContent = `${this.storeLocation}`;
//     section.appendChild(ul);
//     for (let i = 0; i < hoursArray.length; i++) {
//       // 1. create element for li to list sales of cookies/hour
//       let li = document.createElement('li');
//       // 2. give it content of numbers of cookies sold at a certain hour
//       li.textContent = `${hoursArray[i]}: ${cookiesSoldArray[i]} cookies`;
//       // 3. append it to the DOM via the <ul>
//       ul.appendChild(li);
//       //with total at bottom loaded onto index.html page //needs for loop
//     }
//     let totalCookies = document.createElement('li');
//     totalCookies.textContent = `Total: ${this.startOfDaySales} cookies`;
//     ul.appendChild(totalCookies);
//   }
// };
// seaTown.render();


// // create tokyo object by coping seattle and changing values
// let tokyo = {
//   minCustomer: 3,
//   maxCustomer: 24,
//   avgCookieSale: 1.2,
//   startOfDaySales: 0,
//   storeLocation: 'Tokyo',
//   cookiesSoldArray: [],
//   hoursArray: ['6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm'],

//   randomCustomerNumber: function () {
//     return Math.floor(Math.random() * (this.maxCustomer - this.minCustomer + 1) + this.minCustomer);
//   },

//   numberOfCookiesPerHour: function () {
//     for (let i = 0; i < this.hoursArray.length; i++) {
//       let numberOfCookiesPerHour = Math.ceil((this.avgCookieSale * this.randomCustomerNumber()));
//       this.cookiesSoldArray.push(numberOfCookiesPerHour);
//       let totalCookiesSold = (numberOfCookiesPerHour + this.startOfDaySales);
//       this.startOfDaySales = totalCookiesSold;
//     }
//   },

//   render: function () {
//     this.numberOfCookiesPerHour();
//     const div = document.getElementById('cookiesSoldData');
//     let section = document.createElement('section');
//     div.appendChild(section);
//     let ul = document.createElement('ul');
//     ul.textContent = `${this.storeLocation}`;
//     section.appendChild(ul);
//     for (let i = 0; i < this.hoursArray.length; i++) {
//       let li = document.createElement('li');
//       li.textContent = `${this.hoursArray[i]}: ${this.cookiesSoldArray[i]} cookies`;
//       ul.appendChild(li);
//     }
//     let totalCookies = document.createElement('li');
//     totalCookies.textContent = `Total: ${this.startOfDaySales} cookies`;
//     ul.appendChild(totalCookies);
//   }
// };
// tokyo.render();

// // create dubai object by coping seattle and changing values
// let dubai = {
//   minCustomer: 11,
//   maxCustomer: 38,
//   avgCookieSale: 3.7,
//   startOfDaySales: 0,
//   storeLocation: 'Dubai',
//   cookiesSoldArray: [],
//   hoursArray: ['6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm'],

//   randomCustomerNumber: function () {
//     return Math.floor(Math.random() * (this.maxCustomer - this.minCustomer + 1) + this.minCustomer);
//   },

//   numberOfCookiesPerHour: function () {
//     for (let i = 0; i < this.hoursArray.length; i++) {
//       let numberOfCookiesPerHour = Math.ceil((this.avgCookieSale * this.randomCustomerNumber()));
//       this.cookiesSoldArray.push(numberOfCookiesPerHour);
//       let totalCookiesSold = (numberOfCookiesPerHour + this.startOfDaySales);
//       this.startOfDaySales = totalCookiesSold;
//     }
//   },

//   render: function () {
//     this.numberOfCookiesPerHour();
//     const div = document.getElementById('cookiesSoldData');
//     let section = document.createElement('section');
//     div.appendChild(section);
//     let ul = document.createElement('ul');
//     ul.textContent = `${this.storeLocation}`;
//     section.appendChild(ul);
//     for (let i = 0; i < this.hoursArray.length; i++) {
//       let li = document.createElement('li');
//       li.textContent = `${this.hoursArray[i]}: ${this.cookiesSoldArray[i]} cookies`;
//       ul.appendChild(li);
//     }
//     let totalCookies = document.createElement('li');
//     totalCookies.textContent = `Total: ${this.startOfDaySales} cookies`;
//     ul.appendChild(totalCookies);
//   }
// };
// dubai.render();

// // create paris object by coping seattle and changing values
// let paris = {
//   minCustomer: 20,
//   maxCustomer: 38,
//   avgCookieSale: 2.3,
//   startOfDaySales: 0,
//   storeLocation: 'Paris',
//   cookiesSoldArray: [],
//   hoursArray: ['6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm'],

//   randomCustomerNumber: function () {
//     return Math.floor(Math.random() * (this.maxCustomer - this.minCustomer + 1) + this.minCustomer);
//   },

//   numberOfCookiesPerHour: function () {
//     for (let i = 0; i < this.hoursArray.length; i++) {
//       let numberOfCookiesPerHour = Math.ceil((this.avgCookieSale * this.randomCustomerNumber()));
//       this.cookiesSoldArray.push(numberOfCookiesPerHour);
//       let totalCookiesSold = (numberOfCookiesPerHour + this.startOfDaySales);
//       this.startOfDaySales = totalCookiesSold;
//     }
//   },

//   render: function () {
//     this.numberOfCookiesPerHour();
//     const div = document.getElementById('cookiesSoldData');
//     let section = document.createElement('section');
//     div.appendChild(section);
//     let ul = document.createElement('ul');
//     ul.textContent = `${this.storeLocation}`;
//     section.appendChild(ul);
//     for (let i = 0; i < this.hoursArray.length; i++) {
//       let li = document.createElement('li');
//       li.textContent = `${this.hoursArray[i]}: ${this.cookiesSoldArray[i]} cookies`;
//       ul.appendChild(li);
//     }
//     let totalCookies = document.createElement('li');
//     totalCookies.textContent = `Total: ${this.startOfDaySales} cookies`;
//     ul.appendChild(totalCookies);
//   }
// };
// paris.render();

// // create lima object by coping seattle and changing values
// let lima = {
//   minCustomer: 2,
//   maxCustomer: 16,
//   avgCookieSale: 4.6,
//   startOfDaySales: 0,
//   storeLocation: 'Lima',
//   cookiesSoldArray: [],
//   hoursArray: ['6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm'],

//   randomCustomerNumber: function () {
//     return Math.floor(Math.random() * (this.maxCustomer - this.minCustomer + 1) + this.minCustomer);
//   },

//   numberOfCookiesPerHour: function () {
//     for (let i = 0; i < this.hoursArray.length; i++) {
//       let numberOfCookiesPerHour = Math.ceil((this.avgCookieSale * this.randomCustomerNumber()));
//       this.cookiesSoldArray.push(numberOfCookiesPerHour);
//       let totalCookiesSold = (numberOfCookiesPerHour + this.startOfDaySales);
//       this.startOfDaySales = totalCookiesSold;
//     }
//   },

//   render: function () {
//     this.numberOfCookiesPerHour();
//     const div = document.getElementById('cookiesSoldData');
//     let section = document.createElement('section');
//     div.appendChild(section);
//     let ul = document.createElement('ul');
//     ul.textContent = `${this.storeLocation}`;
//     section.appendChild(ul);
//     for (let i = 0; i < this.hoursArray.length; i++) {
//       let li = document.createElement('li');
//       li.textContent = `${this.hoursArray[i]}: ${this.cookiesSoldArray[i]} cookies`;
//       ul.appendChild(li);
//     }
//     let totalCookies = document.createElement('li');
//     totalCookies.textContent = `Total: ${this.startOfDaySales} cookies`;
//     ul.appendChild(totalCookies);
//   }
// };
// lima.render();
