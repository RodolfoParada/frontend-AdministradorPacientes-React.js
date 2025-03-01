import PropTypes from 'prop-types';

const Alerta = ({alerta}) => {
    return(
        <div className={`${alerta.error ? 'from-red-400 to-red-600': 'from-indigo-400 to-indigo-600'} 
        bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-10`}>
        {alerta?.msg || "No hay alerta disponible"}
        </div> 
    ) 
}

Alerta.propTypes = {
    alerta: PropTypes.shape({
        msg: PropTypes.string,
        error: PropTypes.bool
    })
};

export default Alerta; 

