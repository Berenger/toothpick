const toothpickStockElement = document.getElementById('toothpickStock');
const woodStockElement = document.getElementById('woodStock');
const unsoldElement  = document.getElementById('unsoldInventory');
const availableFundsElement = document.getElementById('availableFunds');

const makerBtn = document.getElementById('makerBtn');
const buyWoodBtn = document.getElementById('buyWoodBtn');

let toothpicks = 0;
let unsoldInventory = 0;
let wood = 100;

makerBtn.addEventListener('click', () => {
    if (wood > 0) {
        toothpicks++;
        unsoldInventory++;
        wood--;
        toothpickStockElement.textContent = toothpicks;
        unsoldElement.textContent = unsoldInventory;
        woodStockElement.textContent = wood;
    }
});

buyWoodBtn.addEventListener('click', () => {
   wood = wood+100;
   woodStockElement.textContent = wood;
});

