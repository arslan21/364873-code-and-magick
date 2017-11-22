'use strict';

// Функция вывода стаистики игроков
window.renderStatistics = function (ctx, names, times) {

  // изображение оюлака на фоне
  var CloudX = 100;
  var CloudY = 10;
  // Тень облака
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';// Цвет тени
  ctx.fillRect(CloudX + 10, CloudY + 10, 420, 270);// Сама тень
  // Облако
  ctx.fillStyle = 'White';// Цвет облака
  ctx.fillRect(CloudX, CloudY, 420, 270);// Само облако

  // Генератор цвета случайной прозрачности
  function rndTransparencyGeneration(r, g, b) {
    var a = Math.ceil(Math.random() * 10) / 10;// Генерация случайного числа (0.0, 1.0]
    return `rgba(${r}, ${g}, ${b}, ${a})`; // Возврашает цвет в rgba формате (typeof == string)
  };

  // Сообщение
  ctx.fillStyle = 'red';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 150, 40);
  ctx.fillText('Список результатов:', 150, 60);

  //  объединение двух массивов в один
  var data = times.map(function(item, index) {
    return {times: item, value: names[index]}
  });
  //  сортировка
  data.sort(function (a, b) {
    if (a.times > b.times) {
      return 1;
    }
    if (a.times < b.times) {
      return -1;
    }
    return 0;
  });

  var timeMax = data[data.length - 1].times;// Масимальное значение времени

  // Использование максимального значения для построения гистограммы
  var histogramHeight = 150;// Высота поля гистограммы, px
  var barwidth = 40;// Ширина бара гистограммы, px
  var histogrtamDistance = 50;// Расояние между барами гистограммы, px
  var step = histogramHeight / timeMax;// Шаг, px
  var histogramStartX = 150;// Начальная бара гистограммы(различна для каждого бара), px
  var histogramStartY = 250;// Нулевое значение гистограммы по У, px
  // Построение диаграммы
  for (var i = 0; i < data.length; i++) {
    var barHeight = data[i].times * step;// Высота конкретного бара гисограммы, px
    ctx.fillStyle = rndTransparencyGeneration(0, 0, 255);// Цвет баров гистограммы, случайной прозрачности
    // В случае нахождения Вашего результата
    if (data[i].value === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';// Изменяем цвет бара
      ctx.fillText('Ваш результат: ' + Math.floor(data[i].times), 310, 40);// И выводим текст с Вашим результатом
    }
    ctx.fillRect(histogramStartX, histogramStartY - barHeight, barwidth, barHeight);// Построение бара
    ctx.fillStyle = 'Black';// Цвет текста
    ctx.fillText(Math.floor(data[i].times), histogramStartX, histogramStartY - barHeight - 20);// Результат игрока
    ctx.fillText(data[i].value, histogramStartX, histogramStartY + 20);
    histogramStartX += (barwidth + histogrtamDistance);// Смещение следущего бара
  }
};
