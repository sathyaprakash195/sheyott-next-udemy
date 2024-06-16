export interface IUser {
  _id: string;
  email: string;
  username: string;
  clerkUserId: string;
  currentSubscription: {
    _id: string;
    plan: any;
    expiryDate: string;
    createdAt: string;
    price: number;
    paymentId: string;
  };
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean;
  isActive: boolean;
}
