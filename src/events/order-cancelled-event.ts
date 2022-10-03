import { Subjects } from "./subjects";

export interface OrderCancelledEvent {
  subject: Subjects.OrdersCancelled;
  data: {
    id: string;
    version:number;
    ticket: {
      id: string;
    };
  };
}
