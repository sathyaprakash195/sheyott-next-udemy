import { IUser } from "./users";

export interface ISubscription {
  _id: string;
  user: IUser;
  paymentId: string;
  plan: any;
  expiryDate: string;
  planName: string;
  price: number;
  createdAt: string;
}
