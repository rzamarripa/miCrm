<?php
// use actual sendgrid username and password in this section
//echo '<pre>';print_r($_POST);echo '</pre>';
$url = 'https://api.sendgrid.com/'; 
$user = 'masoft'; // place SG username here
$pass = 'masoft2013'; // place SG password here
// grabs HTML form's post data; if you customize the form.html parameters then you will need to reference their new new names here
$objetivo = $_POST['country'];
$aprender = $_POST['aprender'];
$estudiar = $_POST['estudiar'];
$message = $_POST['info'];
$name = $_POST['fname']; 
$fecha = $_POST['ffecha'];
$email = $_POST['email']; 
$tel = $_POST['phone']; 
// note the above parameters now referenced in the 'subject', 'html', and 'text' sections
// make the to email be your own address or where ever you would like the contact form info sent
$params = array(
    'api_user'  => "$user",
    'api_key'   => "$pass",
    'to'        => "juancarlos_r11@hotmail.com", // set TO address to have the contact form's email content sent to
    'subject'   => "Prospecto Casserole", // Either give a subject for each submission, or set to $subject
    'html'      => "<html><head><title> Contact Form</title><body>
		Objetivo en Casserole: $objetivo\n<br>
		Que Quiero Aprender: $aprender\n<br>
		Que quiero Estudiar: $estudiar\n<br>
    Message: $message\n<br>
    Nombre: $name\n<br>
    Correo: $email\n<br>
    Telefono: $tel\n<br>
<body></title></head></html>", // Set HTML here.  Will still need to make sure to reference post data names
    'from'      => "carlos.masoft@gmail.com", // set from address here, it can really be anything
  );
curl_setopt($curl, CURLOPT_SSLVERSION, CURL_SSLVERSION_TLSv1_2);
$request =  $url.'api/mail.send.json';
// Generate curl request
$session = curl_init($request);
// Tell curl to use HTTP POST
curl_setopt ($session, CURLOPT_POST, true);
// Tell curl that this is the body of the POST
curl_setopt ($session, CURLOPT_POSTFIELDS, $params);
// Tell curl not to return headers, but do return the response
curl_setopt($session, CURLOPT_HEADER, false);
curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
// obtain response
$response = curl_exec($session);
curl_close($session);
// Redirect to thank you page upon successfull completion, will want to build one if you don't alreday have one available
/* header('Location: thanks.html'); */ // feel free to use whatever title you wish for thank you landing page, but will need to reference that file name in place of the present 'thanks.html'
exit();
// print everything out
print_r($response);
?>