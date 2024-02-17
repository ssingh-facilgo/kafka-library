import { eventBusType } from "./EventManagerUtil";
import { KafkaEventManager } from "./kafka/KafkaEventManager";

export class EventManagerFactory {
    public static getEventManager(type: string): any {
        switch (type) {
            case eventBusType.kafka:
                return new KafkaEventManager();
        }
    }
}
