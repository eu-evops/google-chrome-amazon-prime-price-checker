const priceFetcher = require("./priceFetcher");
const { default: expect } = require('expect');
const fs = require('fs');
const path = require('path');
const url = 'https://www.amazon.co.uk/dp/B07NQCKJSH/';
const headers = {
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
};

describe('priceFetcher', () => {
  it('should return a price', async () => {
    // TODO mock the fetch
    const price = await priceFetcher(url, { headers });
    expect(price).toEqual(189.99);
  });
})