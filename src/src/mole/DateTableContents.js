import {
  Tbody,
  Tr,
  Td,
} from '@chakra-ui/react'

import ComingSwitch from '../atom/ComingSwitch'


function DateTableContents({open_date}) {
  return (
    <Tbody>
      {
        open_date.map((date, index) => {
          return(
            <Tr key={index}>
              <Td>{date.date}（{date.dow}）</Td>
              <ComingSwitch index={index} koma={date.koma1} koma_index={0}/>
              <ComingSwitch index={index} koma={date.koma2} koma_index={1}/>
              <ComingSwitch index={index} koma={date.koma3} koma_index={2}/>
              <ComingSwitch index={index} koma={date.koma4} koma_index={3}/>
            </Tr>
          )   
        })
      }
    </Tbody>
  )
}

export default DateTableContents