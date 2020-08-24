# ubots
Histórico de compras de uma loja de vinho.

## Local

Nesse projeto é consumido dois webservices que retorna uma lista de clientes e histórico de compras de cada cliente.

lista de clientes:

[
    {
        "id": 1,
        "nome": "Vinicius",
        "cpf": "000.000.000-01"
    }
]

histórico de compras na loja de vinho:

[
    {
        "codigo": "3fde36a6-c9a1-4d27-9f0f-7c12ab0d1cdd",
        "data": "19-02-2016",
        "cliente": "0000.000.000.01",
        "itens": [
            {
                "produto": "Casa Silva Reserva",
                "variedade": "Cabernet Sauvignon",
                "pais": "Chile",
                "categoria": "Tinto",
                "safra": "2014",
                "preco": 79
            },
            {
                "produto": "Casa Silva Reserva",
                "variedade": "Carménère",
                "pais": "Chile",
                "categoria": "Tinto",
                "safra": "2014",
                "preco": 79
            }
        ],
        "valorTotal": 158
    }
]

Fiz um replace para alterar alterar o cpf da lista de cliente tirando o - e colocando um . no lugar. Já no histórico de compras foi feito um replace no parâmetro "cliente", trocando 0000 por 000, pois, alguns cpfs vinheram com um zero a mais. Isso foi feito para que as listas pudessem ser associadas pelo "CPF" e "cliente".

## É preciso ter o node.js instalado na máquina

Para rodar o projeto execute os seguintes comandos dentro da raiz do projeto.

```bash
$ npm install
$ node index.js


## Na raiz do projeto existe a collection do postman para testar as requisições.

O projeto ainda não está utilizando banco de dados e nem variáveis de ambiente. A documentação com swegger ainda está sendo construindo mas a primeira versão pode ser vista em: /api-docs 

## Rotas:

##/authenticate/login 
gera o token para fazer a authenticação na API
##/api/v1/clients/recommend_wine/{cpf} 
Recomenda um vinho para um determinado cliente a partir do histórico de compras. O CPF tem que ser no seguinte padrão: 000.000.000.06
##/api/v1/clients/highest_total_purchase 
Lista os clientes ordenados pelo maior valor total em compras
##​/api​/v1​/clients​/biggest_single_purchase 
Mostra o cliente com maior compra única no último ano (2016)
​##/api​/v1​/clients​/most_loyal 
Mostra o cliente com maior compra única no último ano (2016).

Meu primeiro projeto de API Rest feito em Javascript para Node.js disponibilizado no git.
Qualquer dúvida entrar em contato: alessandrorocha1991@gmail.com
