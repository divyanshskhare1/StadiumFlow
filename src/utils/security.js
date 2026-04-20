/**
 * Sanitizes user input to prevent Cross-Site Scripting (XSS).
 * Replaces unsafe HTML characters with safe HTML entities.
 * 
 * @param {string} input - The raw, untrusted user input string from the Chatbot.
 * @returns {string} The sanitized string safe for DOM rendering.
 * @complexity O(n) where n is the length of the input string, as regex replace iterates across the text.
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;',
    "`": '&#x60;',
    "=": '&#x3D;'
  };
  const regex = /[&<>"'`=\/]/ig;
  return input.replace(regex, (match) => entityMap[match]);
};
