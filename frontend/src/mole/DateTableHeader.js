import {
  Thead,
  Tr,
  Th,
} from '@chakra-ui/react'

function DateTableHeader({koma_table}) {
  return (
    <Thead>
      <Tr>
        <Th fontSize={24}>日付</Th>
        {
          koma_table.map((koma_time, index) => {
            return(
              <Th fontSize={24} key={index}>{koma_time}</Th>
            )
          })
        }
      </Tr>
    </Thead>
  )
}

export default DateTableHeader