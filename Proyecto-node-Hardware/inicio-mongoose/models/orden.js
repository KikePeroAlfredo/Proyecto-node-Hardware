const mongoose = require('mongoose');

const Esquema = mongoose.Schema;

const esquemaOrden = new Esquema({
  productos: [
    {
      producto: { type: Object, required: true },
      cantidad: { type: Number, required: true}
    }
  ],
  usuario: {
    nombre: {
      type: String,
      required: true
    },
    idUsuario: {
      type: Esquema.Types.ObjectId,
      required: true,
      ref: 'Usuario'
    }
  }
});

module.exports = mongoose.model('Orden', esquemaOrden);
