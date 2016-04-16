'use strict';

const Term = function(en, fr) {
  this.en = en;
  this.fr = fr;
};

const Couple = function(id, firstTerm, secondTerm) {
  this.id = id;
  this.firstTerm = firstTerm;
  this.secondTerm = secondTerm;
};

const CoupleManager = function() {
  this.couples = [];
};
CoupleManager.prototype = {
  addCouple: function(couple) {
    this.couples.push(couple);
  },
  getRandom: function(ignoredCouple) {
    let couple = this.couples[Math.floor(Math.random() * this.couples.length)];
    if (ignoredCouple && couple == ignoredCouple) {
      couple = this.getRandom(ignoredCouple);
    }
    return couple;
  }
}
const couples = new CoupleManager();

let couple, firstTerm, secondTerm;

firstTerm = new Term('man', 'homme');
secondTerm = new Term('woman', 'femme');
couple = new Couple('man-woman', firstTerm, secondTerm);
couples.addCouple(couple);

firstTerm = new Term('dog', 'chien');
secondTerm = new Term('cat', 'chat');
couple = new Couple('dog-cat', firstTerm, secondTerm);
couples.addCouple(couple);

module.exports = couples;
