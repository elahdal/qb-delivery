CREATE TABLE IF NOT EXISTS delivery_data (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    payment_amount DECIMAL(10,2) NOT NULL
);