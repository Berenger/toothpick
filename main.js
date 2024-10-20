/* *********************************************** */
/*                Dynamic Elements                 */
/* *********************************************** */
const toothpickStockElement = document.getElementById("toothpickStock");
const twigsStockElement = document.getElementById("twigsStock");
const unsoldElement = document.getElementById("unsoldInventory");
const availableFundsElement = document.getElementById("availableFunds");
const twigsPriceElement = document.getElementById("twigsPrice");
const autoTailorElement = document.getElementById("autoTailor");
const autoTailorPriceElement = document.getElementById("autoTailorPrice");
const sellPriceElement = document.getElementById("sellPrice");
const twigsOnEarthElement = document.getElementById("twigsOnEarth");
const marketingPriceElement = document.getElementById("marketingPrice");
const marketingLevelElement = document.getElementById("marketingLevel");

/* *********************************************** */
/*                 Action Buttons                  */
/* *********************************************** */
const makerBtn = document.getElementById("makerBtn");
const buyTwigsBtn = document.getElementById("buyTwigsBtn");
const toggleTraderBtn = document.getElementById("toggleTraderBtn");
const buyPickMasterBtn = document.getElementById("buyPickMasterBtn");
const downSellPriceBtn = document.getElementById("downSellPriceBtn");
const upSellPriceBtn = document.getElementById("upSellPriceBtn");
const upMarketingBtn = document.getElementById("upMarketingBtn");

/* *********************************************** */
/*              Initialization Constants           */
/* *********************************************** */
const toothpicksHandMade = 1;
const autoTailorBasePrice = 5.55;
const twigsBaseQty = 1000;
const twigsOnEarthBaseQty = 10000000;
const bonusPrice = 0;

/* *********************************************** */
/*              Initialization Variables           */
/* *********************************************** */
let toothpicks = 0;
let unsoldInventory = 0;
let twigs = twigsBaseQty;
let twigsOnEarth = twigsOnEarthBaseQty;
let availableFunds = 0;
let autoTailor = 0;
let sellPrice = 0.05;
let twigsPrice = 10;
let autoTailorPrice = autoTailorBasePrice;
let salesQty = 1;
let autoBuy = false;
let marketingLvl = 1;
let marketingtCost = 100;
let demand = 1;

/* *********************************************** */
/*                Event Listener                   */
/* *********************************************** */
makerBtn.addEventListener("click", () => {
  makeAToothpick();
});

buyTwigsBtn.addEventListener("click", () => {
  buyTwigs();
});

downSellPriceBtn.addEventListener("click", () => {
  if (sellPrice > 0.01) {
    sellPrice = sellPrice - 0.01;
    sellPriceElement.textContent = formatPrice(sellPrice);
  }
});

upSellPriceBtn.addEventListener("click", () => {
  sellPrice = sellPrice + 0.01;
  sellPriceElement.textContent = formatPrice(sellPrice);
});

upMarketingBtn.addEventListener("click", () => {
  if (marketingtCost <= availableFunds) {
    marketingLvl = marketingLvl + 1;
    availableFunds = availableFunds - marketingtCost;
    marketingtCost = marketingtCost * marketingLvl;
    marketingLevelElement.textContent = formatNum(marketingLvl);
    availableFundsElement.textContent = formatPrice(availableFunds);
    marketingPriceElement.textContent = formatPrice(marketingtCost);
  }
});

buyPickMasterBtn.addEventListener("click", () => {
  if (autoTailorPrice <= availableFunds) {
    availableFunds = availableFunds - autoTailorPrice;
    autoTailor = autoTailor + 1;
    autoTailorPrice =  parseFloat((Math.pow(1.1,autoTailor)+5).toFixed(2));
    autoTailorElement.textContent = formatNum(autoTailor);
    autoTailorPriceElement.textContent = formatPrice(autoTailorPrice);
    availableFundsElement.textContent = formatPrice(availableFunds);
  }
});

toggleTraderBtn.addEventListener("click", () => {
  autoBuy = !autoBuy;
  document.getElementById("toggleTraderBtn").textContent =
    "Trader : " + autoBuy;
});

/* *********************************************** */
/*                  Initialization                 */
/* *********************************************** */
document.addEventListener("DOMContentLoaded", function () {
  twigsPriceElement.textContent = formatPrice(twigsPrice);
  twigsStockElement.textContent = formatNum(twigs);
  twigsOnEarthElement.textContent = formatNum(twigsOnEarth);

  setInterval(() => {
    makerBtn.disabled = twigs === 0;
    buyTwigsBtn.disabled = availableFunds < twigsPrice || twigsBaseQty > twigsOnEarth;
    buyPickMasterBtn.disabled = availableFunds < autoTailorPrice;
    upMarketingBtn.disabled = availableFunds < marketingtCost;
    

    if (autoBuy && twigs < 10) {
      buyTwigs();
    }

    if (toothpicks > 150) {
      document.getElementById("autoTailorGst").style.display = "block";
    }

    if (toothpicks > 25000) {
      document.getElementById("toggleTraderBtn").style.display = "block";
    }

    marketing = Math.pow(1.1, marketingLvl - 1);
    demand = (0.80 / sellPrice) * marketing;
    demand = demand + (demand / 10);
  }, 100);

  /* *********************************************** */
  /*                Interval handler                 */
  /* *********************************************** */
  setInterval(() => {
    if (Math.random() < (demand/100)) {
      if (unsoldInventory >= salesQty) {
        availableFunds = bonusPrice + availableFunds + (salesQty * sellPrice);
        unsoldInventory = unsoldInventory - salesQty;
        unsoldElement.textContent = formatNum(unsoldInventory);
        availableFundsElement.textContent = formatPrice(availableFunds);
      }
    }
  }, 75);

  setInterval(() => {
    for (let i = 0; i < autoTailor; i++) {
      makeAToothpick();
    }
  }, 1000);

  setInterval(() => {

    if (Math.random() < .020) {
    twigsPrice = twigsPrice + 1;
    if (twigsPrice > 20 ) {
      twigsPrice = 10;
    }
    twigsPriceElement.textContent = formatPrice(twigsPrice);
  }
  }, 100);
});

/* *********************************************** */
/*                    Helpers                      */
/* *********************************************** */
function buyTwigs() {
  if (availableFunds >= twigsPrice) {
    twigs = twigs + twigsBaseQty;
    twigsOnEarth = twigsOnEarth - twigsBaseQty;
    availableFunds = availableFunds - twigsPrice;
    twigsStockElement.textContent = formatNum(twigs);
    twigsOnEarthElement.textContent = formatNum(twigsOnEarth);
    availableFundsElement.textContent = formatPrice(availableFunds);
  }
}

function makeAToothpick() {
  if (twigs > 0) {
    toothpicks = toothpicks + toothpicksHandMade;
    unsoldInventory = unsoldInventory + toothpicksHandMade;
    twigs--;
    toothpickStockElement.textContent = formatNum(toothpicks);
    unsoldElement.textContent = formatNum(unsoldInventory);
    twigsStockElement.textContent = formatNum(twigs);
  }
}

function formatPrice(price) {
  return price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatNum(number) {
  return new Intl.NumberFormat('en-US').format(number);
}