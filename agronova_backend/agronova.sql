CREATE DATABASE IF NOT EXISTS agronova;

USE agronova;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    firstname VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('agriculteur', 'consommateur')
);

CREATE TABLE IF NOT EXISTS Product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    prix DECIMAL(10, 2),
    agriculteur_id INT,
    FOREIGN KEY (agriculteur_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS localisation
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    country_name VARCHAR (250) NOT NULL,
    city VARCHAR (250) NOT NULL,
    quarter VARCHAR (200) NOT NULL
);

CREATE TABLE IF NOT EXISTS Commands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    quantity_id INT,
    prix DECIMAL(10, 2),
    date_command DATETIME DEFAULT CURRENT_TIMESTAMP,
    client_id INT,
    FOREIGN KEY (product_id) REFERENCES Product(id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS STATS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    agriculteur_id INT,
    ventes_id INT,
    performances VARCHAR(100),
    FOREIGN KEY (agriculteur_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PRICES (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prix DECIMAL(10, 2)
);
