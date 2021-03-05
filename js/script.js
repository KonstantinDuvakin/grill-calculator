let koefNDS = 0.8;
let koefBayer = 0;
let transPrice = 0;
let invoicePrice;
let itemPrice = document.querySelector('#itemPrice').value;
let itemWeight = document.querySelector('#itemWeight').value;
let itemCode = document.querySelector('#itemCode');
let itemName = document.querySelector('#itemName');
let euro = parseFloat(document.querySelector('#euro').value);
let shop = document.querySelector('#shop');

let sumWeightInv = 500;
let sumPriceInv = 5000;

let permFinland = 500;
let gas = 3500;
let termChargesCar = 10000;
let driverSalary = 10000;
let inform = 2000;
let transit = 3000;
let other = 1000;

let sumCosts = permFinland + gas + termChargesCar + driverSalary + inform + transit + other;
let sumCostPerKilo = sumCosts / sumWeightInv;
let sumCostsEuro = +(sumCosts / euro).toFixed(2);
let sumCostPerKiloEuro = +(sumCostPerKilo / +euro).toFixed(2);

let koefPrice = 0.07;
let expendInd = +(sumPriceInv * koefPrice).toFixed(2);

let costPartGood;
let weightPartGood;
let costPartFinal;
let costCustomDuty;
let weightCustomDuty;
let finalCustomDuty;

let orderMyself = document.querySelector('#orderMyself').value;
let orderShipper = document.querySelector('#orderShipper').value;
let orderCostFinal;

let koefProfitPerc;
let koefEuroToKilo;
let costProfitEval;
let weightProfitEval;
let finalProfitEuro;
let finalProfit;

let koefTax = 1.06;
let finalCostSPB;
let finalPrice;

function change(event) {
    euro = document.querySelector('#euro').value;
    itemCode = document.querySelector('#itemCode');
    itemName = document.querySelector('#itemName');
    itemPrice = document.querySelector('#itemPrice').value;
    itemWeight = document.querySelector('#itemWeight').value;

    if (shop.value === 'k-Rauta') {
        invoicePrice = ((+itemPrice * +koefNDS) + +transPrice);
    } else {
        invoicePrice = (+itemPrice * +koefNDS) + (+itemPrice * +koefNDS * +koefBayer) + +transPrice;
    };

    costPartGood = invoicePrice * koefPrice;
    weightPartGood = itemWeight * sumCostPerKiloEuro;

    if(weightPartGood > costPartGood) {
        costPartFinal = weightPartGood;
    } else {
        costPartFinal = costPartGood;
    };

    if (invoicePrice > 200) {
        costCustomDuty = +((invoicePrice - 200) * 0.15).toFixed(2);
    } else {
        costCustomDuty = 0;
    };

    if (+itemWeight > 31) {
        weightCustomDuty = +((+itemWeight - 31) * 2).toFixed(2);
    } else {
        weightCustomDuty = 0;
    };

    if (costCustomDuty > weightCustomDuty) {
        finalCustomDuty = costCustomDuty;
    } else {
        finalCustomDuty = weightCustomDuty;
    };

    orderMyself = document.querySelector('#orderMyself');
    orderShipper = document.querySelector('#orderShipper');

    if (event.target.value === `0`) {
        orderCostFinal = 0;
    } else if (event.target.value === `1500`) {
        orderCostFinal = 1500;
    };

    if (+itemPrice < 20) {
        koefProfitPerc = 0.6;
    } else if (+itemPrice >= 20 && +itemPrice < 50) {
        koefProfitPerc = 0.5;
    } else if (+itemPrice >= 50 && +itemPrice < 100) {
        koefProfitPerc = 0.4;
    } else if (+itemPrice >= 100 && +itemPrice < 200) {
        koefProfitPerc = 0.3;
    } else if (+itemPrice >= 200) {
        koefProfitPerc = 0.18;
    };

    if (+itemWeight < 5) {
        koefEuroToKilo = 3;
    } else if (+itemWeight >= 5 && +itemWeight < 10) {
        koefEuroToKilo = 2.5;
    } else if (+itemWeight >= 10 && +itemWeight < 20) {
        koefEuroToKilo = 2;
    } else if (+itemWeight >= 20 && +itemWeight < 31) {
        koefEuroToKilo = 1.8;
    } else if (+itemWeight >= 31) {
        koefEuroToKilo = 1.6;
    };

    costProfitEval = +itemPrice * koefProfitPerc;
    weightProfitEval = +itemWeight * koefEuroToKilo;

    if (costProfitEval < weightProfitEval) {
        finalProfitEuro = costProfitEval;
    } else {
        finalProfitEuro = weightProfitEval;
    };

    finalProfit = finalProfitEuro * +euro;

    finalCostSPB = (((invoicePrice + costPartFinal + finalCustomDuty + orderCostFinal + finalProfitEuro) * koefTax) * +euro).toFixed(2);
    if (isNaN(finalCostSPB)) {
        finalCostSPB = 0;
    };

    finalPrice = document.querySelector('#finalPrice');
    finalPrice.innerHTML = `${finalCostSPB} руб.`;
}