const Producto = require('../models/producto');
const Orden = require('../models/orden');

exports.getProductos = (req, res, next) => {
  Producto.find()
  .then(productos => {
    console.log(productos);
    res.render('tienda/lista-productos', {
      prods: productos,
      tituloPagina : 'Todos los productos',
      ruta: '/productos'
    });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getProducto = (req, res, next) => {
  const idProd = req.params.idProducto;
  Producto.findById(idProd)
  .then(producto => {
      res.render('tienda/detalle-producto', {
        producto: producto,
        tituloPagina: producto.titulo,
        ruta: "/productos"
      });
  })
  .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Producto.find()
  .then( productos => {
    res.render('tienda/index', {
      prods: productos,
      tituloPagina : 'Tienda',
      ruta: '/'
    });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getCarrito = (req, res, next) => {
  req.usuario
    .populate('carrito.articulos.idProducto')
    .execPopulate()
    .then(usuario => {
      const productos = usuario.carrito.articulos;
      res.render('tienda/carrito' , {
        ruta: '/carrito',
        tituloPagina: 'Su Carrito',
        productos: productos
    });
  })
  .catch(err => console.log(err));
};

exports.postCarrito = (req, res, next) => {
  const idProd = req.body.idProducto;
  Producto.findById(idProd)
  .then(producto => {
    return req.usuario.agregarAlCarrito(producto);
  })
  .then(resultado => {
    console.log(resultado);
    res.redirect('/carrito');
  });
};

exports.postBorrarArticuloCarrito = (req, res, next) => {
  const idProd = req.body.idProducto;
  req.usuario
    .quitarDelCarrito(idProd)
    .then(resultado => {
      res.redirect('/carrito');
    })
    .catch(err => console.log(err));
};

exports.postOrden = (req, res, next) => {
  req.usuario
    .populate('carrito.articulos.idProducto')
    .execPopulate()
    .then(usuario => {
      const productos = usuario.carrito.articulos.map(a => {
        return { cantidad: a.cantidad, producto: {...a.idProducto._doc} };
      });
      const orden = new Orden({
        usuario: {
          nombre: req.usuario.nombre,
          idUsuario: req.usuario
        },
        productos: productos
      });
      return orden.guardar();
    })
    .then(resultado => {
      return req.usuario.limpiarCarrito();
    })
    .then(() => {
      res.redirect('ordenes');
    })
    .catch(err => console.log(err));
};

exports.getOrdenes = (req, res, next) => {
  Orden.find({ 'usuario.idUsuario': req.usuario._id})
    .then(ordenes => {
      res.render('tienda/ordenes',{
        ruta: '/ordenes',
        tituloPagina:' Sus Ordenes',
        ordenes: ordenes
      });
    })
    .catch(err => console.log(err));
};
