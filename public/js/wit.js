var Wit = function(token,text,onResult){

  var wit;

  function makeRequest(){

    $.ajax({
      url: 'https://api.wit.ai/message',
      data: {
        'q': text,
        'access_token' : token
      },
      dataType: 'jsonp',
      method: 'GET',
      success: onResult
    });

  }

  makeRequest();

};
