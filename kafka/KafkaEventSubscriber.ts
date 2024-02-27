import { Kafka, Consumer, KafkaMessage } from 'kafkajs';

export class KafkaEventSubscriber {
    public static subscriber(kafka: Kafka, topic: string, options: { groupId: string }): Promise<KafkaMessage> {
        return new Promise<KafkaMessage>((resolve, reject) => {
            const consumer: Consumer = kafka.consumer({ groupId: options.groupId });

            consumer.connect()
                .then(() => {
                    consumer.subscribe({ topic: topic, fromBeginning: true });
                    consumer.run({
                        eachMessage: async ({ message }) => {
                            resolve(message);
                        },
                    });

                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}
