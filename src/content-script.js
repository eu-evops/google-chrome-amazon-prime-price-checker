const priceElement = document.querySelector("#twister-plus-price-data-price");
if (priceElement && priceElement.value) {
  chrome.runtime.sendMessage(priceElement.value);
}
