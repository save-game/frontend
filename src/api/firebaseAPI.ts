import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  list,
  ref,
  uploadBytes,
} from "firebase/storage";
import imageCompression from "browser-image-compression";

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

export const getBoardUrl = async (
  challengeId: string,
  imgFile: Blob,
  date: number
) => {
  if (!imgFile) return;
  const imgRef = ref(storage, `user/${challengeId}/${date}`);
  try {
    const res = await uploadBytes(imgRef, imgFile);
    const url = await getDownloadURL(res.ref);
    return url;
  } catch (error) {
    throw new Error(`BoardImg error`);
  }
};

// export const getBoardImgUrl = async (refPath: string) => {
//   const listRef = ref(storage, refPath);
//   try {
//     const imgList = await list(listRef, { maxResults: 3 });
//     if (imgList.items.length === 0) return;
//     const url = await getDownloadURL(imgList.items[0]);
//     return url;
//   } catch (e) {
//     console.error(e);
//   }
// };

// interface BoardImageProps {
//   folderPath: string;
// }

// export const getBoardImage = ({ folderPath }:BoardImageProps) => {
//   const [imageUrls, setImageUrls] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchImageUrls = async () => {
//       const storage = getStorage(); // 파이어베이스 스토리지 인스턴스 가져오기
//       const folderRef: StorageReference = ref(storage, folderPath);

//       try {
//         const allFiles = await listAll(folderRef);
//         const urls = await Promise.all(
//           allFiles.items.map(async (item) => getDownloadURL(item))
//         );
//         setImageUrls(urls);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchImageUrls();
//   }, [folderPath]);

// };

///

// export const uploadCompressedImages = async (
//   files: File[],
//   refPath: string
// ) => {
//   try {
//     const storageRef = ref(storage, refPath);

//     const uploadPromises = files.map(async (file) => {
//       const resizeImg = await imageCompression(file, { maxSizeMB: 0.5 });
//       const childRef = ref(storageRef, file.name);
//       await uploadBytes(childRef, resizeImg);

//       console.log(`${file.name} 업로드`);
//     });

//     await Promise.all(uploadPromises);

//     const downloadURLPromises = files.map(async (file) => {
//       const downloadURL = await getDownloadURL(ref(storageRef, file.name));
//       return downloadURL;
//     });

//     const downloadURLs = await Promise.all(downloadURLPromises);
//     downloadURLs.forEach((url, index) => {
//       console.log(`이미지 ${index + 1}: ${url}`);
//     });

//     return downloadURLs;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };
