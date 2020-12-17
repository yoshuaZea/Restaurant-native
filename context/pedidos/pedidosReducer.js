// types 
import {
    SELECCIONAR_PRODUCTO,
    CONFIRMAR_ORDENAR_PLATILLO,
    MOSTRAR_RESUMEN,
    ELIMINAR_PLATILLO,
    ORDEN_CONFIRMADA
} from '../../types'

export default (state, action) => {
    switch (action.type) {
        case SELECCIONAR_PRODUCTO:
            return {
                ...state,
                platillo: action.payload
            }
        case CONFIRMAR_ORDENAR_PLATILLO: 
            return {
                ...state,
                pedido: [ ...state.pedido, action.payload ]
            }
        case MOSTRAR_RESUMEN:
            return {
                ...state,
                total: action.payload
            }
        case ELIMINAR_PLATILLO:
            return {
                ...state,
                pedido: state.pedido.filter(platillo => platillo.id !== action.payload)
            }
        case ORDEN_CONFIRMADA:
            return {
                ...state,
                pedido: [],
                total: 0,
                pedidoId: action.payload
            }
        default:
            return state
    }
}