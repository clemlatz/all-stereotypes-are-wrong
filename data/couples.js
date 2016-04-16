'use strict';

const Term = function(en, fr) {
  this.en = en;
  this.fr = fr;
};

const Couple = function(id, firstTerm, secondTerm, wtf, polarized) {
  this.id = id;
  this.firstTerm = firstTerm;
  this.secondTerm = secondTerm;
  this.wtf = wtf;
  this.polarized = polarized;
};
Couple.prototype = {
  hasTerm: function(term, lang) {
    if (this.firstTerm[lang] === term) {
      return true;
    }
    if (this.secondTerm[lang] === term) {
      return true;
    }
    return false;
  }
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
  },
  termExists: function(term, lang) {
    for (var i = 0, c = this.couples.length; i < c; i++) {
      if (this.couples[i].hasTerm(term, lang)) {
        return true;
      }
    }
    return false;
  }
}
const couples = new CoupleManager();

let couple, firstTerm, secondTerm;

firstTerm = new Term('man', 'homme');
secondTerm = new Term('woman', 'femme');
couple = new Couple('man-woman', firstTerm, secondTerm, false, false);
couples.addCouple(couple);

firstTerm = new Term('dog', 'chien');
secondTerm = new Term('cat', 'chat');
couple = new Couple('dog-cat', firstTerm, secondTerm, true, false);
couples.addCouple(couple);

module.exports = couples;
