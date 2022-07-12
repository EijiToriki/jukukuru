import { createContext, useState } from "react"
import ArrangeDateTemp from "../temp/ArrangeDateTemp"

const koma_table = ["10:00～11:15", "11:30～12:45", "13:30～14:45", "15:00～16:15"]
const open_date = [
  {date:'7月25日', dow:'月', koma1:'o', koma2:'o', koma3:'-', koma4:'-'},
  {date:'7月26日', dow:'火', koma1:'o', koma2:'o', koma3:'o', koma4:'o'},
  {date:'7月27日', dow:'水', koma1:'o', koma2:'o', koma3:'o', koma4:'o'},
  {date:'7月28日', dow:'木', koma1:'o', koma2:'o', koma3:'o', koma4:'o'},
  {date:'7月29日', dow:'金', koma1:'-', koma2:'-', koma3:'o', koma4:'o'},
]

var first_comFlags_data = new Array(open_date.length)
for(var i=0; i<open_date.length; i++){
  first_comFlags_data[i] = new Array(4)   // 4 はコマ数（変数で管理できるようにしたい，，，）
  for(var j=0; j<4; j++){
    first_comFlags_data[i][j] = false
  }
}
 
export const ComeFlagsContext = createContext()

function ArrangeDatePage() {
  const [comeFlags, setComeFlags] = useState(first_comFlags_data)
  const comeFlagsValue = {
    comeFlags,
    setComeFlags
  }

  return (
    <>
      <ComeFlagsContext.Provider value={comeFlagsValue}>
        <ArrangeDateTemp koma_table={koma_table} open_date={open_date}/>
      </ComeFlagsContext.Provider>
    </>
  )
}

export default ArrangeDatePage