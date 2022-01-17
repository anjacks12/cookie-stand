'use strict';

// window into the DOM
const table = document.getElementById('table');
const newStoreForm = document.querySelector('form');
const thead = document.querySelector('thead');
const tbody = document.querySelector('tbody');
const tfoot = document.querySelector('tfoot');

// 6 am to 7 pm = 14 hours total (hoursArray)
let hoursArray = ['6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm'];

// create array for all cookie stores
let storeDataArray = [];

//function to create new element
function makeNewElement(newEl, text, parentEl) {
  let newElement = document.createElement(newEl);
  newElement.textContent = text;
  parentEl.appendChild(newElement);
}

// create constructor function to replace object literals of stores
function Store (name, minCustomer, maxCustomer, avgCookieSale, startOfDaySales) {
  this.name = name;
  this.minCustomer = minCustomer;
  this.maxCustomer = maxCustomer;
  this.avgCookieSale = avgCookieSale;
  this.startOfDaySales = startOfDaySales;
  // need to an empty array to store numbers of cookies sold and the hour
  this.cookiesSoldArray = [];
  storeDataArray.push(this);
}

// method to generate random
Store.prototype.randomCustomerNumber = function () {
  return Math.floor(Math.random() * (this.maxCustomer - this.minCustomer + 1) + this.minCustomer);
};

// method to calculate cookies per hour
Store.prototype.numberOfCookiesPerHour = function () {
  for (let i = 0; i < hoursArray.length; i++) {
    let hourlyCookies = Math.ceil((this.avgCookieSale * this.randomCustomerNumber()));
    this.cookiesSoldArray.push(hourlyCookies);
    let totalCookiesSold = (hourlyCookies + this.startOfDaySales);
    this.startOfDaySales = totalCookiesSold;
  }
};

// TABLE BODY: create prototype to add store name, cookie sold each hour and total cookies sold at each store in table
Store.prototype.renderCookieSales = function() {
  this.numberOfCookiesPerHour();
  let trBody = document.createElement('tr');
  tbody.appendChild(trBody);
  makeNewElement('td', `${this.name}`, trBody);
  for (let i = 0; i < hoursArray.length; i++) {
    makeNewElement('td', this.cookiesSoldArray[i], trBody);
  }
  makeNewElement('td', this.startOfDaySales, trBody);
};

// TABLE HEADER: create prototype to add store hours and total store cookies sold in table
function renderHours() {
  let trHeader = document.createElement('tr');
  thead.appendChild(trHeader);
  let thEmpty = document.createElement('th');
  trHeader.appendChild(thEmpty);
  for (let i = 0; i < hoursArray.length; i++) {
    makeNewElement('th', hoursArray[i], trHeader);
  }
  makeNewElement('th', 'Daily Location Total', trHeader);
}

// TABLE FOOTER:
//Got a lot of help from Sheyna on how to get the hourly and grand total sold values
//Got help from Harvey in class on how to render the hourly total to the table footer
function renderTotalCookies() {
  let trFoot = document.createElement('tr');
  tfoot.appendChild(trFoot);
  makeNewElement('th','Total',trFoot);

  // created empty array to store all the hourly cookies sold from each store
  let hourlyCookiesArray = [];
  // start nested for loop to get grandTotal cookies sales from each store
  let grandTotal = 0; // grandTotal is the counter for all the cookies sold for the entire day
  // j is the outer loop with length of 5
  for (let j = 0; j < hoursArray.length; j++) {
    let hourlyReset = 0; // hourlyReset resets the running total for each hour (clears the counter for each outer loop iteration)
    // i is the inner loop with length of 14; iterates faster on inner loop
    for (let i = 0; i < storeDataArray.length; i++) {
      let allCookies = storeDataArray[i].cookiesSoldArray[j];
      let totalHourCookies = allCookies + hourlyReset;
      hourlyReset = totalHourCookies;
      let runningTotal = allCookies + grandTotal;
      grandTotal = runningTotal;
    }
    //total hourly cookies sold pushed to array
    hourlyCookiesArray.push(hourlyReset);
  }
  //hourly totals generated in table footer
  hourlyCookiesArray.push(grandTotal);
  console.log('grandTotal',grandTotal);
  for (let j = 0; j < hoursArray.length; j++) {
    makeNewElement('th',hourlyCookiesArray[j],trFoot);
  }
  //grand total cookies sold in last colum
  makeNewElement('th',grandTotal,trFoot);
}

// create event handler to target event(adding new store with information from form)
function submitHandler(event) {
  event.preventDefault();
  let storeName = event.target.storename.value;
  let newMinCustomer = parseInt(event.target.mincustomer.value);
  let newMaxCustomer = parseInt(event.target.maxcustomer.value);
  let newAvgCookieSale = parseInt(event.target.cookiesperhour.value);
  let newStartOfDaySales = 0;
  // create new store from form
  let newStore = new Store(storeName, newMinCustomer, newMaxCustomer, newAvgCookieSale, newStartOfDaySales);
  // render new store onto page
  newStore.renderCookieSales();
  tfoot.innerHTML= '';
  renderTotalCookies();
}

// constructor parameters (name, minCustomer, maxCustomer, avgCookieSale, startOfDaySales)
let seattle = new Store('Seattle', 23, 65, 6.3, 0);
//seattle.renderCookieSales();

let tokyo = new Store('Tokyo', 3, 24, 1.2, 0);
//tokyo.renderCookieSales();

let dubai = new Store('Dubai', 11, 38, 3.7, 0);
//dubai.renderCookieSales();

let paris = new Store('Paris', 20, 38, 2.3, 0);
//paris.renderCookieSales();

let lima = new Store('Lima', 2, 16, 4.6, 0);
//lima.renderCookieSales();

// instantiating the 5 stores and rendering table of number of cookies sold below
for (let i = 0; i < storeDataArray.length; i++) {
  storeDataArray[i].renderCookieSales();
}

// render store hours and total cookies sold each hour on table
renderHours();
renderTotalCookies();

// run the event listener to get information from newStore form
newStoreForm.addEventListener('submit', submitHandler);
