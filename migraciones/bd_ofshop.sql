
CREATE DATABASE ofshop;

USE ofshop;

CREATE TABLE usuario(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombres TEXT NOT NULL,
    apellidos TEXT NOT NULL,
    usuario TEXT NOT NULL,
    correo TEXT NOT NULL,
    contrasena TEXT NOT NULL,
    admin BOOLEAN DEFAULT FALSE,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion DATETIME DEFAULT NOW(),
    fecha_modificacion DATETIME DEFAULT NOW()
);

INSERT INTO `ofshop`.`usuario` (`nombres`, `apellidos`, `usuario`, `correo`, `contrasena`, `admin`) VALUES ('admin', 'admin', 'admin', 'admin@gmail.com', '12345', TRUE);
INSERT INTO `ofshop`.`usuario` (`nombres`, `apellidos`, `usuario`, `correo`, `contrasena`) VALUES ('comprador', 'comprador', 'comprador', 'comprador@gmail.com', '1234');

CREATE TABLE producto(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    precio DECIMAL(10,2) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion DATETIME DEFAULT NOW(),
    fecha_modificacion DATETIME DEFAULT NOW()
);

CREATE TABLE imagen(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
	ruta_archivo TEXT,
    nombre_archivo TEXT,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion DATETIME DEFAULT NOW(),
    fecha_modificacion DATETIME DEFAULT NOW(),
    FOREIGN KEY (id_producto)
    REFERENCES producto (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE compra(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cantidad_articulos INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    pagado BOOLEAN DEFAULT FALSE,
    payment_id TEXT,
    payer_id TEXT,
    facilitator_access_token TEXT,
    id_captures TEXT,
    payer_email TEXT,
    payer_name TEXT,
    id_usuario INT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion DATETIME DEFAULT NOW(),
    fecha_modificacion DATETIME DEFAULT NOW(),
    FOREIGN KEY (id_usuario)
    REFERENCES usuario (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE detalle(
	id_compra INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    total DECIMAL(10,2),
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion DATETIME DEFAULT NOW(),
    fecha_modificacion DATETIME DEFAULT NOW(),
    PRIMARY KEY(id_compra, id_producto),
    FOREIGN KEY (id_compra)
    REFERENCES compra (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    FOREIGN KEY (id_producto)
    REFERENCES producto (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
