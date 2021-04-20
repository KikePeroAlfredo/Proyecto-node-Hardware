const mongodb = require('mongodb');
const ClienteMongo = mongodb.MongoClient;

let _bd; // El _ solo indica que solo se utilizará localmente

const conectarMongo = (callback) =>{
    ClienteMongo.connect(
    	//'mongodb://localhost:27017/tienda', // conexión local
    	'mongodb+srv://Enrique:5qOrJxeGl8uVegDG@cluster0.5rhsx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', // Conexion remota
    	{ useNewUrlParser:true, useUnifiedTopology: true }
    )
    .then(cliente => {
        console.log("Conectado!");
        _bd = cliente.db()
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

const getBD = () => {
    if(_bd){
        return _bd;
    }
    throw 'No se encontro base datos';
}

exports.conectarMongo = conectarMongo;
exports.getBD = getBD;
