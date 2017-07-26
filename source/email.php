<?php
define('EMAIL', 'tomaszgil@hotmail.com');

try {
  // read request data
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];
  $ip = $_SERVER['REMOTE_ADDR'];

  // check if fields are not empty
  if (empty($email) or empty($message)) {
    throw new Exception('These fields are required!', 422);
  }

  // validate email
  if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    throw new Exception('Enter a correct email address!', 422);
  }

  // send the message
  $ok = mail(EMAIL, $name, $message, "Reply-To: $email\r\n");
  if (!$ok) {
    throw new Exception('Failed to deliver your message!', 500);
  }
} catch (Throwable $err) {
  $code = $e->getCode();
  if ($code < 400 or $code > 599) {
    $code = 500;
  }
  http_response_code($code);
  exit($e->getMessage());
}

echo 'OK';
?>
