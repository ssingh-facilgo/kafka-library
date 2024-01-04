const Kafka = require('kafkajs');
const fs = require('fs');

class Subscriber {

    constructor(topic, options, onMessageCallBack) {
        this.initKafkaConsumer(topic, options, onMessageCallBack);
    }

    async initKafkaConsumer(topic, options, onMessageCallback) {

        const env = process.env.NODE_ENV;
       
        const kafka = new Kafka.Kafka({
            brokers: [`${process.env.KAFKA_HOST || 'localhost:9092'}`],
            clientId: process.env.NODE_ENV + 'producer',
            ssl: {
                rejectUnauthorized: false,
                ca: [fs.readFileSync(`certs/${env}/ca-certificate.crt`, 'utf-8')],
                cert: [fs.readFileSync(`certs/${env}/user-access-certificate.crt`, 'utf-8')],
                key: [fs.readFileSync(`certs/${env}/user-access-key.key`, 'utf-8')]
            }
        });

        const consumer = kafka.consumer({ groupId: options.groupId })

        // Consuming
        await consumer.connect()
        await consumer.subscribe({ topic: topic, fromBeginning: true })
       
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                onMessageCallback(null, this, message);
            },
        })
    }
}

module.exports = Subscriber;