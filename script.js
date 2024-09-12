// Get references to the necessary HTML elements
const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDueElement = document.getElementById("change-due");
const cidElement = document.getElementById("cid-values");

// Define currency unit values in dollars
const currencyUnitValues = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.10,
  "QUARTER": 0.25,
  "ONE": 1.00,
  "FIVE": 5.00,
  "TEN": 10.00,
  "TWENTY": 20.00,
  "ONE HUNDRED": 100.00
};

// Price of the item being purchased
let price = 3.26;

// Cash-in-drawer (cid) array: contains currency name, amount in the drawer, and a display name
let cid = [
  ['PENNY', 1.01, 'Pennies'],
  ['NICKEL', 2.05, 'Nickels'],
  ['DIME', 3.1, 'Dimes'],
  ['QUARTER', 4.25, 'Quarters'],
  ['ONE', 90, 'Ones'],
  ['FIVE', 55, 'Fives'],
  ['TEN', 20, 'Tens'],
  ['TWENTY', 60, 'Twenties'],
  ['ONE HUNDRED', 100, 'Hundreds']
];

// Function to update the display of current cash in drawer (cid) on the screen
const updateCidScreen = () => {
  cidElement.innerText = "Current Cash in Drawer:";
  cid.forEach(([currencyName, amount, displayName]) => {
    cidElement.innerText += `\n${displayName}: $${amount.toFixed(2)}`;
  });
}

// Initial update to display current cash in drawer
updateCidScreen();

// Function to check if there are enough funds in the drawer to provide change
const checkFunds = (change) => {
  const cashInDrawer = parseInt(cid.reduce((sum, curr) => sum + curr[1]*100, 0));
  
  // If cash in drawer is less than the required change, return insufficient funds
  if (cashInDrawer < change) {
    changeDueElement.innerText = "Status: INSUFFICIENT_FUNDS";
    return false;
  } 
  // If the cash in drawer equals the required change, the drawer will be closed after the transaction
  else if (cashInDrawer === change) {
    changeDueElement.innerText = "Status: CLOSED";
    return true;
  } 
  // Otherwise, the drawer will remain open to give back change
  else {
    changeDueElement.innerText = "Status: OPEN";
    return true;
  }
}



// Function to calculate and process the change to be returned to the customer
const processChange = (change) => {
  
  // Reverse cid array to start from higher currency denominations
  const sortedCid = [...cid].reverse(); 

  // Array to hold the change to be given back
  let receivedChange = []; 

  // Loop through each currency in cid
  for (let currency of sortedCid) {
    let currencyTotal = parseInt(currency[1]*100); // Convert currency amount to cents
    const currencyName = currency[0];
    const currencyValue = parseInt(currencyUnitValues[currencyName]*100); // Value of each currency unit in cents
    let amountToReturn = 0;

    // While change is greater than or equal to the currency value and there's still currency in the drawer
    while (change >= currencyValue && currencyTotal > 0) {
      change -= currencyValue; // Deduct the currency value from the remaining change
      currencyTotal -= currencyValue; // Deduct the currency value from the drawer's currency total
      amountToReturn += currencyValue; // Add the value to the amount to return
    }
    
    // If some amount of this currency is being returned, add it to the receivedChange array
    if (amountToReturn > 0) {
      receivedChange.push([currencyName, amountToReturn/100]); // Convert back to dollars
    }
      
    // Update the currency's total in the cid array to reflect the change given
    currency[1] = currencyTotal / 100; 
  }

  // Reverse cid back to its original order after processing
  cid = sortedCid.reverse();

  // If change is still greater than zero, there weren't sufficient funds
  if (change > 0) {
    return [];
  }
  return receivedChange;
}



// Function to update the screen with the returned change and new cid values
const updateScreen = (arr) => {
  const currentStatus = changeDueElement.innerText; // Get the current status
  changeDueElement.innerText = `${currentStatus}\nChange to Return:`; // Display change return info
  
  // Display the breakdown of the change to be returned
  arr.forEach(([currencyName, amount]) => {
    changeDueElement.innerText += `\n${currencyName}: $${amount}`;
  });

  updateCidScreen(); // Update the cid display with new values after change is given
}

// Event listener for the purchase button click event
purchaseBtn.addEventListener("click", () => {
  const cash = parseFloat(cashInput.value); // Get the cash input value from the customer
  
  // If customer provides less cash than the price, show an alert
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    
  } 
  // If customer provides exact cash, notify no change is due
  else if (cash === price) {
    changeDueElement.innerText = "No change due - customer paid with exact cash";
    
  } 
  // If customer provides more cash, calculate the change
  else {
    const change = parseInt((cash - price)*100); // Calculate change in cents
    const hasFunds = checkFunds(change); // Check if there are enough funds in the drawer

    // If there are enough funds, process and display the change
    if (hasFunds) {
      const receivedChange = processChange(change);
      if (receivedChange.length > 0) {
        updateScreen(receivedChange);
      } 
      // If not enough specific currency is available to return exact change, show insufficient funds
      else {
        changeDueElement.innerText = "Status: INSUFFICIENT_FUNDS";
      }
    }
  }
});


