import firebaseApp from "@/config/firebase-config";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

export const uploadFileToFirebaseAndReturnUrl = async (file: File) => {
  try {
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, file.name);
    const uploadedFileResponse = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(uploadedFileResponse.ref);
    return downloadUrl;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
