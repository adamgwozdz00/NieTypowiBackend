export enum EventType {
  WORK, LIFE
}

export function convertStringToEventType(eventType: string) {
  return EventType[eventType.toUpperCase()];
}