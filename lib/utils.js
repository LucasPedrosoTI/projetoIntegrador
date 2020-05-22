module.exports = {
  capitalizeName: (name) => {
    return name.replace(/\b(\w)/g, (s) => s.toUpperCase());
  },

  roundHalf: (num) => {
    return Math.round(num * 2) / 2;
  },
};
