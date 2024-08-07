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

// Buttons
const btnLogin = document.querySelector(".login-btn");
const btnTransfer = document.querySelector(".form-btn_transfer");
const btnLoan = document.querySelector(".form-btn_loan");
const btnClose = document.querySelector(".form-btn_close");

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
  labebBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySum = function (acc) {
  const incomes = acc.movements
    .filter(deposit)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  // Math.abs() to remove - sign
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(deposit)
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
  .filter(deposit)
  .map((mov) => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

const updateUI = function (acc) {
  // Display movemments
  displayMovements(acc.movements);

  // Display balance
  calcPrintBalanc(acc);

  // Display summary
  calcDisplaySum(acc);
};
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
    containerApp.style.opacity = 100;

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
  const amount = Number(inputTransferAmount.value);
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

    // Update UI
    updateUI(currentAccount);
  }
});

// Request loan button
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    currentAccount.movements.push(amount);

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
    Number(inputClosePin.value) === currentAccount.pin
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
