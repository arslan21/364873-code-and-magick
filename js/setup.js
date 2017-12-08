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

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'green',
  'yellow'
];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarWizardList = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

function getRandomWizard() {
  var rndWizard = {
    name: WIZARDS_NAMES[Math.floor(Math.random() * WIZARDS_NAMES.length)] + ' ' + WIZARDS_SURNAMES[Math.floor(Math.random() * WIZARDS_SURNAMES.length)],
    coatColor: COAT_COLORS[Math.floor(Math.random() * COAT_COLORS.length)],
    eyesColor: EYES_COLORS[Math.floor(Math.random() * EYES_COLORS.length)]
  };
  return rndWizard;
}

function generationWizardList() {
  var wizardList = [];
  for (var i = 0; i < 4; i++) {
    wizardList[i] = getRandomWizard();
  }
  return wizardList;
}

function wizardCloning(wizard) {
  var similarWizard = similarWizardTemplate.cloneNode(true);

  similarWizard.querySelector('.setup-similar-label').textContent = wizard.name;
  similarWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  similarWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return similarWizard;
}

var wizardList = generationWizardList();

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizardList.length; i++) {
  fragment.appendChild(wizardCloning(wizardList[i]));
}
similarWizardList.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

//Открыие и закрытие диалогового окна

var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');

setupOpen.addEventListener('click', function() {
  userDialog.classList.remove('hidden')
});

setupClose.addEventListener('click', function() {
  userDialog.classList.add('hidden')
});
