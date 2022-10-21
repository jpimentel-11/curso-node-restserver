const { response} = require('express')

const esAdminRole = (req, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar token primro'
        });
    }

    const {rol, nombre} = req.usuario;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        });
    }

    next();
}

const tieneRole = ( ...roles) => {

  return(req, res = response, next) =>{
    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar token primro'
        });
    }

    if( !roles.includes( req.usuario.rol)){
        return res.status(401).json({
            msg: `El servidor requiere uno de estos roles ${roles}`
        })
    }

    next();
  }


}


module.exports = {
    esAdminRole,tieneRole
}