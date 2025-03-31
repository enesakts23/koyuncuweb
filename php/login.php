<?php
header('Content-Type: application/json');
session_start();

// Database connection parameters
$host = 'localhost';
$dbname = 'world';
$username = 'root';
$password = '123qwe';

try {
    // Create database connection
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($email) || empty($password)) {
        throw new Exception('Email ve şifre alanları zorunludur.');
    }

    // Prepare and execute query
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['sifre'])) {
        // Login successful
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['Ad_Soyad'];
        $_SESSION['user_email'] = $user['email'];
        $_SESSION['user_role'] = $user['yetki'];
        $_SESSION['user_permissions'] = $user['ek_yetkiler'];

        echo json_encode([
            'success' => true,
            'message' => 'Giriş başarılı!',
            'user' => [
                'name' => $user['Ad_Soyad'],
                'role' => $user['yetki']
            ]
        ]);
    } else {
        // Login failed
        throw new Exception('Geçersiz email veya şifre.');
    }

} catch (Exception $e) {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?> 