# Cash Register Project (FreeCodeCamp)

### JavaScript Algorithms and Data Structures curriculum: Project 4
The task is to build a function that simulates a cash register, which calculates the change due for a transaction based on the total price and the amount paid. It also needs to determine if the register has enough cash to provide the correct change. 

### Key requirements:

#### The function takes three arguments:

- price (total price),
- cash (amount paid),
- cid (cash-in-drawer, an array representing the available currency in the register).
It must return:

#### The function must return an object with two properties:

- Status: This indicates the result of the transaction, which can be:
  - INSUFFICIENT_FUNDS: If the cash-in-drawer is less than the change due, or if exact change cannot be provided.
  - CLOSED: If the cash-in-drawer is equal to the change due.
  - OPEN: If the cash-in-drawer is greater than the change due, and the change can be returned. The change is provided in coins and bills sorted from highest to lowest denomination.
- Change: The specific amount of change returned in the form of currency denominations (e.g., pennies, nickels, dimes).

The challenge is to manage the different denominations of money (like pennies, nickels, dimes, etc.) and calculate the change precisely while handling edge cases such as insufficient funds or exactly emptying the register.
