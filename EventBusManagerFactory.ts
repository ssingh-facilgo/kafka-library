import { eventBusType } from "./EventBusManagerUtil";
import { KafkaEventManager } from "./kafka/KafkaEventManager";
import { IEventBusManager } from "./IEventBusManager";

export class EventBusManagerFactory {
    public static getEventBusManager(type: string): IEventBusManager | null {
        switch (type) {
            case eventBusType.KAFKA:
                return new KafkaEventManager();
            default:
                return null;
        }
    }
}
