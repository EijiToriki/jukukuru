import {
  Table,
  TableContainer,
} from '@chakra-ui/react'

import DateTableHeader from '../mole/DateTableHeader'
import DateTableContents from '../mole/DateTableContents'

function ComingTable({koma_table, open_date}) {
  return (
    <TableContainer p='6' w='80%' margin='auto'>
      <Table variant='simple'>
        <DateTableHeader koma_table={koma_table}/>
        <DateTableContents open_date={open_date} />
      </Table>
    </TableContainer>
  )
}

export default ComingTable