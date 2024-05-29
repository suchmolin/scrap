proyecto de extraccion de lecciones de lego education

pasos y descripcion necesarias para extraer lecciones y cumplan con la extrctura de datos usada en lerobotica


index.js -> extraccion de las tarjetas de las lecciones de la URL proporcionada (la categoria no esta dinamica)
    salida= "lessons.json" 

downloaImages.js -> descarga las imagenes desde la ruta del archivo inicial en el valor "urlImg" y las guarda en la carpeta img
    salida -> img (con el nombre del titulo de la leccion sin espacios ni caracteres especiales)

addingUrlImg.js -> actualizar la url de las imagenes para usar las descargadas previamente
    salida -> lessonsUrlImg.json

createUID.js -> crea un UUID para cada una de las lecciones del archivo de entrada
    salida-> lessonUID.json

scrapLessons.js -> construye un archivo con la informacion de cada una de las lecciones (usa la url de redir)
    salida -> lessonInfo.json

changeRedir.js -> cambia la url de redireccion dinamicamente por la ruta especificada para implementar la del UUID
    salida -> lessonRedir.json