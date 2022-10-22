const concatenate = require('./concatenate');

module.exports = async function priceFetcher(url, options, fetchFn = fetch) {
  return fetchFn(url, options).then(async response => {
    const reader = response.body.getReader();
    let done = false;
    let bodyBytes = new Uint8Array();
    let textDecoder = new TextDecoder();

    while (!done) {
      let readResult = await reader.read();
      done = readResult.done;

      if (readResult.value) {
        bodyBytes = concatenate(Uint8Array, readResult.value);
        const body = textDecoder.decode(bodyBytes);
        const searchMatch = body.match(/id=["']twister-plus-price-data-price["'] value=["'](.*)["']/);
        if (searchMatch) {
          done = true;
          reader.cancel();
          return parseFloat(searchMatch[1]);
        }
      }
    }

    return null;
  }).catch(() => null);
}