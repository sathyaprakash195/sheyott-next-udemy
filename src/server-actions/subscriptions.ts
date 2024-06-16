"use server";

import SubscriptionModel from "@/models/subscription-model";

export const createNewSubscription = async (payload: any) => {
  try {
    const response = await SubscriptionModel.create(payload);
    return {
      success: true,
      message: "Subscription created successfully",
      data: JSON.parse(JSON.stringify(response)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getSubscriptionByUserId = async (userId: string) => {
  try {
    const subscription = await SubscriptionModel.findOne({
      user: userId,
      isActive: true,
    });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(subscription)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
