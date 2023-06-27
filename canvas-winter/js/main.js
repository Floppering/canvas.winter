'use strict';

// Массив загружаемых изображений
let imagesArr = [
    'cloud_1.png',
    'cloud_2.png',
    'cloud_3.png',
    'tree_3.png',
];

// Число загруженных изображений
let loadedImages = 0;

// Объект для хранения изображений
let IMG = {/* imageName */}

// Вызов функции загрузки изображений
// для каждого изображения в масиве
imagesArr.forEach( loadImage );

// Функция загрузки изображения
function loadImage(imageName) {
    let img = new Image();
    img.src = './src/images/' + imageName;
    img.onload = imageUploaded; // после загрузки вызываем imageUploaded()
    IMG[imageName] = img; // сохраняем в объект с именем файла в качестве ключа
}

// Функция считающая число загруженных изображений
function imageUploaded() {
    loadedImages++;
    if (loadedImages === imagesArr.length) {
        // если все загружено - запускаем анимацию
        requestAnimationFrame( animation );
    }
}

// Массив с объектами облаков
let cloudsArr= [
    {img: IMG['cloud_1.png'], x:  10, y: 10, speed: 0.02},
    {img: IMG['cloud_2.png'], x: 280, y: 10, speed: 0.025},
    {img: IMG['cloud_3.png'], x: 580, y: 10, speed: 0.03},
];

// Получаем ссылку на <canvas> и создаем контекст
const canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext('2d');

// Записываем текущее время выполнения программы
let timeStamp = performance.now();

// Функция, запускающаяся при каждом обновлении экрана
function animation( time ) {
    // time - время (мс) с момента запуска программы
    // deltaTime - время (мс) между обновлениями экрана
    let deltaTime = time - timeStamp;
    timeStamp = time; // обнавляем время последнего кадра

    // Очищаем <canvas>
    ctx.clearRect(0, 0, 800, 600);

    // Обновляем облока
    cloudsArr.forEach( cloud => {
        // Смещаем облоко по оси X 
        cloud.x += cloud.speed * deltaTime;

        // Если облоко ушло за предел экрана,
        // возвращаем его с противоположной стороны
        if (cloud.x > 800) cloud.x = -cloud.img.width;

        // Рисуем облоко
        ctx.drawImage(cloud.img, cloud.x, cloud.y);
    });

    // Рисуем дерево
    ctx.drawImage(IMG['tree_3.png'], -20, 200);

    // запускаем функцию animation() перед следующем обновлением экрана
    requestAnimationFrame( animation );
}