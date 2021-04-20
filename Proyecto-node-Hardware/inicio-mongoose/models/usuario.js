const mongoose = require('mongoose');

const Esquema = mongoose.Schema;

const esquemaUsuario = new Esquema({
  nombre: {
    type:String,
    required:true
  },
  email: {
    type: String,
    required: true
  },
  carrito: {
    articulos: [
      {
        idProducto: {
          type: Esquema.Types.ObjectId,
          ref: 'Producto',
          required: true
        },
        cantidad: { type: Number, required: true}
      }
    ]
  }
});

esquemaUsuario.methods.agregarAlCarrito = function(producto) {
  const indiceProductoCarrito = this.carrito.articulos.findIndex(pc => {
    return pc.idProducto.toString() === producto._id.toString();
  });
  let nuevaCantidad = 1;
  const articulosCarritoActualizado = [...this.carrito.articulos];

  if(indiceProductoCarrito >= 0){
    nuevaCantidad = this.carrito.articulos[indiceProductoCarrito].cantidad + 1;
    articulosCarritoActualizado[indiceProductoCarrito].cantidad = nuevaCantidad;
  } else {
    articulosCarritoActualizado.push({
      idProducto: producto._id,
      cantidad: nuevaCantidad
    });
  }
  const carritoActualizado = {
    articulos: articulosCarritoActualizado
  };
  this.carrito = carritoActualizado;
  return this.save();
};

esquemaUsuario.methods.quitarDelCarrito = function(idProducto) {
  const articulosCarritoActualizado = this.carrito.articulos.filter( articulo => {
    return articulo.idProducto.toString() !== idProducto.toString();
  });
  this.carrito.articulos = articulosCarritoActualizado;
  return this.save();
};

esquemaUsuario.methods.limpiarCarrito = function() {
  this.carrito = { articulos: [] };
  return this.save();
}

module.exports = mongoose.model('Usuario', esquemaUsuario);
