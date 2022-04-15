const priceInput = document.querySelector('.price_input');
const currencySelect = document.querySelector('.currencySelect');
const posiitonToRibbon = document.querySelector('.posiitonToRibbon');

const calculateBtn = document.querySelector('.calculate_btn');
const setupForm = document.querySelector('.setupForm');

const open = document.querySelector('.open');
const longTargetPercentage = document.querySelector('.long_target_percentage');
const longOrderType = document.querySelector('.long_order_type');
const longStopLoss = document.querySelector('.long_stop_loss');

const shortTargetPercentage = document.querySelector(
  '.short_target_percentage'
);
const shortOrderType = document.querySelector('.short_order_type');
const shortStopLoss = document.querySelector('.short_stop_loss');

// Percentage we chose for our strategy, based on the currency
const strategyMargins = {
  ETH: {
    target: 1,
    stopLoss: 0.5,
  },

  LUNA: {
    target: 2,
    stopLoss: 1,
  },
};

// Which order types we chose for long and short based on where we are relative to Ribbon
const ordertTypesBasedonRibbonPosiion = {
  above: {
    long: 'Limit Order',
    short: 'Stop Market Order',
  },
  below: {
    short: 'Limit Order',
    long: 'Stop Market Order',
  },
};

// Finall Settings for Opening Long and Short on Binance
let longSettings = {
  side: 'Long',
};
let shortSettings = {
  side: 'Short',
};
let openPrice;

// Function that calculates all the relative settings for orders, based on the inputs and fill them into Final Settings Objects
function calculateOrders(e) {
  e.preventDefault();
  openPrice = +priceInput.value;
  console.log('Open Price', openPrice);
  console.log(currencySelect.value);

  if (currencySelect.value === 'ETH') {
    longSettings['target_percentage'] = strategyMargins.ETH.target;
    longSettings['stoploss_percentage'] = strategyMargins.ETH.stopLoss;

    shortSettings['target_percentage'] = strategyMargins.ETH.target;
    shortSettings['stoploss_percentage'] = strategyMargins.ETH.stopLoss;

    longSettings['take_profit'] =
      openPrice + (openPrice / 100) * strategyMargins.ETH.target;
    longSettings['stop_loss'] =
      openPrice - (openPrice / 100) * strategyMargins.ETH.stopLoss;

    shortSettings['take_profit'] =
      openPrice - (openPrice / 100) * strategyMargins.ETH.target;
    shortSettings['stop_loss'] =
      openPrice + (openPrice / 100) * strategyMargins.ETH.stopLoss;
  }

  if (currencySelect.value === 'LUNA') {
    longSettings['target_percentage'] = strategyMargins.LUNA.target;
    longSettings['stoploss_percentage'] = strategyMargins.LUNA.stopLoss;

    shortSettings['target_percentage'] = strategyMargins.LUNA.target;
    shortSettings['stoploss_percentage'] = strategyMargins.LUNA.stopLoss;

    longSettings['take_profit'] =
      openPrice + (openPrice / 100) * strategyMargins.LUNA.target;
    longSettings['stop_loss'] =
      openPrice - (openPrice / 100) * strategyMargins.LUNA.stopLoss;

    shortSettings['take_profit'] =
      openPrice - (openPrice / 100) * strategyMargins.LUNA.target;
    shortSettings['stop_loss'] =
      openPrice + (openPrice / 100) * strategyMargins.LUNA.stopLoss;
  }

  if (posiitonToRibbon.value === 'above') {
    longSettings['order_type'] = ordertTypesBasedonRibbonPosiion.above.long;
    shortSettings['order_type'] = ordertTypesBasedonRibbonPosiion.above.short;
  } else if (posiitonToRibbon.value === 'below') {
    longSettings['order_type'] = ordertTypesBasedonRibbonPosiion.below.long;
    shortSettings['order_type'] = ordertTypesBasedonRibbonPosiion.below.short;
  }

  console.log('Long Settings', longSettings);
  console.log('Short Settings', shortSettings);
  open.innerText = `Open: ${openPrice}`;
  longTargetPercentage.innerText = `${longSettings.take_profit} (+${longSettings.target_percentage}%)`;
  longOrderType.innerText = `${longSettings.order_type}`;
  longStopLoss.innerText = `${longSettings.stop_loss} (-${longSettings.stoploss_percentage}%)`;

  shortTargetPercentage.innerText = `${shortSettings.take_profit} (-${shortSettings.target_percentage}%)`;
  shortOrderType.innerText = `${shortSettings.order_type}`;
  shortStopLoss.innerText = `${shortSettings.stop_loss} (+${shortSettings.stoploss_percentage}%)`;
}

setupForm.addEventListener('submit', (e) => calculateOrders(e));
