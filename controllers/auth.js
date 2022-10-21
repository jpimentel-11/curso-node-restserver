const { response} = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');

const login = async (req, res = response) =>{
    const { correo, password} = req.body;
    try{

       // verifica si el email existe
       const usuario = await Usuario.findOne({correo});
       if(!usuario){
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - correo'
        });
       }

       //Si el usuario esta activo
       if( !usuario.estado){
        return res.status(400).json({
            msg:'Usuario / Password no son correctos - estado: false'
        });
       }

       //verifica la contraseña

       const validPassword = bcryptjs.compareSync(password, usuario.password);
       if(!validPassword){
        return res.status(400).json({
            msg:'Usuario / Passeord no son correctos - password'
        })
       }
      
       //Generar token
       const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
    
    }catch(error){
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    login
}
