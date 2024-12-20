// Helper function to generate a unique transaction ID
function generateTrxID() {
  return `BLDLD${Math.floor(100000 + Math.random() * 900000)}`;
}

// Helper function to get the current date
function getCurrentDate() {
  const currentDate = new Date();
  return currentDate.toLocaleString(); 
}


function sendMoneyFee(type, sendAmount) {
  if (sendAmount <= 100) {
    return 0;
  } else if (type === "priyo") {
    return sendAmount >= 25000 ? 10 : 0;
  } else if (type === "regular") {
    return sendAmount > 25000 ? 10 : 5;
  }
  return 0;
}


function cashOutFeeRate(type) {
  return type === "priyo" ? 14.90 : 18.50; 
}

//Function For send Money
function sendMoney() {
  const balanceField = document.getElementById("balance");
  const sendAmountField = document.getElementById("sendAmount");
  const messageBox = document.getElementById("messageBox");
  const sendType = document.querySelector('input[name="sendType"]:checked').value;

  const balance = parseFloat(balanceField.value);
  const sendAmount = parseFloat(sendAmountField.value);

  if (isNaN(balance) || isNaN(sendAmount) || sendAmount <= 0) {
    messageBox.textContent = "Please enter a valid amount.";
    messageBox.className = "alert alert-danger";
    return;
  }

  const fee = sendMoneyFee(sendType, sendAmount);
  const totalAmount = sendAmount + fee;

  if (balance >= totalAmount) {
    balanceField.value = (balance - totalAmount).toFixed(2);
    const trxID = generateTrxID();
    const dateString = getCurrentDate();
    messageBox.textContent = `Send Money TK ${sendAmount.toFixed(2)} Successful. Ref 1. Fee TK ${fee.toFixed(2)}. Balance: TK ${balanceField.value}. TrxID ${trxID} at ${dateString}`;
    messageBox.className = "alert alert-success";
  } else {
    messageBox.textContent = "Insufficient balance.";
    messageBox.className = "alert alert-danger";
  }
}

//function to Cash In
function cashIn() {
  const balanceField = document.getElementById("balance");
  const cashInField = document.getElementById("cashInAmount");
  const messageBox = document.getElementById("messageBox");

  const balance = parseFloat(balanceField.value) || 0; 
  const cashInAmount = parseFloat(cashInField.value);

  if (isNaN(cashInAmount) || cashInAmount <= 0) {
    messageBox.textContent = "Please enter a valid amount greater than 0.";
    messageBox.className = "alert alert-danger";
    return;
  }
  balanceField.value = (balance + cashInAmount).toFixed(2);
  const trxID = generateTrxID();
  const dateString = getCurrentDate();
  messageBox.textContent = `Cash In TK ${cashInAmount.toFixed(2)} from 01306830402 Successful. Fee TK 0.00. Balance: TK ${balanceField.value}. TrxID ${trxID} at ${dateString}`;
  messageBox.className = "alert alert-success";
}




// Function to cash out
function cashOut() {
  const balanceField = document.getElementById("balance");
  const cashOutField = document.getElementById("cashOutAmount");
  const messageBox = document.getElementById("messageBox");
  const cashType = document.querySelector('input[name="cashType"]:checked').value;

  const balance = parseFloat(balanceField.value);
  const cashOutAmount = parseFloat(cashOutField.value);

  if (isNaN(balance) || isNaN(cashOutAmount) || cashOutAmount <= 0) {
    messageBox.textContent = "Please enter a valid amount.";
    messageBox.className = "alert alert-danger";
    return;
  }

  const feeRate = cashOutFeeRate(cashType);
  const fee = (cashOutAmount / 1000) * feeRate;
  const totalAmount = cashOutAmount + fee;

  if (balance >= totalAmount) {
    balanceField.value = (balance - totalAmount).toFixed(2);
    const trxID = generateTrxID();
    const dateString = getCurrentDate();
    messageBox.textContent = `Cash Out TK ${cashOutAmount.toFixed(2)} Successful. Fee TK ${fee.toFixed(2)}. Balance: TK ${balanceField.value}. TrxID ${trxID} at ${dateString}`;
    messageBox.className = "alert alert-success";
  } else {
    messageBox.textContent = "Insufficient balance.";
    messageBox.className = "alert alert-danger";
  }
}
