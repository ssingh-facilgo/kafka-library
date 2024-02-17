import { KafkaEventPublisher, KafkaEventSubscriber } from "./index";

export class KafkaEventManager {
    publish(payload: any): any {
        KafkaEventPublisher.publish(payload);
    }

    subscribe(topic: string, options: { groupId: string }, onMessageCallBack: Function) {
        KafkaEventSubscriber.subscriber(topic,options,onMessageCallBack);
    }
}
