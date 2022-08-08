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

  makeComingDateSpreadSheet(resArr)
  
}

function makeComingDateSpreadSheet(responses){
  // スプレッドシートからタイトルと説明を取得
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = ss.getSheetByName('受講日表_テンプレート')

  // 変わらない情報を書き込み
  ss.getRange('A6').setValue('氏名')
  ss.getRange('C6').setValue('学年')
  ss.getRange('F6').setValue('学校名')

  // 生徒情報を書きこむ
  // todo : setValusesで書き込めるようにする
  // todo : 名前順ソート，学年順ソート
  baseRow = 7
  for(let i=0; i<responses.length; i++){
    ss.getRange(`A${baseRow+i}`).setValue(responses[i][0][1])
    ss.getRange(`C${baseRow+i}`).setValue(responses[i][3][1])
    ss.getRange(`F${baseRow+i}`).setValue(responses[i][1][1])
  }

  // 日付のテンプレートを作る



}
