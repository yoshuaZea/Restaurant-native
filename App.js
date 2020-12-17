import 'react-native-gesture-handler'
import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { decode, encode } from 'base-64'

// Base 64
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode } 

// Crear la navegación
const Stack = createStackNavigator()

// Componentes
import NuevaOrden from './views/NuevaOrden'
import Menu from './views/Menu'
import DetallePlatillo from './views/DetallePlatillo'
import FormularioPlatillo from './views/FormularioPlatillo'
import ResumenPedido from './views/ResumenPedido'
import ProgresoPedido from './views/ProgresoPedido'
import BotonResumen from './components/BotonResumen'

// Importar state del context firebase y pedidos
import FirebaseState from './context/firebase/firebaseState'
import PedidosState from './context/pedidos/pedidosState'

const App = () => {
  return (
    <>
      <FirebaseState>
        <PedidosState>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="NuevaOrden"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#FFD781',
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                  color: '#334F64'
                },
                headerTitleAlign: 'center'
              }}
            >
              <Stack.Screen 
                name="NuevaOrden"
                component={NuevaOrden}
                options={{
                  title: "Restaurant App"
                }}
              />
    
              <Stack.Screen 
                name="Menu"
                component={Menu}
                options={{
                  title: "Menú",
                  headerRight: props => <BotonResumen />
                }}
              />
    
              <Stack.Screen 
                name="DetallePlatillo"
                component={DetallePlatillo}
                options={{
                  title: "Detalles del platillo",
                  headerRight: props => <BotonResumen />
                }}
              />
    
              <Stack.Screen 
                name="FormularioPlatillo"
                component={FormularioPlatillo}
                options={{
                  title: "Ordenar platillo"
                }}
              />
    
              <Stack.Screen 
                name="ResumenPedido"
                component={ResumenPedido}
                options={{
                  title: "Resumen pedido"
                }}
              />
    
              <Stack.Screen 
                name="ProgresoPedido"
                component={ProgresoPedido}
                options={{
                  title: "Tiempo de espera"
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PedidosState>
      </FirebaseState>
    </>
  )
}

const styles = StyleSheet.create({
  
})

export default App
