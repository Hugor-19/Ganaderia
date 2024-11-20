-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-11-2024 a las 18:36:15
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ganaderia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `image`, `created_at`) VALUES
(1, 'Toro', 10.00, 'Simmental', 'img/work1.jpg', '2024-11-19 08:11:40'),
(2, 'Vaca', 20.00, 'Simmental', 'img/work2.jpg', '2024-11-19 08:11:40'),
(3, 'Ternero', 30.00, 'Simmental', 'img/work3.jpg', '2024-11-19 08:11:40'),
(4, 'Ternera', 40.00, 'Simmental', 'img/work4.jpg', '2024-11-19 08:11:40'),
(5, 'Novillas', 50.00, 'Simmental', 'img/work5.jpg', '2024-11-19 08:11:40'),
(6, 'Novillos', 50.00, 'Simmental', 'img/work6.jpg', '2024-11-19 08:11:40'),
(7, 'Vaca', 40.00, 'Simmental', 'img/work7.jpg', '2024-11-19 08:11:40'),
(8, 'Novillas', 30.00, 'Simmental', 'img/work8.jpg', '2024-11-19 08:11:40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchases`
--

CREATE TABLE `purchases` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `purchase_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `purchases`
--

INSERT INTO `purchases` (`id`, `name`, `email`, `address`, `payment_method`, `product_id`, `quantity`, `total_price`, `purchase_date`) VALUES
(1, 'Pepe Jiménez ', 'prueba@gmail.com', 'cra 96b # 38 ', 'credit_card', 1, 1, 10.00, '2024-11-20 14:29:26'),
(2, 'Hugo Rodríguez ', 'hugoarj19@gmail.com', 'cra 96b # 38 ', 'debit_card', 2, 3, 60.00, '2024-11-20 14:30:13'),
(3, 'Alonso Pérez', 'prueba@gmail.com', 'cra 96b # 38  sur', 'bank_transfer', 4, 2, 80.00, '2024-11-20 14:31:43'),
(4, 'Juan Gonzalez', 'juang24@gmail.com', 'cra 96b # 38  sur', 'debit_card', 6, 12, 600.00, '2024-11-20 14:33:05'),
(5, 'Hugo Rodríguez ', 'hugoarj19@gmail.com', 'cra 96b # 38 ', 'debit_card', 3, 1, 30.00, '2024-11-20 16:50:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `created_at`) VALUES
(1, 'prueba', 'prueba@gmail.com', '12345', '2024-11-18 23:17:16'),
(2, 'Hugo Rodríguez ', 'hugoarj19@gmail.com', '123456', '2024-11-18 23:28:46');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
