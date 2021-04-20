exports.get404 = (req, res, next)=> {
    res.status(404).render('404', {tituloPagina: 'Página no Encontrada', ruta: '/404'});
};