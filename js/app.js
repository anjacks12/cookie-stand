'use strict';

// window into the DOM
const table = document.getElementById('table');
const newStoreForm = document.querySelector('form');

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
  };
  storeDataArray.push(this);
}

// create event handler to target event(adding new store with information from form)
function submitHandler(event) {
  event.preventDefault();
  //console.log(event);
  let storeName = event.target.storename.value;
  let newMinCustomer = parseInt(event.target.mincustomer.value);
  let newMaxCustomer = parseInt(event.target.maxcustomer.value);
  let newAvgCookieSale = parseInt(event.target.cookiesperhour.value);
  let newStartOfDaySales = 0;
  // create new store from form
  let newStore = new Store(storeName, newMinCustomer, newMaxCustomer, newAvgCookieSale, newStartOfDaySales);
  // render new store onto page
  newStore.render();
  newStore.renderCookieSales();
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


// TABLE HEADER: create prototype to add store hours and total store cookies sold in table
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
  let locationTotal = document.createElement('th');
  locationTotal.textContent = 'Daily Location Total';
  trHeader.appendChild(locationTotal);
};

// TABLE BODY: create prototype to add store name, cookie sold each hour and total cookies sold at each store in table
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
  let totalStoreSales = document.createElement('td');
  totalStoreSales.textContent = this.startOfDaySales;
  trBody.appendChild(totalStoreSales);
};

// instantiating the 5 stores and rendering table of number of cookies sold below
for (let i = 0; i < storeDataArray.length; i++) {
  storeDataArray[i].render();
  storeDataArray[i].renderCookieSales();
}

// used for loop to iterate once to get store hours (6 am to 7 pm) to load at bottom of page
for (let i = 4; i < storeDataArray.length; i++) {
  storeDataArray[i].renderHours();
}


// created empty array to store all the hourly cookies sold from each store
let hourlyCookiesArray = [];


Store.prototype.totalCookies = function() {
  // Got a lot of help on this from Sheyna, otherwise I would have never figured it out
  // created one array that contains all the cookies sold for all 5 stores (total was 70 elements)
  let total = 0;
  for (let j = 0; j < hoursArray.length; j++) {
    let hourlyReset = 0;
    for (let i = 0; i < storeDataArray.length; i++) {
      //console.log(storeDataArray[i].cookiesSoldArray[j]);
      let allCookies = storeDataArray[i].cookiesSoldArray[j];
      // need to collect cookies sold per hour and put in new array...
      let totalHourCookies = allCookies + hourlyReset;
      hourlyReset = totalHourCookies;
      //console.log(`in inner loop`,hourlyReset);
      //console.log(hourlyCookiesArray);
      //gives the grand total sum of all cookies sold in one day
      let sum = allCookies + total;
      total = sum;
      //hourlyCookiesArray.push(total);
      //console.log(total);
    }
    //console.log(`after inner loop`,hourlyReset);
    hourlyCookiesArray.push(hourlyReset);
    //console.log(hourlyCookiesArray);
    // need to get total hour value and save it
  }
  
  console.log(total);
};
//seattle.totalCookies();


// TABLE FOOTER: create prototype to add total hourly cookie sales in table
Store.prototype.renderHourlySales = function() {
  this.totalCookies();
  let tfoot = document.createElement('tfoot');
  table.appendChild(tfoot);
  let trFoot = document.createElement('tr');
  tfoot.appendChild(trFoot);
  let thEmpty = document.createElement('th');
  thEmpty.textContent = 'Total';
  trFoot.appendChild(thEmpty);
  for (let i =0; i < hoursArray.length; i++) {
    let hourlyTotal = document.createElement('th');
    hourlyTotal.textContent = hourlyCookiesArray[i];
    //console.log(hourlyCookiesArray);
    trFoot.appendChild(hourlyTotal);
  }
  // let totalSold = document.createElement('th');
  // totalSold.textContent = this.;
  // trFoot.appendChild(totalSold);
};
seattle.renderHourlySales();

//seattle.renderHourlySales();
// // used for loop to iterate through the array once to get the total number of cookies sold for each hour; placed in tfoot of table above
// for (let i = 4; i < storeDataArray.length; i++) {
//   this.renderHourlySales();
// }

// run the event listener to get information from newStore form
newStoreForm.addEventListener('submit', submitHandler);
//formName.reset(); to reset form

