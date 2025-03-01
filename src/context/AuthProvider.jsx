import { useState, useEffect, createContext} from 'react'
import PropTypes from 'prop-types'
import clienteAxios from '../config/axios'


const AuthContext = createContext()
const AuthProvider = ({children}) => {

    const [cargando, setCargando] = useState(true)
    const [auth, setAuth ] = useState({})
 

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if(!token) {
                setCargando(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json", 
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await clienteAxios('/veterinarios/perfil', config)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }

            setCargando(false)
            
        }
        autenticarUsuario()
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    // const actualizarPerfil = async datos => {
    //     const token = localStorage.getItem('token')
    //     if(!token) {
    //         setCargando(false)
    //         return
    //     }
    //     const config = {
    //         headers: {
    //             "Content-Type": "application/json", 
    //             Authorization: `Bearer ${token}`
    //         }
    //     }

    //     try {
    //         const url = `/veterinarios/perfil/${datos._id}`
    //         await clienteAxios.put(url, datos, config)

    //         return {
    //             msg: 'Almacenado Correctamente'
    //         }
    //     } catch (error) {
    //         return {
    //             msg: error.response.data.msg,
    //             error: true
    //         }
    //     }
    // }

    const actualizarPerfil = async datos => {
        console.log("Datos enviados al backend:", datos);
        const token = localStorage.getItem('token')
        if(!token) return;
        
        const config = {
            headers: {
                "Content-Type": "application/json", 
                Authorization: `Bearer ${token}`
            }
        }
        try {
            if (!datos._id) throw new Error("El perfil no tiene un ID válido.");
            const url = `/veterinarios/perfil/${datos._id}`;
            await clienteAxios.put(url, datos, config);
            return { msg: 'Almacenado Correctamente' };
        } catch (error) {
            console.error("Error en la petición:", error);
            return { msg: error.response?.data?.msg || "Error desconocido", error: true };
        }
    }
    

    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('token')
        if(!token) {
            setCargando(false)
            return
        }
        const config = {
            headers: {
                "Content-Type": "application/json", 
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = '/veterinarios/actualizar-password'

            const { data } = await clienteAxios.put(url, datos, config)
            console.log(data) 

            return {
                msg: data.msg
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

   

    return(
        <AuthContext.Provider
            value={{
                auth, 
                setAuth,
                cargando, 
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}


export {
    AuthProvider
}

export default AuthContext