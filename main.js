const toothpickStockElement = document.getElementById("toothpickStock");
const twigsStockElement = document.getElementById("twigsStock");
const unsoldElement = document.getElementById("unsoldInventory");
const availableFundsElement = document.getElementById("availableFunds");
const twigsPriceElement = document.getElementById("twigsPrice");
const pickMasterElement = document.getElementById("pickMaster");
const pickMasterPriceElement = document.getElementById("pickMasterPrice");

const makerBtn = document.getElementById("makerBtn");
const buytwigsBtn = document.getElementById("buytwigsBtn");
const toggleTraderBtn = document.getElementById("toggleTraderBtn");
const buyPickMasterBtn = document.getElementById("buyPickMasterBtn");

const pickMasterBasePrice =  5.55;
const twigsBaseQty =  1000;

let toothpicks = 0;
let unsoldInventory = 0;
let twigs = twigsBaseQty;
let availableFunds = 0;
let pickMaster = 0;
let toothpickPrice = 0.5;
let twigsPrice = 14;
let pickMasterPrice = pickMasterBasePrice;
let salesQty = 1;
let autoBuy = false;

makerBtn.addEventListener("click", () => {
    makeAToothpick()
});

buytwigsBtn.addEventListener("click", () => {
  buytwigs();
});

buyPickMasterBtn.addEventListener("click", () => {
    if(pickMasterPrice <= availableFunds) {
        availableFunds = availableFunds - pickMasterPrice;
        pickMaster= pickMaster + 1;
        pickMasterPrice = pickMasterPrice + (pickMasterBasePrice*pickMaster);
        pickMasterElement.textContent = pickMaster;
        pickMasterPriceElement.textContent = formatPrice(pickMasterPrice);
        availableFundsElement.textContent = formatPrice(availableFunds);
   
    }
});

toggleTraderBtn.addEventListener("click", () => {
  autoBuy = !autoBuy;
  document.getElementById("toggleTraderBtn").textContent =
    "Trader : " + autoBuy;
});

document.addEventListener("DOMContentLoaded", function () {
  twigsPriceElement.textContent = formatPrice(twigsPrice);
  twigsStockElement.textContent = twigs;
  const watcher = setInterval(() => {
    makerBtn.disabled = twigs === 0;
    buytwigsBtn.disabled = availableFunds < twigsPrice;
    buyPickMasterBtn.disabled = availableFunds < pickMasterPrice;
    if (autoBuy && twigs < 10) {
      buytwigs();
    }
  }, 100);

  const sold = setInterval(() => {
    max = Math.floor(unsoldInventory * 0.80)
    if(max < 5) {
        max = 5;
    }

    for (let i = 0; i < max; i++) {
        if (unsoldInventory >= salesQty) {
        availableFunds = availableFunds + salesQty * toothpickPrice;
        unsoldInventory = unsoldInventory - salesQty;
        unsoldElement.textContent = unsoldInventory;
        availableFundsElement.textContent = formatPrice(availableFunds);
        }
    }
  }, 500);

  const maker = setInterval(() => {
    for (let i = 0; i < pickMaster; i++) {
        makeAToothpick();
    }
  }, 500);

  const market = setInterval(() => {
    twigsPrice = twigsPrice + 1;
    if (twigsPrice > 25) {
      twigsPrice = 14;
    }
    twigsPriceElement.textContent = formatPrice(twigsPrice);
  }, 5000);
});

function buytwigs() {
  if (availableFunds >= twigsPrice) {
    twigs = twigs + twigsBaseQty;
    availableFunds = availableFunds - twigsPrice;
    twigsStockElement.textContent = twigs;
    availableFundsElement.textContent = formatPrice(availableFunds);
  }
}

function makeAToothpick() {
  if (twigs > 0) {
    toothpicks++;
    unsoldInventory++;
    twigs--;
    toothpickStockElement.textContent = toothpicks;
    unsoldElement.textContent = unsoldInventory;
    twigsStockElement.textContent = twigs;
  }
}

function formatPrice(price) {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}