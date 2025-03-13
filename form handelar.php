
<?php
// Get form data
$name = $_POST['name'];
$visitor_email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

// Sender's email
$email_from = 'https://partho-acharya.github.io/Bright-Sparks/contactUs.html';
$email_subject = 'New form submission';
$email_body = "User Name: $name\n" .
              "User Email: $visitor_email\n" .
              "Subject: $subject\n" .
              "Message: $message\n";

// Recipient email
$to = 'brightsparks299@gmail.com';

// Headers
$headers = "From: $email_from \r\n";
$headers .= "Reply-To: $visitor_email \r\n";

// Send email
mail($to, $email_subject, $email_body, $headers);

// Redirect to contact form page
header("Location: contactUs.html");
exit();
?>
