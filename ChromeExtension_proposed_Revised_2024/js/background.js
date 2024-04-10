console.log('in background');



chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  fetch(message.url, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(data => {
      console.log("Response from the external API:", data);
      sendResponse(data); // レスポンスをcontent.jsに返す
      console.log("Response sent")
    })
    .catch(error => {
      console.error("Error in fetching data:", error);
      sendResponse({ error: error.message }); // エラーメッセージをcontent.jsに返す
    });

  return true; // 非同期処理が終了する前にリクエストを閉じないようにする
});