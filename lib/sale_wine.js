var request = require('request');

const clients = async () => {

    var options = {
        'method': 'GET',
        'url': 'http://www.mocky.io/v2/598b16291100004705515ec5',
        'headers': {
        }
      };

      return await function_request(options);

}

const historic = async () => {
   
    var options = {
    'method': 'GET',
    'url': 'http://www.mocky.io/v2/598b16861100004905515ec7',
    'headers': {
    }
    };

    return await function_request(options);

}


function function_request(options) {
      
  return new Promise(function (resolve, reject){

      try{

          request(options, function (error, response) { 
              if (error){   
                  console.log(error);  
                  resolve([]);    
              } 
              if(response.statusCode == 200 ){
                resolve(JSON.parse(response.body));
              }else{
                resolve([]);
              }
              
          });
      } catch (err) {
          console.log(err);
          return [];
      }
     
  });

};


module.exports = {
    clients,
    historic,
}


