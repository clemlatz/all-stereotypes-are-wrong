
document.addEventListener('DOMContentLoaded', function() {

  fetch('/couples')
    .then(function(response) {
      return response.json();
    }).then(function(json) {

      const termsElement = document.querySelector('#terms');
      const termAElement = document.querySelector('#termA');
      const termBElement = document.querySelector('#termB');
      const termBResult  = document.querySelector('#termB');
      const term1Element = document.querySelector('#term1');
      const term2Element = document.querySelector('#term2');
      const leftZone     = document.querySelector('#leftZone');
      const rightZone    = document.querySelector('#rightZone');

      termAElement.innerHTML = json[0][0];
      termBElement.innerHTML = json[0][1];
      term1Element.innerHTML = json[1][0];
      term2Element.innerHTML = json[1][1];

      leftZone.addEventListener('mouseenter', function() {
        terms.classList.add('leftChoice');
      });
      leftZone.addEventListener('mouseleave', function() {
        terms.classList.remove('leftChoice');
      });
      rightZone.addEventListener('mouseenter', function() {
        terms.classList.add('rightChoice');
      });
      rightZone.addEventListener('mouseleave', function() {
        terms.classList.remove('rightChoice');
      });
    })

})
