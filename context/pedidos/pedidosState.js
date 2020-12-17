import React, { useReducer } from 'react'
import PedidosContext from './pedidosContext'
import PedidosReducer from './pedidosReducer'

// types 
import {
    SELECCIONAR_PRODUCTO,
    CONFIRMAR_ORDENAR_PLATILLO,
    MOSTRAR_RESUMEN,
    ELIMINAR_PLATILLO,
    ORDEN_CONFIRMADA
} from '../../types'

const PedidosState = props => {

    // State inicial
    const initialState = {
        pedido: [],
        platillo: null,
        total: 0,
        pedidoId: ''
    }

    // useReducer con dispath para ejecutar las funciones
    const [state, dispatch] = useReducer(PedidosReducer, initialState)

    //////////////////
    /// FUNCIONES ///
    ////////////////

    const seleccionarPlatillo = platillo => {
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: platillo
        })
    }

    // Cuando el usuario confirma un platillo
    const confirmarPlatillo = pedido => {
        dispatch({
            type: CONFIRMAR_ORDENAR_PLATILLO,
            payload: pedido
        })
    }

    // Muestra el total a pagar el en resumen
    const mostrarResumen = total => {
        dispatch({
            type: MOSTRAR_RESUMEN,
            payload: total
        })
    }

    // Eliminar un articulo del pedido
    const eliminarPlatilloOrden = id => {
        dispatch({
            type: ELIMINAR_PLATILLO,
            payload: id
        })
    }

    const pedidoConfirmado = id => {
        dispatch({
            type: ORDEN_CONFIRMADA,
            payload: id
        })
    }


    return ( 
        <PedidosContext.Provider
            value={{
                pedido: state.pedido,
                platillo: state.platillo,
                total: state.total,
                pedidoId: state.pedidoId,
                seleccionarPlatillo,
                confirmarPlatillo,
                mostrarResumen,
                eliminarPlatilloOrden,
                pedidoConfirmado
            }}
        >
            { props.children }
        </PedidosContext.Provider>
    )
}
 
export default PedidosState