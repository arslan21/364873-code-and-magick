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

var FFIREBAL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
]

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarWizardList = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

function getRandomWizard() {
  var rndWizard = {
    name: getRandomElement(WIZARDS_NAMES) + ' ' + getRandomElement(WIZARDS_SURNAMES),
    coatColor: getRandomElement(COAT_COLORS),
    eyesColor: getRandomElement(EYES_COLORS)
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

//  Открыие и закрытие диалогового окна

var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
}

function openPopup() {
  userDialog.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
}

function closePopup() {
  userDialog.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
}

userDialogOpen.addEventListener('click', function () {
  openPopup();
});

userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

userDialogClose.addEventListener('click', function () {
  closePopup();
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

//  валидация форм в окне диалога
var setupWizardForm = userDialog.querySelector('.setup-wizard-form')
var inputUserName = setupWizardForm.querySelector('.setup-user-name');
inputUserName.addEventListener('invalid', function (evt) {
  if (inputUserName.validity.tooShort) {
    inputUserName.setCustomValidity('Введите больше символов');
  } else if (inputUserName.validity.tooLong) {
    inputUserName.setCustomValidity('Слишком много символов');
  } else if (inputUserName.validity.valueMissing) {
    inputUserName.setCustomValidity('Обязательное поле');
  }
});


// Изменение цвета персонажа, глаз, файербола

var setupWizardCoat = setupWizardForm.querySelector('.wizard-coat');
var setupWizardEyes = setupWizardForm.querySelector('.wizard-eyes');
var setupFireball = setupWizardForm.querySelector('.setup-fireball-wrap');

setupWizardCoat.addEventListener('click', function() {
  setupWizardCoat.setAttribute('style', 'fill: ' + getRandomElement(COAT_COLORS))
});

setupWizardEyes.addEventListener('click', function() {
  setupWizardEyes.setAttribute('style', 'fill: ' + getRandomElement(EYES_COLORS))
});

setupFireball.addEventListener('click', function() {
  setupFireball.setAttribute('style', 'background-color: ' + getRandomElement(FFIREBAL_COLORS))
});
