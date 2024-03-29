<?php

header('Content-Type: text/html; charset=windows-1251');

// сторонняя страница сайта, с которой будем брать контент.
$content = file_get_contents('https://cbr.ru/');

// определяем начало необходимого фрагмента кода, до которого мы удалим весь контент
$pos = strpos($content, '<div class="col-md-2 col-xs-9 _right mono-num">');

// удаляем все до нужного фрагмента
$content = substr($content, $pos);

// находим конец необходимого фрагмента кода
$pos = strpos($content, '</div>');

// отрезаем нужное количество символов от конца фрагмента
$content = substr($content, 0, $pos);

//если в нужном контенте встречается не нужный кусок текста, то его вырезаем
//$content = str_replace('текст, который нужно вырезать','', $content);

// выводим необходимый контент
echo $content;

?>
