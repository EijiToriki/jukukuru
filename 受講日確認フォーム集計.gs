function getAnsFromForm() {
  const id = '1NiB4l8ajzeV3cWOwUbyNw907w2BKczsm8pkaS1EhQaU'
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

  makeComingDateSpreadSheet(resArr)  
}

function makeComingDateSpreadSheet(responses){
  // スプレッドシートからタイトルと説明を取得
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  writeBaseInfo(ss, responses)
  writeDateTemp(ss)
  writeFillKoma(ss, responses)
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

// 来塾情報を書きこむ
function writeFillKoma(ss, responses){
  const dateSheet = ss.getSheetByName('受講日フォーム_テンプレート')
  const writeSheet = ss.getSheetByName('受講日表_テンプレート')

  // 講習会の開催日
  const dateNum = dateSheet.getLastRow() - 3    // 3は上三行が日付と関係ないデータのため
  // コマ数
  const komaNum = dateSheet.getLastColumn() - 1 // 日付分の -1

  // コマ情報（①：10:00～11:15, ...的な)
  let komaData = dateSheet.getRange(3, 2, 1, komaNum).getValues()
  komaData = komaData[0]


  // todo
  // 来ない日がある時の処理を書かなければならない

  // 全日付取得
  // let dateData = dateSheet.getRange(4, 1, dateNum).getValues()
  // let dateDataTemp = []
  // for(let i=0; i<dateNum; i++){
  //   let date = dateData[i][0].toString().split(' ')
  //   dateDataTemp.push(`${convertMonth(date[1])}月${date[2]}日（${convertYobi(date[0])}）`)
  // }
  // dateData = dateDataTemp

  // let dateRes = []
  // for(let i=0; i<responses.length; i++){
  //   let dateBuf = []
  //   for(let j=0; j<responses[i].length;j++){
  //     // 日付とオブジェクトの取り出し
  //     if(typeof responses[i][j][1] === 'object'){
  //       dateBuf.push([responses[i][j][0], responses[i][j][1]])
  //     }
  //   }
  //   dateRes.push(dateBuf)
  // }

  // console.log(dateRes[0].length)
  // for(let i=0; i<dateRes.length; i++){
  //   for(let j=0; j<dateRes[i].length; j++){
  //     for(let k=0; k<dateData.length; k++){

  //     }
  //     console.log(dateRes[i][j][0])
  //   }
  // }


  // フォームで得た日付から，
  // 来塾情報を示す [['x','x','o','o','x'], [], ..., []] のような配列を作る．
  // この配列を writeSheet に書き込む
  let writeValue = []
  for(let i=0; i<responses.length; i++){
    let onePersonBuf = []
    for(let j=0; j<responses[i].length;j++){
      // 日付とオブジェクトの取り出し
      if(typeof responses[i][j][1] === 'object'){
        for(let k=0; k<komaNum; k++){
          if(responses[i][j][1].includes(komaData[k])){
            onePersonBuf.push('o')
          }else{
            onePersonBuf.push('x')
          }
        }
      }
    }
    writeValue.push(onePersonBuf)
  }


  // 来塾データの書き込み
  const startStudentNum = 7
  const startKomaNum = 7
  const studentNum = writeValue.length
  const totalKomaNum = writeValue[0].length
  writeSheet.getRange(startStudentNum, startKomaNum, studentNum, totalKomaNum).setValues(writeValue)

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
