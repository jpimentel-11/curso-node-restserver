
const { response} = require('express');


const usuariosGet = ('/', (req, res) => {
    res.json({
        msg: 'get API - controlador'
    });
});


const usuariosPost = ('/', (req, res) => {
  
    const {nombre, edad} = req.body;

    res.json({
        msg: 'Post API - controlador',
        nombre,
        edad
    });
});


const usuariosPut = ('/', (req, res) => {
    res.json({
        msg: 'Put API - controlador'
    });
});

const usuariosPatch = ('/', (req, res) => {
    res.json({
        msg: 'Patch API - controlador'
    });
});

const usuariosDelete = ('/', (req, res) => {
    res.json({
        msg: 'Delete API - controlador'
    });
});



module.exports = {
    usuariosGet, usuariosPost,usuariosPut, usuariosPatch, usuariosDelete
}