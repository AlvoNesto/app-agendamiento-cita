export interface EventPublisher<T = any> {
  publish(event: T): Promise<void>;
}
