import { Kafka } from 'kafkajs';

export class KafkaEventPublisher {
    public static publish(kafka: Kafka, payload: any) {
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
