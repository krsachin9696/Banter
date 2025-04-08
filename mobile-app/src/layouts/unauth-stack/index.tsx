import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { ROOT_STACK_ROUTES, RootStackRoutes } from "../../routes/root-satck";
import { UNAUTH_STACK_ROUTES, UnauthStackRoutes } from "../../routes/unauth-stack";
import RegisterScreen from "../../screens/registration";

interface UnauthLayoutProps extends NativeStackScreenProps<RootStackRoutes, ROOT_STACK_ROUTES.UNAUTH_STACK_LAYOUT> { }

const UnauthStack = createNativeStackNavigator<UnauthStackRoutes>();

export default function UnauthStackLayout({ route, navigation }: UnauthLayoutProps) {
    return (
        <UnauthStack.Navigator initialRouteName={UNAUTH_STACK_ROUTES.REGISTER}>
            {/* <UnauthStack.Screen name={UNAUTH_STACK_ROUTES.LOGIN} component={RegisterScreen} /> */}
            <UnauthStack.Screen
                name={UNAUTH_STACK_ROUTES.REGISTER}
                component={RegisterScreen}
                options={{
                    headerShown: false
                }}
            />
        </UnauthStack.Navigator>
    )
}