-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-02-2023 a las 07:07:20
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
CREATE DATABASE IF NOT EXISTS `donacion2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `donacion2`;

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
(1, 'SANGREMEX', 'Av. Emiliano Zapata', 9531567890),
(2, 'Banco de sangre', 'Calle rosaura zapata no2.', 955634567);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bolsadesangre`
--

CREATE TABLE `bolsadesangre` (
  `idbolsa` bigint(20) NOT NULL,
  `cantidad` bigint(20) NOT NULL,
  `tipodesangre` text NOT NULL,
  `idregistro` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `bolsadesangre`
--

INSERT INTO `bolsadesangre` (`idbolsa`, `cantidad`, `tipodesangre`, `idregistro`) VALUES
(2, 200, 'O-Rh+', 2),
(3, 500, 'A-rh+', 1),
(4, 500, 'A-rh+', 3),
(6, 500, 'A-rh+', 3);

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
(1, 2, 0),
(2, 1, 0),
(3, 5, 0);

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
(5, 'O-RH+', 18);

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
(1, 1, 6, 'password'),
(234312, 2, 7, 'holamundo');

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
(1, 'San Angel', 'Calle emiliano Zapata, Barrio de tolo, Tlaxiaco'),
(2, 'Hospital del nino y de la mujer', 'Av. Porfirio diaz, no. 3, Tlalpan, estado de mexico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventarioglobal`
--

CREATE TABLE `inventarioglobal` (
  `idbanco` bigint(20) NOT NULL,
  `idbolsa` bigint(20) NOT NULL,
  `disponibilidad` tinyint(1) NOT NULL DEFAULT 1,
  `tipodesangre` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `inventarioglobal`
--

INSERT INTO `inventarioglobal` (`idbanco`, `idbolsa`, `disponibilidad`, `tipodesangre`) VALUES
(0, 0, 1, 'SELECT tipodesangre FROM bolsadesangre WHERE idbolsa = (SELECT MAX(idbolsa) FROM bolsadesangre))');

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
(1, 2, 'A-Rh'),
(2, 6, 'O-Rh+'),
(7, 5, 'A-Rh+'),
(10, 4, 'O-Rh+');

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
(2, 'Leonel Santiago Rosis', 20, 'M'),
(3, 'Rosa Maria Rosas Cruz', 53, 'F'),
(4, 'Martin Santiago Rosas', 30, 'M'),
(5, 'Emiliano Zapata', 20, 'M'),
(6, 'Fernanda Avilez dura', 23, 'F'),
(7, 'German Diaz ordaz', 23, 'M'),
(8, 'Illojuan', 20, 'M'),
(9, 'JEsus de la sagrada concepcion', 30, 'M'),
(10, 'Jesus sanches martines', 98, 'F'),
(13, 'Jesus martinez', 14, 'M'),
(17, 'Pedro picos piedra', 134, 'M'),
(18, 'Pedro picos piedra', 134, 'M'),
(21, 'JEsus de la sagrada concepcion', 30, 'M'),
(22, 'asdasda', 50, 'M/F'),
(23, 'Jesus Roberto de la cru', 13, 'M'),
(24, 'Angel daniel', 2, 'M');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_de_donacion`
--

CREATE TABLE `registro_de_donacion` (
  `idbanco` bigint(20) NOT NULL,
  `fecha_donacion` text NOT NULL,
  `iddonacion` bigint(20) NOT NULL,
  `idregistro` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `registro_de_donacion`
--

INSERT INTO `registro_de_donacion` (`idbanco`, `fecha_donacion`, `iddonacion`, `idregistro`) VALUES
(2, '10-12-2022', 1, 1),
(1, '11-12-2022', 2, 2),
(2, '01/30/2023', 3, 3);

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
(8, 1, '2023-01-20', 2, 1, 234312),
(9, 2, '2023-01-26', 1, 2, 1);

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
-- Volcado de datos para la tabla `transfucion`
--

INSERT INTO `transfucion` (`idsolicitud`, `idpaciente`, `fecha`) VALUES
(8, 10, '2023-01-10'),
(9, 2, '2023-01-27');

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
  ADD KEY `idregistro` (`idregistro`);

--
-- Indices de la tabla `donacion`
--
ALTER TABLE `donacion`
  ADD PRIMARY KEY (`iddonacion`),
  ADD KEY `iddonador` (`iddonador`);

--
-- Indices de la tabla `donador`
--
ALTER TABLE `donador`
  ADD PRIMARY KEY (`iddonador`),
  ADD KEY `idpersona` (`idpersona`);

--
-- Indices de la tabla `enfermera`
--
ALTER TABLE `enfermera`
  ADD PRIMARY KEY (`numero_trabajador`),
  ADD KEY `idpersona` (`idpersona`),
  ADD KEY `idhospital` (`idhospital`);

--
-- Indices de la tabla `hospital`
--
ALTER TABLE `hospital`
  ADD PRIMARY KEY (`idhospital`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`idpaciente`),
  ADD KEY `idpersona` (`idpersona`);

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
  ADD KEY `iddonacion` (`iddonacion`),
  ADD KEY `idbanco` (`idbanco`);

--
-- Indices de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD PRIMARY KEY (`idsolicitud`),
  ADD KEY `idbanco` (`idbanco`),
  ADD KEY `idhospital` (`idhospital`),
  ADD KEY `numero_trabajador` (`numero_trabajador`);

--
-- Indices de la tabla `transfucion`
--
ALTER TABLE `transfucion`
  ADD KEY `idsolicitud` (`idsolicitud`),
  ADD KEY `idpaciente` (`idpaciente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `banco`
--
ALTER TABLE `banco`
  MODIFY `idbanco` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `bolsadesangre`
--
ALTER TABLE `bolsadesangre`
  MODIFY `idbolsa` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `donacion`
--
ALTER TABLE `donacion`
  MODIFY `iddonacion` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `donador`
--
ALTER TABLE `donador`
  MODIFY `iddonador` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `enfermera`
--
ALTER TABLE `enfermera`
  MODIFY `numero_trabajador` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=234313;

--
-- AUTO_INCREMENT de la tabla `hospital`
--
ALTER TABLE `hospital`
  MODIFY `idhospital` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `idpaciente` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `idpersona` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `registro_de_donacion`
--
ALTER TABLE `registro_de_donacion`
  MODIFY `idregistro` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `solicitud`
--
ALTER TABLE `solicitud`
  MODIFY `idsolicitud` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bolsadesangre`
--
ALTER TABLE `bolsadesangre`
  ADD CONSTRAINT `bolsadesangre_ibfk_1` FOREIGN KEY (`idregistro`) REFERENCES `registro_de_donacion` (`idregistro`);

--
-- Filtros para la tabla `donacion`
--
ALTER TABLE `donacion`
  ADD CONSTRAINT `donacion_ibfk_1` FOREIGN KEY (`iddonador`) REFERENCES `donador` (`iddonador`);

--
-- Filtros para la tabla `donador`
--
ALTER TABLE `donador`
  ADD CONSTRAINT `donador_ibfk_1` FOREIGN KEY (`idpersona`) REFERENCES `persona` (`idpersona`);

--
-- Filtros para la tabla `enfermera`
--
ALTER TABLE `enfermera`
  ADD CONSTRAINT `enfermera_ibfk_1` FOREIGN KEY (`idpersona`) REFERENCES `persona` (`idpersona`),
  ADD CONSTRAINT `enfermera_ibfk_2` FOREIGN KEY (`idpersona`) REFERENCES `persona` (`idpersona`),
  ADD CONSTRAINT `enfermera_ibfk_3` FOREIGN KEY (`idhospital`) REFERENCES `hospital` (`idhospital`);

--
-- Filtros para la tabla `inventarioglobal`
--
ALTER TABLE `inventarioglobal`
  ADD CONSTRAINT `inventarioglobal_ibfk_2` FOREIGN KEY (`idbanco`) REFERENCES `banco` (`idbanco`);

--
-- Filtros para la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD CONSTRAINT `paciente_ibfk_1` FOREIGN KEY (`idpersona`) REFERENCES `persona` (`idpersona`);

--
-- Filtros para la tabla `registro_de_donacion`
--
ALTER TABLE `registro_de_donacion`
  ADD CONSTRAINT `registro_de_donacion_ibfk_1` FOREIGN KEY (`iddonacion`) REFERENCES `donacion` (`iddonacion`),
  ADD CONSTRAINT `registro_de_donacion_ibfk_2` FOREIGN KEY (`idbanco`) REFERENCES `banco` (`idbanco`);

--
-- Filtros para la tabla `solicitud`
--
ALTER TABLE `solicitud`
  ADD CONSTRAINT `solicitud_ibfk_2` FOREIGN KEY (`idbanco`) REFERENCES `banco` (`idbanco`),
  ADD CONSTRAINT `solicitud_ibfk_3` FOREIGN KEY (`idhospital`) REFERENCES `hospital` (`idhospital`),
  ADD CONSTRAINT `solicitud_ibfk_4` FOREIGN KEY (`numero_trabajador`) REFERENCES `enfermera` (`numero_trabajador`);

--
-- Filtros para la tabla `transfucion`
--
ALTER TABLE `transfucion`
  ADD CONSTRAINT `transfucion_ibfk_1` FOREIGN KEY (`idsolicitud`) REFERENCES `solicitud` (`idsolicitud`),
  ADD CONSTRAINT `transfucion_ibfk_2` FOREIGN KEY (`idpaciente`) REFERENCES `paciente` (`idpaciente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
