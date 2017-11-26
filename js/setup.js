'use strict';

var WIZARDS_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARDS_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_SOLR = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var wizards = [];
function wizardsListGeneration() {
  for (var i = 0; i < 4; i++) {
    wizards[i] = {
      name: WIZARDS_NAMES[Math.floor(Math.random() * WIZARDS_NAMES.length)] + ' ' + WIZARDS_SURNAMES[Math.floor(Math.random() * WIZARDS_SURNAMES.length)],
      coatColor: COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)],
      eyesColor: EYES_SOLR[Math.floor(Math.random() * EYES_SOLR.length)]
    };
  }
  return wizards;
}

document.querySelector('.setup').classList.remove('hidden');

var similarWizardList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

function wizardCloning() {
  wizardsListGeneration();
  // var fragment = document.createDocumentFragment();
  for (var i = 0; i < 4; i++) {
    var similarWizard = similarWizardTemplate.cloneNode(true);

    similarWizard.querySelector('.setup-similar-label').textContent = wizards[i].name;
    similarWizard.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
    similarWizard.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;

    similarWizardList.appendChild(similarWizard);
  }
}

wizardCloning();

document.querySelector('.setup-similar').classList.remove('hidden');
