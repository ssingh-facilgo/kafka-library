export type IEventBusManager = {
    publish(payload: any): any,
    subscribe(topic: string, options: any): any
};
