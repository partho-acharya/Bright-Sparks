<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $comment = $_POST['comment'];

    // Set recipient email
    $to = 'brightsparks299@gmail.com';
    $subject = 'New Comment Submitted';
    
    // Set the email body
    $message = "
    <html>
    <head>
        <title>New Comment</title>
    </head>
    <body>
        <h2>New Comment Submission</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Comment:</strong></p>
        <p>$comment</p>
    </body>
    </html>
    ";

    // Set headers for HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: $email" . "\r\n"; // This sets the sender's email (could be any valid email address)

    // Send email
    if (mail($to, $subject, $message, $headers)) {
        echo "Comment posted successfully!";
    } else {
        echo "There was an issue posting your comment.";
    }
}
?>
