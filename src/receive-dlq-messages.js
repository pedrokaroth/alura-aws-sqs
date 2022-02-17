require('dotenv/config')
const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'})

const sqs = new AWS.SQS();

(async () => {
    const messages = await sqs.receiveMessage({
        QueueUrl: process.env.SQS_URL_DLQ,
        MaxNumberOfMessages: 10,
        WaitTimeSeconds: 20
    }).promise();

    if (messages.Messages) {
        messages.Messages.forEach(async message => {
            console.log('processando mensagem da DLQ...');
            console.log(`conteúdo da mensagem: ${JSON.stringify(message.Body)}`);
            await sqs.deleteMessage({
                QueueUrl: "https://sqs.us-east-1.amazonaws.com/961311579452/alura-teste-dlq",
                ReceiptHandle: message.ReceiptHandle
            }).promise();

            console.log('mensagem da DLQ processada (e excluída) com sucesso');
        })
    }
})();