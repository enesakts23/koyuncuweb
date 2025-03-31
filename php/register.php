<?php
header('Content-Type: application/json');

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
    
    // Validate required fields
    $required_fields = ['adSoyad', 'email', 'telefon', 'sifre', 'sifreTekrar'];
    foreach ($required_fields as $field) {
        if (empty($data[$field])) {
            throw new Exception('Tüm alanları doldurunuz.');
        }
    }

    // Validate email format
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Geçerli bir email adresi giriniz.');
    }

    // Validate phone number format (Turkish format)
    if (!preg_match('/^[0-9]{10,11}$/', preg_replace('/[^0-9]/', '', $data['telefon']))) {
        throw new Exception('Geçerli bir telefon numarası giriniz.');
    }

    // Check if passwords match
    if ($data['sifre'] !== $data['sifreTekrar']) {
        throw new Exception('Şifreler eşleşmiyor.');
    }

    // Check if email already exists
    $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE email = :email");
    $stmt->execute(['email' => $data['email']]);
    if ($stmt->fetchColumn() > 0) {
        throw new Exception('Bu email adresi zaten kayıtlı.');
    }

    // Hash password
    $hashedPassword = password_hash($data['sifre'], PASSWORD_BCRYPT);

    // Format phone number
    $telefon = preg_replace('/[^0-9]/', '', $data['telefon']);
    if (strlen($telefon) === 10) {
        $telefon = '0' . $telefon;
    }

    // Insert new user
    $stmt = $conn->prepare("
        INSERT INTO users (Ad_Soyad, email, telefon, sifre, sifre_tekrar, yetki, ek_yetkiler) 
        VALUES (:adSoyad, :email, :telefon, :sifre, :sifreTekrar, 'Operasyon Sorumlusu', NULL)
    ");

    $stmt->execute([
        'adSoyad' => $data['adSoyad'],
        'email' => $data['email'],
        'telefon' => $telefon,
        'sifre' => $hashedPassword,
        'sifreTekrar' => $hashedPassword
    ]);

    echo json_encode([
        'success' => true,
        'message' => 'Kayıt başarıyla tamamlandı. Giriş yapabilirsiniz.'
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?> 