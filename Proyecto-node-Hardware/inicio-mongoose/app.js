const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const controladorError = require('./controllers/error');
const Usuario = require('./models/usuario');

const app = express();

app.set('view engine', 'ejs');
app.set('views','views');

const adminRoutes = require('./routes/admin');
const tiendaRoutes = require('./routes/tienda');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   Usuario.findById('605a11d7d23ba56748dcedca')
//     .then(usuario => {
//       req.usuario = usuario;
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(tiendaRoutes);

app.use(controladorError.get404);

mongoose
  .connect(
    //'mongodb://localhost:27017/5bPrimerBD', // conexión local
    'mongodb+srv://Enrique:5qOrJxeGl8uVegDG@cluster0.5rhsx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', // Conexion remota
    { useNewUrlParser:true, useUnifiedTopology: true }
  )
  .then(resultado => {
    Usuario.findOne().then(usuario => {
      if (!usuario) {
        const usuario = new Usuario({
          nombre: 'Max',
          email: 'max@prueba.com',
          carrito: {
            articulos: []
          }
        });
        usuario.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
