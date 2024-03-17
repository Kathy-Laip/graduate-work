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
  CONSTRAINT `work_id_cafedra` FOREIGN KEY (`work_id`) REFERENCES `work_folder` (`work_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cafedra_or_section`
--

LOCK TABLES `cafedra_or_section` WRITE;
/*!40000 ALTER TABLE `cafedra_or_section` DISABLE KEYS */;
INSERT INTO `cafedra_or_section` VALUES (1,'КСАИТ',4),(2,'КСАИТ',14),(3,'Русский язык и литература',15),(4,'Русский язык и литература',15),(5,'Русский язык и литература',15),(6,'Русский язык и литература',15),(7,'Русский язык и литература',15),(8,'Русский язык и литература',15),(9,'Русский язык и литература',15),(10,'Русский язык и литература',15);
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
  CONSTRAINT `cl_fc` FOREIGN KEY (`direction_id`) REFERENCES `direction` (`direction_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (1,29,'09-331',30),(2,29,'09-332',28),(3,29,'09-333',33),(10,30,'09-041',18),(11,30,'09-042',12),(12,34,'09-051',20),(13,34,'09-052',30),(20,40,'А',32),(21,40,'Б',32),(22,40,'А',32),(23,40,'Б',32),(24,40,'А',32),(25,40,'Б',32),(26,40,'А',32),(27,40,'Б',32),(28,40,'А',32),(29,40,'Б',32);
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
  CONSTRAINT `wk_fc_1` FOREIGN KEY (`work_id`) REFERENCES `work_folder` (`work_id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,1,1),(3,2,1),(5,3,1),(6,1,4),(7,2,4),(8,3,4),(9,4,4),(10,1,4),(11,1,14),(12,2,14),(13,1,15),(14,2,15),(15,3,15),(16,4,15),(17,5,15),(18,6,15),(19,7,15),(20,1,15),(21,2,15),(22,3,15),(23,4,15),(24,5,15),(25,6,15),(26,7,15),(27,1,15),(28,2,15),(29,3,15),(30,4,15),(31,5,15),(32,6,15),(33,7,15),(34,1,15),(35,2,15),(36,3,15),(37,4,15),(38,5,15),(39,6,15),(40,7,15),(41,8,15),(42,9,15),(43,1,15),(44,2,15),(45,3,15),(46,4,15),(47,5,15),(48,6,15),(49,7,15),(50,8,15),(51,9,15),(52,1,15),(53,2,15),(54,3,15),(55,4,15),(56,5,15),(57,6,15),(58,7,15),(59,8,15),(60,9,15),(61,1,15),(62,2,15),(63,3,15),(64,4,15),(65,5,15),(66,6,15),(67,7,15),(68,8,15),(69,9,15),(70,1,15),(71,2,15),(72,3,15),(73,4,15),(74,5,15),(75,6,15),(76,7,15),(77,8,15),(78,9,15);
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
  CONSTRAINT `courses_fc` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direction`
--

LOCK TABLES `direction` WRITE;
/*!40000 ALTER TABLE `direction` DISABLE KEYS */;
INSERT INTO `direction` VALUES (29,1,'ФИИТ 09.02.03 2023'),(30,6,'ФИИТ'),(31,6,'ФИИТ'),(32,6,'ФИИТ'),(33,11,'ФИИТ'),(34,11,'ПИ'),(35,11,'ПМИ'),(36,11,'ИСТ'),(40,41,'8'),(41,41,'8'),(42,41,'8'),(43,41,'8'),(44,41,'8');
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
  CONSTRAINT `wk_id` FOREIGN KEY (`sch_id`) REFERENCES `work_folder` (`work_id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grafic`
--

LOCK TABLES `grafic` WRITE;
/*!40000 ALTER TABLE `grafic` DISABLE KEYS */;
INSERT INTO `grafic` VALUES (1,'8:30','10:10',4),(2,'10:20','11:50',4),(3,'12:00','13:10',4),(4,'13:30','14:10',4),(5,'14:30','15:10',4),(6,'8:30','10:10',4),(7,'10:20','11:50',4),(8,'12:00','13:10',4),(9,'13:30','14:10',4),(10,'14:30','15:10',4),(11,'8:30','10:10',4),(12,'10:20','11:50',4),(13,'12:00','13:10',4),(14,'13:30','14:10',4),(15,'14:30','15:10',4),(16,'8:30','10:10',14),(17,'10:20','11:50',14),(18,'12:00','13:10',14),(19,'13:30','14:10',14),(20,'14:30','15:10',14),(21,'8:30','9:15',15),(22,'9:20','10:05',15),(23,'10:15','11:00',15),(24,'11:30','12:15',15),(25,'12:40','13:25',15),(26,'8:30','9:15',15),(27,'9:20','10:05',15),(28,'10:15','11:00',15),(29,'11:30','12:15',15),(30,'12:40','13:25',15),(31,'8:30','9:15',15),(32,'9:20','10:05',15),(33,'10:15','11:00',15),(34,'11:30','12:15',15),(35,'12:40','13:25',15),(36,'8:30','9:15',15),(37,'9:20','10:05',15),(38,'10:15','11:00',15),(39,'11:30','12:15',15),(40,'12:40','13:25',15),(41,'8:30','9:15',15),(42,'9:20','10:05',15),(43,'10:15','11:00',15),(44,'11:30','12:15',15),(45,'12:40','13:25',15),(46,'8:30','9:15',15),(47,'9:20','10:05',15),(48,'10:15','11:00',15),(49,'11:30','12:15',15),(50,'12:40','13:25',15),(51,'8:30','9:15',15),(52,'9:20','10:05',15),(53,'10:15','11:00',15),(54,'11:30','12:15',15),(55,'12:40','13:25',15),(56,'8:30','9:15',15),(57,'9:20','10:05',15),(58,'10:15','11:00',15),(59,'11:30','12:15',15),(60,'12:40','13:25',15);
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
  CONSTRAINT `work_place_fk` FOREIGN KEY (`work_id`) REFERENCES `work_folder` (`work_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `place`
--

LOCK TABLES `place` WRITE;
/*!40000 ALTER TABLE `place` DISABLE KEYS */;
INSERT INTO `place` VALUES (1,4,NULL,'808',1,1,30,'8:00','16:00'),(16,4,NULL,'808',1,3,30,'8:00','16:00'),(17,14,NULL,'1010',2,3,40,'8:00','16:00'),(18,14,NULL,'1012',2,3,30,'8:00','16:00'),(19,14,NULL,'1206',2,3,35,'8:00','16:00'),(20,14,NULL,'802',2,3,35,'8:00','16:00'),(21,15,'Ибрагимова Лейсан Раисовная','101',NULL,NULL,NULL,NULL,NULL),(22,15,'Иванов Иван Иванович','216',NULL,NULL,NULL,NULL,NULL),(23,15,'Ибрагимова Лейсан Раисовная','101',NULL,NULL,NULL,NULL,NULL),(24,15,'Иванов Иван Иванович','216',NULL,NULL,NULL,NULL,NULL),(25,15,'Ибрагимова Лейсан Раисовная','101',NULL,NULL,NULL,NULL,NULL),(26,15,'Иванов Иван Иванович','216',NULL,NULL,NULL,NULL,NULL),(27,15,'Ибрагимова Лейсан Раисовная','101',NULL,NULL,NULL,NULL,NULL),(28,15,'Иванов Иван Иванович','216',NULL,NULL,NULL,NULL,NULL),(29,15,'Ибрагимова Лейсан Раисовная','101',NULL,NULL,NULL,NULL,NULL),(30,15,'Иванов Иван Иванович','216',NULL,NULL,NULL,NULL,NULL),(31,15,'Ибрагимова Лейсан Раисовная','101',NULL,NULL,NULL,NULL,NULL),(32,15,'Иванов Иван Иванович','216',NULL,NULL,NULL,NULL,NULL),(33,15,'Ибрагимова Лейсан Раисовная','101',NULL,NULL,NULL,NULL,NULL),(34,15,'Иванов Иван Иванович','216',NULL,NULL,NULL,NULL,NULL),(35,15,'Ибрагимова Лейсан Раисовная','101',NULL,NULL,NULL,NULL,NULL),(36,15,'Иванов Иван Иванович','216',NULL,NULL,NULL,NULL,NULL);
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
  CONSTRAINT `class_fk_school` FOREIGN KEY (`class_id`) REFERENCES `classes` (`classes_id`) ON DELETE CASCADE,
  CONSTRAINT `direction_fk` FOREIGN KEY (`direction_id`) REFERENCES `direction` (`direction_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_direction`
--

LOCK TABLES `plan_direction` WRITE;
/*!40000 ALTER TABLE `plan_direction` DISABLE KEYS */;
INSERT INTO `plan_direction` VALUES (1,30,NULL,'алгебра и геометрия','+','+',NULL,NULL,36,0,54),(2,34,NULL,'Программная инженерия','+','+',NULL,NULL,36,0,18),(3,34,NULL,'Базы данных','+','+',NULL,NULL,36,0,36),(4,34,NULL,'Дискретная математика','+','+',NULL,NULL,36,0,18),(5,34,NULL,'Анализ сложных систем','+','+',NULL,NULL,36,0,36),(6,34,NULL,'Математический анализ','+','+',NULL,NULL,36,0,54),(7,34,NULL,'Информационная безопасность','+','+',NULL,NULL,36,0,36),(8,34,NULL,'Информационные технологии','+','+',NULL,NULL,36,0,18),(58,NULL,20,'Русский язык',NULL,NULL,NULL,6,NULL,NULL,NULL),(59,NULL,20,'Литература',NULL,NULL,NULL,7,NULL,NULL,NULL),(60,NULL,20,'Математика',NULL,NULL,NULL,7,NULL,NULL,NULL),(61,NULL,20,'История',NULL,NULL,NULL,3,NULL,NULL,NULL),(62,NULL,20,'Обществознание',NULL,NULL,NULL,2,NULL,NULL,NULL),(63,NULL,20,'Биология',NULL,NULL,NULL,1,NULL,NULL,NULL),(64,NULL,20,'Физкультура',NULL,NULL,NULL,3,NULL,NULL,NULL);
/*!40000 ALTER TABLE `plan_direction` ENABLE KEYS */;
UNLOCK TABLES;

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
  `end_date` varchar(100) DEFAULT NULL,
  `name_sub` varchar(100) NOT NULL,
  PRIMARY KEY (`sch_id`),
  KEY `work_sch_fk_idx` (`work_id`),
  KEY `grafic_sch_fk_idx` (`grafic_id`),
  KEY `teach_sch_fk_idx` (`teacher_id`),
  KEY `week_sch_fk_idx` (`week_day`),
  KEY `sch_workk_fkk_idx` (`work_id`),
  CONSTRAINT `sch_graficc_fkk` FOREIGN KEY (`grafic_id`) REFERENCES `grafic` (`time_id`) ON DELETE CASCADE,
  CONSTRAINT `sch_teach_fkk` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE CASCADE,
  CONSTRAINT `sch_week_fkk` FOREIGN KEY (`week_day`) REFERENCES `weeks` (`id_week`),
  CONSTRAINT `sch_workk_fkk` FOREIGN KEY (`work_id`) REFERENCES `work_folder` (`work_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES (1,14,16,20,3,34,NULL,2,'2023-02-13','2023-05-29',''),(2,14,16,20,3,34,NULL,2,'2023-02-13','2023-05-29',''),(3,14,16,20,3,34,NULL,2,'2023-02-13','2023-05-29',''),(4,15,21,NULL,7,NULL,0,2,NULL,NULL,''),(5,15,21,NULL,7,NULL,0,2,NULL,NULL,''),(6,15,21,NULL,7,NULL,0,2,NULL,NULL,''),(7,15,21,NULL,7,NULL,20,2,NULL,NULL,''),(8,15,21,NULL,7,NULL,20,2,NULL,NULL,''),(9,15,21,NULL,7,NULL,20,2,NULL,NULL,''),(10,15,21,NULL,7,NULL,20,2,NULL,NULL,''),(11,15,21,NULL,7,NULL,20,2,NULL,NULL,'');
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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (2,'Андрианова Анастасия Александровна',1),(3,'Андрианова Анастасия Александровна',2),(4,'Васильев Александр Валерьевич',2),(5,'Асхатов Радик Мухаметгалеевич',2),(6,'Еникеева Разиль Радикович',2),(7,'Ибрагимова Лейсан Раисовная',3),(8,'Иванов Иван Иванович',3),(9,'Шляпникова Екатерина Сергеевна',3),(10,'Попов Игорь Вячеславович',3),(11,'Ибрагимова Лейсан Раисовная',3),(12,'Иванов Иван Иванович',3),(13,'Шляпникова Екатерина Сергеевна',3),(14,'Попов Игорь Вячеславович',3),(15,'Ибрагимова Лейсан Раисовная',3),(16,'Иванов Иван Иванович',3),(17,'Шляпникова Екатерина Сергеевна',3),(18,'Попов Игорь Вячеславович',3),(19,'Ибрагимова Лейсан Раисовная',3),(20,'Иванов Иван Иванович',3),(21,'Шляпникова Екатерина Сергеевна',3),(22,'Попов Игорь Вячеславович',3),(23,'Ибрагимова Лейсан Раисовная',3),(24,'Иванов Иван Иванович',3),(25,'Шляпникова Екатерина Сергеевна',3),(26,'Попов Игорь Вячеславович',3),(27,'Ибрагимова Лейсан Раисовная',3),(28,'Иванов Иван Иванович',3),(29,'Шляпникова Екатерина Сергеевна',3),(30,'Попов Игорь Вячеславович',3),(31,'Ибрагимова Лейсан Раисовная',3),(32,'Иванов Иван Иванович',3),(33,'Шляпникова Екатерина Сергеевна',3),(34,'Попов Игорь Вячеславович',3),(35,'Ибрагимова Лейсан Раисовная',3),(36,'Иванов Иван Иванович',3),(37,'Шляпникова Екатерина Сергеевна',3),(38,'Попов Игорь Вячеславович',3);
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
  CONSTRAINT `teach_id_fk` FOREIGN KEY (`id_teacher`) REFERENCES `teacher` (`teacher_id`) ON DELETE CASCADE,
  CONSTRAINT `teacher_dir_fk` FOREIGN KEY (`direction_id`) REFERENCES `direction` (`direction_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_classes`
--

LOCK TABLES `teacher_classes` WRITE;
/*!40000 ALTER TABLE `teacher_classes` DISABLE KEYS */;
INSERT INTO `teacher_classes` VALUES (1,2,30,NULL,'Программная инженерия'),(3,2,30,NULL,'Программная инженерия'),(5,2,30,NULL,'Программная инженерия'),(13,2,NULL,10,'Программная инженерия'),(14,3,34,NULL,'Программная инженерия'),(15,3,NULL,12,'Программная инженерия'),(22,7,NULL,20,'Русский язык'),(23,7,NULL,20,'Литература'),(24,7,NULL,20,'Русский язык'),(25,7,NULL,20,'Литература'),(26,7,NULL,20,'Русский язык'),(27,7,NULL,20,'Литература'),(28,7,NULL,20,'Русский язык'),(29,7,NULL,20,'Литература'),(30,7,NULL,20,'Русский язык'),(31,7,NULL,20,'Литература');
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'yekaterina.shlyapnikova@yandex.ru','regopi09'),(2,'yekaterina1','re09'),(3,'yaKatya','123regopi'),(4,'yaKatya','123regopi'),(5,'yaKatya','123regopi'),(6,'yaKatya','123regopi'),(7,'yaKatya','123regopi'),(8,'yaKatya','123regopi'),(9,'yaKatya','123regopi'),(10,'yaKatya','123regopi'),(11,'yaKatya','123regopi'),(12,'yaKatya','123regopi'),(13,'ya.shl@yandex.ru','kathy_laip123'),(14,'school.shl@yandex.ru','wscln4'),(15,'school.shl@yandex.ru','wscln4'),(16,'school.shl@yandex.ru','wscln4'),(17,'school.shl@yandex.ru','wscln4'),(18,'school.shl@yandex.ru','wscln4'),(19,'school.shl@yandex.ru','wscln4'),(20,'school.shl@yandex.ru','wscln4'),(21,'school.shl@yandex.ru','wscln4');
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
  `date` date NOT NULL,
  `type_institue` int NOT NULL,
  `period` int DEFAULT NULL,
  `start_time` date DEFAULT NULL,
  `end_time` date DEFAULT NULL,
  `acc_hour` int DEFAULT NULL,
  PRIMARY KEY (`work_id`),
  KEY `typr_fc_idx` (`type_institue`),
  KEY `users_fc_idx` (`user_id`),
  CONSTRAINT `typr_fc` FOREIGN KEY (`type_institue`) REFERENCES `type` (`type_id`),
  CONSTRAINT `users_fc` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_folder`
--

LOCK TABLES `work_folder` WRITE;
/*!40000 ALTER TABLE `work_folder` DISABLE KEYS */;
INSERT INTO `work_folder` VALUES (1,1,'Расписание 2023/2024 2 семестр ИВМИИТ','2024-02-09',1,2,'2024-02-09','2024-05-31',NULL),(3,1,'Расписани ИВМИИТ 1 семестр 2023-2024','2023-03-11',1,1,'2023-02-11','2023-05-31',40),(4,3,'Расписание КФУ ИВМИИТ 2023-2024 1 семестр','2023-03-19',1,1,'2023-02-09','2023-05-31',40),(5,3,'Расписание КФУ ИВМИИТ 2023-2024 1 семестр','2023-03-19',1,NULL,NULL,NULL,NULL),(6,3,'Расписание КФУ ИВМИИТ 2023-2024 1 семестр','2023-03-19',1,NULL,NULL,NULL,NULL),(7,3,'Расписание КФУ ИВМИИТ 2023-2024 1 семестр','2023-03-19',1,NULL,NULL,NULL,NULL),(8,3,'Расписание КФУ ИВМИИТ 2023-2024 1 семестр','2023-03-19',1,NULL,NULL,NULL,NULL),(9,3,'Расписание КФУ ИВМИИТ 2023-2024 1 семестр','2023-03-19',1,NULL,NULL,NULL,NULL),(10,3,'Расписание КФУ ИВМИИТ 2023-2024 1 семестр','2023-03-19',1,NULL,NULL,NULL,NULL),(11,3,'Расписание КФУ ИВМИИТ 2023-2024 1 семестр','2023-03-19',1,NULL,NULL,NULL,NULL),(12,3,'Расписание КФУ ИВМИИТ 2023-2024 1 семестр','2023-03-19',1,NULL,NULL,NULL,NULL),(13,3,'Расписание КФУ ИВМИИТ 2023-2024 1 семестр','2023-03-19',1,NULL,NULL,NULL,NULL),(14,13,'Расписание КФУ ИВМИИТ 2023-2024 2 семестр','2023-01-19',1,1,'2023-02-09','2023-05-31',40),(15,14,'Расписание школа 146 1 четверть 2023 год','2023-08-19',2,1,NULL,NULL,45),(16,14,'Расписание школа 146 1 четверть 2023 год','2023-08-19',2,NULL,NULL,NULL,NULL),(17,14,'Расписание школа 146 1 четверть 2023 год','2023-08-19',2,NULL,NULL,NULL,NULL),(18,14,'Расписание школа 146 1 четверть 2023 год','2023-08-19',2,NULL,NULL,NULL,NULL),(19,14,'Расписание школа 146 1 четверть 2023 год','2023-08-19',2,NULL,NULL,NULL,NULL),(20,14,'Расписание школа 146 1 четверть 2023 год','2023-08-19',2,NULL,NULL,NULL,NULL),(21,14,'Расписание школа 146 1 четверть 2023 год','2023-08-19',2,NULL,NULL,NULL,NULL),(22,14,'Расписание школа 146 1 четверть 2023 год','2023-08-19',2,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `work_folder` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-17 11:52:13
