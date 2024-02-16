import { busEventType } from "./EventManagerUtil";
import { KafkaEventManager } from "./kafka/KafkaEventManager";

export class EventManagerFactory {
    public static getEventPublisher(type: string): any {
        switch (type) {
            case busEventType.kafka:
                return new KafkaEventManager();
        }
    }
}
