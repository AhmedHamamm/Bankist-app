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
const containerMovements = document.querySelector(".movements");
const labebBalance = document.querySelector(".balance-value");

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
displayMovements(account1.movements);

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
console.log(deposits);
const withdrawal = account1.movements.filter((mov) => mov < 0);
console.log(withdrawal);

// accumulator => SNOWBALL
const calcPrintBalanc = () => {
  const balance = account1.movements.reduce((acc, mov) => acc + mov, 0);
  labebBalance.textContent = `${balance} EUR`;
};
calcPrintBalanc(account1.movements);
