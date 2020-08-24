const saleWineLib = require("../../../lib/sale_wine");
const helpers = require("../../helpers");


const highest_total_purchase = async (req, res, next) => {
  try {

    var clients = await helpers.replace_client(await saleWineLib.clients());

    var historic = await helpers.replace_historic(await saleWineLib.historic());

    var response = await helpers.historic_sort_by_highest_total_purchase(historic, clients);

    return res.status(200).json(response);

  } catch (err) {
    next(err);
  }
};


const biggest_single_purchase = async (req, res, next) => {
    try {
        
        var clients = await helpers.replace_client(await saleWineLib.clients());

        var historic = await helpers.replace_historic(await saleWineLib.historic());

        var client = await helpers.historic_biggest_single_purchase(historic, clients);
        
        return res.status(200).json(client);

    } catch (err) {
        next(err);
    }
};


const most_loyal = async (req, res, next) => {
    try {
        
        var clients = await helpers.replace_client(await saleWineLib.clients());

        var historic = await helpers.replace_historic(await saleWineLib.historic());

        var response = await helpers.most_loyal(historic, clients);
        
        return res.status(200).json(response);

    } catch (err) {
        console.log("Já deu erro no controllers");
        next(err);
    }
};


const recommend_wine = async (req, res, next) => {
    try {
           
        var cpf = req.params.cpf;

        var clients = await helpers.replace_client(await saleWineLib.clients());

        var historic = await helpers.replace_historic(await saleWineLib.historic());
       
        var client = clients.find(c => c.cpf == cpf);

        if(client != undefined){

            var response = await helpers.recommend_wine(historic, client.cpf);

            return res.status(200).json({wine: response});

        }else{

            res.status(400).json({
                message: `Cannot found this params ${req.params.id} on this server`,
                code: 'NOT_PARAMS_ON_SERVER',
                });
        }
            
        
        
    } catch (err) {
        next(err);
    }
};


module.exports = {
    highest_total_purchase,
    biggest_single_purchase,
    most_loyal,
    recommend_wine,
};
