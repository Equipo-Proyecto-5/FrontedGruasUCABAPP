import Order from "../../pages/Order/Order";
import OrderDetail from "../../pages/Order/OrderDetail";
import OrderCancelled from "../../pages/Order/OrderCancelled";
import OrderDetailFinish from "../../pages/Order/OrderDetailFinish";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

export default function order() {
   
      return (
       
          <Stack.Navigator id={undefined}>
             <Stack.Screen name="Ordenes" component={Order} /> 
             <Stack.Screen name="OrderDetail" component={OrderDetail} />
             <Stack.Screen name="OrderCancelled" component={OrderCancelled} /> 
             <Stack.Screen name="OrderDetailFinish" component={OrderDetailFinish} />  
             </Stack.Navigator> 
          );
   
}

