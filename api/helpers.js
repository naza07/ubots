const { response } = require("express");

const replace_client = async (clients) => {
    
    clients.forEach(element => {
        element.cpf = element.cpf.replace("-", ".");
    });

    return clients
}

const replace_historic = async (historic) => {
    
    historic.forEach(element => {
        element.cliente = element.cliente.replace("0000", "000");
    });

    return historic
}


const historic_sort_by_highest_total_purchase = async (historic, clients) => {

    var response = [];

    var historicDec = historic.sort((a, b) =>{
        return a.valorTotal - b.valorTotal
    }).reverse();

    var highest_total_purchases = historicDec.filter((object, index, array) => array.findIndex( obj => (obj.cliente === object.cliente))===index);

    highest_total_purchases.forEach(element => { 
        
        var found = clients.find(obj_client => {
            return obj_client.cpf == element.cliente;
        });
        
        if(found != undefined){
            response.push(found);
        }
        
      }); 

    return response;
}

const historic_biggest_single_purchase = async (historic, clients) => {

    var historicDec = historic.sort((a, b) =>{

        var as = [];
        var bs = [];

        a.itens.forEach((value ) => {
            as.push(value.preco)
           
        })

        var a_max =  Math.max(...as);

        b.itens.forEach((value ) => {
            bs.push(value.preco)
        })

        var b_max =  Math.max(...bs);

        return a_max - b_max

    }).reverse();

    var highest_total_purchases = historicDec.filter((object, index, array) => array.findIndex( obj => {
        
        return obj.cliente === object.cliente && object.data.split("-")[2] === "2016";

    })===index);


    var client = clients.find(obj_client => {
        return obj_client.cpf == highest_total_purchases[0].cliente;
    });

    return client
}

const most_loyal = async (historics, clients) => {

    var counts = historics.reduce((count, historic) => {
      
        var client = historic.cliente;

        if (!count.hasOwnProperty(client)) {
            count[client] = 0;
        }

        count[client]++;

        return count;
    }, {});

    var average = 0;
    var sum = 0;
    var qtd = 0;

    Object.keys(counts).forEach(function(client){
        sum = sum + counts[client];
        qtd = qtd + 1;

    });

    average =  sum/qtd;

    var response = [];

    Object.keys(counts).forEach(function(client){
        if(counts[client] > average) {

            var found = clients.find(obj_client => {
                return obj_client.cpf == client;
            });
            
            if(found != undefined){
                response.push(found);
            }
        }
    });

    return response;
}


const recommend_wine = async (historics, client) => {

    var counts = historics.reduce((count, historic) => {
      
        if(historic.cliente === client ){
           
            historic.itens.forEach((value ) => {
                
                var product = value.produto;
                
                if (!count.hasOwnProperty(product)) {
                    count[product] = 0;
                }
    
                count[product]++;
               
            })
           
        }
      
        return count;
    }, {});

    var response = Object.keys(counts).sort((a, b) =>{
        return counts[a] - counts[b];
    }).reverse();

   return response[0];
}

module.exports = {
    replace_client,
    replace_historic,
    historic_sort_by_highest_total_purchase,
    historic_biggest_single_purchase,
    most_loyal,
    recommend_wine,
}