-- MySQL dump 10.13  Distrib 8.0.32, for macos12.6 (arm64)
--
-- Host: localhost    Database: schedules
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cafedra_or_section`
--

DROP TABLE IF EXISTS `cafedra_or_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cafedra_or_section` (
  `id_caf_sec` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `work_id` int NOT NULL,
  PRIMARY KEY (`id_caf_sec`),
  KEY `work_id_cafedra_idx` (`work_id`),
  CONSTRAINT `work_id_cafedra` FOREIGN KEY (`work_id`) REFERENCES `work_folder` (`work_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cafedra_or_section`
--

LOCK TABLES `cafedra_or_section` WRITE;
/*!40000 ALTER TABLE `cafedra_or_section` DISABLE KEYS */;
INSERT INTO `cafedra_or_section` VALUES (33,'математика и информатика',71),(34,'русский язык и литература',71),(35,'инностранные языки',71),(36,'общественно-научные предметы',71),(37,'естественно-научные предметы',71),(38,'физкультура и обж',71),(39,'искусство',71),(57,'КСАИТ',73);
/*!40000 ALTER TABLE `cafedra_or_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `classes_id` int NOT NULL AUTO_INCREMENT,
  `direction_id` int NOT NULL,
  `initial_class` varchar(45) NOT NULL,
  `count` int NOT NULL,
  PRIMARY KEY (`classes_id`),
  KEY `cl_fc_idx` (`direction_id`),
  CONSTRAINT `cl_fc` FOREIGN KEY (`direction_id`) REFERENCES `direction` (`direction_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=574 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (160,93,'В',30),(161,93,'Г',28),(162,93,'Д',33),(283,119,'А',30),(284,119,'Б',28),(285,119,'В',33),(286,119,'Г',30),(287,119,'Д',30),(288,120,'А',30),(289,120,'Б',30),(290,120,'В',33),(291,120,'Г',31),(292,120,'Д',30),(293,121,'А',29),(294,121,'Б',28),(295,121,'В',31),(296,121,'Г',29),(297,121,'Д',27),(298,122,'А',30),(299,122,'Б',28),(300,122,'В',33),(301,122,'Г',30),(302,122,'Д',30),(303,123,'А',30),(304,123,'Б',28),(305,123,'В',33),(306,123,'Г',30),(307,124,'А',30),(308,124,'Б',28),(309,124,'В',33),(310,124,'Г',30),(311,125,'А',30),(312,125,'Б',28),(313,125,'В',33),(314,125,'Г',30),(315,126,'А',30),(316,126,'Б',28),(317,126,'В',33),(318,127,'А',30),(319,127,'Б',28),(320,127,'В',33),(321,128,'А',30),(322,128,'Б',28),(323,128,'В',33),(324,129,'А',30),(325,129,'Б',28),(326,129,'В',33),(501,234,'09-301',26),(502,234,'09-302',29),(503,234,'09-303',28),(504,235,'09-311',30),(505,235,'09-312',31),(506,235,'09-313',27),(507,235,'09-314',28),(508,236,'09-321',30),(509,236,'09-322',29),(510,237,'09-331',30),(511,237,'09-332',27),(512,238,'09-341',26),(513,238,'09-342',28),(514,238,'09-343',29),(515,235,'09-351',27),(516,235,'09-352',30),(517,235,'09-353',29),(518,239,'09-361',30),(519,239,'09-362',28),(520,239,'09-363',30),(521,240,'09-201',26),(522,240,'09-202',29),(523,240,'09-203',28),(524,241,'09-211',30),(525,241,'09-212',31),(526,241,'09-213',27),(527,242,'09-221',30),(528,242,'09-222',29),(529,243,'09-231',30),(530,243,'09-232',27),(531,244,'09-241',26),(532,244,'09-242',28),(533,241,'09-251',27),(534,241,'09-252',30),(535,241,'09-253',29),(536,245,'09-261',30),(537,245,'09-262',28),(538,245,'09-263',30),(539,246,'09-101',26),(540,246,'09-102',29),(541,246,'09-103',28),(542,247,'09-111',30),(543,247,'09-112',31),(544,247,'09-113',27),(545,248,'09-121',30),(546,248,'09-122',29),(547,249,'09-131',30),(548,249,'09-132',27),(549,250,'09-141',26),(550,250,'09-142',28),(551,247,'09-151',27),(552,247,'09-152',30),(553,247,'09-153',29),(554,251,'09-161',30),(555,251,'09-162',28),(556,251,'09-163',30),(557,252,'09-001',26),(558,252,'09-002',29),(559,253,'09-011',30),(560,253,'09-012',31),(561,253,'09-013',27),(562,254,'09-021',30),(563,254,'09-022',29),(564,255,'09-031',30),(565,255,'09-032',27),(566,255,'09-033',26),(567,256,'09-041',26),(568,253,'09-051',27),(569,253,'09-052',30),(570,253,'09-053',29),(571,257,'09-061',30),(572,257,'09-062',28),(573,257,'09-063',30);
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `course_id` int NOT NULL AUTO_INCREMENT,
  `course_number` int NOT NULL,
  `work_id` int NOT NULL,
  PRIMARY KEY (`course_id`),
  KEY `wk_fc_idx` (`work_id`),
  KEY `wk_id_cours_idx` (`work_id`),
  CONSTRAINT `wk_fc_1` FOREIGN KEY (`work_id`) REFERENCES `work_folder` (`work_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=206 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (109,1,74),(155,1,71),(156,2,71),(157,3,71),(158,4,71),(159,5,71),(160,6,71),(161,7,71),(162,8,71),(163,9,71),(164,10,71),(165,11,71),(202,1,73),(203,2,73),(204,3,73),(205,4,73);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direction`
--

DROP TABLE IF EXISTS `direction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direction` (
  `direction_id` int NOT NULL AUTO_INCREMENT,
  `course_id` int NOT NULL,
  `name_course` varchar(100) NOT NULL,
  PRIMARY KEY (`direction_id`),
  KEY `courses_fc_idx` (`course_id`),
  CONSTRAINT `courses_fc` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=258 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direction`
--

LOCK TABLES `direction` WRITE;
/*!40000 ALTER TABLE `direction` DISABLE KEYS */;
INSERT INTO `direction` VALUES (93,109,'8'),(119,155,'1'),(120,156,'2'),(121,157,'3'),(122,158,'4'),(123,159,'5'),(124,160,'6'),(125,161,'7'),(126,162,'8'),(127,163,'9'),(128,164,'10'),(129,165,'11'),(234,202,'БИ'),(235,202,'ПМИ'),(236,202,'ПИ'),(237,202,'ФИИТ'),(238,202,'ИБ'),(239,202,'ИСТ'),(240,203,'БИ'),(241,203,'ПМИ'),(242,203,'ПИ'),(243,203,'ФИИТ'),(244,203,'ИБ'),(245,203,'ИСТ'),(246,204,'БИ'),(247,204,'ПМИ'),(248,204,'ПИ'),(249,204,'ФИИТ'),(250,204,'ИБ'),(251,204,'ИСТ'),(252,205,'БИ'),(253,205,'ПМИ'),(254,205,'ПИ'),(255,205,'ФИИТ'),(256,205,'ИБ'),(257,205,'ИСТ');
/*!40000 ALTER TABLE `direction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grafic`
--

DROP TABLE IF EXISTS `grafic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grafic` (
  `time_id` int NOT NULL AUTO_INCREMENT,
  `start` varchar(45) NOT NULL,
  `end` varchar(45) NOT NULL,
  `sch_id` int NOT NULL,
  PRIMARY KEY (`time_id`),
  KEY `wk_id_idx` (`sch_id`),
  CONSTRAINT `wk_id` FOREIGN KEY (`sch_id`) REFERENCES `work_folder` (`work_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=404 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grafic`
--

LOCK TABLES `grafic` WRITE;
/*!40000 ALTER TABLE `grafic` DISABLE KEYS */;
INSERT INTO `grafic` VALUES (250,'8:30','9:15',74),(251,'9:25','10:10',74),(252,'10:20','11:05',74),(253,'11:25','12:10',74),(254,'12:35','13:20',74),(255,'13:25','14:10',74),(256,'14:15','15:00',74),(264,'8:30','9:15',74),(265,'9:25','10:10',74),(266,'10:20','11:05',74),(267,'11:25','12:10',74),(268,'12:35','13:20',74),(269,'13:25','14:10',74),(270,'14:15','15:00',74),(306,'8:30','9:15',71),(307,'9:25','10:10',71),(308,'10:20','11:05',71),(309,'11:25','12:10',71),(310,'12:35','13:20',71),(311,'13:25','14:10',71),(312,'14:15','15:00',71),(397,'8:30','10:00',73),(398,'10:10','11:40',73),(399,'12:10','13:40',73),(400,'13:50','15:20',73),(401,'15:50','17:20',73),(402,'17:30','19:00',73),(403,'19:10','20:40',73);
/*!40000 ALTER TABLE `grafic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `place`
--

DROP TABLE IF EXISTS `place`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `place` (
  `place_id` int NOT NULL AUTO_INCREMENT,
  `work_id` int NOT NULL,
  `fio_teacher` varchar(100) DEFAULT NULL,
  `place_name` varchar(100) NOT NULL,
  `week_day` int DEFAULT NULL,
  `type_place` int DEFAULT NULL,
  `count_seat` int DEFAULT NULL,
  `start_work` varchar(50) DEFAULT NULL,
  `end_work` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`place_id`),
  KEY `work_place_fk_idx` (`work_id`),
  KEY `wekks_place_fk_idx` (`week_day`),
  CONSTRAINT `wekks_place_fk` FOREIGN KEY (`week_day`) REFERENCES `weeks` (`id_week`),
  CONSTRAINT `work_place_fk` FOREIGN KEY (`work_id`) REFERENCES `work_folder` (`work_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1800 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `place`
--

LOCK TABLES `place` WRITE;
/*!40000 ALTER TABLE `place` DISABLE KEYS */;
INSERT INTO `place` VALUES (258,74,'Гайнуллина Алиша Рашидовна','208',NULL,NULL,NULL,NULL,NULL),(519,71,'Кузнецов П. В.','201',NULL,NULL,NULL,NULL,NULL),(520,71,'Головина В. Ю.','202',NULL,NULL,NULL,NULL,NULL),(521,71,'Богомолов Е. Д.','203',NULL,NULL,NULL,NULL,NULL),(522,71,'Васильева М. М.','204',NULL,NULL,NULL,NULL,NULL),(523,71,'Куликов М. А.','205',NULL,NULL,NULL,NULL,NULL),(524,71,'Соболева А. Е.','206',NULL,NULL,NULL,NULL,NULL),(525,71,'Сальников Л. А.','207',NULL,NULL,NULL,NULL,NULL),(526,71,'Власова В. И.','208',NULL,NULL,NULL,NULL,NULL),(527,71,'Королева А. А.','209',NULL,NULL,NULL,NULL,NULL),(528,71,'Парамонова А. Р.','210',NULL,NULL,NULL,NULL,NULL),(529,71,'Муратов Я. Л.','211',NULL,NULL,NULL,NULL,NULL),(530,71,'Третьякова В. П.','212',NULL,NULL,NULL,NULL,NULL),(531,71,'Никонова В. Е.','213',NULL,NULL,NULL,NULL,NULL),(532,71,'Носов Д. А.','214',NULL,NULL,NULL,NULL,NULL),(533,71,'Исаев Н. Ю.','215',NULL,NULL,NULL,NULL,NULL),(534,71,'Чижова П. Д.','216',NULL,NULL,NULL,NULL,NULL),(535,71,'Новикова Е. Д.','217',NULL,NULL,NULL,NULL,NULL),(536,71,'Соловьев И. Я.','218',NULL,NULL,NULL,NULL,NULL),(537,71,'Павлов С. Т.','219',NULL,NULL,NULL,NULL,NULL),(538,71,'Широков А. В.','220',NULL,NULL,NULL,NULL,NULL),(539,71,'Гончаров А. М.','301',NULL,NULL,NULL,NULL,NULL),(540,71,'Сазонова А. Г.','302',NULL,NULL,NULL,NULL,NULL),(541,71,'Афанасьева Ж. Л.','303',NULL,NULL,NULL,NULL,NULL),(542,71,'Калачева Е. С.','304',NULL,NULL,NULL,NULL,NULL),(543,71,'Саханов Р. П.','305',NULL,NULL,NULL,NULL,NULL),(544,71,'Петров В. Д.','306',NULL,NULL,NULL,NULL,NULL),(545,71,'Иванов Е. И.','307',NULL,NULL,NULL,NULL,NULL),(546,71,'Васильева А. П.','308',NULL,NULL,NULL,NULL,NULL),(547,71,'Петрова П. С.','309',NULL,NULL,NULL,NULL,NULL),(548,71,'Баранов М. И.','310',NULL,NULL,NULL,NULL,NULL),(549,71,'Степанов М. И.','311',NULL,NULL,NULL,NULL,NULL),(550,71,'Морозова А. М.','312',NULL,NULL,NULL,NULL,NULL),(551,71,'Волков А. И.','102',NULL,NULL,NULL,NULL,NULL),(552,71,'Дроздов И. Г.','103',NULL,NULL,NULL,NULL,NULL),(553,71,'Шилова У. Б.','104',NULL,NULL,NULL,NULL,NULL),(554,71,'Гришина В. А.','105',NULL,NULL,NULL,NULL,NULL),(555,71,'Кузнецов С. А.','106',NULL,NULL,NULL,NULL,NULL),(556,71,'Соколова А. Д.','107',NULL,NULL,NULL,NULL,NULL),(557,71,'Анисимова С. К.','108',NULL,NULL,NULL,NULL,NULL),(558,71,'Ефимова В. Т.','109',NULL,NULL,NULL,NULL,NULL),(559,71,'Львова М. Ф.','312',NULL,NULL,NULL,NULL,NULL),(560,71,'Калинин Р. Д.','313',NULL,NULL,NULL,NULL,NULL),(561,71,'Мартынова А. К.','314',NULL,NULL,NULL,NULL,NULL),(562,71,'Моисеева А. Д.','315',NULL,NULL,NULL,NULL,NULL),(563,71,'Морозова В. А.','316',NULL,NULL,NULL,NULL,NULL),(564,71,'Демидов Д. М.','317',NULL,NULL,NULL,NULL,NULL),(565,71,'Фомин А. Г.','110',NULL,NULL,NULL,NULL,NULL),(566,71,'Антонов Д. Ф.','111',NULL,NULL,NULL,NULL,NULL),(567,71,'Бондарев В. А.','112',NULL,NULL,NULL,NULL,NULL),(568,71,'Золотов А. И.','120',NULL,NULL,NULL,NULL,NULL),(569,71,'Кузьмин А. К.','121',NULL,NULL,NULL,NULL,NULL),(570,71,'Смирнов А. С.','123',NULL,NULL,NULL,NULL,NULL),(1604,73,NULL,'802',1,2,40,'8:00','16:00'),(1605,73,NULL,'216',1,1,180,'8:00','21:00'),(1606,73,NULL,'218',1,1,180,'8:00','21:00'),(1607,73,NULL,'108',1,1,300,'8:00','21:00'),(1608,73,NULL,'109',1,1,300,'8:00','21:00'),(1609,73,NULL,'216',2,1,180,'8:00','21:00'),(1610,73,NULL,'218',2,1,180,'8:00','21:00'),(1611,73,NULL,'108',2,1,300,'8:00','21:00'),(1612,73,NULL,'109',2,1,300,'8:00','21:00'),(1613,73,NULL,'216',3,1,180,'8:00','21:00'),(1614,73,NULL,'218',3,1,180,'8:00','21:00'),(1615,73,NULL,'108',3,1,300,'8:00','21:00'),(1616,73,NULL,'109',3,1,300,'8:00','21:00'),(1617,73,NULL,'216',4,1,180,'8:00','21:00'),(1618,73,NULL,'218',4,1,180,'8:00','21:00'),(1619,73,NULL,'108',4,1,300,'8:00','21:00'),(1620,73,NULL,'109',4,1,300,'8:00','21:00'),(1621,73,NULL,'216',5,1,180,'8:00','21:00'),(1622,73,NULL,'218',5,1,180,'8:00','21:00'),(1623,73,NULL,'108',5,1,300,'8:00','21:00'),(1624,73,NULL,'109',5,1,300,'8:00','21:00'),(1625,73,NULL,'216',6,1,180,'8:00','21:00'),(1626,73,NULL,'218',6,1,180,'8:00','21:00'),(1627,73,NULL,'108',6,1,300,'8:00','21:00'),(1628,73,NULL,'109',6,1,300,'8:00','21:00'),(1629,73,NULL,'802',2,2,40,'8:00','18:00'),(1630,73,NULL,'802',4,2,40,'10:00','21:00'),(1631,73,NULL,'802',5,2,40,'11:00','20:20'),(1632,73,NULL,'804',2,2,40,'10:00','16:00'),(1633,73,NULL,'804',3,2,40,'8:00','13:00'),(1634,73,NULL,'804',4,2,40,'10:00','19:00'),(1635,73,NULL,'804',5,2,40,'8:00','16:00'),(1636,73,NULL,'808',1,2,40,'10:00','18:00'),(1637,73,NULL,'808',2,2,40,'15:00','18:00'),(1638,73,NULL,'808',3,2,40,'10:00','16:00'),(1639,73,NULL,'808',4,2,40,'8:00','10:00'),(1640,73,NULL,'808',5,2,40,'10:00','18:00'),(1641,73,NULL,'808',6,2,40,'8:00','14:00'),(1642,73,NULL,'809',1,2,40,'10:00','18:00'),(1643,73,NULL,'809',2,2,40,'15:00','18:00'),(1644,73,NULL,'809',3,2,40,'10:00','16:00'),(1645,73,NULL,'809',4,2,40,'8:00','10:00'),(1646,73,NULL,'809',5,2,40,'10:00','18:00'),(1647,73,NULL,'809',6,2,40,'8:00','14:00'),(1648,73,NULL,'901',1,3,30,'10:00','19:00'),(1649,73,NULL,'901',2,3,30,'8:00','14:00'),(1650,73,NULL,'901',3,3,30,'10:00','18:00'),(1651,73,NULL,'901',4,3,30,'15:00','18:00'),(1652,73,NULL,'901',5,3,30,'10:00','16:00'),(1653,73,NULL,'901',6,3,30,'13:00','17:00'),(1654,73,NULL,'902',1,3,30,'9:00','16:00'),(1655,73,NULL,'902',2,3,30,'9:00','15:00'),(1656,73,NULL,'902',3,3,30,'8:00','14:00'),(1657,73,NULL,'902',4,3,30,'12:00','17:00'),(1658,73,NULL,'902',5,3,30,'12:00','16:00'),(1659,73,NULL,'902',6,3,30,'11:00','19:00'),(1660,73,NULL,'905',1,3,60,'10:00','16:00'),(1661,73,NULL,'905',2,3,60,'14:00','21:00'),(1662,73,NULL,'905',3,3,60,'14:00','16:00'),(1663,73,NULL,'905',4,3,60,'14:00','18:00'),(1664,73,NULL,'905',5,3,60,'8:00','15:00'),(1665,73,NULL,'905',6,3,60,'11:00','19:00'),(1666,73,NULL,'907',1,1,100,'8:00','17:00'),(1667,73,NULL,'907',2,1,100,'12:00','16:00'),(1668,73,NULL,'907',3,1,100,'13:00','21:00'),(1669,73,NULL,'907',4,1,100,'9:00','13:00'),(1670,73,NULL,'907',5,1,100,'12:00','19:00'),(1671,73,NULL,'907',6,1,100,'15:00','20:00'),(1672,73,NULL,'908',1,2,40,'9:00','14:00'),(1673,73,NULL,'908',2,2,40,'13:00','18:00'),(1674,73,NULL,'908',3,2,40,'14:00','16:00'),(1675,73,NULL,'908',4,2,40,'9:00','14:00'),(1676,73,NULL,'908',5,2,40,'12:00','18:00'),(1677,73,NULL,'908',6,2,40,'10:00','16:00'),(1678,73,NULL,'909',1,1,100,'15:00','20:00'),(1679,73,NULL,'909',2,1,100,'13:00','21:00'),(1680,73,NULL,'909',3,1,100,'10:00','19:00'),(1681,73,NULL,'909',4,1,100,'15:00','20:00'),(1682,73,NULL,'909',5,1,100,'8:00','14:00'),(1683,73,NULL,'909',6,1,100,'8:00','14:00'),(1684,73,NULL,'1006',1,1,60,'14:00','19:00'),(1685,73,NULL,'1006',2,1,60,'15:00','21:00'),(1686,73,NULL,'1006',3,1,60,'9:00','11:00'),(1687,73,NULL,'1006',4,1,60,'14:00','16:00'),(1688,73,NULL,'1006',5,1,60,'12:00','21:00'),(1689,73,NULL,'1006',6,1,60,'8:00','14:00'),(1690,73,NULL,'1008',1,3,50,'8:00','15:00'),(1691,73,NULL,'1008',2,3,50,'10:00','15:00'),(1692,73,NULL,'1008',3,3,50,'13:00','16:00'),(1693,73,NULL,'1008',4,3,50,'8:00','12:00'),(1694,73,NULL,'1008',5,3,50,'8:00','16:00'),(1695,73,NULL,'1008',6,3,50,'10:00','17:00'),(1696,73,NULL,'1009',1,2,60,'8:00','18:00'),(1697,73,NULL,'1009',2,2,60,'15:00','17:00'),(1698,73,NULL,'1009',3,2,60,'13:00','21:00'),(1699,73,NULL,'1009',4,2,60,'9:00','15:00'),(1700,73,NULL,'1009',5,2,60,'12:00','20:00'),(1701,73,NULL,'1009',6,2,60,'11:00','16:00'),(1702,73,NULL,'1010',1,3,40,'11:00','14:00'),(1703,73,NULL,'1010',2,3,40,'8:00','14:00'),(1704,73,NULL,'1010',3,3,40,'9:00','15:00'),(1705,73,NULL,'1010',4,3,40,'16:00','21:00'),(1706,73,NULL,'1010',5,3,40,'17:00','21:00'),(1707,73,NULL,'1010',6,3,40,'14:00','19:00'),(1708,73,NULL,'1011',3,3,50,'8:00','14:00'),(1709,73,NULL,'1011',4,3,50,'9:00','15:00'),(1710,73,NULL,'1011',5,3,50,'17:00','20:00'),(1711,73,NULL,'1011',1,3,50,'16:00','21:00'),(1712,73,NULL,'1012',2,3,40,'8:00','14:00'),(1713,73,NULL,'1012',3,3,40,'8:00','15:00'),(1714,73,NULL,'1012',4,3,40,'10:00','13:00'),(1715,73,NULL,'1012',5,3,40,'11:00','17:00'),(1716,73,NULL,'810',1,2,30,'8:00','16:00'),(1717,73,NULL,'810',2,2,30,'10:00','17:00'),(1718,73,NULL,'810',3,2,30,'9:00','18:00'),(1719,73,NULL,'810',4,2,30,'8:00','15:00'),(1720,73,NULL,'810',5,2,30,'14:00','20:00'),(1721,73,NULL,'810',6,2,30,'8:00','16:00'),(1722,73,NULL,'811',1,2,60,'15:00','19:00'),(1723,73,NULL,'811',2,2,60,'8:00','16:00'),(1724,73,NULL,'811',3,2,60,'14:00','18:00'),(1725,73,NULL,'811',4,2,60,'15:00','19:00'),(1726,73,NULL,'811',5,2,60,'9:00','18:00'),(1727,73,NULL,'811',6,2,60,'14:00','20:00'),(1728,73,NULL,'910',1,2,50,'12:00','18:00'),(1729,73,NULL,'910',2,2,50,'8:00','16:00'),(1730,73,NULL,'910',3,2,50,'8:00','15:00'),(1731,73,NULL,'910',4,2,50,'10:00','16:00'),(1732,73,NULL,'910',5,2,50,'13:00','17:00'),(1733,73,NULL,'910',6,2,50,'8:00','15:00'),(1734,73,NULL,'1103',1,2,40,'8:00','14:00'),(1735,73,NULL,'1103',2,2,40,'10:00','15:00'),(1736,73,NULL,'1103',3,2,40,'8:00','14:00'),(1737,73,NULL,'1103',4,2,40,'15:00','19:00'),(1738,73,NULL,'1103',5,2,40,'13:00','16:00'),(1739,73,NULL,'1105',1,3,40,'9:00','14:00'),(1740,73,NULL,'1105',2,3,40,'12:00','16:00'),(1741,73,NULL,'1105',3,3,40,'11:00','17:00'),(1742,73,NULL,'1105',4,3,40,'11:00','17:00'),(1743,73,NULL,'1105',5,3,40,'8:00','15:00'),(1744,73,NULL,'1105',6,3,40,'8:00','14:00'),(1745,73,NULL,'1107',1,2,40,'10:00','16:00'),(1746,73,NULL,'1107',2,2,40,'8:00','15:00'),(1747,73,NULL,'1107',3,2,40,'10:00','15:00'),(1748,73,NULL,'1107',4,2,40,'15:00','19:00'),(1749,73,NULL,'1107',5,2,40,'10:00','15:00'),(1750,73,NULL,'1111',1,2,40,'8:00','17:00'),(1751,73,NULL,'1111',2,2,40,'10:00','19:00'),(1752,73,NULL,'1111',3,2,40,'8:00','15:00'),(1753,73,NULL,'1111',4,2,40,'10:00','16:00'),(1754,73,NULL,'1111',5,2,40,'15:00','19:00'),(1755,73,NULL,'1111',6,2,40,'10:00','17:00'),(1756,73,NULL,'1112',1,2,40,'8:00','16:00'),(1757,73,NULL,'1112',2,2,40,'10:00','19:00'),(1758,73,NULL,'1112',3,2,40,'8:00','15:00'),(1759,73,NULL,'1112',4,2,40,'10:00','17:00'),(1760,73,NULL,'1112',5,2,40,'8:00','14:00'),(1761,73,NULL,'1113',1,3,35,'8:00','15:00'),(1762,73,NULL,'1113',2,3,35,'9:00','16:00'),(1763,73,NULL,'1113',3,3,35,'16:00','21:00'),(1764,73,NULL,'1113',4,3,35,'17:00','21:00'),(1765,73,NULL,'1113',5,3,35,'14:00','19:00'),(1766,73,NULL,'1114',1,3,35,'8:00','15:00'),(1767,73,NULL,'1114',2,3,35,'8:00','16:00'),(1768,73,NULL,'1114',3,3,35,'9:00','16:00'),(1769,73,NULL,'1114',4,3,35,'16:00','21:00'),(1770,73,NULL,'1114',5,3,35,'17:00','20:00'),(1771,73,NULL,'1206',1,1,100,'14:00','19:00'),(1772,73,NULL,'1206',2,1,100,'8:00','17:00'),(1773,73,NULL,'1206',3,1,100,'8:00','14:00'),(1774,73,NULL,'1206',4,1,100,'9:00','15:00'),(1775,73,NULL,'1206',5,1,100,'16:00','20:00'),(1776,73,NULL,'1206',6,1,100,'17:00','21:00'),(1777,73,NULL,'1207',1,3,50,'14:00','19:00'),(1778,73,NULL,'1207',2,3,50,'8:00','15:00'),(1779,73,NULL,'1207',3,3,50,'9:00','16:00'),(1780,73,NULL,'1207',4,3,50,'17:00','21:00'),(1781,73,NULL,'1207',5,3,50,'16:00','20:00'),(1782,73,NULL,'1207',6,3,50,'10:00','16:00'),(1783,73,NULL,'1208',1,2,50,'11:00','16:00'),(1784,73,NULL,'1208',2,2,50,'14:00','18:00'),(1785,73,NULL,'1208',3,2,50,'16:00','20:00'),(1786,73,NULL,'1208',4,2,50,'10:00','17:00'),(1787,73,NULL,'1208',5,2,50,'11:00','17:00'),(1788,73,NULL,'1208',6,2,50,'9:00','15:00'),(1789,73,NULL,'1210',1,2,40,'13:00','19:00'),(1790,73,NULL,'1210',2,2,40,'14:00','20:00'),(1791,73,NULL,'1210',3,2,40,'13:00','18:00'),(1792,73,NULL,'1210',4,2,40,'12:00','19:00'),(1793,73,NULL,'1210',5,2,40,'13:00','18:00'),(1794,73,NULL,'1211',1,1,120,'12:00','19:00'),(1795,73,NULL,'1211',2,1,120,'17:00','21:00'),(1796,73,NULL,'1211',3,1,120,'15:00','21:00'),(1797,73,NULL,'1211',4,1,120,'14:00','20:00'),(1798,73,NULL,'1211',5,1,120,'12:00','17:00'),(1799,73,NULL,'1211',6,1,120,'10:00','16:00');
/*!40000 ALTER TABLE `place` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan_direction`
--

DROP TABLE IF EXISTS `plan_direction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan_direction` (
  `sub_id` int NOT NULL AUTO_INCREMENT,
  `direction_id` int DEFAULT NULL,
  `class_id` int DEFAULT NULL,
  `name_sub` varchar(100) NOT NULL,
  `exam` varchar(45) DEFAULT NULL,
  `min_exam` varchar(45) DEFAULT NULL,
  `min_exam_score` varchar(45) DEFAULT NULL,
  `academ_count_classes` int DEFAULT NULL,
  `lect` int DEFAULT NULL,
  `lab` int DEFAULT NULL,
  `practic` int DEFAULT NULL,
  PRIMARY KEY (`sub_id`),
  KEY `direction_fk_idx` (`direction_id`),
  KEY `class_fk_school_idx` (`class_id`),
  CONSTRAINT `class_fk_school` FOREIGN KEY (`class_id`) REFERENCES `classes` (`classes_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `direction_fk` FOREIGN KEY (`direction_id`) REFERENCES `direction` (`direction_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=461 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_direction`
--

LOCK TABLES `plan_direction` WRITE;
/*!40000 ALTER TABLE `plan_direction` DISABLE KEYS */;
INSERT INTO `plan_direction` VALUES (124,NULL,283,'Русский язык ',NULL,NULL,NULL,5,NULL,NULL,NULL),(125,NULL,283,'Литературное чтение',NULL,NULL,NULL,4,NULL,NULL,NULL),(126,NULL,283,'Инностранный язык',NULL,NULL,NULL,0,NULL,NULL,NULL),(127,NULL,283,'Математика',NULL,NULL,NULL,4,NULL,NULL,NULL),(128,NULL,283,'Окружающий мир',NULL,NULL,NULL,2,NULL,NULL,NULL),(129,NULL,283,'Основы религионых культр и светской этики',NULL,NULL,NULL,0,NULL,NULL,NULL),(130,NULL,283,'Изобразительное искусство',NULL,NULL,NULL,1,NULL,NULL,NULL),(131,NULL,283,'Музыка',NULL,NULL,NULL,1,NULL,NULL,NULL),(132,NULL,283,'Технология',NULL,NULL,NULL,1,NULL,NULL,NULL),(133,NULL,283,'Физическая культура',NULL,NULL,NULL,2,NULL,NULL,NULL),(134,NULL,284,'Русский язык ',NULL,NULL,NULL,5,NULL,NULL,NULL),(135,NULL,284,'Литературное чтение',NULL,NULL,NULL,4,NULL,NULL,NULL),(136,NULL,284,'Инностранный язык',NULL,NULL,NULL,0,NULL,NULL,NULL),(137,NULL,284,'Математика',NULL,NULL,NULL,4,NULL,NULL,NULL),(138,NULL,284,'Окружающий мир',NULL,NULL,NULL,2,NULL,NULL,NULL),(139,NULL,284,'Основы религионых культр и светской этики',NULL,NULL,NULL,0,NULL,NULL,NULL),(140,NULL,284,'Изобразительное искусство',NULL,NULL,NULL,1,NULL,NULL,NULL),(141,NULL,284,'Музыка',NULL,NULL,NULL,1,NULL,NULL,NULL),(142,NULL,284,'Технология',NULL,NULL,NULL,1,NULL,NULL,NULL),(143,NULL,284,'Физическая культура',NULL,NULL,NULL,2,NULL,NULL,NULL),(144,NULL,320,'Русский язык ',NULL,NULL,NULL,3,NULL,NULL,NULL),(145,NULL,320,'Литература',NULL,NULL,NULL,3,NULL,NULL,NULL),(146,NULL,320,'Инностранный язык',NULL,NULL,NULL,3,NULL,NULL,NULL),(147,NULL,320,'Математика',NULL,NULL,NULL,0,NULL,NULL,NULL),(148,NULL,320,'Алгебра',NULL,NULL,NULL,3,NULL,NULL,NULL),(149,NULL,320,'Геометрия',NULL,NULL,NULL,2,NULL,NULL,NULL),(150,NULL,320,'Вероятность и статистика',NULL,NULL,NULL,1,NULL,NULL,NULL),(151,NULL,320,'Информатика',NULL,NULL,NULL,1,NULL,NULL,NULL),(152,NULL,320,'История',NULL,NULL,NULL,3,NULL,NULL,NULL),(153,NULL,320,'Обществознание',NULL,NULL,NULL,1,NULL,NULL,NULL),(154,NULL,320,'География',NULL,NULL,NULL,2,NULL,NULL,NULL),(155,NULL,320,'Физика',NULL,NULL,NULL,3,NULL,NULL,NULL),(156,NULL,320,'Химия',NULL,NULL,NULL,2,NULL,NULL,NULL),(157,NULL,320,'Биология',NULL,NULL,NULL,2,NULL,NULL,NULL),(158,NULL,320,'Изобразительное искусство',NULL,NULL,NULL,0,NULL,NULL,NULL),(159,NULL,320,'Музыка',NULL,NULL,NULL,0,NULL,NULL,NULL),(160,NULL,320,'Технология',NULL,NULL,NULL,1,NULL,NULL,NULL),(161,NULL,320,'Физическая культура',NULL,NULL,NULL,2,NULL,NULL,NULL),(162,NULL,320,'Основы безопасности жизнедеятельности',NULL,NULL,NULL,1,NULL,NULL,NULL),(163,NULL,320,'Основы духовно-нравственной культуры народов России',NULL,NULL,NULL,0,NULL,NULL,NULL),(229,NULL,315,'Русский язык ',NULL,NULL,NULL,3,NULL,NULL,NULL),(230,NULL,315,'Литература',NULL,NULL,NULL,2,NULL,NULL,NULL),(231,NULL,315,'Инностранный язык',NULL,NULL,NULL,3,NULL,NULL,NULL),(232,NULL,315,'Математика',NULL,NULL,NULL,0,NULL,NULL,NULL),(233,NULL,315,'Алгебра',NULL,NULL,NULL,3,NULL,NULL,NULL),(234,NULL,315,'Геометрия',NULL,NULL,NULL,2,NULL,NULL,NULL),(235,NULL,315,'Вероятность и статистика',NULL,NULL,NULL,1,NULL,NULL,NULL),(236,NULL,315,'Информатика',NULL,NULL,NULL,1,NULL,NULL,NULL),(237,NULL,315,'История',NULL,NULL,NULL,2,NULL,NULL,NULL),(238,NULL,315,'Обществознание',NULL,NULL,NULL,1,NULL,NULL,NULL),(239,NULL,315,'География',NULL,NULL,NULL,2,NULL,NULL,NULL),(240,NULL,315,'Физика',NULL,NULL,NULL,2,NULL,NULL,NULL),(241,NULL,315,'Химия',NULL,NULL,NULL,2,NULL,NULL,NULL),(242,NULL,315,'Биология',NULL,NULL,NULL,2,NULL,NULL,NULL),(243,NULL,315,'Изобразительное искусство',NULL,NULL,NULL,0,NULL,NULL,NULL),(244,NULL,315,'Музыка',NULL,NULL,NULL,1,NULL,NULL,NULL),(245,NULL,315,'Технология',NULL,NULL,NULL,1,NULL,NULL,NULL),(246,NULL,315,'Физическая культура',NULL,NULL,NULL,2,NULL,NULL,NULL),(247,NULL,315,'Основы безопасности жизнедеятельности',NULL,NULL,NULL,1,NULL,NULL,NULL),(248,NULL,315,'Основы духовно-нравственной культуры народов России',NULL,NULL,NULL,0,NULL,NULL,NULL),(249,NULL,316,'Русский язык ',NULL,NULL,NULL,3,NULL,NULL,NULL),(250,NULL,316,'Литература',NULL,NULL,NULL,2,NULL,NULL,NULL),(251,NULL,316,'Инностранный язык',NULL,NULL,NULL,3,NULL,NULL,NULL),(252,NULL,316,'Математика',NULL,NULL,NULL,0,NULL,NULL,NULL),(253,NULL,316,'Алгебра',NULL,NULL,NULL,3,NULL,NULL,NULL),(254,NULL,316,'Геометрия',NULL,NULL,NULL,2,NULL,NULL,NULL),(255,NULL,316,'Вероятность и статистика',NULL,NULL,NULL,1,NULL,NULL,NULL),(256,NULL,316,'Информатика',NULL,NULL,NULL,1,NULL,NULL,NULL),(257,NULL,316,'История',NULL,NULL,NULL,2,NULL,NULL,NULL),(258,NULL,316,'Обществознание',NULL,NULL,NULL,1,NULL,NULL,NULL),(259,NULL,316,'География',NULL,NULL,NULL,2,NULL,NULL,NULL),(260,NULL,316,'Физика',NULL,NULL,NULL,2,NULL,NULL,NULL),(261,NULL,316,'Химия',NULL,NULL,NULL,2,NULL,NULL,NULL),(262,NULL,316,'Биология',NULL,NULL,NULL,2,NULL,NULL,NULL),(263,NULL,316,'Изобразительное искусство',NULL,NULL,NULL,0,NULL,NULL,NULL),(264,NULL,316,'Музыка',NULL,NULL,NULL,1,NULL,NULL,NULL),(265,NULL,316,'Технология',NULL,NULL,NULL,1,NULL,NULL,NULL),(266,NULL,316,'Физическая культура',NULL,NULL,NULL,2,NULL,NULL,NULL),(267,NULL,316,'Основы безопасности жизнедеятельности',NULL,NULL,NULL,1,NULL,NULL,NULL),(268,NULL,316,'Основы духовно-нравственной культуры народов России',NULL,NULL,NULL,0,NULL,NULL,NULL),(269,NULL,317,'Русский язык ',NULL,NULL,NULL,3,NULL,NULL,NULL),(270,NULL,317,'Литература',NULL,NULL,NULL,2,NULL,NULL,NULL),(271,NULL,317,'Инностранный язык',NULL,NULL,NULL,3,NULL,NULL,NULL),(272,NULL,317,'Математика',NULL,NULL,NULL,0,NULL,NULL,NULL),(273,NULL,317,'Алгебра',NULL,NULL,NULL,3,NULL,NULL,NULL),(274,NULL,317,'Геометрия',NULL,NULL,NULL,2,NULL,NULL,NULL),(275,NULL,317,'Вероятность и статистика',NULL,NULL,NULL,1,NULL,NULL,NULL),(276,NULL,317,'Информатика',NULL,NULL,NULL,1,NULL,NULL,NULL),(277,NULL,317,'История',NULL,NULL,NULL,2,NULL,NULL,NULL),(278,NULL,317,'Обществознание',NULL,NULL,NULL,1,NULL,NULL,NULL),(279,NULL,317,'География',NULL,NULL,NULL,2,NULL,NULL,NULL),(280,NULL,317,'Физика',NULL,NULL,NULL,2,NULL,NULL,NULL),(281,NULL,317,'Химия',NULL,NULL,NULL,2,NULL,NULL,NULL),(282,NULL,317,'Биология',NULL,NULL,NULL,2,NULL,NULL,NULL),(283,NULL,317,'Изобразительное искусство',NULL,NULL,NULL,0,NULL,NULL,NULL),(284,NULL,317,'Музыка',NULL,NULL,NULL,1,NULL,NULL,NULL),(285,NULL,317,'Технология',NULL,NULL,NULL,1,NULL,NULL,NULL),(286,NULL,317,'Физическая культура',NULL,NULL,NULL,2,NULL,NULL,NULL),(287,NULL,317,'Основы безопасности жизнедеятельности',NULL,NULL,NULL,1,NULL,NULL,NULL),(288,NULL,317,'Основы духовно-нравственной культуры народов России',NULL,NULL,NULL,0,NULL,NULL,NULL),(426,237,NULL,'Алгебра и геометрия','+','-',NULL,NULL,36,0,54),(427,237,NULL,'Дискретная математика','-','-',NULL,NULL,36,0,72),(428,237,NULL,'Информационные технологии','-','+',NULL,NULL,18,18,0),(429,237,NULL,'Основы программирования','+','-',NULL,NULL,36,36,36),(430,237,NULL,'Лабораторный практикум по программированию','-','+',NULL,NULL,0,36,0),(431,243,NULL,'Математическая логика и теория алгоритмов','+','-',NULL,NULL,36,0,36),(432,243,NULL,'Технологии и методы программирования','+','-',NULL,NULL,18,36,0),(433,243,NULL,'Архитектура вычислительных систем','-','+',NULL,NULL,54,0,0),(434,243,NULL,'Лабораторный практикум по технологиям программирования','-','+',NULL,NULL,0,72,0),(435,243,NULL,'Основы технологии UI/UX','-','+',NULL,NULL,18,18,0),(436,249,NULL,'Объектно-ориентированный анализ и проектирование','+','-',NULL,NULL,36,36,0),(437,249,NULL,'Технологии баз данных','+','-',NULL,NULL,36,54,0),(438,249,NULL,'Компьютерные сети','+','-',NULL,NULL,36,36,0),(439,249,NULL,'Теория информации','-','+',NULL,NULL,36,18,0),(440,249,NULL,'Компьютерная графика','-','+',NULL,NULL,18,36,0),(441,255,NULL,'Теория игр и принятие решений','-','+',NULL,NULL,36,0,18),(442,255,NULL,'Информационная безопасность компьютерных сетей','+','-',NULL,NULL,36,18,0),(443,255,NULL,'Интеллектуальные системы','+','-',NULL,NULL,36,18,0),(444,255,NULL,'Технологии и стандарты разработки ПО','-','+',NULL,NULL,18,0,0),(445,255,NULL,'Геоинформационные системы','-','+',NULL,NULL,18,0,0),(446,255,NULL,'Системы параллельных вычислений','-','+',NULL,NULL,18,36,0),(447,255,NULL,'Банковская информатика','-','+',NULL,NULL,18,0,36),(448,255,NULL,'Командная разработка ПО','-','+',NULL,NULL,0,36,0),(449,255,NULL,'Моделирование информационных процессов','+','-',NULL,NULL,36,36,0),(450,255,NULL,'Компьютерное зрение','+','-',NULL,NULL,36,36,0),(451,238,NULL,'Алгебра и геометрия','+','-',NULL,NULL,36,0,54),(452,238,NULL,'Основы программирования','+','-',NULL,NULL,36,36,36),(453,244,NULL,'Дискретная математика','+','-',NULL,NULL,36,0,18),(454,244,NULL,'Технологии и методы программирования','+','-',NULL,NULL,18,36,0),(455,244,NULL,'Основы технологии UI/UX','-','+',NULL,NULL,18,18,0),(456,250,NULL,'Теория информации','-','+',NULL,NULL,0,18,0),(457,250,NULL,'Математическая логика и теория алгоритмов','+','-',NULL,NULL,36,0,36),(458,250,NULL,'Теоретические основы компьютерной безопасности','+','-',NULL,NULL,36,18,0),(459,250,NULL,'Технологии баз данных','+','-',NULL,NULL,0,54,0),(460,250,NULL,'Введение в анализ и разработку систем','-','+',NULL,NULL,36,0,18);
/*!40000 ALTER TABLE `plan_direction` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `plan_direction_AFTER_DELETE` AFTER DELETE ON `plan_direction` FOR EACH ROW BEGIN
	DELETE FROM schedules.schedule
	WHERE direction_id = OLD.direction_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `sch_id` int NOT NULL AUTO_INCREMENT,
  `work_id` int NOT NULL,
  `grafic_id` int NOT NULL,
  `place_id` int DEFAULT NULL,
  `teacher_id` int NOT NULL,
  `direction_id` int DEFAULT NULL,
  `classes_id` int DEFAULT NULL,
  `week_day` int NOT NULL,
  `start_date` varchar(100) DEFAULT NULL,
  `name_sub` varchar(100) NOT NULL,
  `period` varchar(150) NOT NULL,
  PRIMARY KEY (`sch_id`),
  KEY `work_sch_fk_idx` (`work_id`),
  KEY `grafic_sch_fk_idx` (`grafic_id`),
  KEY `teach_sch_fk_idx` (`teacher_id`),
  KEY `week_sch_fk_idx` (`week_day`),
  KEY `sch_workk_fkk_idx` (`work_id`),
  CONSTRAINT `sch_graficc_fkk` FOREIGN KEY (`grafic_id`) REFERENCES `grafic` (`time_id`) ON DELETE CASCADE,
  CONSTRAINT `sch_teach_fkk` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE CASCADE,
  CONSTRAINT `sch_week_fkk` FOREIGN KEY (`week_day`) REFERENCES `weeks` (`id_week`),
  CONSTRAINT `sch_workk_fkk` FOREIGN KEY (`work_id`) REFERENCES `work_folder` (`work_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (3,71,306,540,236,NULL,320,1,NULL,'Алгебра','каждую неделю'),(4,71,307,540,236,NULL,321,1,NULL,'Алгебра','каждую неделю'),(25,71,306,540,236,126,315,1,NULL,'Алгебра','каждую неделю'),(26,71,307,559,366,126,315,1,NULL,'Литература','каждую неделю'),(27,71,309,559,366,126,315,1,NULL,'Литература','каждую неделю'),(32,73,400,1648,1075,243,529,1,NULL,'Технологии и методы программирования','каждую неделю'),(33,73,399,1762,1075,243,530,2,NULL,'Технологии и методы программирования','каждую неделю'),(34,73,401,1648,1079,243,529,1,NULL,'Лабораторный практикум по технологиям программирования','каждую неделю'),(35,73,398,1649,1079,243,529,2,NULL,'Лабораторный практикум по технологиям программирования','каждую неделю'),(36,73,398,1604,1076,243,529,1,NULL,'Математическая логика и теория алгоритмов','каждую неделю'),(37,73,399,1604,1076,243,530,1,NULL,'Математическая логика и теория алгоритмов','каждую неделю'),(38,73,397,1605,1078,243,NULL,1,NULL,'Архитектура вычислительных систем','каждую неделю'),(39,73,400,1609,1078,243,NULL,2,NULL,'Архитектура вычислительных систем','чет'),(40,73,397,1609,1076,243,NULL,2,NULL,'Математическая логика и теория алгоритмов','каждую неделю'),(41,73,397,1609,1076,250,NULL,2,NULL,'Математическая логика и теория алгоритмов','каждую неделю');
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher` (
  `teacher_id` int NOT NULL AUTO_INCREMENT,
  `fio` varchar(100) NOT NULL,
  `name_cafedra_or_napr` int NOT NULL,
  PRIMARY KEY (`teacher_id`),
  KEY `cafedra_fk_idx` (`name_cafedra_or_napr`),
  CONSTRAINT `cafedra_fk` FOREIGN KEY (`name_cafedra_or_napr`) REFERENCES `cafedra_or_section` (`id_caf_sec`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1092 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (216,'Кузнецов П. В.',33),(217,'Головина В. Ю.',33),(218,'Богомолов Е. Д.',33),(219,'Васильева М. М.',33),(220,'Куликов М. А.',33),(221,'Соболева А. Е.',33),(222,'Сальников Л. А.',33),(223,'Власова В. И.',33),(224,'Королева А. А.',33),(225,'Парамонова А. Р.',33),(226,'Муратов Я. Л.',33),(227,'Третьякова В. П.',33),(228,'Никонова В. Е.',33),(229,'Носов Д. А.',33),(230,'Исаев Н. Ю.',33),(231,'Чижова П. Д.',33),(232,'Новикова Е. Д.',33),(233,'Соловьев И. Я.',33),(234,'Павлов С. Т.',33),(235,'Широков А. В.',33),(236,'Сазонова А. Г.',33),(237,'Саханов Р. П.',33),(238,'Сазонова А. Г.',33),(239,'Саханов Р. П.',33),(240,'Сазонова А. Г.',33),(241,'Саханов Р. П.',33),(242,'Сазонова А. Г.',33),(243,'Саханов Р. П.',33),(244,'Сазонова А. Г.',33),(245,'Сазонова А. Г.',33),(246,'Сазонова А. Г.',33),(247,'Сазонова А. Г.',33),(248,'Сазонова А. Г.',33),(249,'Сазонова А. Г.',33),(250,'Волков А. И.',33),(251,'Волков А. И.',33),(252,'Волков А. И.',33),(253,'Волков А. И.',33),(254,'Волков А. И.',33),(255,'Волков А. И.',33),(256,'Волков А. И.',33),(257,'Волков А. И.',33),(258,'Волков А. И.',33),(259,'Волков А. И.',33),(260,'Волков А. И.',33),(261,'Волков А. И.',33),(262,'Сазонова А. Г.',33),(263,'Сазонова А. Г.',33),(264,'Сазонова А. Г.',33),(265,'Сазонова А. Г.',33),(266,'Сазонова А. Г.',33),(267,'Сазонова А. Г.',33),(268,'Саханов Р. П.',33),(269,'Саханов Р. П.',33),(270,'Саханов Р. П.',33),(271,'Саханов Р. П.',33),(272,'Саханов Р. П.',33),(273,'Саханов Р. П.',33),(274,'Саханов Р. П.',33),(275,'Саханов Р. П.',33),(276,'Васильева А. П.',33),(277,'Васильева А. П.',33),(278,'Васильева А. П.',33),(279,'Васильева А. П.',33),(280,'Васильева А. П.',33),(281,'Васильева А. П.',33),(282,'Васильева А. П.',33),(283,'Васильева А. П.',33),(284,'Васильева А. П.',33),(285,'Васильева А. П.',33),(286,'Васильева А. П.',33),(287,'Васильева А. П.',33),(288,'Васильева А. П.',33),(289,'Васильева А. П.',33),(290,'Васильева А. П.',33),(291,'Васильева А. П.',33),(292,'Васильева А. П.',33),(293,'Васильева А. П.',33),(294,'Васильева А. П.',33),(295,'Васильева А. П.',33),(296,'Васильева А. П.',33),(297,'Васильева А. П.',33),(298,'Васильева А. П.',33),(299,'Васильева А. П.',33),(300,'Васильева А. П.',33),(301,'Васильева А. П.',33),(302,'Васильева А. П.',33),(303,'Васильева А. П.',33),(304,'Васильева А. П.',33),(305,'Васильева А. П.',33),(306,'Васильева А. П.',33),(307,'Васильева А. П.',33),(308,'Кузнецов П. В.',34),(309,'Головина В. Ю.',34),(310,'Богомолов Е. Д.',34),(311,'Васильева М. М.',34),(312,'Куликов М. А.',34),(313,'Соболева А. Е.',34),(314,'Сальников Л. А.',34),(315,'Власова В. И.',34),(316,'Королева А. А.',34),(317,'Парамонова А. Р.',34),(318,'Муратов Я. Л.',34),(319,'Третьякова В. П.',34),(320,'Никонова В. Е.',34),(321,'Носов Д. А.',34),(322,'Исаев Н. Ю.',34),(323,'Чижова П. Д.',34),(324,'Новикова Е. Д.',34),(325,'Соловьев И. Я.',34),(326,'Павлов С. Т.',34),(327,'Широков А. В.',34),(328,'Кузнецов П. В.',34),(329,'Головина В. Ю.',34),(330,'Богомолов Е. Д.',34),(331,'Васильева М. М.',34),(332,'Куликов М. А.',34),(333,'Соболева А. Е.',34),(334,'Сальников Л. А.',34),(335,'Власова В. И.',34),(336,'Королева А. А.',34),(337,'Парамонова А. Р.',34),(338,'Муратов Я. Л.',34),(339,'Третьякова В. П.',34),(340,'Никонова В. Е.',34),(341,'Носов Д. А.',34),(342,'Исаев Н. Ю.',34),(343,'Чижова П. Д.',34),(344,'Новикова Е. Д.',34),(345,'Соловьев И. Я.',34),(346,'Павлов С. Т.',34),(347,'Широков А. В.',34),(348,'Гончаров А. М.',34),(349,'Суханов Р. Д.',34),(350,'Петрова П. С.',34),(351,'Гончаров А. М.',34),(352,'Суханов Р. Д.',34),(353,'Петрова П. С.',34),(354,'Гончаров А. М.',34),(355,'Суханов Р. Д.',34),(356,'Петрова П. С.',34),(357,'Гончаров А. М.',34),(358,'Суханов Р. Д.',34),(359,'Петрова П. С.',34),(360,'Гончаров А. М.',34),(361,'Суханов Р. Д.',34),(362,'Петрова П. С.',34),(363,'Гончаров А. М.',34),(364,'Суханов Р. Д.',34),(365,'Петрова П. С.',34),(366,'Львова М. Ф.',34),(367,'Моисеева А. Д.',34),(368,'Львова М. Ф.',34),(369,'Моисеева А. Д.',34),(370,'Львова М. Ф.',34),(371,'Моисеева А. Д.',34),(372,'Львова М. Ф.',34),(373,'Моисеева А. Д.',34),(374,'Львова М. Ф.',34),(375,'Моисеева А. Д.',34),(376,'Львова М. Ф.',34),(377,'Моисеева А. Д.',34),(378,'Львова М. Ф.',34),(379,'Моисеева А. Д.',34),(380,'Львова М. Ф.',34),(381,'Моисеева А. Д.',34),(382,'Львова М. Ф.',34),(383,'Моисеева А. Д.',34),(384,'Львова М. Ф.',34),(385,'Моисеева А. Д.',34),(386,'Львова М. Ф.',34),(387,'Моисеева А. Д.',34),(388,'Львова М. Ф.',34),(389,'Моисеева А. Д.',34),(390,'Гончаров А. М.',34),(391,'Суханов Р. Д.',34),(392,'Петрова П. С.',34),(393,'Гончаров А. М.',34),(394,'Суханов Р. Д.',34),(395,'Петрова П. С.',34),(396,'Демидов Д. М.',35),(397,'Демидов Д. М.',35),(398,'Демидов Д. М.',35),(399,'Демидов Д. М.',35),(400,'Демидов Д. М.',35),(401,'Демидов Д. М.',35),(402,'Демидов Д. М.',35),(403,'Демидов Д. М.',35),(404,'Демидов Д. М.',35),(405,'Демидов Д. М.',35),(406,'Морозова В. А.',35),(407,'Морозова В. А.',35),(408,'Морозова В. А.',35),(409,'Морозова В. А.',35),(410,'Морозова В. А.',35),(411,'Морозова В. А.',35),(412,'Морозова В. А.',35),(413,'Морозова В. А.',35),(414,'Морозова В. А.',35),(415,'Морозова В. А.',35),(416,'Морозова В. А.',35),(417,'Морозова В. А.',35),(418,'Морозова В. А.',35),(419,'Морозова В. А.',35),(420,'Морозова В. А.',35),(421,'Морозова В. А.',35),(422,'Морозова В. А.',35),(423,'Ефимова В. Т.',35),(424,'Ефимова В. Т.',35),(425,'Ефимова В. Т.',35),(426,'Ефимова В. Т.',35),(427,'Ефимова В. Т.',35),(428,'Ефимова В. Т.',35),(429,'Ефимова В. Т.',35),(430,'Ефимова В. Т.',35),(431,'Ефимова В. Т.',35),(432,'Ефимова В. Т.',35),(433,'Ефимова В. Т.',35),(434,'Ефимова В. Т.',35),(435,'Афанасьева Ж. Л.',36),(436,'Афанасьева Ж. Л.',36),(437,'Афанасьева Ж. Л.',36),(438,'Афанасьева Ж. Л.',36),(439,'Афанасьева Ж. Л.',36),(440,'Афанасьева Ж. Л.',36),(441,'Афанасьева Ж. Л.',36),(442,'Афанасьева Ж. Л.',36),(443,'Афанасьева Ж. Л.',36),(444,'Афанасьева Ж. Л.',36),(445,'Афанасьева Ж. Л.',36),(446,'Афанасьева Ж. Л.',36),(447,'Афанасьева Ж. Л.',36),(448,'Афанасьева Ж. Л.',36),(449,'Афанасьева Ж. Л.',36),(450,'Афанасьева Ж. Л.',36),(451,'Афанасьева Ж. Л.',36),(452,'Афанасьева Ж. Л.',36),(453,'Афанасьева Ж. Л.',36),(454,'Афанасьева Ж. Л.',36),(455,'Баранов М. И.',36),(456,'Баранов М. И.',36),(457,'Баранов М. И.',36),(458,'Баранов М. И.',36),(459,'Баранов М. И.',36),(460,'Баранов М. И.',36),(461,'Баранов М. И.',36),(462,'Баранов М. И.',36),(463,'Баранов М. И.',36),(464,'Баранов М. И.',36),(465,'Баранов М. И.',36),(466,'Баранов М. И.',36),(467,'Баранов М. И.',36),(468,'Баранов М. И.',36),(469,'Баранов М. И.',36),(470,'Степанов М. И.',36),(471,'Степанов М. И.',36),(472,'Степанов М. И.',36),(473,'Степанов М. И.',36),(474,'Степанов М. И.',36),(475,'Степанов М. И.',36),(476,'Степанов М. И.',36),(477,'Степанов М. И.',36),(478,'Степанов М. И.',36),(479,'Шилова У. Б.',36),(480,'Шилова У. Б.',36),(481,'Шилова У. Б.',36),(482,'Шилова У. Б.',36),(483,'Шилова У. Б.',36),(484,'Шилова У. Б.',36),(485,'Кузнецов С. А.',36),(486,'Кузнецов С. А.',36),(487,'Кузнецов С. А.',36),(488,'Кузнецов С. А.',36),(489,'Кузнецов С. А.',36),(490,'Кузнецов С. А.',36),(491,'Шилова У. Б.',36),(492,'Шилова У. Б.',36),(493,'Шилова У. Б.',36),(494,'Шилова У. Б.',36),(495,'Шилова У. Б.',36),(496,'Шилова У. Б.',36),(497,'Кузнецов С. А.',36),(498,'Кузнецов С. А.',36),(499,'Кузнецов С. А.',36),(500,'Кузнецов С. А.',36),(501,'Кузнецов С. А.',36),(502,'Кузнецов С. А.',36),(503,'Мартынова А. К.',37),(504,'Мартынова А. К.',37),(505,'Мартынова А. К.',37),(506,'Мартынова А. К.',37),(507,'Мартынова А. К.',37),(508,'Мартынова А. К.',37),(509,'Мартынова А. К.',37),(510,'Мартынова А. К.',37),(511,'Мартынова А. К.',37),(512,'Мартынова А. К.',37),(513,'Мартынова А. К.',37),(514,'Мартынова А. К.',37),(515,'Мартынова А. К.',37),(516,'Мартынова А. К.',37),(517,'Мартынова А. К.',37),(518,'Мартынова А. К.',37),(519,'Калинин Р. Д.',37),(520,'Калинин Р. Д.',37),(521,'Калинин Р. Д.',37),(522,'Калинин Р. Д.',37),(523,'Калинин Р. Д.',37),(524,'Калинин Р. Д.',37),(525,'Калинин Р. Д.',37),(526,'Калинин Р. Д.',37),(527,'Калинин Р. Д.',37),(528,'Калинин Р. Д.',37),(529,'Калинин Р. Д.',37),(530,'Калинин Р. Д.',37),(531,'Анисимова С. К.',37),(532,'Анисимова С. К.',37),(533,'Анисимова С. К.',37),(534,'Анисимова С. К.',37),(535,'Анисимова С. К.',37),(536,'Анисимова С. К.',37),(537,'Анисимова С. К.',37),(538,'Анисимова С. К.',37),(539,'Анисимова С. К.',37),(540,'Анисимова С. К.',37),(541,'Анисимова С. К.',37),(542,'Анисимова С. К.',37),(543,'Соколова А. Д.',37),(544,'Соколова А. Д.',37),(545,'Соколова А. Д.',37),(546,'Соколова А. Д.',37),(547,'Соколова А. Д.',37),(548,'Соколова А. Д.',37),(549,'Соколова А. Д.',37),(550,'Соколова А. Д.',37),(551,'Соколова А. Д.',37),(552,'Соколова А. Д.',37),(553,'Соколова А. Д.',37),(554,'Соколова А. Д.',37),(555,'Кузнецов П. В.',37),(556,'Головина В. Ю.',37),(557,'Богомолов Е. Д.',37),(558,'Васильева М. М.',37),(559,'Куликов М. А.',37),(560,'Соболева А. Е.',37),(561,'Сальников Л. А.',37),(562,'Власова В. И.',37),(563,'Королева А. А.',37),(564,'Парамонова А. Р.',37),(565,'Муратов Я. Л.',37),(566,'Третьякова В. П.',37),(567,'Никонова В. Е.',37),(568,'Носов Д. А.',37),(569,'Исаев Н. Ю.',37),(570,'Чижова П. Д.',37),(571,'Новикова Е. Д.',37),(572,'Соловьев И. Я.',37),(573,'Павлов С. Т.',37),(574,'Широков А. В.',37),(575,'Кузьмин А. К.',38),(576,'Кузьмин А. К.',38),(577,'Кузьмин А. К.',38),(578,'Кузьмин А. К.',38),(579,'Кузьмин А. К.',38),(580,'Кузьмин А. К.',38),(581,'Кузьмин А. К.',38),(582,'Кузьмин А. К.',38),(583,'Смирнов А. С.',38),(584,'Смирнов А. С.',38),(585,'Смирнов А. С.',38),(586,'Смирнов А. С.',38),(587,'Смирнов А. С.',38),(588,'Смирнов А. С.',38),(589,'Смирнов А. С.',38),(590,'Смирнов А. С.',38),(591,'Смирнов А. С.',38),(592,'Смирнов А. С.',38),(593,'Смирнов А. С.',38),(594,'Смирнов А. С.',38),(595,'Смирнов А. С.',38),(596,'Смирнов А. С.',38),(597,'Смирнов А. С.',38),(598,'Смирнов А. С.',38),(599,'Золотов А. И.',38),(600,'Золотов А. И.',38),(601,'Золотов А. И.',38),(602,'Золотов А. И.',38),(603,'Золотов А. И.',38),(604,'Золотов А. И.',38),(605,'Золотов А. И.',38),(606,'Золотов А. И.',38),(607,'Золотов А. И.',38),(608,'Золотов А. И.',38),(609,'Золотов А. И.',38),(610,'Золотов А. И.',38),(611,'Золотов А. И.',38),(612,'Золотов А. И.',38),(613,'Кузьмин А. К.',38),(614,'Кузьмин А. К.',38),(615,'Кузьмин А. К.',38),(616,'Кузьмин А. К.',38),(617,'Кузьмин А. К.',38),(618,'Кузьмин А. К.',38),(619,'Бондарев В. А.',38),(620,'Бондарев В. А.',38),(621,'Бондарев В. А.',38),(622,'Бондарев В. А.',38),(623,'Бондарев В. А.',38),(624,'Бондарев В. А.',38),(625,'Бондарев В. А.',38),(626,'Бондарев В. А.',38),(627,'Бондарев В. А.',38),(628,'Бондарев В. А.',38),(629,'Бондарев В. А.',38),(630,'Бондарев В. А.',38),(631,'Антонов Д. Ф.',39),(632,'Антонов Д. Ф.',39),(633,'Антонов Д. Ф.',39),(634,'Антонов Д. Ф.',39),(635,'Антонов Д. Ф.',39),(636,'Антонов Д. Ф.',39),(637,'Антонов Д. Ф.',39),(638,'Антонов Д. Ф.',39),(639,'Антонов Д. Ф.',39),(640,'Антонов Д. Ф.',39),(641,'Антонов Д. Ф.',39),(642,'Антонов Д. Ф.',39),(643,'Антонов Д. Ф.',39),(644,'Кузнецов П. В.',39),(645,'Головина В. Ю.',39),(646,'Богомолов Е. Д.',39),(647,'Васильева М. М.',39),(648,'Куликов М. А.',39),(649,'Соболева А. Е.',39),(650,'Сальников Л. А.',39),(651,'Власова В. И.',39),(652,'Королева А. А.',39),(653,'Парамонова А. Р.',39),(654,'Муратов Я. Л.',39),(655,'Третьякова В. П.',39),(656,'Никонова В. Е.',39),(657,'Носов Д. А.',39),(658,'Исаев Н. Ю.',39),(659,'Чижова П. Д.',39),(660,'Новикова Е. Д.',39),(661,'Соловьев И. Я.',39),(662,'Павлов С. Т.',39),(663,'Широков А. В.',39),(664,'Кузнецов П. В.',39),(665,'Головина В. Ю.',39),(666,'Богомолов Е. Д.',39),(667,'Васильева М. М.',39),(668,'Куликов М. А.',39),(669,'Соболева А. Е.',39),(670,'Сальников Л. А.',39),(671,'Власова В. И.',39),(672,'Королева А. А.',39),(673,'Парамонова А. Р.',39),(674,'Муратов Я. Л.',39),(675,'Третьякова В. П.',39),(676,'Никонова В. Е.',39),(677,'Носов Д. А.',39),(678,'Исаев Н. Ю.',39),(679,'Чижова П. Д.',39),(680,'Новикова Е. Д.',39),(681,'Соловьев И. Я.',39),(682,'Павлов С. Т.',39),(683,'Широков А. В.',39),(684,'Фомин А. Г.',39),(685,'Фомин А. Г.',39),(686,'Фомин А. Г.',39),(687,'Фомин А. Г.',39),(688,'Фомин А. Г.',39),(689,'Фомин А. Г.',39),(690,'Фомин А. Г.',39),(691,'Фомин А. Г.',39),(692,'Фомин А. Г.',39),(693,'Фомин А. Г.',39),(694,'Фомин А. Г.',39),(695,'Фомин А. Г.',39),(696,'Фомин А. Г.',39),(697,'Фомин А. Г.',39),(698,'Фомин А. Г.',39),(699,'Фомин А. Г.',39),(700,'Фомин А. Г.',39),(701,'Фомин А. Г.',39),(702,'Фомин А. Г.',39),(703,'Фомин А. Г.',39),(704,'Фомин А. Г.',39),(705,'Фомин А. Г.',39),(706,'Фомин А. Г.',39),(707,'Фомин А. Г.',39),(708,'Фомин А. Г.',39),(709,'Фомин А. Г.',39),(710,'Фомин А. Г.',39),(711,'Фомин А. Г.',39),(712,'Фомин А. Г.',39),(713,'Фомин А. Г.',39),(714,'Фомин А. Г.',39),(715,'Фомин А. Г.',39),(716,'Фомин А. Г.',39),(717,'Фомин А. Г.',39),(718,'Фомин А. Г.',39),(719,'Петров В. Д.',39),(720,'Петров В. Д.',39),(721,'Петров В. Д.',39),(722,'Петров В. Д.',39),(723,'Петров В. Д.',39),(724,'Петров В. Д.',39),(725,'Петров В. Д.',39),(726,'Петров В. Д.',39),(727,'Петров В. Д.',39),(728,'Петров В. Д.',39),(729,'Петров В. Д.',39),(730,'Петров В. Д.',39),(731,'Петров В. Д.',39),(732,'Петров В. Д.',39),(733,'Петров В. Д.',39),(734,'Антонов Д. Ф.',39),(735,'Антонов Д. Ф.',39),(1066,'Гайнуллина А.Р.',57),(1067,'Абайдуллин Р.Н.',57),(1068,'Пшеничный П.В.',57),(1069,'Галимова Г.Р.',57),(1070,'Рубцова Р.Г.',57),(1071,'Тагиров Р.Р.',57),(1072,'Терентьев Т.Н.',57),(1073,'Глазырина О.В.',57),(1074,'Кашуба А.Ю.',57),(1075,'Шорина О.А.',57),(1076,'Михайлов В.Ю.',57),(1077,'Васильев А.В.',57),(1078,'Зискин В.Ф.',57),(1079,'Еникеев Р.Р.',57),(1080,'Андрианова А.А.',57),(1081,'Шаймухаметов Р.Р.',57),(1082,'Николаев К.С.',57),(1083,'Долгов Д.А.',57),(1084,'Аль-Халиди А.М.',57),(1085,'Гостев В.М.',57),(1086,'Мубараков Б.Г.',57),(1087,'Жуманиезов А.Р.',57),(1088,'Ишмухаметов Ш.Т.',57),(1089,'Коннов И.В.',57),(1090,'Репина А.И.',57),(1091,'Денисов М.П.',57);
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_classes`
--

DROP TABLE IF EXISTS `teacher_classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher_classes` (
  `id_teach_class` int NOT NULL AUTO_INCREMENT,
  `id_teacher` int NOT NULL,
  `direction_id` int DEFAULT NULL,
  `classes_id` int DEFAULT NULL,
  `name_sub` varchar(100) NOT NULL,
  PRIMARY KEY (`id_teach_class`),
  KEY `teached_dir_fk_idx` (`direction_id`),
  KEY `reacher_class_fk_idx` (`classes_id`),
  KEY `teach_id_fk_idx` (`id_teacher`),
  CONSTRAINT `reacher_class_fk` FOREIGN KEY (`classes_id`) REFERENCES `classes` (`classes_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teach_id_fk` FOREIGN KEY (`id_teacher`) REFERENCES `teacher` (`teacher_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `teacher_dir_fk` FOREIGN KEY (`direction_id`) REFERENCES `direction` (`direction_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1483 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_classes`
--

LOCK TABLES `teacher_classes` WRITE;
/*!40000 ALTER TABLE `teacher_classes` DISABLE KEYS */;
INSERT INTO `teacher_classes` VALUES (435,216,NULL,283,'Математика'),(436,217,NULL,284,'Математика'),(437,218,NULL,285,'Математика'),(438,219,NULL,286,'Математика'),(439,220,NULL,287,'Математика'),(440,221,NULL,288,'Математика'),(441,222,NULL,289,'Математика'),(442,223,NULL,290,'Математика'),(443,224,NULL,291,'Математика'),(444,225,NULL,292,'Математика'),(445,226,NULL,293,'Математика'),(446,227,NULL,294,'Математика'),(447,228,NULL,295,'Математика'),(448,229,NULL,296,'Математика'),(449,230,NULL,297,'Математика'),(450,231,NULL,298,'Математика'),(451,232,NULL,299,'Математика'),(452,233,NULL,300,'Математика'),(453,234,NULL,301,'Математика'),(454,235,NULL,302,'Математика'),(455,236,NULL,303,'Математика'),(456,237,NULL,307,'Математика'),(457,236,NULL,304,'Математика'),(458,237,NULL,308,'Математика'),(459,236,NULL,305,'Математика'),(460,237,NULL,309,'Математика'),(461,236,NULL,306,'Математика'),(462,237,NULL,310,'Математика'),(463,236,NULL,315,'Алгебра'),(464,236,NULL,318,'Алгебра'),(465,236,NULL,316,'Алгебра'),(466,236,NULL,319,'Алгебра'),(467,236,NULL,317,'Алгебра'),(468,236,NULL,320,'Алгебра'),(469,250,NULL,321,'Алгебра'),(470,250,NULL,324,'Алгебра'),(471,250,NULL,322,'Алгебра'),(472,250,NULL,325,'Алгебра'),(473,250,NULL,323,'Алгебра'),(474,250,NULL,326,'Алгебра'),(475,250,NULL,321,'Геометрия'),(476,250,NULL,324,'Геометрия'),(477,250,NULL,322,'Геометрия'),(478,250,NULL,325,'Геометрия'),(479,250,NULL,323,'Геометрия'),(480,250,NULL,326,'Геометрия'),(481,236,NULL,315,'Геометрия'),(482,236,NULL,318,'Геометрия'),(483,236,NULL,316,'Геометрия'),(484,236,NULL,319,'Геометрия'),(485,236,NULL,317,'Геометрия'),(486,236,NULL,320,'Геометрия'),(487,237,NULL,311,'Алгебра'),(488,237,NULL,312,'Алгебра'),(489,237,NULL,313,'Алгебра'),(490,237,NULL,314,'Алгебра'),(491,237,NULL,311,'Геометрия'),(492,237,NULL,312,'Геометрия'),(493,237,NULL,313,'Геометрия'),(494,237,NULL,314,'Геометрия'),(495,276,NULL,311,'Вероятность и статистика'),(496,276,NULL,312,'Вероятность и статистика'),(497,276,NULL,313,'Вероятность и статистика'),(498,276,NULL,314,'Вероятность и статистика'),(499,276,NULL,315,'Вероятность и статистика'),(500,276,NULL,318,'Вероятность и статистика'),(501,276,NULL,316,'Вероятность и статистика'),(502,276,NULL,319,'Вероятность и статистика'),(503,276,NULL,317,'Вероятность и статистика'),(504,276,NULL,320,'Вероятность и статистика'),(505,276,NULL,311,'Информатика'),(506,276,NULL,312,'Информатика'),(507,276,NULL,313,'Информатика'),(508,276,NULL,314,'Информатика'),(509,276,NULL,315,'Информатика'),(510,276,NULL,318,'Информатика'),(511,276,NULL,316,'Информатика'),(512,276,NULL,319,'Информатика'),(513,276,NULL,317,'Информатика'),(514,276,NULL,320,'Информатика'),(515,276,NULL,321,'Информатика'),(516,276,NULL,324,'Информатика'),(517,276,NULL,322,'Информатика'),(518,276,NULL,325,'Информатика'),(519,276,NULL,323,'Информатика'),(520,276,NULL,326,'Информатика'),(521,276,NULL,321,'Вероятность и статистика'),(522,276,NULL,324,'Вероятность и статистика'),(523,276,NULL,322,'Вероятность и статистика'),(524,276,NULL,325,'Вероятность и статистика'),(525,276,NULL,323,'Вероятность и статистика'),(526,276,NULL,326,'Вероятность и статистика'),(527,308,NULL,283,'Русский язык'),(528,309,NULL,284,'Русский язык'),(529,310,NULL,285,'Русский язык'),(530,311,NULL,286,'Русский язык'),(531,312,NULL,287,'Русский язык'),(532,313,NULL,288,'Русский язык'),(533,314,NULL,289,'Русский язык'),(534,315,NULL,290,'Русский язык'),(535,316,NULL,291,'Русский язык'),(536,317,NULL,292,'Русский язык'),(537,318,NULL,293,'Русский язык'),(538,319,NULL,294,'Русский язык'),(539,320,NULL,295,'Русский язык'),(540,321,NULL,296,'Русский язык'),(541,322,NULL,297,'Русский язык'),(542,323,NULL,298,'Русский язык'),(543,324,NULL,299,'Русский язык'),(544,325,NULL,300,'Русский язык'),(545,326,NULL,301,'Русский язык'),(546,327,NULL,302,'Русский язык'),(547,308,NULL,283,'Литературное чтение'),(548,309,NULL,284,'Литературное чтение'),(549,310,NULL,285,'Литературное чтение'),(550,311,NULL,286,'Литературное чтение'),(551,312,NULL,287,'Литературное чтение'),(552,313,NULL,288,'Литературное чтение'),(553,314,NULL,289,'Литературное чтение'),(554,315,NULL,290,'Литературное чтение'),(555,316,NULL,291,'Литературное чтение'),(556,317,NULL,292,'Литературное чтение'),(557,318,NULL,293,'Литературное чтение'),(558,319,NULL,294,'Литературное чтение'),(559,320,NULL,295,'Литературное чтение'),(560,321,NULL,296,'Литературное чтение'),(561,322,NULL,297,'Литературное чтение'),(562,323,NULL,298,'Литературное чтение'),(563,324,NULL,299,'Литературное чтение'),(564,325,NULL,300,'Литературное чтение'),(565,326,NULL,301,'Литературное чтение'),(566,327,NULL,302,'Литературное чтение'),(567,348,NULL,303,'Русский язык'),(568,349,NULL,307,'Русский язык'),(569,350,NULL,311,'Русский язык'),(570,348,NULL,304,'Русский язык'),(571,349,NULL,308,'Русский язык'),(572,350,NULL,312,'Русский язык'),(573,348,NULL,305,'Русский язык'),(574,349,NULL,309,'Русский язык'),(575,350,NULL,313,'Русский язык'),(576,348,NULL,303,'Литература'),(577,349,NULL,307,'Литература'),(578,350,NULL,311,'Литература'),(579,348,NULL,304,'Литература'),(580,349,NULL,308,'Литература'),(581,350,NULL,312,'Литература'),(582,348,NULL,305,'Литература'),(583,349,NULL,309,'Литература'),(584,350,NULL,313,'Литература'),(585,366,NULL,315,'Русский язык'),(586,367,NULL,318,'Русский язык'),(587,366,NULL,316,'Русский язык'),(588,367,NULL,319,'Русский язык'),(589,366,NULL,317,'Русский язык'),(590,367,NULL,320,'Русский язык'),(591,366,NULL,315,'Литература'),(592,367,NULL,318,'Литература'),(593,366,NULL,316,'Литература'),(594,367,NULL,319,'Литература'),(595,366,NULL,317,'Литература'),(596,367,NULL,320,'Литература'),(597,366,NULL,321,'Русский язык'),(598,367,NULL,324,'Русский язык'),(599,366,NULL,322,'Русский язык'),(600,367,NULL,325,'Русский язык'),(601,366,NULL,323,'Русский язык'),(602,367,NULL,326,'Русский язык'),(603,366,NULL,321,'Литература'),(604,367,NULL,324,'Литература'),(605,366,NULL,322,'Литература'),(606,367,NULL,325,'Литература'),(607,366,NULL,323,'Литература'),(608,367,NULL,326,'Литература'),(609,348,NULL,306,'Русский язык'),(610,349,NULL,310,'Русский язык'),(611,350,NULL,314,'Русский язык'),(612,348,NULL,306,'Литература'),(613,349,NULL,310,'Литература'),(614,350,NULL,314,'Литература'),(615,396,NULL,288,'Инностранный язык'),(616,396,NULL,289,'Инностранный язык'),(617,396,NULL,290,'Инностранный язык'),(618,396,NULL,291,'Инностранный язык'),(619,396,NULL,292,'Инностранный язык'),(620,396,NULL,293,'Инностранный язык'),(621,396,NULL,294,'Инностранный язык'),(622,396,NULL,295,'Инностранный язык'),(623,396,NULL,296,'Инностранный язык'),(624,396,NULL,297,'Инностранный язык'),(625,406,NULL,298,'Инностранный язык'),(626,406,NULL,299,'Инностранный язык'),(627,406,NULL,300,'Инностранный язык'),(628,406,NULL,301,'Инностранный язык'),(629,406,NULL,302,'Инностранный язык'),(630,406,NULL,303,'Инностранный язык'),(631,406,NULL,304,'Инностранный язык'),(632,406,NULL,305,'Инностранный язык'),(633,406,NULL,306,'Инностранный язык'),(634,406,NULL,307,'Инностранный язык'),(635,406,NULL,308,'Инностранный язык'),(636,406,NULL,309,'Инностранный язык'),(637,406,NULL,310,'Инностранный язык'),(638,406,NULL,311,'Инностранный язык'),(639,406,NULL,312,'Инностранный язык'),(640,406,NULL,313,'Инностранный язык'),(641,406,NULL,314,'Инностранный язык'),(642,423,NULL,315,'Инностранный язык'),(643,423,NULL,316,'Инностранный язык'),(644,423,NULL,317,'Инностранный язык'),(645,423,NULL,318,'Инностранный язык'),(646,423,NULL,319,'Инностранный язык'),(647,423,NULL,320,'Инностранный язык'),(648,423,NULL,321,'Инностранный язык'),(649,423,NULL,322,'Инностранный язык'),(650,423,NULL,323,'Инностранный язык'),(651,423,NULL,324,'Инностранный язык'),(652,423,NULL,325,'Инностранный язык'),(653,423,NULL,326,'Инностранный язык'),(654,435,NULL,303,'История'),(655,435,NULL,304,'История'),(656,435,NULL,305,'История'),(657,435,NULL,306,'История'),(658,435,NULL,307,'История'),(659,435,NULL,308,'История'),(660,435,NULL,309,'История'),(661,435,NULL,310,'История'),(662,435,NULL,311,'История'),(663,435,NULL,312,'История'),(664,435,NULL,313,'История'),(665,435,NULL,314,'История'),(666,435,NULL,307,'Обществознание'),(667,435,NULL,308,'Обществознание'),(668,435,NULL,309,'Обществознание'),(669,435,NULL,310,'Обществознание'),(670,435,NULL,311,'Обществознание'),(671,435,NULL,312,'Обществознание'),(672,435,NULL,313,'Обществознание'),(673,435,NULL,314,'Обществознание'),(674,455,NULL,303,'География'),(675,455,NULL,304,'География'),(676,455,NULL,305,'География'),(677,455,NULL,306,'География'),(678,455,NULL,307,'География'),(679,455,NULL,308,'География'),(680,455,NULL,309,'География'),(681,455,NULL,310,'География'),(682,455,NULL,311,'География'),(683,455,NULL,312,'География'),(684,455,NULL,313,'География'),(685,455,NULL,314,'География'),(686,455,NULL,315,'География'),(687,455,NULL,316,'География'),(688,455,NULL,317,'География'),(689,470,NULL,318,'География'),(690,470,NULL,319,'География'),(691,470,NULL,320,'География'),(692,470,NULL,321,'География'),(693,470,NULL,322,'География'),(694,470,NULL,323,'География'),(695,470,NULL,324,'География'),(696,470,NULL,325,'География'),(697,470,NULL,326,'География'),(698,479,NULL,315,'История'),(699,479,NULL,316,'История'),(700,479,NULL,317,'История'),(701,479,NULL,318,'История'),(702,479,NULL,319,'История'),(703,479,NULL,320,'История'),(704,485,NULL,321,'История'),(705,485,NULL,322,'История'),(706,485,NULL,323,'История'),(707,485,NULL,324,'История'),(708,485,NULL,325,'История'),(709,485,NULL,326,'История'),(710,479,NULL,315,'Обществознание'),(711,479,NULL,316,'Обществознание'),(712,479,NULL,317,'Обществознание'),(713,479,NULL,318,'Обществознание'),(714,479,NULL,319,'Обществознание'),(715,479,NULL,320,'Обществознание'),(716,485,NULL,321,'Обществознание'),(717,485,NULL,322,'Обществознание'),(718,485,NULL,323,'Обществознание'),(719,485,NULL,324,'Обществознание'),(720,485,NULL,325,'Обществознание'),(721,485,NULL,326,'Обществознание'),(722,503,NULL,311,'Физика'),(723,503,NULL,312,'Физика'),(724,503,NULL,313,'Физика'),(725,503,NULL,314,'Физика'),(726,503,NULL,315,'Физика'),(727,503,NULL,316,'Физика'),(728,503,NULL,317,'Физика'),(729,503,NULL,318,'Физика'),(730,503,NULL,319,'Физика'),(731,503,NULL,320,'Физика'),(732,503,NULL,321,'Физика'),(733,503,NULL,322,'Физика'),(734,503,NULL,323,'Физика'),(735,503,NULL,324,'Физика'),(736,503,NULL,325,'Физика'),(737,503,NULL,326,'Физика'),(738,519,NULL,315,'Химия'),(739,519,NULL,316,'Химия'),(740,519,NULL,317,'Химия'),(741,519,NULL,318,'Химия'),(742,519,NULL,319,'Химия'),(743,519,NULL,320,'Химия'),(744,519,NULL,321,'Химия'),(745,519,NULL,322,'Химия'),(746,519,NULL,323,'Химия'),(747,519,NULL,324,'Химия'),(748,519,NULL,325,'Химия'),(749,519,NULL,326,'Химия'),(750,531,NULL,303,'Биология'),(751,531,NULL,304,'Биология'),(752,531,NULL,305,'Биология'),(753,531,NULL,306,'Биология'),(754,531,NULL,307,'Биология'),(755,531,NULL,308,'Биология'),(756,531,NULL,309,'Биология'),(757,531,NULL,310,'Биология'),(758,531,NULL,311,'Биология'),(759,531,NULL,312,'Биология'),(760,531,NULL,313,'Биология'),(761,531,NULL,314,'Биология'),(762,543,NULL,315,'Биология'),(763,543,NULL,316,'Биология'),(764,543,NULL,317,'Биология'),(765,543,NULL,318,'Биология'),(766,543,NULL,319,'Биология'),(767,543,NULL,320,'Биология'),(768,543,NULL,321,'Биология'),(769,543,NULL,322,'Биология'),(770,543,NULL,323,'Биология'),(771,543,NULL,324,'Биология'),(772,543,NULL,325,'Биология'),(773,543,NULL,326,'Биология'),(774,555,NULL,283,'Окружающий мир'),(775,556,NULL,284,'Окружающий мир'),(776,557,NULL,285,'Окружающий мир'),(777,558,NULL,286,'Окружающий мир'),(778,559,NULL,287,'Окружающий мир'),(779,560,NULL,288,'Окружающий мир'),(780,561,NULL,289,'Окружающий мир'),(781,562,NULL,290,'Окружающий мир'),(782,563,NULL,291,'Окружающий мир'),(783,564,NULL,292,'Окружающий мир'),(784,565,NULL,293,'Окружающий мир'),(785,566,NULL,294,'Окружающий мир'),(786,567,NULL,295,'Окружающий мир'),(787,568,NULL,296,'Окружающий мир'),(788,569,NULL,297,'Окружающий мир'),(789,570,NULL,298,'Окружающий мир'),(790,571,NULL,299,'Окружающий мир'),(791,572,NULL,300,'Окружающий мир'),(792,573,NULL,301,'Окружающий мир'),(793,574,NULL,302,'Окружающий мир'),(794,575,NULL,303,'Физическая культура'),(795,575,NULL,304,'Физическая культура'),(796,575,NULL,305,'Физическая культура'),(797,575,NULL,306,'Физическая культура'),(798,575,NULL,307,'Физическая культура'),(799,575,NULL,308,'Физическая культура'),(800,575,NULL,309,'Физическая культура'),(801,575,NULL,310,'Физическая культура'),(802,583,NULL,311,'Физическая культура'),(803,583,NULL,312,'Физическая культура'),(804,583,NULL,313,'Физическая культура'),(805,583,NULL,314,'Физическая культура'),(806,583,NULL,315,'Физическая культура'),(807,583,NULL,316,'Физическая культура'),(808,583,NULL,317,'Физическая культура'),(809,583,NULL,318,'Физическая культура'),(810,583,NULL,319,'Физическая культура'),(811,583,NULL,320,'Физическая культура'),(812,583,NULL,321,'Физическая культура'),(813,583,NULL,322,'Физическая культура'),(814,583,NULL,323,'Физическая культура'),(815,583,NULL,324,'Физическая культура'),(816,583,NULL,325,'Физическая культура'),(817,583,NULL,326,'Физическая культура'),(818,599,NULL,283,'Физическая культура'),(819,599,NULL,284,'Физическая культура'),(820,599,NULL,285,'Физическая культура'),(821,599,NULL,286,'Физическая культура'),(822,599,NULL,287,'Физическая культура'),(823,599,NULL,288,'Физическая культура'),(824,599,NULL,289,'Физическая культура'),(825,599,NULL,290,'Физическая культура'),(826,599,NULL,291,'Физическая культура'),(827,599,NULL,292,'Физическая культура'),(828,599,NULL,293,'Физическая культура'),(829,599,NULL,294,'Физическая культура'),(830,599,NULL,295,'Физическая культура'),(831,599,NULL,296,'Физическая культура'),(832,575,NULL,297,'Физическая культура'),(833,575,NULL,298,'Физическая культура'),(834,575,NULL,299,'Физическая культура'),(835,575,NULL,300,'Физическая культура'),(836,575,NULL,301,'Физическая культура'),(837,575,NULL,302,'Физическая культура'),(838,619,NULL,315,'ОБЖ'),(839,619,NULL,316,'ОБЖ'),(840,619,NULL,317,'ОБЖ'),(841,619,NULL,318,'ОБЖ'),(842,619,NULL,319,'ОБЖ'),(843,619,NULL,320,'ОБЖ'),(844,619,NULL,321,'ОБЖ'),(845,619,NULL,322,'ОБЖ'),(846,619,NULL,323,'ОБЖ'),(847,619,NULL,324,'ОБЖ'),(848,619,NULL,325,'ОБЖ'),(849,619,NULL,326,'ОБЖ'),(850,631,NULL,303,'Изобразительное искусство'),(851,631,NULL,304,'Изобразительное искусство'),(852,631,NULL,305,'Изобразительное искусство'),(853,631,NULL,306,'Изобразительное искусство'),(854,631,NULL,307,'Изобразительное искусство'),(855,631,NULL,308,'Изобразительное искусство'),(856,631,NULL,309,'Изобразительное искусство'),(857,631,NULL,310,'Изобразительное искусство'),(858,631,NULL,311,'Изобразительное искусство'),(859,631,NULL,312,'Изобразительное искусство'),(860,631,NULL,313,'Изобразительное искусство'),(861,631,NULL,314,'Изобразительное искусство'),(862,631,NULL,315,'Изобразительное искусство'),(863,644,NULL,283,'Изобразительное искусство'),(864,645,NULL,284,'Изобразительное искусство'),(865,646,NULL,285,'Изобразительное искусство'),(866,647,NULL,286,'Изобразительное искусство'),(867,648,NULL,287,'Изобразительное искусство'),(868,649,NULL,288,'Изобразительное искусство'),(869,650,NULL,289,'Изобразительное искусство'),(870,651,NULL,290,'Изобразительное искусство'),(871,652,NULL,291,'Изобразительное искусство'),(872,653,NULL,292,'Изобразительное искусство'),(873,654,NULL,293,'Изобразительное искусство'),(874,655,NULL,294,'Изобразительное искусство'),(875,656,NULL,295,'Изобразительное искусство'),(876,657,NULL,296,'Изобразительное искусство'),(877,658,NULL,297,'Изобразительное искусство'),(878,659,NULL,298,'Изобразительное искусство'),(879,660,NULL,299,'Изобразительное искусство'),(880,661,NULL,300,'Изобразительное искусство'),(881,662,NULL,301,'Изобразительное искусство'),(882,663,NULL,302,'Изобразительное искусство'),(883,644,NULL,283,'Технология'),(884,645,NULL,284,'Технология'),(885,646,NULL,285,'Технология'),(886,647,NULL,286,'Технология'),(887,648,NULL,287,'Технология'),(888,649,NULL,288,'Технология'),(889,650,NULL,289,'Технология'),(890,651,NULL,290,'Технология'),(891,652,NULL,291,'Технология'),(892,653,NULL,292,'Технология'),(893,654,NULL,293,'Технология'),(894,655,NULL,294,'Технология'),(895,656,NULL,295,'Технология'),(896,657,NULL,296,'Технология'),(897,658,NULL,297,'Технология'),(898,659,NULL,298,'Технология'),(899,660,NULL,299,'Технология'),(900,661,NULL,300,'Технология'),(901,662,NULL,301,'Технология'),(902,663,NULL,302,'Технология'),(903,684,NULL,283,'Музыка'),(904,684,NULL,284,'Музыка'),(905,684,NULL,285,'Музыка'),(906,684,NULL,286,'Музыка'),(907,684,NULL,287,'Музыка'),(908,684,NULL,288,'Музыка'),(909,684,NULL,289,'Музыка'),(910,684,NULL,290,'Музыка'),(911,684,NULL,291,'Музыка'),(912,684,NULL,292,'Музыка'),(913,684,NULL,293,'Музыка'),(914,684,NULL,294,'Музыка'),(915,684,NULL,295,'Музыка'),(916,684,NULL,296,'Музыка'),(917,684,NULL,297,'Музыка'),(918,684,NULL,298,'Музыка'),(919,684,NULL,299,'Музыка'),(920,684,NULL,300,'Музыка'),(921,684,NULL,301,'Музыка'),(922,684,NULL,302,'Музыка'),(923,684,NULL,303,'Музыка'),(924,684,NULL,304,'Музыка'),(925,684,NULL,305,'Музыка'),(926,684,NULL,306,'Музыка'),(927,684,NULL,307,'Музыка'),(928,684,NULL,308,'Музыка'),(929,684,NULL,309,'Музыка'),(930,684,NULL,310,'Музыка'),(931,684,NULL,311,'Музыка'),(932,684,NULL,312,'Музыка'),(933,684,NULL,313,'Музыка'),(934,684,NULL,314,'Музыка'),(935,684,NULL,315,'Музыка'),(936,684,NULL,316,'Музыка'),(937,684,NULL,317,'Музыка'),(938,719,NULL,303,'Технология'),(939,719,NULL,304,'Технология'),(940,719,NULL,305,'Технология'),(941,719,NULL,306,'Технология'),(942,719,NULL,307,'Технология'),(943,719,NULL,308,'Технология'),(944,719,NULL,309,'Технология'),(945,719,NULL,310,'Технология'),(946,719,NULL,311,'Технология'),(947,719,NULL,312,'Технология'),(948,719,NULL,313,'Технология'),(949,719,NULL,314,'Технология'),(950,719,NULL,315,'Технология'),(951,719,NULL,316,'Технология'),(952,719,NULL,317,'Технология'),(953,631,NULL,316,'Изобразительное искусство'),(954,631,NULL,317,'Изобразительное искусство'),(1347,1066,237,NULL,'Алгебра и геометрия'),(1348,1066,NULL,510,'Алгебра и геометрия'),(1349,1067,NULL,511,'Алгебра и геометрия'),(1350,1068,237,NULL,'Дискретная математика'),(1351,1069,NULL,510,'Дискретная математика'),(1352,1069,NULL,511,'Дискретная математика'),(1353,1070,237,NULL,'Информационные технологии'),(1354,1070,NULL,510,'Информационные технологии'),(1355,1070,NULL,511,'Информационные технологии'),(1356,1071,237,NULL,'Основы программирования'),(1357,1071,NULL,510,'Основы программирования'),(1358,1071,NULL,510,'Основы программирования'),(1359,1072,NULL,511,'Основы программирования'),(1360,1072,NULL,511,'Основы программирования'),(1361,1071,NULL,510,'Лабораторный практикум по программированию'),(1362,1072,NULL,511,'Лабораторный практикум по программированию'),(1363,1066,238,NULL,'Алгебра и геометрия'),(1364,1073,NULL,512,'Алгебра и геометрия'),(1365,1073,NULL,513,'Алгебра и геометрия'),(1366,1067,NULL,514,'Алгебра и геометрия'),(1367,1071,238,NULL,'Основы программирования'),(1368,1074,NULL,512,'Основы программирования'),(1369,1074,NULL,512,'Основы программирования'),(1370,1075,NULL,513,'Основы программирования'),(1371,1075,NULL,513,'Основы программирования'),(1372,1071,NULL,514,'Основы программирования'),(1373,1071,NULL,514,'Основы программирования'),(1374,1076,243,NULL,'Математическая логика и теория алгоритмов'),(1375,1076,NULL,529,'Математическая логика и теория алгоритмов'),(1376,1076,NULL,530,'Математическая логика и теория алгоритмов'),(1377,1077,243,NULL,'Технологии и методы программирования'),(1378,1075,NULL,529,'Технологии и методы программирования'),(1379,1075,NULL,530,'Технологии и методы программирования'),(1380,1078,243,NULL,'Архитектура вычислительных систем'),(1381,1079,NULL,529,'Лабораторный практикум по технологиям программирования'),(1382,1079,NULL,530,'Лабораторный практикум по технологиям программирования'),(1383,1080,NULL,529,'Основы технологии UI/UX'),(1384,1080,NULL,530,'Основы технологии UI/UX'),(1385,1068,244,NULL,'Дискретная математика'),(1386,1068,NULL,531,'Дискретная математика'),(1387,1068,NULL,532,'Дискретная математика'),(1388,1081,244,NULL,'Технологии и методы программирования'),(1389,1082,NULL,531,'Технологии и методы программирования'),(1390,1082,NULL,532,'Технологии и методы программирования'),(1391,1080,244,NULL,'Основы технологии UI/UX'),(1392,1080,NULL,531,'Основы технологии UI/UX'),(1393,1080,NULL,532,'Основы технологии UI/UX'),(1394,1083,246,NULL,'Информационная безопасность'),(1395,1083,NULL,539,'Информационная безопасность'),(1396,1083,NULL,540,'Информационная безопасность'),(1397,1079,248,NULL,'Криптографические методы защиты информации'),(1401,1080,249,NULL,'Объектно-ориентированный анализ и проектирование'),(1402,1080,NULL,547,'Объектно-ориентированный анализ и проектирование'),(1403,1080,NULL,548,'Объектно-ориентированный анализ и проектирование'),(1404,1080,249,NULL,'Технологии баз данных'),(1405,1070,NULL,547,'Технологии баз данных'),(1406,1070,NULL,548,'Технологии баз данных'),(1407,1085,249,NULL,'Компьютерные сети'),(1408,1085,NULL,547,'Компьютерные сети'),(1409,1085,NULL,548,'Компьютерные сети'),(1410,1086,249,NULL,'Теория информации'),(1411,1086,NULL,547,'Теория информации'),(1412,1086,NULL,548,'Теория информации'),(1413,1083,249,NULL,'Компьютерная графика'),(1414,1083,NULL,547,'Компьютерная графика'),(1415,1083,NULL,548,'Компьютерная графика'),(1416,1079,249,NULL,'Программирование на Python'),(1417,1087,249,NULL,'Программирование на Java'),(1418,1086,NULL,549,'Теория информации'),(1419,1086,NULL,550,'Теория информации'),(1420,1076,250,NULL,'Математическая логика и теория алгоритмов'),(1421,1076,NULL,549,'Математическая логика и теория алгоритмов'),(1422,1076,NULL,550,'Математическая логика и теория алгоритмов'),(1423,1088,250,NULL,'Теоретические основы компьютерной безопасности'),(1424,1084,NULL,549,'Теоретические основы компьютерной безопасности'),(1425,1084,NULL,550,'Теоретические основы компьютерной безопасности'),(1426,1070,NULL,549,'Технологии баз данных'),(1427,1070,NULL,550,'Технологии баз данных'),(1428,1081,250,NULL,'Введение в анализ и разработку систем'),(1429,1081,NULL,549,'Введение в анализ и разработку систем'),(1430,1081,NULL,550,'Введение в анализ и разработку систем'),(1431,1079,254,NULL,'Криптографические методы защиты информации'),(1435,1089,253,NULL,'Теория игр и принятие решений'),(1436,1089,NULL,559,'Теория игр и принятие решений'),(1437,1089,NULL,560,'Теория игр и принятие решений'),(1438,1089,NULL,561,'Теория игр и принятие решений'),(1439,1090,255,NULL,'Теория игр и принятие решений'),(1440,1090,NULL,564,'Теория игр и принятие решений'),(1441,1090,NULL,565,'Теория игр и принятие решений'),(1442,1090,NULL,566,'Теория игр и принятие решений'),(1443,1086,255,NULL,'Информационная безопасность компьютерных сетей'),(1444,1086,NULL,564,'Информационная безопасность компьютерных сетей'),(1445,1086,NULL,565,'Информационная безопасность компьютерных сетей'),(1446,1086,NULL,566,'Информационная безопасность компьютерных сетей'),(1447,1091,255,NULL,'Интеллектуальные системы'),(1448,1091,NULL,564,'Интеллектуальные системы'),(1449,1091,NULL,565,'Интеллектуальные системы'),(1450,1091,NULL,566,'Интеллектуальные системы'),(1451,1081,255,NULL,'Технологии и стандарты разработки ПО'),(1452,1081,255,NULL,'Технологии и стандарты разработки ПО'),(1453,1081,255,NULL,'Геоинформационные системы'),(1454,1081,255,NULL,'Геоинформационные системы'),(1455,1079,255,NULL,'Системы параллельных вычислений'),(1456,1079,255,NULL,'Системы параллельных вычислений'),(1457,1078,255,NULL,'Банковская информатика'),(1458,1078,255,NULL,'Банковская информатика'),(1459,1070,NULL,564,'Командная разработка ПО'),(1460,1070,NULL,565,'Командная разработка ПО'),(1461,1070,NULL,566,'Командная разработка ПО'),(1462,1089,255,NULL,'Моделирование информационных процессов'),(1463,1089,NULL,564,'Моделирование информационных процессов'),(1464,1089,NULL,565,'Моделирование информационных процессов'),(1465,1089,NULL,566,'Моделирование информационных процессов'),(1466,1080,255,NULL,'Компьютерное зрение'),(1467,1080,NULL,564,'Компьютерное зрение'),(1468,1080,NULL,565,'Компьютерное зрение'),(1469,1080,NULL,566,'Компьютерное зрение'),(1470,1088,NULL,567,'Комплексное обеспечение информационной безопасности'),(1471,1088,NULL,567,'Комплексное обеспечение информационной безопасности'),(1472,1070,NULL,567,'Проектирование программного обеспечения'),(1473,1070,NULL,567,'Проектирование программного обеспечения'),(1474,1081,NULL,567,'Технологии и стандартны разработки ПО'),(1475,1081,NULL,567,'Технологии и стандартны разработки ПО'),(1476,1080,NULL,567,'Компьютерное зрение'),(1477,1080,NULL,567,'Компьютерное зрение'),(1478,1070,NULL,567,'Командная разработка ПО'),(1479,1070,NULL,567,'Командная разработка ПО'),(1480,1076,250,NULL,'Математическая логика и теория алгоритмов'),(1481,1079,253,NULL,'Криптографические методы защиты информации'),(1482,1080,256,NULL,'Компьютерное зрение');
/*!40000 ALTER TABLE `teacher_classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `type_id` int NOT NULL,
  `name_type` varchar(45) NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'университет'),(2,'школа');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_place`
--

DROP TABLE IF EXISTS `type_place`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_place` (
  `id_type_place` int NOT NULL,
  `type_pl` varchar(45) NOT NULL,
  PRIMARY KEY (`id_type_place`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_place`
--

LOCK TABLES `type_place` WRITE;
/*!40000 ALTER TABLE `type_place` DISABLE KEYS */;
INSERT INTO `type_place` VALUES (1,'lect'),(2,'lab'),(3,'practic');
/*!40000 ALTER TABLE `type_place` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `login` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (23,'youngest','regopi09'),(25,'yekaterina.shlyapnikova@mail.ru','regoPI!09'),(26,'ya.shl@yandex.ru','kathy_laip123');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weeks`
--

DROP TABLE IF EXISTS `weeks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weeks` (
  `id_week` int NOT NULL,
  `week_day` varchar(50) NOT NULL,
  PRIMARY KEY (`id_week`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weeks`
--

LOCK TABLES `weeks` WRITE;
/*!40000 ALTER TABLE `weeks` DISABLE KEYS */;
INSERT INTO `weeks` VALUES (1,'понедельник'),(2,'вторник'),(3,'среда'),(4,'четверг'),(5,'пятница'),(6,'суббота');
/*!40000 ALTER TABLE `weeks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_folder`
--

DROP TABLE IF EXISTS `work_folder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_folder` (
  `work_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `theme` varchar(200) NOT NULL,
  `date` datetime(6) NOT NULL,
  `type_institue` int NOT NULL,
  `period` int DEFAULT NULL,
  `start_time` date DEFAULT NULL,
  `end_time` date DEFAULT NULL,
  `acc_hour` int DEFAULT NULL,
  PRIMARY KEY (`work_id`),
  KEY `typr_fc_idx` (`type_institue`),
  KEY `users_fc_idx` (`user_id`),
  CONSTRAINT `typr_fc` FOREIGN KEY (`type_institue`) REFERENCES `type` (`type_id`),
  CONSTRAINT `users_fc` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2294 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_folder`
--

LOCK TABLES `work_folder` WRITE;
/*!40000 ALTER TABLE `work_folder` DISABLE KEYS */;
INSERT INTO `work_folder` VALUES (69,25,'Расписание КФУ ИВМиИТ 2023-2024 1 семестр','2024-03-25 18:18:58.000000',1,NULL,NULL,NULL,NULL),(70,25,'школа 146 3 четверть','2024-03-25 18:42:39.000000',2,NULL,NULL,NULL,NULL),(71,25,'Школа 146 4 четверть 2024 год','2024-03-25 18:50:49.000000',2,1,'2024-04-01','2024-05-31',45),(72,25,'школа 123 2 четверть','2024-03-25 18:52:24.000000',1,NULL,NULL,NULL,NULL),(73,25,'Расписание КФУ ИВМиИТ 2022-2023 2 семестр','2024-03-26 16:10:11.000000',1,2,'2024-02-09','2024-05-31',40),(74,25,'школа 78 2 четверть 2023-2024','2024-03-26 16:11:50.000000',2,1,'2024-04-01','2024-05-30',45);
/*!40000 ALTER TABLE `work_folder` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `work_folder_AFTER_UPDATE` AFTER UPDATE ON `work_folder` FOR EACH ROW BEGIN
	IF OLD.type_institue <> NEW.type_institue THEN
		DELETE FROM courses WHERE work_id = NEW.work_id;
		DELETE FROM place WHERE work_id = NEW.work_id;
		DELETE FROM schedule WHERE work_id = NEW.work_id;
		DELETE FROM grafic WHERE sch_id = NEW.work_id;

	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-06 23:24:57
