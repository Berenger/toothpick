/* *********************************************** */
/*                Dynamic Elements                 */
/* *********************************************** */
const toothpickStockElement = document.getElementById("toothpickStock");
const woodStockElement = document.getElementById("woodStock");
const unsoldElement = document.getElementById("unsoldInventory");
const availableFundsElement = document.getElementById("availableFunds");
const woodCostElement = document.getElementById("woodCost");
const autoTailorElement = document.getElementById("autoTailor");
const autoTailorCostElement = document.getElementById("autoTailorCost");
const sellCostElement = document.getElementById("sellCost");
const woodAvailableElement = document.getElementById("woodAvailable");
const marketingCostElement = document.getElementById("marketingCost");
const marketingLevelElement = document.getElementById("marketingLevel");
const numberForestElement = document.getElementById("numberForest");
const forestCostElement = document.getElementById("forestCost");

/* *********************************************** */
/*                 Action Buttons                  */
/* *********************************************** */
const makerBtn = document.getElementById("makerBtn");
const buyWoodBtn = document.getElementById("buyWoodBtn");
const toggleTraderBtn = document.getElementById("toggleTraderBtn");
const buyPickMasterBtn = document.getElementById("buyPickMasterBtn");
const downSellCostBtn = document.getElementById("downSellCostBtn");
const upSellCostBtn = document.getElementById("upSellCostBtn");
const upMarketingBtn = document.getElementById("upMarketingBtn");
const buyNewForestBtn = document.getElementById("buyNewForestBtn");

/* *********************************************** */
/*              Initialization Constants           */
/* *********************************************** */
const toothpicksHandMade = 10;
const autoTailorBaseCost = 5.55;
const woodBaseQty = 1000;
const woodAvailableBaseQty = 1000;
const bonusCost = 0;

/* *********************************************** */
/*              Initialization Variables           */
/* *********************************************** */
let toothpicks = 0;
let unsoldInventory = 0;
let wood = woodBaseQty;
let woodAvailable = woodAvailableBaseQty;
let availableFunds = 0;
let autoTailor = 0;
let sellCost = 0.05;
let autoTailorCost = autoTailorBaseCost;
let salesQty = 1;
let autoBuy = false;
let marketingLvl = 1;
let marketingtCost = 100;
let demand = 1;

let woodCost = 10;
let maxCost = 25;
let marketTrend = 0;
let demandFactor = 1;
let supplyFactor = woodAvailableBaseQty / 2;

let forest = 1;
let forestCost = 250;

/* *********************************************** */
/*                Event Listener                   */
/* *********************************************** */
makerBtn.addEventListener("click", () => {
  makeAToothpick();
});

buyWoodBtn.addEventListener("click", () => {
  buyWood();
});

downSellCostBtn.addEventListener("click", () => {
  if (sellCost > 0.01) {
    sellCost = sellCost - 0.01;
    sellCostElement.textContent = formatCost(sellCost);
  }
});

upSellCostBtn.addEventListener("click", () => {
  sellCost = sellCost + 0.01;
  sellCostElement.textContent = formatCost(sellCost);
});

upMarketingBtn.addEventListener("click", () => {
  if (marketingtCost <= availableFunds) {
    marketingLvl = marketingLvl + 1;
    availableFunds = availableFunds - marketingtCost;
    marketingtCost = marketingtCost * 1.5;
    marketingLevelElement.textContent = formatNum(marketingLvl);
    availableFundsElement.textContent = formatCost(availableFunds);
    marketingCostElement.textContent = formatCost(marketingtCost);
  }
});

buyPickMasterBtn.addEventListener("click", () => {
  if (autoTailorCost <= availableFunds) {
    availableFunds = availableFunds - autoTailorCost;
    autoTailor = autoTailor + 1;
    autoTailorCost = parseFloat((Math.pow(1.1, autoTailor) + 5).toFixed(2));
    autoTailorElement.textContent = formatNum(autoTailor);
    autoTailorCostElement.textContent = formatCost(autoTailorCost);
    availableFundsElement.textContent = formatCost(availableFunds);
  }
});

toggleTraderBtn.addEventListener("click", () => {
  autoBuy = !autoBuy;
  document.getElementById("toggleTraderBtn").textContent =
    "AutoPickup : " + autoBuy;
});

buyNewForestBtn.addEventListener("click", () => {
  if (forestCost <= availableFunds) {
    forest = forest + 1;
    availableFunds = availableFunds - forestCost;
    forestCost = forestCost * 1.5;
    numberForestElement.textContent = formatNum(forest);
    availableFundsElement.textContent = formatCost(availableFunds);
    forestCostElement.textContent = formatCost(forestCost);
  }
});

/* *********************************************** */
/*                  Initialization                 */
/* *********************************************** */
document.addEventListener("DOMContentLoaded", function () {
  woodCostElement.textContent = formatCost(woodCost);
  woodStockElement.textContent = formatNum(wood);
  woodAvailableElement.textContent = formatNum(woodAvailable);

  /* *********************************************** */
  /*                Interval handler                 */
  /* *********************************************** */
  setInterval(() => {
    makerBtn.disabled = wood === 0;
    buyWoodBtn.disabled =
      availableFunds < woodCost || woodBaseQty > woodAvailable;
    buyPickMasterBtn.disabled = availableFunds < autoTailorCost;
    upMarketingBtn.disabled = availableFunds < marketingtCost;
    buyNewForestBtn.disabled = availableFunds < forestCost;

    if (autoBuy && wood < 10) {
      buyWood();
    }

    if (toothpicks > 150) {
      document.getElementById("autoTailorGst").style.display = "block";
    }

    if (toothpicks > 25000) {
      document.getElementById("toggleTraderBtn").style.display = "block";
    }

    if (toothpicks > 35000) {
      document.getElementById("ForestGst").style.display = "block";
    }
  }, 100);

  setInterval(() => {
    woodAvailable = woodAvailable + (woodBaseQty * forest) / 2;
    woodAvailableElement.textContent = formatNum(woodAvailable);
  }, 15000);

  setInterval(() => {
    marketing = Math.pow(1.1, marketingLvl - 1);
    demand = (0.8 / sellCost) * marketing;
    demand = demand + demand / 10;

    let demandFactor = (0.8 / sellCost) * Math.pow(1.1, marketingLvl - 1);
    let supplyFactor = Math.max(woodAvailable / 100000, 1);
    let randomFluctuation = (Math.random() - 0.5) * 2;
    let marketDemandTrend = demandFactor / supplyFactor + randomFluctuation;
    let productionFactor = Math.floor(1 + toothpicks / 1000);
    salesQty = Math.max(
      productionFactor,
      Math.floor(1 * (1 + marketDemandTrend / 10))
    );

    if (Math.random() > (demand / 100)) {
      salesQty = 0;
      if (Math.floor(Math.random() * 100) === 0) {
        salesQty = 1
      }
    }

    if (salesQty > unsoldInventory) {
      salesQty = unsoldInventory;
    }

    if (unsoldInventory >= salesQty) {
      availableFunds = bonusCost + availableFunds + salesQty * sellCost;
      unsoldInventory = unsoldInventory - salesQty;
      unsoldElement.textContent = formatNum(unsoldInventory);
      availableFundsElement.textContent = formatCost(availableFunds);
    }
  }, 100);

  setInterval(() => {
    for (let i = 0; i < autoTailor; i++) {
      makeAToothpick();
    }
  }, 1000);

  setInterval(() => {

    const demand = Math.floor(woodAvailable / 1000);
    const consume = Math.floor(toothpicks / 10000);
  
    woodCostMin = 10 * consume - demand;
    if(woodCostMin < 10) {
      woodCostMin = 10;
    }
    
      woodCostMax = woodCostMin * 1.5;
    woodCost += Math.random() < 0.5 ? 1 : -1;
    if (woodCost < woodCostMin || woodCost > woodCostMax) {
      woodCost = woodCostMin;
    }
    woodCostElement.textContent = formatCost(woodCost);
  }, 2000);
});

/* *********************************************** */
/*                    Helpers                      */
/* *********************************************** */
function buyWood() {
  if (availableFunds >= woodCost) {
    wood = wood + woodBaseQty;
    woodAvailable = woodAvailable - woodBaseQty;
    availableFunds = availableFunds - woodCost;
    woodStockElement.textContent = formatNum(wood);
    woodAvailableElement.textContent = formatNum(woodAvailable);
    availableFundsElement.textContent = formatCost(availableFunds);
  }
}

function makeAToothpick() {
  if (wood > 0) {
    toothpicks = toothpicks + toothpicksHandMade;
    unsoldInventory = unsoldInventory + toothpicksHandMade;
    wood--;
    toothpickStockElement.textContent = formatNum(toothpicks);
    unsoldElement.textContent = formatNum(unsoldInventory);
    woodStockElement.textContent = formatNum(wood);
  }
}

function formatCost(cost) {
  return cost.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatNum(number) {
  return new Intl.NumberFormat("en-US").format(number);
}
