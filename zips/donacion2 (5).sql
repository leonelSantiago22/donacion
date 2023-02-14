-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-02-2023 a las 01:48:18
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `donacion2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `numero_trabajador` bigint(20) NOT NULL,
  `password` text NOT NULL,
  `nombre` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`numero_trabajador`, `password`, `nombre`) VALUES
(223, 'password', 'Jesus Alberto de la sagrada concepcion Ramirez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `banco`
--

CREATE TABLE `banco` (
  `idbanco` bigint(20) NOT NULL,
  `nombre` text NOT NULL,
  `direccion` text NOT NULL,
  `numTelefonico` bigint(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `banco`
--

INSERT INTO `banco` (`idbanco`, `nombre`, `direccion`, `numTelefonico`) VALUES
(1, 'SANGREMEX', 'Av. Emiliano Zapata s/n', 9531567890),
(2, 'Banco de sangre', 'Calle rosaura zapata no2.', 955634567);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bolsadesangre`
--

CREATE TABLE `bolsadesangre` (
  `idbolsa` bigint(20) NOT NULL,
  `cantidad` bigint(20) NOT NULL DEFAULT 500,
  `tipodesangre` text NOT NULL,
  `iddonacion` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `bolsadesangre`
--

INSERT INTO `bolsadesangre` (`idbolsa`, `cantidad`, `tipodesangre`, `iddonacion`) VALUES
(19, 500, 'A-Rh+', 13),
(20, 500, 'A-Rh+', 14),
(21, 500, 'O-RH+', 15);

--
-- Disparadores `bolsadesangre`
--
DELIMITER $$
CREATE TRIGGER `inventario_subir` AFTER INSERT ON `bolsadesangre` FOR EACH ROW INSERT INTO inventarioglobal(idbanco, idbolsa, tipodesangre)
  SELECT idbanco, NEW.idbolsa, NEW.tipodesangre FROM registro_de_donacion WHERE idregistro = (SELECT idregistro FROM bolsadesangre WHERE idbolsa = NEW.idbolsa)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `donacion`
--

CREATE TABLE `donacion` (
  `iddonacion` bigint(20) NOT NULL,
  `iddonador` bigint(20) NOT NULL,
  `banco` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `donacion`
--

INSERT INTO `donacion` (`iddonacion`, `iddonador`, `banco`) VALUES
(13, 2, 2),
(14, 2, 1),
(15, 22, 1);

--
-- Disparadores `donacion`
--
DELIMITER $$
CREATE TRIGGER `registrodeladonacion` AFTER INSERT ON `donacion` FOR EACH ROW INSERT INTO registro_de_donacion(idbanco, iddonacion)
  VALUES(NEW.banco,NEW.iddonacion)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `donador`
--

CREATE TABLE `donador` (
  `iddonador` bigint(20) NOT NULL,
  `tipodesangre` text NOT NULL,
  `idpersona` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `donador`
--

INSERT INTO `donador` (`iddonador`, `tipodesangre`, `idpersona`) VALUES
(1, 'O-RH+', 2),
(2, 'A-Rh+', 3),
(5, 'O-RH+', 18),
(19, 'A-RH+', 48),
(22, 'O-RH+', 54);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enfermera`
--

CREATE TABLE `enfermera` (
  `numero_trabajador` bigint(20) NOT NULL,
  `idhospital` bigint(11) NOT NULL,
  `idpersona` bigint(11) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `enfermera`
--

INSERT INTO `enfermera` (`numero_trabajador`, `idhospital`, `idpersona`, `password`) VALUES
(1, 2, 61, 'password'),
(234312, 2, 7, 'holamundos'),
(234314, 2, 61, 'password');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hospital`
--

CREATE TABLE `hospital` (
  `idhospital` bigint(11) NOT NULL,
  `Nombre` text NOT NULL,
  `Direccion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `hospital`
--

INSERT INTO `hospital` (`idhospital`, `Nombre`, `Direccion`) VALUES
(2, 'Hospital del nino y de la mujer', 'Av. Porfirio diaz, no. 3, Tlalpan, estado de mexico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventarioglobal`
--

CREATE TABLE `inventarioglobal` (
  `idbanco` bigint(20) DEFAULT NULL,
  `idbolsa` bigint(20) DEFAULT NULL,
  `disponibilidad` tinyint(1) DEFAULT 1,
  `tipodesangre` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `inventarioglobal`
--

INSERT INTO `inventarioglobal` (`idbanco`, `idbolsa`, `disponibilidad`, `tipodesangre`) VALUES
(1, 20, 1, 'A-Rh+'),
(2, 20, 1, 'A-Rh+'),
(1, 21, 1, 'O-RH+'),
(1, 21, 1, 'O-RH+'),
(2, 21, 1, 'O-RH+');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `idpaciente` bigint(20) NOT NULL,
  `idpersona` bigint(20) NOT NULL,
  `tipodesangre` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`idpaciente`, `idpersona`, `tipodesangre`) VALUES
(1, 2, 'A-Rh+'),
(2, 6, 'O-Rh+'),
(7, 5, 'A-Rh+'),
(12, 55, 'dummie');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `idpersona` bigint(20) NOT NULL,
  `nombre` text NOT NULL,
  `edad` int(11) NOT NULL,
  `genero` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`idpersona`, `nombre`, `edad`, `genero`) VALUES
(1, 'Agustin Aranda cruz', 20, 'M'),
(2, 'Leonel Santiago Rosastis', 20, 'M'),
(3, 'Rosa Maria Rosas Cruz', 53, 'F'),
(4, 'Martin Santiago Rosas', 30, 'M'),
(5, 'Emiliano Zapata', 20, 'M'),
(6, 'Fernanda Avilez Duran', 23, 'F'),
(7, 'German Diaz ordaz', 23, 'M'),
(8, 'Illojuan', 20, 'M'),
(9, 'JEsus de la sagrada concepcion', 30, 'M'),
(10, 'Jesus sanches martines', 98, 'F'),
(13, 'Jesus martinez', 14, 'M'),
(17, 'Pedro picos piedra', 134, 'M'),
(18, 'Pedro picos piedra', 134, 'M'),
(21, 'JEsus de la sagrada concepcion', 30, 'M'),
(23, 'Jesus Roberto de la cru', 13, 'M'),
(24, 'Angel daniel', 2, 'M'),
(48, 'dummmies', 18, 'F'),
(54, 'Pablito primero', 18, 'F'),
(55, 'dummie', 15, 'f'),
(56, 'dummie', 22, 'M'),
(60, 'Maria de todos los Angeles', 12, 'F'),
(61, 'Leonel Santiago Rosas', 13, 'M');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_de_donacion`
--

CREATE TABLE `registro_de_donacion` (
  `idbanco` bigint(20) NOT NULL,
  `fecha_donacion` text NOT NULL DEFAULT current_timestamp(),
  `iddonacion` bigint(20) NOT NULL,
  `idregistro` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `registro_de_donacion`
--

INSERT INTO `registro_de_donacion` (`idbanco`, `fecha_donacion`, `iddonacion`, `idregistro`) VALUES
(2, '2023-02-09 02:15:04', 13, 13),
(1, '2023-02-09 11:55:08', 14, 14),
(1, '2023-02-12 22:39:06', 15, 15);

--
-- Disparadores `registro_de_donacion`
--
DELIMITER $$
CREATE TRIGGER `registro_bolsa` AFTER INSERT ON `registro_de_donacion` FOR EACH ROW INSERT INTO bolsadesangre(tipodesangre, iddonacion)
 SELECT tipodesangre,NEW.iddonacion FROM donador WHERE iddonador = (SELECT iddonador FROM donacion WHERE iddonacion =(SELECT MAX(iddonacion) FROM donacion))
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitud`
--

CREATE TABLE `solicitud` (
  `idsolicitud` bigint(20) NOT NULL,
  `idbanco` bigint(20) NOT NULL,
  `fecha` text NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 2,
  `idhospital` bigint(11) NOT NULL,
  `numero_trabajador` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `solicitud`
--

INSERT INTO `solicitud` (`idsolicitud`, `idbanco`, `fecha`, `estado`, `idhospital`, `numero_trabajador`) VALUES
(13, 2, '2023-02-13', 1, 2, 1),
(14, 2, '2023-02-14', 1, 2, 234312);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transfucion`
--

CREATE TABLE `transfucion` (
  `idsolicitud` bigint(20) NOT NULL,
  `idpaciente` bigint(20) NOT NULL,
  `fecha` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`numero_trabajador`);

--
-- Indices de la tabla `banco`
--
ALTER TABLE `banco`
  ADD PRIMARY KEY (`idbanco`);

--
-- Indices de la tabla `bolsadesangre`
--
ALTER TABLE `bolsadesangre`
  ADD PRIMARY KEY (`idbolsa`),
  ADD KEY `iddonacion` (`iddonacion`);

--
-- Indices de la tabla `donacion`
--
ALTER TABLE `donacion`
  ADD PRIMARY KEY (`iddonacion`),
  ADD KEY `donacion_ibfk_1` (`iddonador`),
  ADD KEY `banco` (`banco`);

--
-- Indices de la tabla `donador`
--
ALTER TABLE `donador`
  ADD PRIMARY KEY (`iddonador`),
  ADD KEY `donador_ibfk_1` (`idpersona`);

--
-- Indices de la tabla `enfermera`
--
ALTER TABLE `enfermera`
  ADD PRIMARY KEY (`numero_trabajador`),
  ADD KEY `enfermera_ibfk_2` (`idpersona`),
  ADD KEY `enfermera_ibfk_3` (`idhospital`);

--
-- Indices de la tabla `hospital`
--
ALTER TABLE `hospital`
  ADD PRIMARY KEY (`idhospital`);

--
-- Indices de la tabla `inventarioglobal`
--
ALTER TABLE `inventarioglobal`
  ADD KEY `inventarioglobal_ibfk_2` (`idbanco`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`idpaciente`),
  ADD KEY `paciente_ibfk_1` (`idpersona`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`idpersona`);

--
-- Indices de la tabla `registro_de_donacion`
--
ALTER TABLE `registro_de_donacion`
  ADD PRIMARY KEY (`idregistro`),
  ADD KEY `registro_de_donacion_ibfk_1` (`iddonacion`),
  ADD KEY `registro_de_donacion_ibfk_2` (`idbanco`);

--
-- Indices de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD PRIMARY KEY (`idsolicitud`),
  ADD KEY `solicitud_ibfk_2` (`idbanco`),
  ADD KEY `solicitud_ibfk_3` (`idhospital`),
  ADD KEY `solicitud_ibfk_4` (`numero_trabajador`);

--
-- Indices de la tabla `transfucion`
--
ALTER TABLE `transfucion`
  ADD KEY `transfucion_ibfk_1` (`idsolicitud`),
  ADD KEY `transfucion_ibfk_2` (`idpaciente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `banco`
--
ALTER TABLE `banco`
  MODIFY `idbanco` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `bolsadesangre`
--
ALTER TABLE `bolsadesangre`
  MODIFY `idbolsa` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `donacion`
--
ALTER TABLE `donacion`
  MODIFY `iddonacion` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `donador`
--
ALTER TABLE `donador`
  MODIFY `iddonador` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `enfermera`
--
ALTER TABLE `enfermera`
  MODIFY `numero_trabajador` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=234315;

--
-- AUTO_INCREMENT de la tabla `hospital`
--
ALTER TABLE `hospital`
  MODIFY `idhospital` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `idpaciente` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `idpersona` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `registro_de_donacion`
--
ALTER TABLE `registro_de_donacion`
  MODIFY `idregistro` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  MODIFY `idsolicitud` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `donacion`
--
ALTER TABLE `donacion`
  ADD CONSTRAINT `donacion_ibfk_1` FOREIGN KEY (`iddonador`) REFERENCES `donador` (`iddonador`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `donacion_ibfk_2` FOREIGN KEY (`banco`) REFERENCES `banco` (`idbanco`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `donador`
--
ALTER TABLE `donador`
  ADD CONSTRAINT `donador_ibfk_1` FOREIGN KEY (`idpersona`) REFERENCES `persona` (`idpersona`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `enfermera`
--
ALTER TABLE `enfermera`
  ADD CONSTRAINT `enfermera_ibfk_1` FOREIGN KEY (`idpersona`) REFERENCES `persona` (`idpersona`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `enfermera_ibfk_2` FOREIGN KEY (`idpersona`) REFERENCES `persona` (`idpersona`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `enfermera_ibfk_3` FOREIGN KEY (`idhospital`) REFERENCES `hospital` (`idhospital`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `inventarioglobal`
--
ALTER TABLE `inventarioglobal`
  ADD CONSTRAINT `inventarioglobal_ibfk_2` FOREIGN KEY (`idbanco`) REFERENCES `banco` (`idbanco`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`idpersona`) REFERENCES `persona` (`idpersona`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD CONSTRAINT `solicitud_ibfk_2` FOREIGN KEY (`idbanco`) REFERENCES `banco` (`idbanco`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitud_ibfk_3` FOREIGN KEY (`idhospital`) REFERENCES `hospital` (`idhospital`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitud_ibfk_4` FOREIGN KEY (`numero_trabajador`) REFERENCES `enfermera` (`numero_trabajador`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `transfucion`
--
ALTER TABLE `transfucion`
  ADD CONSTRAINT `transfucion_ibfk_1` FOREIGN KEY (`idsolicitud`) REFERENCES `solicitud` (`idsolicitud`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transfucion_ibfk_2` FOREIGN KEY (`idpaciente`) REFERENCES `paciente` (`idpaciente`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
