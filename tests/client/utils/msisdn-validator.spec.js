import validate from '../../../src/client/utils/msisdn-validator';

describe('MSISDN validator', () => {
  it('should return an error if text is undefined', () => {
    expect(validate()).toEqual('Recipient cannot be blank.');
  });

  it('should return an error if text is blank', () => {
    expect(validate('')).toEqual('Recipient cannot be blank.');
  });

  it('should return an error if text is spaces', () => {
    expect(validate('   ')).toEqual('Recipient cannot be blank.');
  });

  it('should return an error if text less than 4 chars', () => {
    expect(validate('123')).toEqual('There should be at least 4 numbers in phone.');
  });

  it('should return an error if text less than 4 chars without plus sign', () => {
    expect(validate('++123')).toEqual('There should be at least 4 numbers in phone.');
  });

  it('should return an error if text more than 14 chars', () => {
    const text = new Array(16).join('a');

    expect(validate(text)).toEqual('Ah, that\'s a bit too long for a phone number.');
  });

  it('should return an error if text has non digit chars', () => {
    expect(validate('1234567q')).toEqual('Oops, you can only have numbers in a phone number.');
  });

  it('should return an error if text has special chars', () => {
    expect(validate('1234-33')).toEqual('Oops, you can only have numbers in a phone number.');
  });

  it('should not return an error if text has digits only', () => {
    expect(validate('79001007745')).toEqual(null);
  });

  it('should not return an error if text has digits only and plus sign', () => {
    expect(validate('+79001007745')).toEqual(null);
  });
});
