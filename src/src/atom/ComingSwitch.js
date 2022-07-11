import { Switch, Text } from '@chakra-ui/react'
import {
  Td,
} from '@chakra-ui/react'
import { useContext } from 'react'

import { ComeFlagsContext } from '../page/ArrangeDatePage' 

function ComingSwitch({index, koma, koma_index}) {
  const {comeFlags, setComeFlags} = useContext(ComeFlagsContext)
  
  function handleSwitch(){
    let newComeFlags = []
    
    // 新たな配列を作成
    for(const [day_idx, one_day] of comeFlags.entries()){
      let oneDayFlags = []
      for(const [koma_idx, one_koma] of one_day.entries()){
        if(day_idx === index && koma_idx === koma_index){
          oneDayFlags.push(!(one_koma))
        }else{
          oneDayFlags.push(one_koma)
        }
      }
      newComeFlags.push(oneDayFlags)
    }
    setComeFlags(newComeFlags)
  }

  return (
    <>
      <Td>
        {
          koma === 'o' ? 
                <Switch onChange={() => handleSwitch()} />
          : 
            <Text>空いていません</Text>
        }
      </Td>
    </>
  )
}

export default ComingSwitch