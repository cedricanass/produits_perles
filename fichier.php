<?php
$host = "localhost";
$dbname = "ecommerce";
$pdo = new PDO("myql:host=$host; dbname=$dbname", $username, $password);
$password = "cedricpetit";
try {
    $pdo = new PDO("myql:host=$host; dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connexion réussie à la base de données";
} catch (PDOException $e) {
    echo "Erreur de connexion:" . $e->getMessage();
}

?>
<?php
// Connexion à la base de données
include 'db_connection.php';

// Récupérer les produits
$query = "SELECT * FROM products";
$stmt = $pdo->query($query);

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "<div class='product'>";
    echo "<img src='images/" . $row['image'] . "' alt='" . $row['name'] . "'>";
    echo "<h2>" . $row['name'] . "</h2>";
    echo "<p>" . $row['description'] . "</p>";
    echo "<p>Prix : " . $row['price'] . " FCFA</p>";
    echo "<button onclick='addToCart(" . $row['id'] . ")'>Ajouter au panier</button>";
    "</div>";
}
?>
<?php
session_start();
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $product_id = $_POST['product_id'];
    $user_id = $_SESSION['user_id'];
    $quantity = 1;

    // Vérifier si le produit est déjà dans le panier
    $query = "SELECT * FROM cart WHERE user_id = ? AND product_id = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$user_id, $product_id]);

    if ($stmt->rowCount() > 0) {
        // Mettre à jour la quantité
        $query = "UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$user_id, $product_id]);
    } else {
        // Ajouter au panier
        $query = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$user_id, $product_id, $quantity]);
    }

    echo "Produit ajouté au panier";
}
?>