const validarCampos  = require('../middelwares/validar-campos');
const validarJWT = require('../middelwares/validarJWT');
const validaRoles = require('../middelwares/validar-roles');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles
}