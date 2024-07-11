-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 04, 2024 at 03:02 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `uas_pemro_3`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id_brand` char(4) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id_brand`, `name`) VALUES
('AJZ', 'Ajazz'),
('ASUS', 'Asus'),
('GBYT', 'Gigabyte'),
('HYPX', 'Hyper X'),
('JBL', 'JBL'),
('KOOR', 'Koorui'),
('LOG', 'Logitech'),
('NYK', 'NYK '),
('REX', 'Rexus'),
('SCLB', 'Secret Lab'),
('SMSG', 'Samsung');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id_category` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id_category`, `name`) VALUES
(1, 'Keyboard'),
(2, 'Mouse'),
(3, 'Monitor'),
(7, 'Headset'),
(13, 'Joysticks'),
(14, 'Storage'),
(15, 'Webcam'),
(16, 'Lighting'),
(17, 'Cooling Fan'),
(18, 'Gaming Chairs'),
(19, 'Graphic Card'),
(20, 'Speaker');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id_product` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category` int(11) NOT NULL,
  `brand` char(4) NOT NULL,
  `price` double NOT NULL,
  `description` text NOT NULL,
  `image` tinytext NOT NULL,
  `stocks` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id_product`, `name`, `category`, `brand`, `price`, `description`, `image`, `stocks`) VALUES
(1, 'Logitech G102', 2, 'LOG', 250000, 'G102 terinspirasi oleh desain klasik Logitech G100S Gaming Mouse yang legendaris. Dicintai oleh gamer di seluruh dunia dan favorit para profesional e-sports.', '1718040666153-B636E541608CCF71.jpg', 1),
(9, 'Ajazz AK820 Pro', 1, 'AJZ', 450000, 'Ajazz AK820 Pro offers a combination of innovation and craftsmanship that\'s hard to beat. This 75% compact mechanical keyboard maximize your desk space and enjoy a sleek look with this 75% layout. It\'s also perfectly portable, allowing for seamless typing experiences, delivering a superior typing experience without compromising on features or functionality, wherever you are.', '1718547206389-E1C6BA8795D057F6.jpg', 0),
(10, 'Logitech G Pro', 2, 'LOG', 450000, 'Logitech G bekerja sama dengan lebih dari 50 pemain pro untuk menemukan bentuk, berat, dan nuansa yang sempurna dengan LIGHTSPEED wireless dan sensor HERO 25K. Hasilnya: salah satu mouse yang paling populer di esports.', '1718602200325-E691FA9CED8D2BB0.jpeg', 0),
(12, 'Koorui 24E4', 3, 'KOOR', 1650000, 'The blazing fast 165Hz Refresh Rate displays smooth images, enhancing the overall experience in any game, while providing a crucial advantage in E-Sports.', '1718605999961-902D6DE550B2AF16.jpg', 3),
(20, 'Logitech F710', 13, 'LOG', 399000, 'Daya tahan dan presisi Logitech G tersedia di gamepad. Dapatkan controller ala konsol untuk PC dan mainkan game sesuai keinginanmu.', '1719842537180-3AB12C9F8CC4E138.jpeg', 2),
(21, 'Samsung SSD 870 EVO 1TB', 14, 'SMSG', 780000, 'The 870 EVO achieves the maximum SATA interface limit of 560/530 MB/s sequential speeds. Everyday users can now enjoy professional-level SSD performance. Intelligent TurboWrite accelerates write speeds and maintains long-term high performance with a larger variable buffer.', '1719845500144-B7739F7822F95FD5.jpg', 3),
(22, 'NYK Coolingpad X-3 Winterstorm', 17, 'NYK', 149000, 'NYK Nemesis Cooling Pad Winterstorm X-3. For Laptop up to 15.6\", 2 USB Port, Modern Design, Adjustable Height, 6 Fan with LED, High Speed Fan, High Performance, Ultra Slim, Anti Slip', '1719846310510-BA73DE0636175BC3.png', 2),
(23, 'Logitech C920', 15, 'LOG', 592000, 'C920 delivers remarkably crisp and detailed Full HD video with a full HD glass lens, 78° field of view, and HD auto light correction—plus dual mics for clear stereo sound.', '1719846993091-6859C568D108715B.jpg', 6),
(24, 'SecretLab TITAN Evo NEO', 18, 'SCLB', 8600000, 'Mempersembahkan Secretlab TITAN Evo 2022, kursi kami yang paling mutakhir. Mengusung keunggulan teknologi dan sains dalam desain, kami memadukan yang terbaik dari Secretlab OMEGA dan TITAN dalam satu kursi.', '1719847875578-49DBE283A960F582.jpg', 3),
(25, 'Logitech Z121', 20, 'LOG', 150000, 'Logitech Z121 adalah speaker stereo portabel yang dirancang untuk penggunaan komputer dan perangkat multimedia. Speaker ini memiliki desain yang sederhana dan ringkas, membuatnya mudah ditempatkan di berbagai ruang kerja.', '1719850723373-C7D314800EA3E7D9.jpeg', 8),
(26, 'VGA Gigabyte GTX 1050Ti', 19, 'GBYT', 2100000, 'VGA KEREN ANJAY MABAR PUNYANYA DIMAS KESAMBER GLEDEK DUAR MATI LISTRIK HAYOLO BELI BARU AJA SEKALIAN GA SIH DARIPADA DUAR ANJAY MABAR', '1720020106001-F7CD04C814DAF9C3.png', 8);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id_transactions` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `id_product` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `date` date NOT NULL,
  `status` enum('Pending','Processing','Completed','Cancelled') NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id_transactions`, `username`, `id_product`, `quantity`, `total_price`, `date`, `status`) VALUES
(15, 'usertest', 1, 3, 855000, '2024-06-04', 'Completed'),
(16, 'usertest', 1, 1, 285000, '2024-06-11', 'Processing'),
(17, 'usertest', 1, 1, 285000, '2024-06-09', 'Pending'),
(19, 'usertest', 9, 1, 450000, '2024-06-10', 'Processing'),
(20, 'andre', 12, 1, 1650000, '2024-06-12', 'Pending'),
(23, 'usertest', 9, 1, 450000, '2024-06-29', 'Pending'),
(24, 'usertest', 9, 1, 450000, '2024-06-29', 'Processing'),
(25, 'usertest', 1, 1, 285000, '2024-06-30', 'Pending'),
(26, 'usertest', 1, 1, 285000, '2024-06-30', 'Pending'),
(30, 'user', 20, 1, 399000, '2024-07-01', 'Pending'),
(31, 'user', 20, 1, 399000, '2024-07-01', 'Cancelled'),
(32, 'user', 10, 1, 450000, '2024-07-01', 'Completed'),
(33, 'user', 1, 1, 285000, '2024-07-01', 'Processing'),
(34, 'user', 22, 1, 149000, '2024-07-01', 'Pending'),
(35, 'user', 9, 1, 450000, '2024-07-03', 'Pending'),
(36, 'user', 26, 1, 2100000, '2024-07-03', 'Pending'),
(37, 'user', 12, 1, 1650000, '2024-07-03', 'Pending'),
(38, 'user', 20, 1, 399000, '2024-07-03', 'Pending'),
(39, 'wendy', 12, 2, 3300000, '2024-07-03', 'Pending'),
(40, 'andre', 26, 1, 2100000, '2024-07-04', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(32) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` tinyint(4) NOT NULL DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `full_name`, `email`, `phone`, `password`, `role`) VALUES
('admin', 'Admin 2', 'admin2@mail.com', '081532811027', '$2b$10$KzyvZTpaTcSO6eP/F8oYbuPDrfmh8JNmRqkZSPB6Ngg4Qf9oZSXmi', 1),
('andre', 'Andre Edyson', 'andre@mail.com', '081367172191', '$2b$10$tuuZ/n4pSe7BEiQd4KvudeXw0qaf1i95U8WkduuD5Cu1JSx2l.irq', 1),
('user', 'user', 'user@test.com', '011121212', '$2b$10$.S7l//OSjcrvCa5PZBk3k.f6nHdmzGgWg5RtvT.YFBxxvGYpr3Tty', 2),
('usertest', 'userTestEdit', 'user@mail.com', '081278119187', '$2b$10$DXhtw4q./vLDixCm6/izzOfbtGYS6QkC.Nvo0fQkyNfay8NsMaSAS', 2),
('wendy', 'Wendy Wiranata', 'wendy@mail.com', '31231312', '$2b$10$FeZ/YoeccJDWqQ0zlX91xukyRqef8XEYj/PL636do/.8rAY9dyoYu', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id_brand`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_category`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `category` (`category`),
  ADD KEY `brand` (`brand`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id_transactions`),
  ADD KEY `username` (`username`),
  ADD KEY `id_product` (`id_product`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id_transactions` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category`) REFERENCES `categories` (`id_category`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`brand`) REFERENCES `brands` (`id_brand`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`),
  ADD CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
