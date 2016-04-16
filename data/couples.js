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

firstTerm = new Term('gay', 'gay');
secondTerm = new Term('straight', 'hétéro');
couple = new Couple('gay-straight', firstTerm, secondTerm, false, false);
couples.addCouple(couple);

firstTerm = new Term('black', 'noir');
secondTerm = new Term('white', 'blanc');
couple = new Couple('black-white', firstTerm, secondTerm, false, false);
couples.addCouple(couple);

firstTerm = new Term('smart', 'intelligent');
secondTerm = new Term('dumb', 'bête');
couple = new Couple('smart-dumb', firstTerm, secondTerm, false, true);
couples.addCouple(couple);

firstTerm = new Term('kind', 'gentil');
secondTerm = new Term('mean', 'méchant');
couple = new Couple('kind-mean', firstTerm, secondTerm, false, true);
couples.addCouple(couple);

firstTerm = new Term('leftist', 'de gauche');
secondTerm = new Term('rightist', 'de droite');
couple = new Couple('leftist-rightist', firstTerm, secondTerm, false, false);
couples.addCouple(couple);

firstTerm = new Term('vulgar', 'vulgaire');
secondTerm = new Term('refined', 'raffiné');
couple = new Couple('vulgar-refined', firstTerm, secondTerm, false, true);
couples.addCouple(couple);

firstTerm = new Term('vegeterian', 'végétarien');
secondTerm = new Term('meat-eater', 'omnivore');
couple = new Couple('vegetarian-meat-eater', firstTerm, secondTerm, false, false);
couples.addCouple(couple);

firstTerm = new Term('smoker', 'fumeur');
secondTerm = new Term('non-smoker', 'non-fumeur');
couple = new Couple('smoker-non-smoker', firstTerm, secondTerm, true, false);
couples.addCouple(couple);

firstTerm = new Term('young', 'jeune');
secondTerm = new Term('old', 'vieux');
couple = new Couple('young-old', firstTerm, secondTerm, false, false);
couples.addCouple(couple);

firstTerm = new Term('manual', 'manuel');
secondTerm = new Term('intellectual', 'intellectuel');
couple = new Couple('manual-intellectual', firstTerm, secondTerm, false, false);
couples.addCouple(couple);

firstTerm = new Term('shaved', 'rasé');
secondTerm = new Term('hairy', 'poilu');
couple = new Couple('shaved-hairy', firstTerm, secondTerm, true, false);
couples.addCouple(couple);

firstTerm = new Term('happy', 'heureux');
secondTerm = new Term('sad', 'malheureux');
couple = new Couple('happy-sad', firstTerm, secondTerm, false, false);
couples.addCouple(couple);

firstTerm = new Term('tall', 'grand');
secondTerm = new Term('small', 'petit');
couple = new Couple('tall-small', firstTerm, secondTerm, false, false);
couples.addCouple(couple);

firstTerm = new Term('fat', 'gros');
secondTerm = new Term('skinny', 'maigre');
couple = new Couple('fat-skinny', firstTerm, secondTerm, false, false);
couples.addCouple(couple);

firstTerm = new Term('original', 'original');
secondTerm = new Term('conformist', 'conformiste');
couple = new Couple('original-conformist', firstTerm, secondTerm, true, false);
couples.addCouple(couple);

firstTerm = new Term('believer', 'croyant');
secondTerm = new Term('atheist', 'athée');
couple = new Couple('believer-atheist', firstTerm, secondTerm, false, false);
couples.addCouple(couple);


module.exports = couples;
