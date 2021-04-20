const mongoose = require('mongoose');

const Esquema = mongoose.Schema;

const esquemaProducto = new Esquema({
  titulo: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  urlImagen: {
    type: String,
    required: true
  }//,
  // idUsuario: {
  //   type: Esquema.Types.ObjectId,
  //   ref: 'Usuario',
  //   required: true
  // }
});

module.exports = mongoose.model('Producto', esquemaProducto);
