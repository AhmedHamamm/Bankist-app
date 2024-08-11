"use strict";

// Data
const account1 = {
  owner: "Ahmed Hamam",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2023-11-18T21:31:17.178Z",
    "2023-12-23T07:42:02.383Z",
    "2024-01-28T09:15:04.904Z",
    "2024-04-01T10:17:24.185Z",
    "2024-07-26T17:01:17.194Z",
    "2024-08-04T14:11:59.604Z",
    "2024-08-08T23:36:17.929Z",
    "2024-08-10T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account2 = {
  owner: "Fares Wasem",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2022-11-01T13:15:33.035Z",
    "2022-11-30T09:48:16.867Z",
    "2022-12-25T06:04:23.907Z",
    "2024-01-25T14:18:46.235Z",
    "2024-02-05T16:33:06.386Z",
    "2024-04-10T14:43:26.374Z",
    "2024-06-25T18:49:59.371Z",
    "2024-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "ar-AE",
};

const account3 = {
  owner: "Sara Ahmed",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    "2023-11-18T21:31:17.178Z",
    "2023-12-23T07:42:02.383Z",
    "2024-01-28T09:15:04.904Z",
    "2024-04-01T10:17:24.185Z",
    "2024-05-08T14:11:59.604Z",
    "2024-07-26T17:01:17.194Z",
    "2024-07-28T23:36:17.929Z",
    "2024-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account4 = {
  owner: "Ali Azmy",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2022-11-01T13:15:33.035Z",
    "2022-11-30T09:48:16.867Z",
    "2022-12-25T06:04:23.907Z",
    "2023-01-25T14:18:46.235Z",
    "2023-02-05T16:33:06.386Z",
    "2024-04-10T14:43:26.374Z",
    "2024-06-25T18:49:59.371Z",
    "2024-07-26T12:01:20.894Z",
  ],
  currency: "EUR",
  locale: "de-DE",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");
const labebBalance = document.querySelector(".balance-value");
const labelSumIn = document.querySelector(".summary-value_in");
const labelSumOut = document.querySelector(".summary-value_out");
const labelSumInterest = document.querySelector(".summary-value_interest");

// Buttons
const btnLogin = document.querySelector(".login-btn");
const btnTransfer = document.querySelector(".form-btn_transfer");
const btnLoan = document.querySelector(".form-btn_loan");
const btnClose = document.querySelector(".form-btn_close");
const btnSort = document.querySelector(".btn-sort");

// Inputs
const inputLoginUname = document.querySelector(".login-input_user");
const inputLoginPin = document.querySelector(".login-input_pin");
const inputTransferTo = document.querySelector(".form-input_to");
const inputTransferAmount = document.querySelector(".form-input_amount");
const inputLoanAmount = document.querySelector(".form-input_loan");
const inputCloseUsername = document.querySelector(".form-input_user");
const inputClosePin = document.querySelector(".form-input_pin");

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed}days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const html = `
      <div class="movements-row">
        <div class="movements-type movements-type_${type}">${
      i + 1
    } ${type}</div>
        <div class="movements-date">${displayDate}</div>
        <div class="movements-value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// creat usernames, from 'Ahmed Hamam' to "ah"
const creatUsernames = function (accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
creatUsernames(accounts);

const deposit = (mov) => mov > 0;

const deposits = account1.movements.filter(deposit);

const withdrawal = account1.movements.filter((mov) => mov < 0);

// accumulator => SNOWBALL
const calcPrintBalanc = (acc) => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labebBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySum = function (acc) {
  const incomes = acc.movements
    .filter(deposit)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  // Math.abs() to remove - sign
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(deposit)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const eurToUsd = 1.1;
const totalDepositsUSD = account1.movements
  .filter(deposit)
  .map((mov) => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

const updateUI = function (acc) {
  // Display movemments
  displayMovements(acc);

  // Display balance
  calcPrintBalanc(acc);

  // Display summary
  calcDisplaySum(acc);
};

// Event handler
let currentAccount;

// Fake logged IN
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

// Experimenting API
// const now = new Date();
// const options = {
//   year: "numeric",
//   month: "long",
//   day: "numeric",
//   weekday: "short",
//   hour: "numeric",
//   minute: "numeric",
//   second: "numeric",
// };

// const locale = navigator.language;
// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

/*("ar-EG") This for egypt */ /*("en-US")Tihs US Format*/
// this is the source link
// http://www.lingoes.net/en/translator/langcode.htm

btnLogin.addEventListener("click", function (e) {
  // prevent form tag from submitting
  e.preventDefault();

  // find the acc
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUname.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Create Date and time
    const now = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    // labelDate.textContent = `${day}/${month}/${year}, ${hours}:${minutes}`;

    // Clear input
    inputLoginUname.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

// Transfer money button
btnTransfer.addEventListener("click", function (e) {
  // prevent form tag from submitting
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // The transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

// Request loan button
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    currentAccount.movements.push(amount);

    // Add loan date
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

// Close accouunt button
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);

    // Delete account
    accounts.splice(index, 1);

    // Hide UI and update message
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in to get started`;
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
