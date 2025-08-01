-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: crud_user
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `comentario`
--

DROP TABLE IF EXISTS `comentario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contenido` varchar(500) NOT NULL,
  `fecha_de_creacion` datetime NOT NULL,
  `editado` tinyint NOT NULL,
  `id_tarea` int DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_008312c71ea76f43fb4bc7467ea` (`id_tarea`),
  KEY `FK_c28516f059447f007f416d060ab` (`id_usuario`),
  CONSTRAINT `FK_008312c71ea76f43fb4bc7467ea` FOREIGN KEY (`id_tarea`) REFERENCES `tarea` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_c28516f059447f007f416d060ab` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentario`
--

LOCK TABLES `comentario` WRITE;
/*!40000 ALTER TABLE `comentario` DISABLE KEYS */;
/*!40000 ALTER TABLE `comentario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyecto`
--

DROP TABLE IF EXISTS `proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyecto` (
  `fecha_de_creacion` datetime NOT NULL,
  `completado` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `fecha_de_finalizacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyecto`
--

LOCK TABLES `proyecto` WRITE;
/*!40000 ALTER TABLE `proyecto` DISABLE KEYS */;
INSERT INTO `proyecto` VALUES ('2025-06-30 09:45:15',NULL,1,'Proyecto Aurora',NULL),('2025-06-30 09:45:15',NULL,2,'Iniciativa Horizonte',NULL),('2025-06-30 09:45:15',NULL,3,'N├║cleo Alfa',NULL),('2025-06-30 09:45:15',NULL,4,'EcoRed',NULL),('2025-06-30 09:45:15',NULL,5,'F├®nix Digital',NULL),('2025-07-09 18:41:05',NULL,7,'Mi Proyecto Personal',NULL),('2025-07-09 19:08:51',NULL,9,'Mi Proyecto Personal 2',NULL);
/*!40000 ALTER TABLE `proyecto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `id_proyecto` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a9893db9f91f3eade8303331741` (`id_proyecto`),
  CONSTRAINT `FK_a9893db9f91f3eade8303331741` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Full Stack Development ABC',1),(2,'Technician',1),(3,'Administrator',1),(4,'Designer',1),(5,'Executive',1),(6,'Manager',2),(7,'Architect',2),(8,'Consultant',2),(9,'Orchestrator',2),(10,'Agent',2),(11,'Facilitator',3),(12,'Agent',3),(13,'Assistant',3),(14,'Executive',3),(15,'Developer',3),(16,'Consultant',4),(17,'Assistant',4),(18,'Coordinator',4),(19,'Supervisor',4),(20,'Orchestrator',4),(21,'Officer',5),(22,'Technician',5),(23,'Coordinator',5),(24,'Specialist',5),(25,'Supervisor',5),(33,'Administrador',7),(34,'Full Stack Development E',7),(37,'Administrador',9),(38,'Full Stack Development C',9),(39,'Full Stack Development A',9),(40,'Full Stack Development B',9);
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarea`
--

DROP TABLE IF EXISTS `tarea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarea` (
  `fecha_de_creacion` datetime NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `contenido` varchar(1000) NOT NULL,
  `id_usuario_creador` int DEFAULT NULL,
  `id_usuario_asignado` int DEFAULT NULL,
  `id_proyecto` int DEFAULT NULL,
  `titulo` varchar(50) NOT NULL,
  `fecha_de_finalizacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3264fc28318f5225c0b6f21c95a` (`id_usuario_asignado`),
  KEY `FK_75fb57629835420c4998c8ae12a` (`id_proyecto`),
  KEY `FK_a9590f8e293e201e0e9e48bd606` (`id_usuario_creador`),
  CONSTRAINT `FK_3264fc28318f5225c0b6f21c95a` FOREIGN KEY (`id_usuario_asignado`) REFERENCES `usuario` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FK_75fb57629835420c4998c8ae12a` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_a9590f8e293e201e0e9e48bd606` FOREIGN KEY (`id_usuario_creador`) REFERENCES `usuario` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarea`
--

LOCK TABLES `tarea` WRITE;
/*!40000 ALTER TABLE `tarea` DISABLE KEYS */;
INSERT INTO `tarea` VALUES ('2025-07-09 19:10:48',9,'Descripci├│n de la tarea',57,54,9,'Nueva tarea',NULL),('2025-07-09 19:10:50',10,'Descripci├│n de la tarea',57,54,9,'Nueva tarea',NULL),('2025-07-09 19:10:51',11,'Descripci├│n de la tarea',57,54,9,'Nueva tarea',NULL),('2025-07-09 19:10:51',12,'Descripci├│n de la tarea',57,54,9,'Nueva tarea',NULL),('2025-07-09 19:10:52',13,'Descripci├│n de la tarea',57,54,9,'Nueva tarea',NULL);
/*!40000 ALTER TABLE `tarea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `fecha_de_creacion` datetime NOT NULL,
  `completado` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(30) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `correo_electronico` varchar(75) NOT NULL,
  `contrasena` varchar(60) NOT NULL,
  `validado` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_NOMBRE_UNIQUE` (`nombre_usuario`),
  UNIQUE KEY `IDX_EMAIL_UNIQUE` (`correo_electronico`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('2025-06-30 09:45:11',NULL,1,'Jacques_Murphy','Dasia','Littel','Elvie_Wolf@hotmail.com','$2b$10$8XD2sE4RJ7RvVHgtnkkNveBuqGCK8HAeclKoEXLPNYaeHZubFbfBa',0),('2025-06-30 09:45:11',NULL,2,'Colt.Ullrich55','Camila','Wilderman','Aurelia62@hotmail.com','$2b$10$jyYl4yCd16ZPBOOgu3y1SOry6AW17zATGRd57iHNHKOzhJ5HefHpW',0),('2025-06-30 09:45:11',NULL,3,'Pearline.Vandervort97','Patrick','Carter','Jeremy24@gmail.com','$2b$10$B6XUiDfGlAd0F6IbceLw2OUgd8jj0PZluggPLMbs4unuZ2v/krqlu',0),('2025-06-30 09:45:12',NULL,4,'Maryam.OKeefe','Phoebe','Pagac','Isabella20@gmail.com','$2b$10$3ohIpLBRaUvv38afuBqrWOCtTNnx6RLmWUeJ.xg0JailQwVAcpH9a',0),('2025-06-30 09:45:12',NULL,5,'Briana_Hermiston','Buster','Abernathy','Abner.Bogan@hotmail.com','$2b$10$/SwYAcOF8eiOFX1Z2FYYHu7h142MFT5wHdx8xSRPofjdbAbTxsN4S',0),('2025-06-30 09:45:12',NULL,6,'Freddy.Wiza','Moshe','Cronin','Oda_Cruickshank67@hotmail.com','$2b$10$LS8IoX97InVx.ZfjTqjLJuGTtrJ6huG9WratQkLL2Bgm.VZrTlY0e',0),('2025-06-30 09:45:12',NULL,7,'Jarred_Hills15','Shany','Mraz','Eladio_Bechtelar@hotmail.com','$2b$10$0/mR9rVchRpwcPRLZNKGCed8riUzOaL5LpODvT2Gb0i1N6Yunp6.e',0),('2025-06-30 09:45:12',NULL,8,'Shirley92','Warren','Wisozk','Kira56@gmail.com','$2b$10$I5by4Cz0PLOBpsrudHxFguUvTl5RiDZDdN9aZJjBs1M9d9fNGsyFO',0),('2025-06-30 09:45:12',NULL,9,'Claude.Boyle','Willy','Kilback','Nova.Conn94@hotmail.com','$2b$10$ZChirtXLBCZOmbDAVL1z2uyJHic8TyVCd9eH44cn9ZM2s6fwRxKwS',0),('2025-06-30 09:45:12',NULL,10,'Elza.Jacobi29','Judy','Effertz','Macy_Powlowski@yahoo.com','$2b$10$nsvXzQchC5m4SYcc3HnCa.l/GBaaKBZHlN8EMLBIEMGJtL5oSr2ti',0),('2025-06-30 09:45:12',NULL,11,'Annetta27','Jasper','Conn','Johnathan.Zboncak@yahoo.com','$2b$10$QrMpmtzyH0rGB.EOFWSoYuasJAZas.0YDTwJdzugL68qJ2mBb6PtC',0),('2025-06-30 09:45:12',NULL,12,'Faustino_Smith','Oscar','D\'Amore-Koepp','Johnathon.Dach64@gmail.com','$2b$10$E7IV4xFNOocJCIMvRqgu6etAKp8gqVoq9JMvrvsbn2SyM4WyLSIYO',0),('2025-06-30 09:45:12',NULL,13,'Madalyn41','Christ','Wunsch','Gillian_Barrows1@gmail.com','$2b$10$Iquk8AzQyfSfRAWvcuUDXuQD.g8/LQstNa/DhdNfqufQIjR1C015m',0),('2025-06-30 09:45:12',NULL,14,'Dario49','Gertrude','Balistreri','Dulce_Shanahan@gmail.com','$2b$10$mpdvkUc8VhCC/L2gzLMkIe1k37cdNDYFXFUjs6KpTD.PDUtl5wrLe',0),('2025-06-30 09:45:12',NULL,15,'Hermann.Homenick-OKon','Elinore','Braun','Barbara66@hotmail.com','$2b$10$CaUG2T.YnYCcJLfNs7va8uz2/hd1IB/LB9YRb/bfORWTnj3F2Ce6e',0),('2025-06-30 09:45:12',NULL,16,'Cesar7','Shany','Von','Claudine.Pacocha@hotmail.com','$2b$10$pfLDXi80pSLXaqwD9mMe5uymgypYl5KnjjZPm.l7npMSIX102y6LC',0),('2025-06-30 09:45:12',NULL,17,'Mercedes.Kuphal2','Alexie','Marks','Jake_Nitzsche66@hotmail.com','$2b$10$wtE5jXULUZ/KlwAclriiz.6EXP62tS5I5wXSPqTXtjsOsS86cNEpO',0),('2025-06-30 09:45:12',NULL,18,'Katelynn44','Harry','Borer','Cristian1@yahoo.com','$2b$10$Ce2FljAgUeaPC9wl2xAc8OOMv.FJ5oAHEvfVaKMU3CZQrSR19gy6y',0),('2025-06-30 09:45:13',NULL,19,'Armando69','Ceasar','Hessel','Stanton.Cartwright4@yahoo.com','$2b$10$A2rakSfTLC8hj19A.IJZqexReq222tQVFCcYLaakQsnevuf1WnfnK',0),('2025-06-30 09:45:13',NULL,20,'Lucy29','Henderson','Kuvalis','Jabari.Kris70@gmail.com','$2b$10$4dqbG2384e7kzKB7A8E74eoaSzs9gcR1Gg1m2injnkUHPzXT7fm96',0),('2025-06-30 09:45:13',NULL,21,'Rowan37','Eryn','Ryan','Hilbert_Boehm26@yahoo.com','$2b$10$vbDWZaqkNJkHvisBSTPI4OQnxr5CLYzlOO8SuCSQSp1rIt5q8F/sS',0),('2025-06-30 09:45:13',NULL,22,'Julianne18','Marianna','Hagenes-O\'Kon','Louisa.Spencer35@gmail.com','$2b$10$NYr1G7najk4VnJVGnLMhR.Cnc.t5alVqpdJtxSZEC9UfQKT7hHwxC',0),('2025-06-30 09:45:13',NULL,23,'Dorian.Ankunding','Adeline','Swift','Chelsey2@hotmail.com','$2b$10$wyKoOoO276w/oZpbHA1lBevwhoKTHMoLLp6SC92YMfVx6kwWe1BQG',0),('2025-06-30 09:45:13',NULL,24,'Ottis.Hartmann3','Louisa','Cremin','Novella.Murphy74@gmail.com','$2b$10$mHnLmbO8H2G7ihZLLsnrGuOuawJOPTcsYZIE382OcTSHZOhGJqvIK',0),('2025-06-30 09:45:13',NULL,25,'Maureen13','Naomie','Corwin','Zola.Hills@hotmail.com','$2b$10$A6WTLyRjk1XCMNNW0bGy/OvgiJXn6YkaWUOXgPxvCqbgN5SmevQ1m',0),('2025-06-30 09:45:13',NULL,26,'Lilliana.Jacobi','Alda','Bradtke','Aubree_Watsica@gmail.com','$2b$10$xP2QyMTlqMonMGHD1fbO9u3VPa88I2.IpbDoFvmlcvppFFqb8DIXG',0),('2025-06-30 09:45:13',NULL,27,'Delpha6','Kelsi','Witting','Fern.Torp-Wisoky13@yahoo.com','$2b$10$nNrJGTVaww6uR2Ii8NNvGu2q/eNvBXsQpb7H0PgTwARYlJY0xccz2',0),('2025-06-30 09:45:13',NULL,28,'Ray_Tillman27','Dereck','Cremin','Kristian_Lockman58@gmail.com','$2b$10$yDzeCuCkTILl2zDbsOVLNO/a.2D8yLc5XHFqobRHafxLCAiqic.Ki',0),('2025-06-30 09:45:13',NULL,29,'Raina85','Jillian','Jones','Cicero84@gmail.com','$2b$10$v5vKi04Mv2j7w.a75jdV4OE8RNU.PwjOLdiZgW9ysgfTqqbfthGwa',0),('2025-06-30 09:45:13',NULL,30,'Reuben_Barton','Riley','Green','Shany16@yahoo.com','$2b$10$VnWVl2VzNqlaZnJuzWdNjO.q14HSIdhElSOi9Zi7IypUlnuXg3.ry',0),('2025-06-30 09:45:13',NULL,31,'Mallie.Runte93','Nora','Bergstrom','Jerod.Botsford69@gmail.com','$2b$10$6iwR4rYFi6rqYhoagGG1cOo1Xeml7Xd/Ay3TAcrl9cPP5UR5wyk3W',0),('2025-06-30 09:45:14',NULL,32,'Shanie.Tremblay53','Garrett','Crooks','Jakob13@gmail.com','$2b$10$qhSEe1380725GrTwD0Duiel8K1xbo6ZCHhcERHzNwTV8noYI5P7yK',0),('2025-06-30 09:45:14',NULL,33,'Noemi_Barrows94','Alberto','Streich','Jorge.Greenfelder30@yahoo.com','$2b$10$BpB7NNHN7i06a.5YVv3KWuflLilph80SgNOL7iznf.H8Ng3vqTmKW',0),('2025-06-30 09:45:14',NULL,34,'Romaine_Schroeder','Isobel','Muller','Ahmad29@hotmail.com','$2b$10$JDCOuRJs.1hUCZMFx2W4seJ8Jg8vvaDlcF1zwSEECq989lkxh31de',0),('2025-06-30 09:45:14',NULL,35,'Linda_Wehner','Antonio','Kassulke','Una98@hotmail.com','$2b$10$U/ja28dcuUyRfk7R.3DhGusXqlNVU3XnAVsP.tnaEqS3lvb82DMpS',0),('2025-06-30 09:45:14',NULL,36,'Marian79','Chanelle','Howe','Haskell9@yahoo.com','$2b$10$9i2Gt0Rakrfsws0YtFI4iO6pYMDBkYeol1X0Yn3hO8WDJwZRb33ly',0),('2025-06-30 09:45:14',NULL,37,'Nicola_Bechtelar24','Vance','Hoeger','Nicklaus79@hotmail.com','$2b$10$1XKG6vx8PvOFY43rLTPMqe37dOM6fYbeSZEI.O2UBbwa4rwL0M0HC',0),('2025-06-30 09:45:14',NULL,38,'Bennie_Bode12','Rossie','Hudson','Einar_Legros44@yahoo.com','$2b$10$E.U9uCohsZZlf/w9J57Re.uM3KHB1ybrvji2axbDk8MCRGSWo.77y',0),('2025-06-30 09:45:14',NULL,39,'Molly_Schinner25','Amya','Hermann','Rowan.MacGyver@hotmail.com','$2b$10$8sfet6KL3a3skd1FVZAIW.2GcNMvgVD/ZUdo/TECPfgnpxTkBI8eC',0),('2025-06-30 09:45:14',NULL,40,'Idella_Johns','Vergie','Gislason','Darryl1@hotmail.com','$2b$10$SLhYh6y/b6Y0rRd6hDr0pezqZJa9JhqdOFh829QHDqgsyvebqG84i',0),('2025-06-30 09:45:14',NULL,41,'Joe86','Tom','Berge','Nigel.Kub90@hotmail.com','$2b$10$GQBgCMEix6Ktv3ru.Vsl1eWWwSFb2ZpoX/5.Ak8lmw0C/qb92Owcu',0),('2025-06-30 09:45:14',NULL,42,'Helmer18','Edythe','Heidenreich','Berenice_Howe63@gmail.com','$2b$10$yl/pITCU2cbSddU1Zm2nY.i0YOnVRA7DUWwGTH03vwkidSGYxWxZu',0),('2025-06-30 09:45:14',NULL,43,'Jayda.Balistreri','Camille','Batz','Ron34@yahoo.com','$2b$10$w.x5z/xWWg/pNoD3Tr1XuufY29ypNRO5nsiDmjPtcNYDe8UO3n7XG',0),('2025-06-30 09:45:14',NULL,44,'Julius89','Althea','VonRueden','Jordy64@yahoo.com','$2b$10$j2gMDLwWEBNWiN1UFYqFPOsfaB7cUWTME1dTT0ULGwA/1c30GNtku',0),('2025-06-30 09:45:15',NULL,45,'Moises.Turner48','Brannon','Runolfsdottir','Gussie_Abernathy45@yahoo.com','$2b$10$SDtu8NwdWYK6cz3p6b/OKe7SXzDKa1WC59dV06EiiH8C4Kb692vli',0),('2025-06-30 09:45:15',NULL,46,'Nadia20','Amie','Marvin','Stephon.Jacobi@yahoo.com','$2b$10$2D9VoqlJQlhtJOIWSjzKw.bfqHkXjaMo74vDhayWUJFn3bXzMM/5C',0),('2025-06-30 09:45:15',NULL,47,'Susan_Cremin59','Wilford','Krajcik','Rahul35@hotmail.com','$2b$10$RODCm/594uHDD0MWBDDEjucIEOwIfRefMchoygpHU2lYyMJ3/WlHC',0),('2025-06-30 09:45:15',NULL,48,'Alden80','Terry','Cole','Nedra89@gmail.com','$2b$10$ryqRkI3/ez34Nn0LLHHR9OSGzoi85loaEFGOy95QpldhdSv3ta5Fm',0),('2025-06-30 09:45:15',NULL,49,'Wilbert75','Suzanne','McDermott','Travis.Daugherty56@yahoo.com','$2b$10$NAtYVVIbWy7V82Re15gKzOAydob045KOsSB6mItW76aVY0O6lTY3O',0),('2025-06-30 09:45:15',NULL,50,'Ruth_Emard42','Morgan','Glover','Alexa.Price41@hotmail.com','$2b$10$XTD3DdGapTqUJN1UnRF1uu58/6keTg0nAY7Qbxm4ZeSEzgfrknEO2',0),('2025-07-09 18:43:19',NULL,54,'Ejemplo12','Julio Cesar','Garcia','usuariodeprueba92sappe@gmail.com','$2b$10$Gx4qMbA3ObMzJ3/h6YgltuNWu1UlyJ1N2eQDpTSiBGrPYdqmeI0l6',0),('2025-07-09 19:07:29',NULL,57,'Pepito','Julio Cesar','Garcia','usuariodepruesappe@gmail.com','$2b$10$sAqfWULmZuvdx6e9PFK7vO4G8yWg3zpwIr5.Kk5yEo7lnb/dTJ8n6',0);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_proyecto`
--

DROP TABLE IF EXISTS `usuario_proyecto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_proyecto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_rol` int DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  `id_proyecto` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9e640347f417705cd2d0187e92b` (`id_usuario`),
  KEY `FK_35c2ae61597b4542c011ba32192` (`id_proyecto`),
  KEY `FK_0f386a2d1b6b9d3d9a165c53c44` (`id_rol`),
  CONSTRAINT `FK_0f386a2d1b6b9d3d9a165c53c44` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FK_35c2ae61597b4542c011ba32192` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_9e640347f417705cd2d0187e92b` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_proyecto`
--

LOCK TABLES `usuario_proyecto` WRITE;
/*!40000 ALTER TABLE `usuario_proyecto` DISABLE KEYS */;
INSERT INTO `usuario_proyecto` VALUES (1,9,6,2),(2,NULL,7,3),(3,13,8,3),(4,25,9,5),(5,18,10,4),(6,11,11,3),(7,16,12,4),(8,6,13,2),(9,5,14,1),(10,14,15,3),(11,23,16,5),(12,23,17,5),(13,3,18,1),(14,25,19,5),(15,19,20,4),(16,16,21,4),(17,21,22,5),(18,21,23,5),(19,20,24,4),(20,6,25,2),(21,7,26,2),(22,4,27,1),(23,15,28,3),(24,19,29,4),(25,21,30,5),(26,13,31,3),(27,14,32,3),(28,13,33,3),(29,21,34,5),(30,22,35,5),(31,17,36,4),(32,12,37,3),(33,11,38,3),(34,18,39,4),(35,25,40,5),(36,9,41,2),(37,19,42,4),(38,3,43,1),(39,1,44,1),(40,5,45,1),(41,2,46,1),(42,3,47,1),(43,8,48,2),(44,8,49,2),(45,23,50,5),(59,NULL,54,7),(60,NULL,54,7),(61,37,57,9),(62,38,54,9),(63,39,54,9),(64,40,54,9);
/*!40000 ALTER TABLE `usuario_proyecto` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-09 16:12:03
