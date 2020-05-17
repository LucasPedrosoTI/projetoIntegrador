module.exports = {
  capitalizeName: (name) => {
    return name.replace(/\b(\w)/g, (s) => s.toUpperCase());
  },
};
