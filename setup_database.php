<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Database Setup</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 2rem auto; padding: 1rem; }
        .success { background: #d4edda; color: #155724; padding: 1rem; border-radius: 5px; margin: 1rem 0; }
        .error { background: #f8d7da; color: #721c24; padding: 1rem; border-radius: 5px; margin: 1rem 0; }
        .btn { background: #007bff; color: white; padding: 0.8rem 1.5rem; border: none; border-radius: 5px; cursor: pointer; text-decoration: none; display: inline-block; }
    </style>
</head>
<body>
    <h1>🗄️ Database Setup</h1>
    
    <?php
    if (isset($_POST['setup'])) {
        try {
            // Connect to MySQL without database
            $pdo = new PDO("mysql:host=localhost", "root", "");
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            // Read and execute SQL file
            $sql = file_get_contents('database_setup.sql');
            $statements = explode(';', $sql);
            
            foreach ($statements as $statement) {
                $statement = trim($statement);
                if (!empty($statement)) {
                    $pdo->exec($statement);
                }
            }
            
            echo '<div class="success">✅ Database setup completed successfully!</div>';
            echo '<p><a href="index.html" class="btn">Go to Store</a> <a href="admin.html" class="btn">Go to Admin</a></p>';
            
        } catch (Exception $e) {
            echo '<div class="error">❌ Error: ' . $e->getMessage() . '</div>';
        }
    } else {
    ?>
    
    <div style="background: #fff3cd; padding: 1rem; border-radius: 5px; margin: 1rem 0;">
        <h3>📋 Setup Instructions</h3>
        <ol>
            <li>Make sure XAMPP is running (Apache + MySQL)</li>
            <li>Click "Setup Database" button below</li>
            <li>Database and tables will be created automatically</li>
            <li>Sample products will be added</li>
        </ol>
    </div>
    
    <form method="POST">
        <button type="submit" name="setup" class="btn">🚀 Setup Database</button>
    </form>
    
    <div style="background: #f8f9fa; padding: 1rem; border-radius: 5px; margin: 2rem 0;">
        <h3>📊 What will be created:</h3>
        <ul>
            <li><strong>Database:</strong> grocery_store</li>
            <li><strong>Tables:</strong> products, orders, order_items, admin_users</li>
            <li><strong>Admin User:</strong> admin / admin123</li>
            <li><strong>Sample Products:</strong> 6 items across all categories</li>
        </ul>
    </div>
    
    <?php } ?>
</body>
</html>