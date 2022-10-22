const priceFetcher = require('./lib/priceFetcher');

const checkAmazonPrimePrice = async (tab, primePriceText) => {
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: '🕥',
  });
  await chrome.action.setBadgeBackgroundColor({
    color: [0, 255, 0, 0],
  })

  const url = new URL(tab.url);
  url.search = "";

  const price = await priceFetcher(url.toString(), { mode: 'no-cors', credentials: 'omit' });
  if (price) {
    const difference = price - parseFloat(primePriceText);
    const cf = currencyFormatter = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });

    if (difference !== 0) {
      const notificationId = `AMZN_PRIME_PRICE_DIFF_${parseInt(Math.random() * 1000000)}`

      chrome.notifications.onClicked.addListener((notificationId) => {
        chrome.notifications.clear(notificationId);
        chrome.windows.create({ url: url.toString(), incognito: true })
      })

      chrome.notifications.create(notificationId, {
        type: 'basic',
        iconUrl: 'images/128.png',
        title: 'Non-Prime Price Cheaper',
        message: `Buy for ${cf.format(price)}`,
        contextMessage: `Click to save ${cf.format(difference * -1)}`,
        priority: 1,
        requireInteraction: false,
        buttons: [
          {
            title: 'Open in Incognito Window',
          }
        ]
      })
    }

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: difference < 0 ? '❌' : '✅',
    });
  } else {
    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: '🛑',
    });
  }

}

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  chrome.action.setBadgeText({ text: 'Checking' });
  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (tab.url?.startsWith('https://amazon.co.uk') || tab.url?.startsWith('https://www.amazon.co.uk')) {
    chrome.action.enable();
    chrome.action.setBadgeText({ text: '' });
  } else {
    chrome.action.disable();
    chrome.action.setBadgeText({ text: '' });
  }

  chrome.runtime.onMessage.addListener(async (message) => {
    console.debug(`Received message: ${message}`);
    const tab = await chrome.tabs.get(activeInfo.tabId);
    checkAmazonPrimePrice(tab, message)
  });
});

chrome.runtime.onInstalled.addListener(() => {
  return {};
});
