import { Kafka } from 'kafkajs';
import { KafkaEventPublisher, KafkaEventSubscriber } from './index';
import { IEventBusManager } from '../IEventBusManager';

export class KafkaEventManager implements IEventBusManager {

    private kafka: Kafka;

    constructor() {
        this.kafka = new Kafka({
            brokers: [`${process.env.KAFKA_HOST ?? 'localhost:9092'}`],
            clientId: `${process.env.NODE_ENV}consumer`,
            ssl: {
                rejectUnauthorized: false,
                ca: [process.env.CA_CERTIFICATE ?? ' '],
                cert: [process.env.USER_ACCESS_CERTIFICATE ?? ' '],
                key: [process.env.USER_ACCESS_KEY ?? ' ']
            }
        });
    }

    async publish(payload: any): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                KafkaEventPublisher.publish(this.kafka, payload);
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    async subscribe(topic: any, optional: any) {
        return new Promise((resolve, reject) => {
              try {
                KafkaEventSubscriber.subscriber(this.kafka, topic, { groupId: optional.groupId }).then((message)=>{
                    resolve(message);
                 });
              } catch (err) {
                reject(err);
              }
        });
    }
}
