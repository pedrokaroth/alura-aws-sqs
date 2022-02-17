const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'})

require('dotenv/config');
const sqs = new AWS.SQS();

(async () => {
    await sqs.sendMessage({
        MessageBody: JSON.stringify({
            conta_origem: {
                agencia: 0001,
                numero_conta: '123456-7',
            },
            conta_destino: {
                agencia: 0001,
                numero_conta: '765432-1'
            },
            valor: 1000,
            moeda: 'BRL'
        }),
        QueueUrl: process.env.SQS_URL
    }).promise();

    console.log('mensagem enviada com sucesso!')
})();