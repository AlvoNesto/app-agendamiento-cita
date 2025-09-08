export interface RecievedPublisher<T = any> {
  publish(event: T): Promise<void>;
}
