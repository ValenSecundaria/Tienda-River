-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,
    "imagen_url" VARCHAR(255),
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estadoorden" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "descripcion" TEXT,
    "es_final" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "estadoorden_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estadopago" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "descripcion" TEXT,
    "es_final" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "estadopago_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orden_promociones" (
    "orden_id" INTEGER NOT NULL,
    "promocion_id" INTEGER NOT NULL,
    "monto_descuento" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "orden_promociones_pkey" PRIMARY KEY ("orden_id","promocion_id")
);

-- CreateTable
CREATE TABLE "ordenes" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "estado_orden_id" INTEGER NOT NULL,
    "transaccion_id" INTEGER NOT NULL,
    "fecha" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DECIMAL(10,2) NOT NULL,
    "direccion_envio" TEXT,
    "tracking_number" VARCHAR(50),
    "notas" TEXT,

    CONSTRAINT "ordenes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordenitems" (
    "id" SERIAL NOT NULL,
    "orden_id" INTEGER NOT NULL,
    "producto_variante_id" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio_unitario" DECIMAL(10,2) NOT NULL,
    "descuento" DECIMAL(10,2) DEFAULT 0,

    CONSTRAINT "ordenitems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagos" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "detalle" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "icono" VARCHAR(50),

    CONSTRAINT "pagos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productoimagenes" (
    "id" SERIAL NOT NULL,
    "producto_id" INTEGER NOT NULL,
    "imagen_url" VARCHAR(255) NOT NULL,
    "orden" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "productoimagenes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productos" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,
    "precio_base" DECIMAL(10,2) NOT NULL,
    "categoria_id" INTEGER,
    "subcategoria_id" INTEGER,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imagen_principal" VARCHAR(255),

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productovariante" (
    "id" SERIAL NOT NULL,
    "producto_id" INTEGER NOT NULL,
    "talle_id" INTEGER NOT NULL,
    "color_nombre" VARCHAR(50) NOT NULL,
    "color_codigo_hex" VARCHAR(7) NOT NULL,
    "stock" INTEGER NOT NULL,
    "sku" VARCHAR(100) NOT NULL,
    "precio_adicional" DECIMAL(10,2) DEFAULT 0,
    "imagen" VARCHAR(255),
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "productovariante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promociones" (
    "id" SERIAL NOT NULL,
    "codigo" VARCHAR(30) NOT NULL,
    "descripcion" TEXT,
    "porcentaje_desc" DECIMAL(5,2),
    "monto_desc" DECIMAL(10,2),
    "fecha_inicio" TIMESTAMP(6) NOT NULL,
    "fecha_fin" TIMESTAMP(6) NOT NULL,
    "uso_maximo" INTEGER NOT NULL DEFAULT 1,
    "uso_por_usuario" INTEGER NOT NULL DEFAULT 1,
    "minimo_compra" DECIMAL(10,2),
    "aplica_categorias" JSONB,
    "aplica_productos" JSONB,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "promociones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subcategorias" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,
    "categoria_id" INTEGER NOT NULL,
    "imagen_url" VARCHAR(255),
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subcategorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "talles" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "orden" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "talles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transacciones" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "monto_total" DECIMAL(10,2) NOT NULL,
    "fecha" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado_pago_id" INTEGER NOT NULL,
    "forma_pago_id" INTEGER NOT NULL,
    "codigo_transaccion" VARCHAR(50),
    "datos_adicionales" JSONB,

    CONSTRAINT "transacciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "contraseña" VARCHAR(255) NOT NULL,
    "rol" VARCHAR(50) NOT NULL,
    "telefono" VARCHAR(20),
    "fecha_creacion" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categorias_slug_key" ON "categorias"("slug");

-- CreateIndex
CREATE INDEX "idx_ordenes_usuario_id" ON "ordenes"("usuario_id");

-- CreateIndex
CREATE INDEX "idx_orden_items_orden_id" ON "ordenitems"("orden_id");

-- CreateIndex
CREATE UNIQUE INDEX "productos_slug_key" ON "productos"("slug");

-- CreateIndex
CREATE INDEX "idx_productos_categoria_id" ON "productos"("categoria_id");

-- CreateIndex
CREATE INDEX "idx_productos_subcategoria_id" ON "productos"("subcategoria_id");

-- CreateIndex
CREATE UNIQUE INDEX "productovariante_sku_key" ON "productovariante"("sku");

-- CreateIndex
CREATE INDEX "idx_producto_variante_producto_id" ON "productovariante"("producto_id");

-- CreateIndex
CREATE INDEX "idx_producto_variante_talle_id" ON "productovariante"("talle_id");

-- CreateIndex
CREATE UNIQUE INDEX "promociones_codigo_key" ON "promociones"("codigo");

-- CreateIndex
CREATE INDEX "idx_promociones_activo" ON "promociones"("activo");

-- CreateIndex
CREATE INDEX "idx_promociones_codigo" ON "promociones"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "subcategorias_slug_key" ON "subcategorias"("slug");

-- CreateIndex
CREATE INDEX "idx_subcategorias_categoria_id" ON "subcategorias"("categoria_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_subcategoria_categoria" ON "subcategorias"("nombre", "categoria_id");

-- CreateIndex
CREATE UNIQUE INDEX "talles_nombre_key" ON "talles"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "transacciones_codigo_transaccion_key" ON "transacciones"("codigo_transaccion");

-- CreateIndex
CREATE INDEX "idx_transacciones_usuario_id" ON "transacciones"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "orden_promociones" ADD CONSTRAINT "orden_promociones_orden_id_fkey" FOREIGN KEY ("orden_id") REFERENCES "ordenes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orden_promociones" ADD CONSTRAINT "orden_promociones_promocion_id_fkey" FOREIGN KEY ("promocion_id") REFERENCES "promociones"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ordenes" ADD CONSTRAINT "ordenes_estado_orden_id_fkey" FOREIGN KEY ("estado_orden_id") REFERENCES "estadoorden"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ordenes" ADD CONSTRAINT "ordenes_transaccion_id_fkey" FOREIGN KEY ("transaccion_id") REFERENCES "transacciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ordenes" ADD CONSTRAINT "ordenes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ordenitems" ADD CONSTRAINT "ordenitems_orden_id_fkey" FOREIGN KEY ("orden_id") REFERENCES "ordenes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ordenitems" ADD CONSTRAINT "ordenitems_producto_variante_id_fkey" FOREIGN KEY ("producto_variante_id") REFERENCES "productovariante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "productoimagenes" ADD CONSTRAINT "productoimagenes_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_subcategoria_id_fkey" FOREIGN KEY ("subcategoria_id") REFERENCES "subcategorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "productovariante" ADD CONSTRAINT "productovariante_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "productovariante" ADD CONSTRAINT "productovariante_talle_id_fkey" FOREIGN KEY ("talle_id") REFERENCES "talles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subcategorias" ADD CONSTRAINT "subcategorias_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transacciones" ADD CONSTRAINT "transacciones_estado_pago_id_fkey" FOREIGN KEY ("estado_pago_id") REFERENCES "estadopago"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transacciones" ADD CONSTRAINT "transacciones_forma_pago_id_fkey" FOREIGN KEY ("forma_pago_id") REFERENCES "pagos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transacciones" ADD CONSTRAINT "transacciones_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
