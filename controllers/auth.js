const { response, json} = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify')

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



const googleSingIn = async(req, res = response) =>{
    const { id_token} = req.body;

    try{

        const {correo, nombre, img } = await googleVerify(id_token );
         let usuario = await Usuario.findOne({ correo });
         console.log(usuario)

         if(!usuario){
            //crear el usuario si no existe
            const data = {
                nombre,
                correo, 
                password: ':p',
                img,
                google: true
            };
            
            console.log(data)
            usuario = new Usuario( data);
            await usuario.save();
         }
        

         //si el usuario en DB
         if(!usuario.estado){
            return res.status(400).json({
                msg: 'Hable con el administrador'
            });
         }

         //Generar el JWT
         const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    }catch(error){
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })

    }

    
}

module.exports = {
    login, googleSingIn
}
