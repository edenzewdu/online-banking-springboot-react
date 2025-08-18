-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: online_banking
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bankaccount`
--

DROP TABLE IF EXISTS `bankaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bankaccount` (
  `accountno` bigint NOT NULL,
  `accountType` varchar(50) DEFAULT NULL,
  `dateCreated` varchar(50) DEFAULT NULL,
  `timeCreated` varchar(50) DEFAULT NULL,
  `balance` double DEFAULT NULL,
  `isactive` tinyint(1) DEFAULT NULL,
  `user_userid` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`accountno`),
  KEY `fk_bankaccount_user` (`user_userid`),
  CONSTRAINT `fk_bankaccount_user` FOREIGN KEY (`user_userid`) REFERENCES `userdata` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bankaccount`
--

LOCK TABLES `bankaccount` WRITE;
/*!40000 ALTER TABLE `bankaccount` DISABLE KEYS */;
/*!40000 ALTER TABLE `bankaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `beneficiaries`
--

DROP TABLE IF EXISTS `beneficiaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `beneficiaries` (
  `beneficiaryid` int NOT NULL AUTO_INCREMENT,
  `beneficiaryname` varchar(100) DEFAULT NULL,
  `beneaccountno` bigint DEFAULT NULL,
  `relation` varchar(50) DEFAULT NULL,
  `user_userid` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`beneficiaryid`),
  KEY `fk_beneficiaries_user` (`user_userid`),
  CONSTRAINT `fk_beneficiaries_user` FOREIGN KEY (`user_userid`) REFERENCES `userdata` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `beneficiaries`
--

LOCK TABLES `beneficiaries` WRITE;
/*!40000 ALTER TABLE `beneficiaries` DISABLE KEYS */;
/*!40000 ALTER TABLE `beneficiaries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loanaccount`
--

DROP TABLE IF EXISTS `loanaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loanaccount` (
  `loanaccountno` bigint NOT NULL AUTO_INCREMENT,
  `remainingAmount` double DEFAULT NULL,
  `loanAmount` double DEFAULT NULL,
  `loanPurpose` varchar(255) DEFAULT NULL,
  `interest` double DEFAULT NULL,
  `tenureInMonths` int DEFAULT NULL,
  `monthlyEMI` int DEFAULT NULL,
  `user_userid` varchar(50) DEFAULT NULL,
  `bankaccount_accountno` bigint DEFAULT NULL,
  PRIMARY KEY (`loanaccountno`),
  KEY `fk_loanaccount_user` (`user_userid`),
  KEY `fk_loanaccount_bank` (`bankaccount_accountno`),
  CONSTRAINT `fk_loanaccount_bank` FOREIGN KEY (`bankaccount_accountno`) REFERENCES `bankaccount` (`accountno`),
  CONSTRAINT `fk_loanaccount_user` FOREIGN KEY (`user_userid`) REFERENCES `userdata` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loanaccount`
--

LOCK TABLES `loanaccount` WRITE;
/*!40000 ALTER TABLE `loanaccount` DISABLE KEYS */;
/*!40000 ALTER TABLE `loanaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `transactionId` int NOT NULL AUTO_INCREMENT,
  `fromAccount` bigint DEFAULT NULL,
  `sender` double DEFAULT NULL,
  `toAccount` bigint DEFAULT NULL,
  `receiver` double DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `transactionStatus` varchar(50) DEFAULT NULL,
  `transactionDate` varchar(50) DEFAULT NULL,
  `transactionTime` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`transactionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userdata`
--

DROP TABLE IF EXISTS `userdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userdata` (
  `userid` varchar(50) NOT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `createdate` date DEFAULT NULL,
  `resetPasswordToken` varchar(255) DEFAULT NULL,
  `user_image_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userdata`
--

LOCK TABLES `userdata` WRITE;
/*!40000 ALTER TABLE `userdata` DISABLE KEYS */;
/*!40000 ALTER TABLE `userdata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userdetails`
--

DROP TABLE IF EXISTS `userdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userdetails` (
  `userdetailsid` int NOT NULL AUTO_INCREMENT,
  `image` blob,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `pin` varchar(20) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `pan` varchar(50) DEFAULT NULL,
  `gender` char(1) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `age` int DEFAULT NULL,
  `user_userid` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userdetailsid`),
  KEY `fk_userdetails_user` (`user_userid`),
  CONSTRAINT `fk_userdetails_user` FOREIGN KEY (`user_userid`) REFERENCES `userdata` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userdetails`
--

LOCK TABLES `userdetails` WRITE;
/*!40000 ALTER TABLE `userdetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `userdetails` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-17  3:19:29
