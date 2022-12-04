import {ChakraProvider} from '@chakra-ui/react'
import Home from "./home";

function MyApp() {

    return (
        <ChakraProvider>
            <main>
                <Home/>
            </main>
        </ChakraProvider>
    )
}

export default MyApp