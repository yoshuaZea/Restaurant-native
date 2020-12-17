import React, { useReducer } from 'react'
import FirebaseReducer from './firebaseReducer'
import FirebaseContext from './firebaseContext'
import firebase from '../../firebase'
import _ from 'lodash'

// Types
import { OBTENER_PRODUCTOS_EXITO } from '../../types'

const FirebaseState = props => {

    // Crear state inicial
    const initialState = {
        menu: []
    }

    // useReducer con dispath para ejecutar las funciones
    // dispatch llama a las funciones
    const [state, dispatch] = useReducer(FirebaseReducer, initialState)

    //////////////////
    /// FUNCIONES ///
    ////////////////

    const obtenerProductos = async () => {
        // Consultar firebase
        firebase.db
            .collection('platillos')
            .where('existencia', '==', true)
            .onSnapshot( (snapshot) => {
                let platillos = snapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                })

                // Ordenar por categoría con lodash
                platillos = _.sortBy(platillos, 'categoria')
                
                // Ejecutar el dispatch
                dispatch({
                    type: OBTENER_PRODUCTOS_EXITO,
                    payload: platillos
                })
            })
    }

    // State y funciones que hace que estén disponibles en toda la aplicación
    return (
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                firebase,
                obtenerProductos
            }}
        >
            { props.children }
        </FirebaseContext.Provider>
    )
}

export default FirebaseState
