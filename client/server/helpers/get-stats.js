const { Combination } = require('./../models');

module.exports = async function getStats() {
  const combinations = await Combination.findAll();
  let stereotypes = 0;
  for (let i = 0, c = combinations.length; i < c; i++) {
    stereotypes += combinations[i].count;
  }
  return { stereotypes };
};
