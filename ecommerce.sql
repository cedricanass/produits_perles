CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255),
email VARCHAR(255) UNIQUE,
password VARCHAR(255),
role ENUM('client', 'vendeur')
);

CREATE TABLE products(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR (255),
description TEXT,
price DECIMAL(10,2),
image VARCHAR (255),
category ENUM ('sacs','décoration','bijoux')
);

CREATE TABLE cart (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT, 
product_id INT,
quantity INT, 
FOREIGN KEY(users_id ) REFERENCES users(id),
 FOREIGN key (products_id) REFERENCES products(id)
);

CREATE TABLE orders(
id INT AUTO_INCREMENT PRIMARY key,
user_id INT NOT NULL, 
total_price DECIMAL(10, 2) NOT NULL,
order_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
statuts ENUM('en attente''payée''expédiée') NOT NULL,
FOREIGN KEY(users_id) REFERENCES users(id)
);

CREATE TABLE order_details(
id INT AUTO_INCREMENT PRIMARY KEY,
order_id INT NOT NULL, 
product_id INT NOT NULL,
quantity INT NOT NULL,
price DECIMAL(10, 2) NOT NULL,
FOREIGN KEY(order_id) REFERENCES orders(id),
FOREIGN KEY (product_id) REFERENCES products(id)
);