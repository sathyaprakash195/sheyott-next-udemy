"use server";
import ShowModel from "@/models/show-model";
import { revalidatePath } from "next/cache";

export const createNewShow = async (payload: any) => {
  try {
    await ShowModel.create(payload);
    revalidatePath("/admin/shows");
    return {
      success: true,
      message: "Show created successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const editShowById = async ({
  showId,
  payload,
}: {
  showId: string;
  payload: any;
}) => {
  try {
    await ShowModel.findByIdAndUpdate(showId, payload);
    return {
      success: true,
      message: "Show updated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteShowById = async (showId: string) => {
  try {
    await ShowModel.findByIdAndDelete(showId);
    revalidatePath("/admin/shows");
    return {
      success: true,
      message: "Show deleted successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// will be modified in the next step
export const getAllShows = async (query: string) => {
  try {
    const filters: any = {};
    if (query) {
      filters["title"] = { $regex: query, $options: "i" };
    }
    const shows = await ShowModel.find(filters).sort({ createdAt: -1 });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(shows)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getShowById = async (showId: string) => {
  try {
    const show = await ShowModel.findById(showId);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(show)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
