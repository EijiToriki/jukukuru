// import {Router} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';

import ArrangeDatePage from './page/ArrangeDatePage';

function App() {
  return (
    <ChakraProvider>
      <ArrangeDatePage />
    </ChakraProvider>
  )
}

export default App