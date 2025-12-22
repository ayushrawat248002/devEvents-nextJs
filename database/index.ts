// index.ts is a public API for the app, not an internal dependency for model files.

export { default as Event } from './event.model';
export {default as Booking} from './booking.model';

export type { IEvent } from './event.model';
export type { IBooking } from './booking.model';