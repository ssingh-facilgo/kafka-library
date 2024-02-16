import { Kafka } from 'kafkajs';

export class KafkaEventSubscriber {
    public static subscriber(topic: string, options: { groupId: string }, onMessageCallBack: Function) {
        this.initKafkaConsumer(topic, options, onMessageCallBack);
    }

    public static async initKafkaConsumer(topic: string, options: { groupId: string }, onMessageCallback: Function) {
        const kafka = new Kafka({
            brokers: [`${process.env.KAFKA_HOST || 'localhost:9092'}`],
            clientId: `${process.env.NODE_ENV}consumer`,
            ssl: {
                rejectUnauthorized: false,
                ca: [process.env.CA_CERTIFICATE || ' '],
                cert: [process.env.USER_ACCESS_CERTIFICATE || ' '],
                key: [process.env.USER_ACCESS_KEY || ' ']
            }
        });

        const consumer = kafka.consumer({ groupId: options.groupId });

        // Consuming
        await consumer.connect();
        await consumer.subscribe({ topic: topic, fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ message }) => {
                onMessageCallback(null, this, message);
            },
        });
    }
}
