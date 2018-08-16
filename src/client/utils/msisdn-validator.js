/* primitive msisdn (Mobile Station International Subscriber Directory Number) validator with the following rules:
 * only digits
 * + sign at the beginning (optional)
 * length up to 15
 */
const regex = /^\+?[1-9]{1}[0-9]{3,14}$/;

export default (text) => {
  if (!text || !text.length)
    return {valid: false, error: 'Recipient cannot be blank.'};

  if (text.length < 4)
    return {valid: false, error: 'There should be at least 4 numbers in phone.'};

  if (text.length > 14)
    return {valid: false, error: 'Ah, that\'s a bit too long for a phone number.'};

  if (!text.match(regex))
    return {valid: false, error: 'Oops, you can only have numbers in a phone number.'};

  return {valid: true, error: null};
};
