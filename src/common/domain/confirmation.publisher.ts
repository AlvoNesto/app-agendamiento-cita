export interface ConfirmationPublisher<T> {
  publish(event: T): Promise<void>;
}
