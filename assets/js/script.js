"use strict";

// Data
const account1 = {
  owner: "Ahmed Hamam",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Fares Wasem",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Sara Ahmed",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Ali Azmy",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");
const labebBalance = document.querySelector(".balance-value");
const labelSumIn = document.querySelector(".summary-value_in");
const labelSumOut = document.querySelector(".summary-value_out");
const labelSumInterest = document.querySelector(".summary-value_interest");

const btnLogin = document.querySelector(".login-btn");

const inputLoginUname = document.querySelector(".login-input_user");
const inputLoginPin = document.querySelector(".login-input_pin");

/////////////////////////////////////////////////
// Functions

const displayMovements = function (movs) {
  containerMovements.innerHTML = "";

  // const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movements-row">
        <div class="movements-type movements-type_${type}">${
      i + 1
    } ${type}</div>
        <div class="movements-value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// creat usernames, form 'Ahmed Hamam' to "ah"
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

const deposits = account1.movements.filter((mov) => mov > 0);

const withdrawal = account1.movements.filter((mov) => mov < 0);

// accumulator => SNOWBALL
const calcPrintBalanc = (movements) => {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labebBalance.textContent = `${balance}€`;
};

const calcDisplaySum = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  // Math.abs() to remove - sign
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const eurToUsd = 1.1;
const totalDepositsUSD = account1.movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

// Event handler
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  // prevent form tag from submitting
  e.preventDefault();

  // find the acc
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUname.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 1000;

    // Clear input
    inputLoginUname.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Display movemments
    displayMovements(currentAccount.movements);

    // Display balance
    calcPrintBalanc(currentAccount.movements);

    // Display summary
    calcDisplaySum(currentAccount);
  }
});
