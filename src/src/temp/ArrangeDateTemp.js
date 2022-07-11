import { VStack } from '@chakra-ui/react'

import Header from "../orga/Header"
import ComingTable from "../orga/ComingTable"
import SubmitButton from "../atom/SubmitButton"

function ArrangeDateTemp({koma_table, open_date}) {
  return (
    <>
      <Header />
      <VStack>
        <ComingTable koma_table={koma_table} open_date={open_date}/>
        <SubmitButton />
      </VStack>
    </>
  )
}

export default ArrangeDateTemp