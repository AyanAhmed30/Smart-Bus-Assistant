-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 23, 2025 at 09:15 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smartbus_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add content type', 4, 'add_contenttype'),
(14, 'Can change content type', 4, 'change_contenttype'),
(15, 'Can delete content type', 4, 'delete_contenttype'),
(16, 'Can view content type', 4, 'view_contenttype'),
(17, 'Can add session', 5, 'add_session'),
(18, 'Can change session', 5, 'change_session'),
(19, 'Can delete session', 5, 'delete_session'),
(20, 'Can view session', 5, 'view_session'),
(21, 'Can add user', 6, 'add_user'),
(22, 'Can change user', 6, 'change_user'),
(23, 'Can delete user', 6, 'delete_user'),
(24, 'Can view user', 6, 'view_user'),
(25, 'Can add bus', 7, 'add_bus'),
(26, 'Can change bus', 7, 'change_bus'),
(27, 'Can delete bus', 7, 'delete_bus'),
(28, 'Can view bus', 7, 'view_bus'),
(29, 'Can add route', 8, 'add_route'),
(30, 'Can change route', 8, 'change_route'),
(31, 'Can delete route', 8, 'delete_route'),
(32, 'Can view route', 8, 'view_route'),
(33, 'Can add schedule', 9, 'add_schedule'),
(34, 'Can change schedule', 9, 'change_schedule'),
(35, 'Can delete schedule', 9, 'delete_schedule'),
(36, 'Can view schedule', 9, 'view_schedule'),
(37, 'Can add fare', 10, 'add_fare'),
(38, 'Can change fare', 10, 'change_fare'),
(39, 'Can delete fare', 10, 'delete_fare'),
(40, 'Can view fare', 10, 'view_fare'),
(41, 'Can add complaint', 11, 'add_complaint'),
(42, 'Can change complaint', 11, 'change_complaint'),
(43, 'Can delete complaint', 11, 'delete_complaint'),
(44, 'Can view complaint', 11, 'view_complaint'),
(45, 'Can add notification', 12, 'add_notification'),
(46, 'Can change notification', 12, 'change_notification'),
(47, 'Can delete notification', 12, 'delete_notification'),
(48, 'Can view notification', 12, 'view_notification');

-- --------------------------------------------------------

--
-- Table structure for table `buses_bus`
--

CREATE TABLE `buses_bus` (
  `id` bigint(20) NOT NULL,
  `bus_number` varchar(50) NOT NULL,
  `plate_number` varchar(50) NOT NULL,
  `capacity` int(11) NOT NULL,
  `current_occupancy` varchar(10) NOT NULL,
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buses_bus`
--

INSERT INTO `buses_bus` (`id`, `bus_number`, `plate_number`, `capacity`, `current_occupancy`, `is_active`) VALUES
(6, '7 star', 'KBG-5342', 32, 'Medium', 1),
(7, 'R-1', 'LAR-9254', 50, 'Full', 1),
(8, 'R-55', 'KLD-5072', 40, 'Empty', 1);

-- --------------------------------------------------------

--
-- Table structure for table `complaints_complaint`
--

CREATE TABLE `complaints_complaint` (
  `id` bigint(20) NOT NULL,
  `description` longtext NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `bus_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `complaints_complaint`
--

INSERT INTO `complaints_complaint` (`id`, `description`, `status`, `created_at`, `bus_id`, `user_id`) VALUES
(5, 'Galiya de raha tha', 'Pending', '2025-06-20 03:33:38.106789', 6, 3),
(6, 'fuck', 'Resolved', '2025-06-20 22:11:23.979120', 6, 5);

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(7, 'buses', 'bus'),
(11, 'complaints', 'complaint'),
(4, 'contenttypes', 'contenttype'),
(10, 'fares', 'fare'),
(12, 'notifications', 'notification'),
(8, 'routes', 'route'),
(9, 'schedules', 'schedule'),
(5, 'sessions', 'session'),
(6, 'users', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2025-06-16 22:31:00.376814'),
(2, 'contenttypes', '0002_remove_content_type_name', '2025-06-16 22:31:00.516967'),
(3, 'auth', '0001_initial', '2025-06-16 22:31:01.254266'),
(4, 'auth', '0002_alter_permission_name_max_length', '2025-06-16 22:31:01.382134'),
(5, 'auth', '0003_alter_user_email_max_length', '2025-06-16 22:31:01.398885'),
(6, 'auth', '0004_alter_user_username_opts', '2025-06-16 22:31:01.440699'),
(7, 'auth', '0005_alter_user_last_login_null', '2025-06-16 22:31:01.461137'),
(8, 'auth', '0006_require_contenttypes_0002', '2025-06-16 22:31:01.480720'),
(9, 'auth', '0007_alter_validators_add_error_messages', '2025-06-16 22:31:01.500504'),
(10, 'auth', '0008_alter_user_username_max_length', '2025-06-16 22:31:01.544379'),
(11, 'auth', '0009_alter_user_last_name_max_length', '2025-06-16 22:31:01.568375'),
(12, 'auth', '0010_alter_group_name_max_length', '2025-06-16 22:31:01.598758'),
(13, 'auth', '0011_update_proxy_permissions', '2025-06-16 22:31:01.615839'),
(14, 'auth', '0012_alter_user_first_name_max_length', '2025-06-16 22:31:01.624805'),
(15, 'users', '0001_initial', '2025-06-16 22:31:02.541301'),
(16, 'admin', '0001_initial', '2025-06-16 22:31:02.984630'),
(17, 'admin', '0002_logentry_remove_auto_add', '2025-06-16 22:31:03.011847'),
(18, 'admin', '0003_logentry_add_action_flag_choices', '2025-06-16 22:31:03.059110'),
(19, 'sessions', '0001_initial', '2025-06-16 22:31:03.136145'),
(20, 'users', '0002_alter_user_name_alter_user_password', '2025-06-16 22:39:42.766133'),
(21, 'buses', '0001_initial', '2025-06-16 22:53:36.759793'),
(22, 'routes', '0001_initial', '2025-06-16 23:07:24.802729'),
(23, 'schedules', '0001_initial', '2025-06-16 23:16:31.234438'),
(24, 'fares', '0001_initial', '2025-06-16 23:24:34.073241'),
(25, 'complaints', '0001_initial', '2025-06-16 23:34:12.308004'),
(26, 'notifications', '0001_initial', '2025-06-16 23:43:45.596837');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('a1v9hrp32tgbyn9it0emlex8h7hdpx1x', '.eJxVjMsOwiAUBf-FtSGlBLi4dO83EO6jUjU0Ke3K-O9K0oVuz8ycl0p530ram6xpZnVWRp1-N8z0kNoB33O9LZqWuq0z6q7ogzZ9XViel8P9Oyi5lW9N4CcPgSYbInqWKCLBO4mR2A3AaMka3x0cXWSDRKODAQKgZchOvT_6fzg3:1uRJ1O:wCq8SvtUJImbEnd9sE4MdG7XHyAZlQBXxOP2Jrr2Tlk', '2025-06-30 23:13:46.576767'),
('jw32bu2mgoy6mc9cayb6kibr01kz969o', '.eJxVjMsOwiAUBf-FtSGlBLi4dO83EO6jUjU0Ke3K-O9K0oVuz8ycl0p530ram6xpZnVWRp1-N8z0kNoB33O9LZqWuq0z6q7ogzZ9XViel8P9Oyi5lW9N4CcPgSYbInqWKCLBO4mR2A3AaMka3x0cXWSDRKODAQKgZchOvT_6fzg3:1uRIcs:v9ItLCvFfXVqN-hdG3VAeZJvegMKtx2nPK-eToTjYNQ', '2025-06-30 22:48:26.879936');

-- --------------------------------------------------------

--
-- Table structure for table `fares_fare`
--

CREATE TABLE `fares_fare` (
  `id` bigint(20) NOT NULL,
  `fare_amount` double NOT NULL,
  `route_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fares_fare`
--

INSERT INTO `fares_fare` (`id`, `fare_amount`, `route_id`) VALUES
(6, 50, 7),
(7, 40, 8),
(8, 60, 9),
(9, 80, 10);

-- --------------------------------------------------------

--
-- Table structure for table `notifications_notification`
--

CREATE TABLE `notifications_notification` (
  `id` bigint(20) NOT NULL,
  `message` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications_notification`
--

INSERT INTO `notifications_notification` (`id`, `message`, `created_at`) VALUES
(1, 'Your Bus 7A will depart at 9:00 AM', '2025-06-16 23:45:49.606022'),
(2, 'Bhai Kiraya Barh Gaya hai sbka University Road ka', '2025-06-18 22:16:48.191507'),
(3, 'Chutti h Kl', '2025-06-20 03:30:56.069421');

-- --------------------------------------------------------

--
-- Table structure for table `routes_route`
--

CREATE TABLE `routes_route` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `start_point` varchar(100) NOT NULL,
  `end_point` varchar(100) NOT NULL,
  `total_distance_km` double NOT NULL,
  `estimated_time_min` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `routes_route`
--

INSERT INTO `routes_route` (`id`, `name`, `start_point`, `end_point`, `total_distance_km`, `estimated_time_min`) VALUES
(7, 'Ned', 'Model', 'Uni road', 13, 20),
(8, 'Millenium Mall', 'Indus Mehran', 'Jauhar', 16, 20),
(9, 'Nipa', 'Khokrapar', 'Gulshan Block 1', 25, 25),
(10, 'Orangi Town', 'Kala Board', 'Banaras', 40, 30);

-- --------------------------------------------------------

--
-- Table structure for table `schedules_schedule`
--

CREATE TABLE `schedules_schedule` (
  `id` bigint(20) NOT NULL,
  `departure_time` time(6) NOT NULL,
  `weekdays` varchar(100) NOT NULL,
  `bus_id` bigint(20) NOT NULL,
  `route_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedules_schedule`
--

INSERT INTO `schedules_schedule` (`id`, `departure_time`, `weekdays`, `bus_id`, `route_id`) VALUES
(4, '07:30:00.000000', 'Mon-Fri', 6, 10),
(5, '08:30:00.000000', 'Mon-Fri', 7, 8);

-- --------------------------------------------------------

--
-- Table structure for table `users_user`
--

CREATE TABLE `users_user` (
  `id` bigint(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(254) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_user`
--

INSERT INTO `users_user` (`id`, `password`, `last_login`, `is_superuser`, `name`, `email`, `phone`, `is_active`, `is_staff`, `is_admin`) VALUES
(1, 'pbkdf2_sha256$600000$7braPl3OISfj9d3F9pZ0Wx$uQUcrD9m3ibyKQ+6ahu5tYS4t618/vdWNL0m68bxlUs=', '2025-06-16 23:13:46.568768', 1, 'admin', 'admin@gmail.com', '03102935352', 1, 1, 1),
(2, 'pbkdf2_sha256$600000$0zQpI4faheBI7XutJnBRAs$xUIw50eZIoQLc3MJMrKkSujIwSqhrXyKAWDmNigZQ6M=', NULL, 0, 'Ali Ahmed', 'ali@gmail.com', '03111234567', 1, 0, 0),
(3, 'pbkdf2_sha256$600000$nb4mk8pkZHgyiiVurbIVh7$7AZOwjOmM2bXa30SP/WlFqHkS/bf+eNxxe7qkMFMAKY=', NULL, 0, 'Hafiz Ayan Ahmed', 'ayan3092003@gmail.com', '03102935352', 1, 0, 0),
(4, 'pbkdf2_sha256$600000$s0FcBZjSoOAAYDhvla7PDe$I4ypOD3zAbzpwabDU8xjUqc7U6EMhYATVKWD7bt+xd0=', NULL, 0, 'Hafiz Ayan Ahmed', 'ayan309200@gmail.com', '3102935352', 1, 0, 0),
(5, 'pbkdf2_sha256$600000$owEUeFAlI1qVCwaJUeaNaP$s6J0r6AAToMMDAb2B+H/COELv7aFhtgqa/jIJJ/V3jU=', NULL, 0, 'Mustafa Zuberi', 'zuberi@gmail.com', '03102935351', 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users_user_groups`
--

CREATE TABLE `users_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_user_user_permissions`
--

CREATE TABLE `users_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `buses_bus`
--
ALTER TABLE `buses_bus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `complaints_complaint`
--
ALTER TABLE `complaints_complaint`
  ADD PRIMARY KEY (`id`),
  ADD KEY `complaints_complaint_bus_id_526b9b55_fk_buses_bus_id` (`bus_id`),
  ADD KEY `complaints_complaint_user_id_fbe61a45_fk_users_user_id` (`user_id`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_users_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `fares_fare`
--
ALTER TABLE `fares_fare`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fares_fare_route_id_5566524a_fk_routes_route_id` (`route_id`);

--
-- Indexes for table `notifications_notification`
--
ALTER TABLE `notifications_notification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `routes_route`
--
ALTER TABLE `routes_route`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedules_schedule`
--
ALTER TABLE `schedules_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schedules_schedule_bus_id_953776a8_fk_buses_bus_id` (`bus_id`),
  ADD KEY `schedules_schedule_route_id_7a5ca15f_fk_routes_route_id` (`route_id`);

--
-- Indexes for table `users_user`
--
ALTER TABLE `users_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users_user_groups`
--
ALTER TABLE `users_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_user_groups_user_id_group_id_b88eab82_uniq` (`user_id`,`group_id`),
  ADD KEY `users_user_groups_group_id_9afc8d0e_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `users_user_user_permissions`
--
ALTER TABLE `users_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_user_user_permissions_user_id_permission_id_43338c45_uniq` (`user_id`,`permission_id`),
  ADD KEY `users_user_user_perm_permission_id_0b93982e_fk_auth_perm` (`permission_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `buses_bus`
--
ALTER TABLE `buses_bus`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `complaints_complaint`
--
ALTER TABLE `complaints_complaint`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `fares_fare`
--
ALTER TABLE `fares_fare`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `notifications_notification`
--
ALTER TABLE `notifications_notification`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `routes_route`
--
ALTER TABLE `routes_route`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `schedules_schedule`
--
ALTER TABLE `schedules_schedule`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users_user`
--
ALTER TABLE `users_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users_user_groups`
--
ALTER TABLE `users_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_user_user_permissions`
--
ALTER TABLE `users_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `complaints_complaint`
--
ALTER TABLE `complaints_complaint`
  ADD CONSTRAINT `complaints_complaint_bus_id_526b9b55_fk_buses_bus_id` FOREIGN KEY (`bus_id`) REFERENCES `buses_bus` (`id`),
  ADD CONSTRAINT `complaints_complaint_user_id_fbe61a45_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`);

--
-- Constraints for table `fares_fare`
--
ALTER TABLE `fares_fare`
  ADD CONSTRAINT `fares_fare_route_id_5566524a_fk_routes_route_id` FOREIGN KEY (`route_id`) REFERENCES `routes_route` (`id`);

--
-- Constraints for table `schedules_schedule`
--
ALTER TABLE `schedules_schedule`
  ADD CONSTRAINT `schedules_schedule_bus_id_953776a8_fk_buses_bus_id` FOREIGN KEY (`bus_id`) REFERENCES `buses_bus` (`id`),
  ADD CONSTRAINT `schedules_schedule_route_id_7a5ca15f_fk_routes_route_id` FOREIGN KEY (`route_id`) REFERENCES `routes_route` (`id`);

--
-- Constraints for table `users_user_groups`
--
ALTER TABLE `users_user_groups`
  ADD CONSTRAINT `users_user_groups_group_id_9afc8d0e_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `users_user_groups_user_id_5f6f5a90_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`);

--
-- Constraints for table `users_user_user_permissions`
--
ALTER TABLE `users_user_user_permissions`
  ADD CONSTRAINT `users_user_user_perm_permission_id_0b93982e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `users_user_user_permissions_user_id_20aca447_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
