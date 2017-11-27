<?php
	$title = 'Заявка на сайте';
	$name = htmlspecialchars($_POST['name']);
	$phone = htmlspecialchars($_POST['phone']);
	$street = htmlspecialchars($_POST['street']);
	$home = htmlspecialchars($_POST['home']);
	$part = htmlspecialchars($_POST['part']);
	$appt = htmlspecialchars($_POST['appt']);
	$floor = htmlspecialchars($_POST['floor']);
	$comment = htmlspecialchars($_POST['comment']);
	$payment = htmlspecialchars($_POST['payment']);
	$callback = $_POST['callback']; 
    $callback = isset($callback) ? 'НЕТ' : 'ДА'; 

	$mess = '
		Имя отправителя: '.$_POST['name'].'
		Телефон: '.$_POST['phone'].'
		Улица: '.$_POST['street'].'
		Дом: '.$_POST['home'].'
		Корпус: '.$_POST['part'].'
		Квартира: '.$_POST['appt'].'
		Этаж: '.$_POST['floor'].'
		Комментарий: '.$_POST['comment'].'
		Оплата: '.$_POST['payment'].'
		Перезванивать: '.$_POST['callback'].'
		';

	$to = 'orekhovnikolay@mail.ru';

	mail($to, $title, $mess); 

	$data = [];
    if ($mail) {
        $data['status'] = "OK";
        $data['mes'] = "Заявка отправлена";
    }else{
        $data['status'] = "NO";
        $data['mes'] = "Произошла ошибка";
    }
    echo json_encode($data);

?>