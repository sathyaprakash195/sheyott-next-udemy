"use server";
import { connectMongoDB } from "@/config/db-config";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server";

connectMongoDB();
export const getCurrentUserFromMongoDB = async () => {
  try {
    const clerkUser = await currentUser();

    const user = await UserModel.findOne({ clerkUserId: clerkUser?.id });
    // if the user is found, return the user
    if (user) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(user)),
      };
    }

    // if the user is not found, create a new user and return the user
    const userObj = {
      username:
        clerkUser?.username || clerkUser?.firstName + " " + clerkUser?.lastName,
      email: clerkUser?.emailAddresses[0].emailAddress,
      clerkUserId: clerkUser?.id,
      profilePicture: clerkUser?.imageUrl,
      isActive: true,
      isAdmin: false,
    };

    const newUser = await UserModel.create(userObj);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
