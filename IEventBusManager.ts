export type IEventBusManager = {
    publish(payload: any): Promise<any>,
    subscribe(topic: string, parameters?: any): Promise<any>
};
