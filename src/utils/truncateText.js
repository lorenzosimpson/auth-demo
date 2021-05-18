export const truncateText = (text, length) => {
    return text.length <= length ? text : text[length - 1] === ' ' ? text.substr(0, length -1) + '\u2026' : text.substr(0, length) + '\u2026'
  }