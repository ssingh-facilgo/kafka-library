import { KafkaEventPublisher, KafkaEventSubscriber } from "./index";

export class KafkaEventManager {
    publish(payload: any): any {
        KafkaEventPublisher.publish(payload);
    }

    Subscriber(topic: string, options: { groupId: string }, onMessageCallBack: Function) {
        KafkaEventSubscriber.subscriber(topic,options,onMessageCallBack);
    }
}
