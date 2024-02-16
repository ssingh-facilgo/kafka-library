import { Kafka } from 'kafkajs';
export class KafkaEventPublisher {
    public static publish(payload: any) {

        const kafka = new Kafka({
            brokers: [`${process.env.KAFKA_HOST || 'localhost:9092'}`],
            clientId: process.env.NODE_ENV + 'producer',
            ssl: {
                rejectUnauthorized: false,
                ca: [process.env.CA_CERTIFICATE || ' '],
                cert: [process.env.USER_ACCESS_CERTIFICATE || ' '],
                key: [process.env.USER_ACCESS_KEY || ' ']
            }
        });
        const producer = kafka.producer();
        const run = async () => {
            await producer.connect()
            await producer.send({
                topic: payload[0].topic,
                messages: [{ value: payload[0].messages }],
            })
        }

        run()
            .catch(err => {
                throw err;
            });
    }
}
