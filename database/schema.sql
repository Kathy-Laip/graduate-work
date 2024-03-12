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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (1,29,'09-331',30),(2,29,'09-332',28),(3,29,'09-333',33);
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `course_id` int NOT NULL,
  `course_number` int NOT NULL,
  `work_id` int NOT NULL,
  PRIMARY KEY (`course_id`),
  KEY `wk_fc_idx` (`work_id`),
  KEY `wk_id_cours_idx` (`work_id`),
  CONSTRAINT `wk_id_cours` FOREIGN KEY (`work_id`) REFERENCES `work_folder` (`work_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,1,1),(3,2,1),(5,3,1);
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
  KEY `dr_fc_idx` (`course_id`),
  CONSTRAINT `dr_fc` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direction`
--

LOCK TABLES `direction` WRITE;
/*!40000 ALTER TABLE `direction` DISABLE KEYS */;
INSERT INTO `direction` VALUES (29,1,'ФИИТ 09.02.03 2023');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grafic`
--

LOCK TABLES `grafic` WRITE;
/*!40000 ALTER TABLE `grafic` DISABLE KEYS */;
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
  `teacher_id` int DEFAULT NULL,
  `place_name` varchar(100) NOT NULL,
  `week_day` int DEFAULT NULL,
  `type_place` int DEFAULT NULL,
  `count_seat` int DEFAULT NULL,
  `start_work` varchar(50) DEFAULT NULL,
  `end_work` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`place_id`),
  KEY `type_place_fk_idx` (`type_place`),
  KEY `work_place_fk_idx` (`work_id`),
  KEY `wekks_place_fk_idx` (`week_day`),
  KEY `teacher_place_idx` (`teacher_id`),
  CONSTRAINT `teacher_place` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`),
  CONSTRAINT `type_place_fk` FOREIGN KEY (`type_place`) REFERENCES `type_place` (`id_type_place`),
  CONSTRAINT `wekks_place_fk` FOREIGN KEY (`week_day`) REFERENCES `weeks` (`id_week`),
  CONSTRAINT `work_place_fk` FOREIGN KEY (`work_id`) REFERENCES `work_folder` (`work_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `place`
--

LOCK TABLES `place` WRITE;
/*!40000 ALTER TABLE `place` DISABLE KEYS */;
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
  CONSTRAINT `class_fk_school` FOREIGN KEY (`class_id`) REFERENCES `classes` (`classes_id`),
  CONSTRAINT `direction_fk` FOREIGN KEY (`direction_id`) REFERENCES `direction` (`direction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_direction`
--

LOCK TABLES `plan_direction` WRITE;
/*!40000 ALTER TABLE `plan_direction` DISABLE KEYS */;
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
  `start_date` varchar(100) NOT NULL,
  `end_date` varchar(100) NOT NULL,
  PRIMARY KEY (`sch_id`),
  KEY `work_sch_fk_idx` (`work_id`),
  KEY `grafic_sch_fk_idx` (`grafic_id`),
  KEY `place_sch_fk_idx` (`place_id`),
  KEY `teach_sch_fk_idx` (`teacher_id`),
  KEY `direction_sch_fk_idx` (`direction_id`),
  KEY `week_sch_fk_idx` (`week_day`),
  KEY `sch_workk_fkk_idx` (`work_id`),
  KEY `sch_class_fkk` (`classes_id`),
  CONSTRAINT `sch_class_fkk` FOREIGN KEY (`classes_id`) REFERENCES `classes` (`classes_id`),
  CONSTRAINT `sch_dir_fkk` FOREIGN KEY (`direction_id`) REFERENCES `direction` (`direction_id`),
  CONSTRAINT `sch_graficc_fkk` FOREIGN KEY (`grafic_id`) REFERENCES `grafic` (`time_id`),
  CONSTRAINT `sch_place_fkk` FOREIGN KEY (`place_id`) REFERENCES `place` (`place_id`),
  CONSTRAINT `sch_teach_fkk` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`),
  CONSTRAINT `sch_week_fkk` FOREIGN KEY (`week_day`) REFERENCES `weeks` (`id_week`),
  CONSTRAINT `sch_workk_fkk` FOREIGN KEY (`work_id`) REFERENCES `work_folder` (`work_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
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
  `name_cafedra_or_napr` varchar(100) NOT NULL,
  PRIMARY KEY (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
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
  CONSTRAINT `reacher_class_fk` FOREIGN KEY (`classes_id`) REFERENCES `classes` (`classes_id`),
  CONSTRAINT `teach_id_fk` FOREIGN KEY (`id_teacher`) REFERENCES `teacher` (`teacher_id`),
  CONSTRAINT `teacher_dir_fk` FOREIGN KEY (`direction_id`) REFERENCES `direction` (`direction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_classes`
--

LOCK TABLES `teacher_classes` WRITE;
/*!40000 ALTER TABLE `teacher_classes` DISABLE KEYS */;
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
  `type_place` varchar(45) NOT NULL,
  PRIMARY KEY (`id_type_place`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_place`
--

LOCK TABLES `type_place` WRITE;
/*!40000 ALTER TABLE `type_place` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'yekaterina.shlyapnikova@yandex.ru','regopi09');
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
  `start_time` date NOT NULL,
  `end_time` date NOT NULL,
  `acc_hour` int DEFAULT NULL,
  PRIMARY KEY (`work_id`),
  KEY `wk_fc_idx` (`user_id`),
  KEY `typr_fc_idx` (`type_institue`),
  CONSTRAINT `typr_fc` FOREIGN KEY (`type_institue`) REFERENCES `type` (`type_id`),
  CONSTRAINT `wk_fc` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_folder`
--

LOCK TABLES `work_folder` WRITE;
/*!40000 ALTER TABLE `work_folder` DISABLE KEYS */;
INSERT INTO `work_folder` VALUES (1,1,'Расписание 2023/2024 2 семестр ИВМИИТ','2024-02-09',1,2,'2024-02-09','2024-05-31',NULL);
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

-- Dump completed on 2024-03-12 17:45:38
