import {Box} from '@chakra-ui/react'
import ProductName from '../atom/ProductName'

function Header() {
  return (
    <Box bg='whitesmoke' w='100%' p='2' color='black'>
      <ProductName />
    </Box>
  )
}

export default Header