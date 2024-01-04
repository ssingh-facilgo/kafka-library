const {Kafka} = require('kafkajs');
const fs = require('fs');
const {LoggerFactory} = require('./LoggerFactory');



class KafkaEventPublisher {
    async publish(payload) {
        const kafka = new Kafka({
            brokers: [`${process.env.KAFKA_HOST || 'localhost:9092'}`],
            clientId: 'producer',
            ssl: {
                rejectUnauthorized: false,
                ca: [fs.readFileSync(`certs/${process.env.NODE_ENV}/ca-certificate.crt`, 'utf-8')],
                cert: [fs.readFileSync(`certs/${process.env.NODE_ENV}/user-access-certificate.crt`, 'utf-8')],
                key: [fs.readFileSync(`certs/${process.env.NODE_ENV}/user-access-key.key`, 'utf-8')]
            }
        });
        const producer = kafka.producer();
        const run = async () => {
            await producer.connect();
            await producer.send({
                topic: payload[0].topic,
                messages: [{ value: payload[0].messages }],
            });
        };

        run().catch(err => {
            LoggerFactory.getLogger().error("Error occurred while Kafka producer error: " + JSON.stringify(err));
        });
    }
}

module.exports = KafkaEventPublisher;
