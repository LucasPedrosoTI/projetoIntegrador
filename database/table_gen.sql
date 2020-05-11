-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema heroku_bcf82a60b4d7a6b
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema heroku_bcf82a60b4d7a6b
-- -----------------------------------------------------
USE `heroku_bcf82a60b4d7a6b` ;

-- -----------------------------------------------------
-- Table `usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `nome` VARCHAR(50) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `sobrenome` VARCHAR(255) NOT NULL,
  `endereco` VARCHAR(255) NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `postos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `postos` (
  `id` INT NOT NULL,
  `nome_fantasia` VARCHAR(100) NOT NULL,
  `cnpj` VARCHAR(14) NOT NULL,
  `cep` VARCHAR(8) NOT NULL,
  `cidade` VARCHAR(45) NULL,
  `estado` VARCHAR(2) NULL,
  `bairro` VARCHAR(100) NULL,
  `bandeira` VARCHAR(45) NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATE,
  `latitude` DECIMAL(10,8) NOT NULL,
  `longitude` DECIMAL(11,8) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `cnpj_UNIQUE` (`cnpj` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `produtos` (
  `id` INT NOT NULL,
  `produto` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `postos_produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `postos_produtos` (
  `postos_id` INT NOT NULL,
  `produtos_id` INT NOT NULL,
  `preco` DECIMAL(8,2) NULL,
  PRIMARY KEY (`postos_id`, `produtos_id`),
  INDEX `fk_produtos_has_postos_postos1_idx` (`postos_id` ASC),
  INDEX `fk_produtos_has_postos_produtos_idx` (`produtos_id` ASC),
  CONSTRAINT `fk_produtos_has_postos_produtos`
    FOREIGN KEY (`produtos_id`)
    REFERENCES `produtos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_produtos_has_postos_postos1`
    FOREIGN KEY (`postos_id`)
    REFERENCES `postos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `postos_favoritos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `postos_favoritos` (
  `postos_id` INT NOT NULL,
  `usuarios_id` INT NOT NULL,
  PRIMARY KEY (`postos_id`, `usuarios_id`),
  INDEX `fk_postos_has_perfil_usuarios_perfil_usuarios1_idx` (`usuarios_id` ASC),
  INDEX `fk_postos_has_perfil_usuarios_postos1_idx` (`postos_id` ASC),
  CONSTRAINT `fk_postos_has_perfil_usuarios_postos1`
    FOREIGN KEY (`postos_id`)
    REFERENCES `postos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_postos_has_perfil_usuarios_perfil_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `servicos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `servicos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `nome_UNIQUE` (`nome` ASC))
ENGINE = InnoDB
COMMENT = '	';


-- -----------------------------------------------------
-- Table `postos_servicos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `postos_servicos` (
  `postos_id` INT NOT NULL,
  `servicos_id` INT NOT NULL,
  `preco` DECIMAL(10,2) NULL,
  PRIMARY KEY (`postos_id`, `servicos_id`),
  INDEX `fk_postos_has_servicos_servicos1_idx` (`servicos_id` ASC),
  INDEX `fk_postos_has_servicos_postos1_idx` (`postos_id` ASC),
  CONSTRAINT `fk_postos_has_servicos_postos1`
    FOREIGN KEY (`postos_id`)
    REFERENCES `postos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_postos_has_servicos_servicos1`
    FOREIGN KEY (`servicos_id`)
    REFERENCES `servicos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `anuncios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `anuncios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(150) NOT NULL,
  `preco` DECIMAL(10,2) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `nome_UNIQUE` (`nome` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `postos_anuncios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `postos_anuncios` (
  `postos_id` INT NOT NULL,
  `anuncios_id` INT NOT NULL,
  `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expire_date` DATE NOT NULL,
  PRIMARY KEY (`postos_id`, `anuncios_id`),
  INDEX `fk_postos_has_anuncios_anuncios1_idx` (`anuncios_id` ASC),
  INDEX `fk_postos_has_anuncios_postos1_idx` (`postos_id` ASC),
  CONSTRAINT `fk_postos_has_anuncios_postos1`
    FOREIGN KEY (`postos_id`)
    REFERENCES `postos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_postos_has_anuncios_anuncios1`
    FOREIGN KEY (`anuncios_id`)
    REFERENCES `anuncios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Pagamentos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Pagamentos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `anuncios_id` INT NOT NULL,
  `data_pagamento` DATETIME NOT NULL,
  `tipo_de_pagamento` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Pagamentos_anuncios1_idx` (`anuncios_id` ASC),
  CONSTRAINT `fk_Pagamentos_anuncios1`
    FOREIGN KEY (`anuncios_id`)
    REFERENCES `anuncios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `usuario_posto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `usuario_posto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `nome_proprietario` VARCHAR(200) NOT NULL,
  `cnpj` VARCHAR(14) NOT NULL,
  `postos_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_usuario_posto_postos1_idx` (`postos_id` ASC),
  CONSTRAINT `fk_usuario_posto_postos1`
    FOREIGN KEY (`postos_id`)
    REFERENCES `postos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
