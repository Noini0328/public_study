console.log('**** v20240410_Revised ****');
console.log('** content.js');
console.log("** in URL:   " + window.location.href);
var count_popup = 0;

// window.addEventListener("DOMContentLoaded", function () {
//   setTimeout(function() {
//     const inputFields = document.querySelectorAll(QueryData);
//     console.log(inputFields);
//   }, 500); // 0.5秒待機
// });
  

window.addEventListener("load", function () {
//window.addEventListener("DOMContentLoaded", function () {

  console.log("** GetDomain")
  var DomainName = getDomainName();
  console.log("** Load")

  console.log('0.5sec. wait...');
    
  setTimeout(function() {
    console.log('0.5sec. wait finish');

    var allInputs = document.querySelectorAll('input');
    allInputs.forEach(function (field, index) {
      console.log("**** All input field " + (index + 1) + ": ", field);
    });
  
    const input_keys = ['user', 'userid', 'user_id', 'userId', 'uid', 'id_input', 'login', 'logon', 
     'name', 'username', 'fullname', 'billing_user', 'billing_name', 
     'mail', 'email', 'Email Address', 'emailaddress','emailAddress', 'Emailaddress', 'EmailAddress',
     'billing_email', 
     'phone', 
     'password', 'Password', 'pw_input',
     'a', 'b', 'c', 'u', 'p', 'x', 'y', 'z'
    ];
  
    let generatedVariables = [];
    input_keys.forEach(type => {
      const variable = `input[type='${type}'], input[name='${type}'], input[id='${type}']`;
      generatedVariables.push(variable);
    });
    const QueryData = generatedVariables.join(', ');
  
    let inputFields = document.querySelectorAll(QueryData);
  
    console.log("** inputFieldsLength: " + inputFields.length);
    console.log("** domain name: " + DomainName);
  
    if (inputFields.length > 0) {
  
      console.log("** after load, input form count > 0")
      console.log("** Found input fields:");
      inputFields.forEach(function (field, index) {
        console.log("**** Field " + (index + 1) + ": ", field);
  
        field.addEventListener("focus", function () {
          console.log("** Cursor moved to Field: " + (index + 1));
          console.log("** count_popup: " + count_popup);
          if (count_popup == 0){
            checkSiteAndPopup(DomainName);
          }
          count_popup += 1;      
        });
  
      });
  
    }


  }, 500);



  function getDomainName() {
    var DomainName = window.location.hostname;
    return DomainName;
  }
  function checkSiteAndPopup(DomainName) {
    console.log("**** check domain " +DomainName.split('.').slice(-2).join('.'))
    const DomainKeys = ["github.io", "pages.dev", "webflow.io", "weebly.com"];
    if (DomainKeys.includes(DomainName.split('.').slice(-2).join('.'))){
      const width = 800;
      const height = 600;
      const left = (window.screen.width - width) / 2;
      const top = (window.screen.height - height) / 2;
      console.log("** popup!!")

      const popupWindow = window.open("https://gnosis.iisec.ac.jp/hashilab/sakai/FakeSiteWarning/#", "PopupWindowName", `width=${width}, height=${height}, left=${left}, top=${top}`);
      if (!popupWindow) {
        alert("** popup fail...");
      }
    } else {

      chrome.runtime.sendMessage({ url: `https://gnosis.iisec.ac.jp/hashilab/sakai/CheckWebInfo?domain=${DomainName}` }, function(response){
        if (chrome.runtime.lastError) {
          console.log("** chrome runtime error")
          console.error(chrome.runtime.lastError);
        } else {
          console.log("** Request sent to background.js");
          console.log("** Data received in content.js:", response);
          console.log("** cert date span:", response.span_day);
          console.log("** issuerCommonName:", response.issuerCommonName);
          console.log("** oName:", response.oName);

          if ((response.span_day && response.span_day <= 90) || (response.span_day && response.span_day == "-")) {
            console.log("** Certificate span is less than 90 days.");

            const width = 800;
            const height = 600;
            const left = (window.screen.width - width) / 2;
            const top = (window.screen.height - height) / 2;
            console.log("** popup!!")

            const popupWindow = window.open("https://gnosis.iisec.ac.jp/hashilab/sakai/FakeSiteWarning/#", "PopupWindowName", `width=${width}, height=${height}, left=${left}, top=${top}`);
            if (!popupWindow) {
              alert("** popup fail...");
            }
          }
        }
      });
    }
  }
});