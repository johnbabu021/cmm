import { Subjects } from "./subjects";

export interface OrderCancelledEvent {
  subject: Subjects.OrdersCancelled;
  data: {
    id: string;
    ticket: {
      id: string;
    };
  };
}
