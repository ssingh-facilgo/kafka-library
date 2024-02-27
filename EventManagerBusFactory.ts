import { eventBusType } from "./EventManagerBusUtil";
import { KafkaEventManager } from "./kafka/KafkaEventManager";
import { IEventBusManager } from "./IEventBusManager";

export class EventManagerBusFactory {
    public static getEventBusManager(type: string): IEventBusManager | null {
        switch (type) {
            case eventBusType.KAFKA:
                return new KafkaEventManager();
            default:
                return null;
        }
    }
}
