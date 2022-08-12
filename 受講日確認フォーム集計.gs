function getAnsFromForm() {
  const id = '1HUOjs2CtYBtTnjfQ0iz0f2Um6-53JTXWWjVKtUpjb_8'
  const form = FormApp.openById(id)

  const formResponses = form.getResponses()
  const resArr = []

  for (let i = 0; i < formResponses.length; i++)  {
    // i件目の回答を格納
    let itemResponses = formResponses[i].getItemResponses()
    let res = []
 
    for (let j = 0; j < itemResponses.length; j++)  {
      //i件目の回答のj番目の質問と回答を取得
      let title = itemResponses[j].getItem().getTitle()
      let response = itemResponses[j].getResponse()
      res.push([title, response])
    }
    resArr.push(res)
  }

  // データの取り出しサンプル（氏名が取り出される）
  // for(let i=0; i<ansArr.length; i++){
  //   console.log(ansArr[i][0][1])
  // }

  // makeComingDateSpreadSheet(resArr)
  console.log(resArr)
  
}

function makeComingDateSpreadSheet(responses){
  // スプレッドシートからタイトルと説明を取得
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  writeBaseInfo(ss, responses)
  writeDateTemp(ss)
}


// 学年・氏名・学校名など基本的な情報を書きこむ
function writeBaseInfo(ss, responses){
  const writeSheet = ss.getSheetByName('受講日表_テンプレート')
  // 変わらない情報を書き込み
  writeSheet.getRange('A6').setValue('氏名')
  writeSheet.getRange('C6').setValue('学年')
  writeSheet.getRange('F6').setValue('学校名')

  // 生徒情報を書きこむ
  // todo : setValusesで書き込めるようにする
  // todo : 名前順ソート，学年順ソート
  baseRow = 7
  for(let i=0; i<responses.length; i++){
    writeSheet.getRange(`A${baseRow+i}`).setValue(responses[i][0][1])
    writeSheet.getRange(`C${baseRow+i}`).setValue(responses[i][3][1])
    writeSheet.getRange(`F${baseRow+i}`).setValue(responses[i][1][1])
  }
}


// 日付のテンプレートを作る
function writeDateTemp(ss){
  // 後で消す
  ss = SpreadsheetApp.getActiveSpreadsheet()
  ////////////////////////////////////////////////

  const dateSheet = ss.getSheetByName('受講日フォーム_テンプレート')
  const startRowNum = 4
  const rowNum = dateSheet.getLastRow()
  const dateData = dateSheet.getRange(startRowNum, 1, rowNum-startRowNum+1).getValues()

  const yobiArray = []
  const dateArray = []

  for(let i=0; i<dateData.length; i++){
    let date = dateData[i][0].toString().split(" ")
    yobiArray.push(convertYobi(date[0]))
    dateArray.push(`${convertMonth(date[1])}月${date[2]}日`)
  }

  const writeSheet = ss.getSheetByName('受講日表_テンプレート')
  const komaNum = dateSheet.getLastColumn() - 1 // 日付分の -1

  let mergeStartNum = 6
  const yobiRowNum = 2
  const dateRowNum = 3

  // デフォルトは z で終わるため，列をあらかじめ追加しておく
  writeSheet.insertColumnsAfter(mergeStartNum, komaNum*mergeStartNum);

  // 曜日と日付を書き込む
  for(let i=0; i<yobiArray.length; i++){
    // 曜日セル
    writeSheet.getRange(2, mergeStartNum+i*komaNum+1).setValue(yobiArray[i])
    let mergeRange = writeSheet.getRange(yobiRowNum, mergeStartNum+(i*komaNum)+1, 1, komaNum)
    mergeRange.setHorizontalAlignment('center')
    mergeRange.merge()
    // 日付セル
    writeSheet.getRange(3, mergeStartNum+i*komaNum+1).setValue(dateArray[i])
    mergeRange = writeSheet.getRange(dateRowNum, mergeStartNum+(i*komaNum)+1, 1, komaNum)
    mergeRange.setHorizontalAlignment('center')
    mergeRange.merge()
  }

  // コマ情報を書きこむ
  // // [①：10:00～11:15, ... , ⑥：18:00～19:15] -> [①,...,⑥]
  let displaykomaStr = dateSheet.getRange(3, 2, 1, komaNum).getValues()
  for(let i=0; i<displaykomaStr[0].length;i++){
    displaykomaStr[0][i] = displaykomaStr[0][i][0]
  }
  // // 受講日フォームのoxを取得する
  const komaValues = dateSheet.getRange(4, 2, dateData.length, komaNum).getValues()

  // // 生徒数を取得
  const id = '1HUOjs2CtYBtTnjfQ0iz0f2Um6-53JTXWWjVKtUpjb_8'
  const studentNum = FormApp.openById(id).getResponses().length;

  const komaStartNum = 7  // コマ情報を書きこむ列の最初

  for(let i=0; i<dateArray.length; i++){
    writeSheet.getRange(6, komaStartNum+i*komaNum, 1, komaNum).setValues(displaykomaStr)
    for(let j=0; j<displaykomaStr[0].length; j++){
      if(komaValues[i][j] === 'x'){
        writeSheet.getRange(6, komaStartNum+i*komaNum+j, studentNum+1, 1).setBackground('gray')
      }
    }
  }

  // 生徒基本情報の列幅
  writeSheet.setColumnWidths(1, komaNum-1, 100)
  // コマ情報の列幅
  writeSheet.setColumnWidths(komaStartNum, dateArray.length*komaNum, 20)
}


function convertYobi(yobi){
  if(yobi === 'Mon'){
    return '月'
  }else if(yobi === 'Tue'){
    return '火'
  }else if(yobi === 'Wed'){
    return '水'
  }else if(yobi === 'Thu'){
    return '木'
  }else if(yobi === 'Fri'){
    return '金'
  }else if(yobi === 'Sat'){
    return '土'
  }else if(yobi === 'Sun'){
    return '日'
  }
}

function convertMonth(month){
  if(month === "Jan"){
    return 1
  }else if(month === "Feb"){
    return 2
  }else if(month === "Mar"){
    return 3
  }else if(month === "Apl"){
    return 4
  }else if(month === "May"){
    return 5
  }else if(month === "Jun"){
    return 6
  }else if(month === "Jul"){
    return 7
  }else if(month === "Aug"){
    return 8
  }else if(month === "Sep"){
    return 9
  }else if(month === "Oct"){
    return 10
  }else if(month === "Nov"){
    return 11
  }else if(month === "Dec"){
    return 12
  }
}
