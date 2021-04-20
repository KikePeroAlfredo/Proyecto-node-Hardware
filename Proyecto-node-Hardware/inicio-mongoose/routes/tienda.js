const path = require('path');

const express = require('express');

const controladorTienda = require('../controllers/tienda');

const router = express.Router();

router.get('/', controladorTienda.getIndex);
//
router.get('/productos', controladorTienda.getProductos);
//
router.get('/productos/:idProducto', controladorTienda.getProducto);

router.get('/carrito', controladorTienda.getCarrito);

router.post('/carrito', controladorTienda.postCarrito);

router.post('/eliminar-articulo-carrito', controladorTienda.postBorrarArticuloCarrito);

router.get('/crear-orden', controladorTienda.postOrden);

router.get('/ordenes', controladorTienda.getOrdenes);

module.exports = router;
