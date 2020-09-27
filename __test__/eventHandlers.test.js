'use strict';
let logger = require('../caps');
let pickUpLogger = require('../driver');
let thankLogger = require('../vendor');

describe('Event handlers tests', ()=> {
  let payload = {
    storeName: 'diana',
    orderId: 89475,
    customerName: 'Unique Stehr',
    address: '1961 Caden Forges Apt. 701',
  };
  let consoleSpy;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  afterEach(() => {
    consoleSpy.mockRestore();
  });
  it('can log using logger function in caps', ()=> {
    logger(payload);
    expect(consoleSpy).toHaveBeenCalled();
  });
  it('can log using pickUpLogger function in driver', ()=> {
    pickUpLogger(payload);
    setTimeout(()=> expect(consoleSpy).toHaveBeenCalled(),4000);
  });
  it('can log using thankLogger function in vendor', ()=> {
    thankLogger();
    expect(consoleSpy).toHaveBeenCalled();
  });
});