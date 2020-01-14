export default function termsFromCouples(couple1, couple2) {
  return {
    termA: couple1.firstTerm.en,
    termB: couple1.secondTerm.en,
    term1: couple2.firstTerm.en,
    term2: couple2.secondTerm.en,
  };
}
