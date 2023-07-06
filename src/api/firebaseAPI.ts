import imageCompression from "browser-image-compression";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  list,
  ref,
  uploadBytes,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCxKF8_dJfgnn3oxDUe6ba_oDDM1d7UUeU",
  authDomain: "save-game-49e3a.firebaseapp.com",
  projectId: "save-game-49e3a",
  storageBucket: "save-game-49e3a.appspot.com",
  messagingSenderId: "385363788545",
  appId: "1:385363788545:web:62074d9f92688882f19100",
  measurementId: "G-KECHETXC6F",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const getUrl = async (memberId: number, imgFile: Blob) => {
  if (!imgFile) return;
  const imageRef = ref(storage, `user/${memberId}`);
  try {
    const res = await uploadBytes(imageRef, imgFile);
    const url = await getDownloadURL(res.ref);
    return url;
  } catch (e) {
    throw new Error("error");
  }
};

export const getBoardUrl = async (challengeId: number, imgFile: File[]) => {
  if (imgFile.length === 0) return [];
  try {
    const resizedList = await Promise.all(
      imgFile.map(async (img) => {
        const reSize = await imageCompression(img, { maxSizeMB: 0.5 });
        return reSize;
      })
    );
    console.log(resizedList);

    if (!challengeId) return;
    const id = Date.now();
    const imgRef = ref(storage, `post/${challengeId}/${id}`);

    const uploadPromise = imgFile.map((blob, idx) => {
      const childRef = ref(imgRef, `/${idx}`);
      return uploadBytes(childRef, blob);
    });

    const urlList = await Promise.all(uploadPromise)
      .then(() => {
        return Promise.all(
          imgFile.map((_, idx) => getDownloadURL(ref(imgRef, `/${idx}`)))
        );
      })
      .then((downloadURLs) => downloadURLs);
    return urlList;
  } catch (error) {
    throw new Error(`BoardImg error`);
  }
};
