import { Button } from '@chakra-ui/react'
import { useContext } from 'react'

import { ComeFlagsContext } from '../page/ArrangeDatePage' 

function SubmitButton(){
  const {comeFlags, setComeFlags} = useContext(ComeFlagsContext)

  function handleButton(){
    console.log(comeFlags)
  }

  return(
    <Button colorScheme='blue' onClick={() => handleButton()}>
      日程決定
    </Button>
  )
}

export default SubmitButton