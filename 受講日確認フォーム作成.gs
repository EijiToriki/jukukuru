function createDateConfirmForm (){
  // スプレッドシートからタイトルと説明を取得
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = ss.getSheetByName('受講日フォーム_テンプレート')
  const formTitle = sheet.getRange('B1').getValue()
  const formDescription = sheet.getRange('B2').getValue()
  
  // タイトルと説明を追加
  const form = FormApp.create(formTitle)
  form.setDescription(formDescription)

  // 必須質問（名前，学校，スクール，学年）の追加
  form.addTextItem().setTitle('氏名').setRequired(true)
  form.addTextItem().setTitle('学校名').setRequired(true)
  form.addTextItem().setTitle('スクール名').setRequired(true)
  form.addListItem()
    .setTitle('学年')
    .setChoiceValues(['小4', '小5', '小6', '中1', '中2', '中3'])
    .setRequired(true)
  
  // スプレッドシートの情報から，受講日のフォームを作成する
  // // データの取得
  const rowNum = sheet.getLastRow()
  const startRowNum = 4
  const columnNum = sheet.getLastColumn()
  const dateData = sheet.getRange(startRowNum, 1, rowNum-startRowNum+1, columnNum).getValues()
  const komaData = sheet.getRange(3, 1, 1, columnNum).getValues()

  const formData = []   // 〇×から空いているコマを格納する
  const dateArray = []  // 開放日のみを格納する
  for(let i=0; i < dateData.length; i++){
    let oneDayData = []
    for (let j=0; j < dateData[i].length; j++){
      if(j == 0){
        dateArray.push(convertDateFormat(dateData[i][j]))
      }else{
        if(dateData[i][j] == 'o'){
          oneDayData.push(komaData[0][j])
        }
      }
    }
    formData.push(oneDayData)
  }

  // // フォームに書き込み
  for(let i=0; i<dateArray.length; i++){
    form.addCheckboxItem()
      .setTitle(dateArray[i])
      .setChoiceValues(formData[i])
  }

}

function convertDateFormat(date){
  date = date.toString().split(" ")

  let yobi = convertYobi(date[0])
  let month = convertMonth(date[1])
  let day = date[2]
  
  return `${month}月${day}日（${yobi}）`
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
