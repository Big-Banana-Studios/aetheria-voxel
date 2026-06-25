/**
 * EventBus — minimal publish/subscribe, matching the interface the project's
 * polar-h10.js driver expects (`bus.publish(channel, payload)`). The driver
 * publishes on 'Aetheria_RR' (HR + R-R intervals) and 'Aetheria_State'
 * (status/log). PolarClient subscribes to consume them.
 */
type Handler = (payload: unknown) => void;

export class EventBus {
  private channels = new Map<string, Handler[]>();

  publish(channel: string, payload: unknown): void {
    for (const h of this.channels.get(channel) ?? []) h(payload);
  }

  subscribe(channel: string, handler: Handler): () => void {
    const arr = this.channels.get(channel) ?? [];
    arr.push(handler);
    this.channels.set(channel, arr);
    return () => {
      const list = this.channels.get(channel);
      if (list) this.channels.set(channel, list.filter((h) => h !== handler));
    };
  }
}
