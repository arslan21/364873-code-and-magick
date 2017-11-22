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
  var rndTransparencyGeneration = function (r, g, b) {
    var a = Math.ceil(Math.random() * 10) / 10;// Генерация случайного числа (0.0, 1.0]
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';// Запись в переменную (typeof == string)
  };

  // Сообщение
  ctx.fillStyle = 'red';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 150, 40);
  ctx.fillText('Список результатов:', 150, 60);

  /*  Сортировка по увеличению, работае по массиву arrForSort,
  действия в массиве dependentArr дуюлируют действия в массиве arrForSort по переменным i и j,
  возвращает в том числе максимальное и минимальное значение */
  var sortingTwoArrs = function (arrForSort, dependentArr) {
    for (var i = 0; i < arrForSort.length - 1; i++) {
      var minArrForSort = arrForSort[i]; // Объявляем переменную для хранения минимального значения,
      var minDependentArr = dependentArr[i];// Аналогично с именем
      // Запускаем j цикл по массиву от следующего до последнего, j - переменная сравнения
      for (var j = i + 1; j < arrForSort.length; j++) {
        // Сравниваем каждую переменную сравнения с минимальным значением. Если она меньше, то
        if (arrForSort[j] < minArrForSort) {
          minArrForSort = arrForSort[j]; // переопределяем переменную минимального значения
          minDependentArr = dependentArr[j];
          var swapArrForSort = arrForSort[i]; // Объявляем временную переменную для хранения заменяемого значения
          var swapDependentArr = dependentArr[i];
          arrForSort[i] = minArrForSort; // Переопределяем заменяемую переменную минимальным значением
          dependentArr[i] = minDependentArr;
          arrForSort[j] = swapArrForSort; // Возвращаем заменяемую переменную на место переменной сравнения. Замена произведена
          dependentArr[j] = swapDependentArr;
        }
      }
    }
    return {
      arrForSort: arrForSort, // Отсортированный массив
      dependentArr: dependentArr, // Зависимый массив
      minValue: arrForSort[0], //  Минимальное значение
      minDependent: dependentArr[0],
      maxValue: arrForSort[arrForSort.length - 1], // максимальное значение
      maxDependent: dependentArr[arrForSort.length - 1]
    };
  };

  var timesNames = sortingTwoArrs(times, names);// Объект содержащий массивы times, names, и их макимальные и минимальные начения

  var timeMax = timesNames.maxValue;// Масимальное значение времени
  // console.log(timesNames)

  // Использование максимального значения для построения гистограммы
  var histogramHeight = 150;// Высота поля гистограммы, px
  var barwidth = 40;// Ширина бара гистограммы, px
  var histogrtamDistance = 50;// Расояние между барами гистограммы, px
  var step = histogramHeight / timeMax;// Шаг, px
  var histogramStartX = 150;// Начальная бара гистограммы(различна для каждого бара), px
  var histogramStartY = 250;// Нулевое значение гистограммы по У, px
  var barColor = rndTransparencyGeneration(0, 0, 255); // Цвет бара
  // Построение диаграммы
  for (var i = 0; i < times.length; i++) {
    var barHeight = times[i] * step;// Высота конкретного бара гисограммы, px
    ctx.fillStyle = barColor;// Цвет баров гистограммы, случайной прозрачности
    // В случае нахождения Вашего результата
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';// Изменяем цвет бара
      ctx.fillText('Ваш результат: ' + Math.floor(times[i]), 310, 40);// И выводим текст с Вашим результатом
    }
    ctx.fillRect(histogramStartX, histogramStartY - barHeight, barwidth, barHeight);// Построение бара
    ctx.fillStyle = 'Black';// Цвет текста
    ctx.fillText(Math.floor(times[i]), histogramStartX, histogramStartY - barHeight - 20);// Результат игрока
    ctx.fillText(names[i], histogramStartX, histogramStartY + 20);
    histogramStartX += (barwidth + histogrtamDistance);// Смещение следущего бара
  }
};
