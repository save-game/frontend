import { ChangeEvent, useRef, useState } from "react";
import { TiPlus } from "react-icons/ti";
import { MdPhotoCamera } from "react-icons/Md";
import { SHOW_WARNING_MODAL_DELAY } from "../../constants/modalTime";
import { useRecoilState } from "recoil";
import { showImgState } from "../../Recoil/boardAtom";
import imageCompression from "browser-image-compression";
import { getBoardUrl, uploadCompressedImages } from "../../api/firebaseAPI";
import { useParams } from "react-router-dom";

export default function ImgUpLoad() {
  const [showImage, setShowImage] = useRecoilState(showImgState);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { challengeId } = useParams();

  //속도...
  // const [thumbnail, setTumbnail] = useState<string[]>([]);
  // const [imgFileLists, setImgFileLists] = useState<File[]>([]);

  // const handleImg = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files) return;
  //   const file = e.target.files[0];
  //   let imgFiles: string[] = [...thumbnail];
  //   let imgLists: File[] = [...imgFileLists];
  //   const url = URL.createObjectURL(file);
  //   imgFiles.push(url);
  //   imgLists.push(file);

  //   if (imgFiles.length > 3 && imgLists.length > 3) {
  //     imgFiles = imgFiles.slice(0, 3);
  //     imgLists = imgLists.slice(0, 3);
  //     if (dialogRef.current) {
  //       dialogRef.current?.showModal();
  //     } else {
  //       return;
  //     }
  //     setTimeout(() => {
  //       if (dialogRef.current) {
  //         dialogRef.current.close();
  //       }
  //     }, SHOW_WARNING_MODAL_DELAY);
  //     return;
  //   }
  //   setTumbnail(imgFiles);
  //   setImgFileLists(imgLists);
  //   console.log(uploadCompressedImages(imgLists, `${challengeId}/images`));
  //   e.target.value = "";
  // };
  // const handleDeleteImg = (id: number) => {
  //   setTumbnail(thumbnail.filter((_, index) => index !== id));
  // };

  const uploadImg = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const reSize = await imageCompression(file, { maxSizeMB: 0.5 });
    const imgUrlLists: string[] = [...showImage];
    if (!challengeId) return;
    const boardUrl = await getBoardUrl(challengeId, reSize, Date.now());
    console.log(boardUrl, "hi");
    boardUrl ? imgUrlLists.push(boardUrl) : null;
    setShowImage(imgUrlLists);
    if (imgUrlLists.length >= 3) {
      if (dialogRef.current) {
        dialogRef.current?.showModal();
      } else {
        return;
      }
      setTimeout(() => {
        if (dialogRef.current) {
          dialogRef.current.close();
        }
      }, SHOW_WARNING_MODAL_DELAY);
      return;
    }
    e.target.value = "";
  };

  const handleDeleteImg = (id: number) => {
    setShowImage(showImage.filter((_, index) => index !== id));
  };

  return (
    <>
      <input
        type="file"
        id="photo"
        ref={fileInputRef}
        // onChange={handleImg}
        onChange={uploadImg}
        className="hidden"
        placeholder="hi"
      ></input>
      <div className="flex flex-wrap justify-start mb-12">
        <label
          htmlFor="photo"
          className="relative w-20 h-20 cursor-pointer border ml-1 mr-1"
        >
          <div className="relative w-20 h-20 flex items-center justify-center border">
            <MdPhotoCamera size={32} />
            <TiPlus
              className="border rounded-full absolute top-10 left-12 bg-red-600 text-white"
              size={16}
            />
          </div>
          <span className="absolute top-2/3 text-xs left-1/3 right-1/3">
            {showImage.length}/3
          </span>
          {/* <span className="absolute top-2/3 text-xs left-1/3 right-1/3">
            {thumbnail.length}/3
          </span> */}
        </label>

        {showImage.map((image, id) => (
          <div className="w-20 h-20 border relative ml-1 mr-1" key={id}>
            <img src={image} alt={`${image} - ${id}`} className="p-2" />
            <button
              type="button"
              onClick={() => handleDeleteImg(id)}
              className="absolute top-1 right-1 hover:text-lg"
            >
              X
            </button>
          </div>
        ))}
        {/* {thumbnail.map((image, id) => (
          <div className="w-20 h-20 border relative ml-1 mr-1" key={id}>
            <img src={image} alt={`${image} - ${id}`} className="p-2" />
            <button
              type="button"
              onClick={() => handleDeleteImg(id)}
              className="absolute top-1 right-1 hover:text-lg"
            >
              X
            </button>
          </div>
        ))} */}
        <dialog
          ref={dialogRef}
          className="w-10/12 py-20 rounded-lg bg-light-color shadow-lg text-neutral-600 outline-none z-[999]"
        >
          <div className="flex justify-center items-center">
            <div>사진 선택은 3개까지 가능합니다. </div>
          </div>
        </dialog>
      </div>
    </>
  );
}
