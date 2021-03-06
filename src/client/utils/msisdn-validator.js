/**
 * primitive msisdn (Mobile Station International Subscriber Directory Number) validator with the following rules:
 * - only digits
 * - + sign at the beginning (optional)
 * - length up to 15
 */
const regex = /^\+?[1-9][0-9]{3,14}$/;

export default (text) => {
  if (!text || !text.trim().length)
    return 'Recipient cannot be blank.';

  text = text.trim();
  text = text.replace(/\+/g, '');

  if (text.length < 4)
    return 'There should be at least 4 numbers in phone.';

  if (text.length > 14)
    return 'Ah, that\'s a bit too long for a phone number.';

  if (!text.match(regex))
    return 'Oops, you can only have numbers in a phone number.';

  return null;
};
