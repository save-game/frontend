import { ChangeEvent, useEffect, useRef, useState } from "react";
import { TiPlus } from "react-icons/ti";
import { MdPhotoCamera } from "react-icons/Md";
import { SHOW_WARNING_MODAL_DELAY } from "../../constants/modalTime";
import { useRecoilState } from "recoil";
import { showImgState, thumbImgState } from "../../Recoil/boardAtom";
import imageCompression from "browser-image-compression";
import { getBoardUrl } from "../../api/firebaseAPI";
import { useParams } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/Ai";
import { uploadBytes } from "firebase/storage";

export default function ImgUpLoad() {
  const [showImage, setShowImage] = useRecoilState(showImgState);
  const [thumbnail, setThumbnail] = useRecoilState(thumbImgState);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const uploadImg = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files.length > 3) {
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
    const imgList = Array.from(e.target.files);
    const thumbnailList = imgList.map((img) => URL.createObjectURL(img));
    setShowImage(imgList);
    setThumbnail(thumbnailList);

    e.target.value = "";
  };

  const handleDeleteImg = (id: number) => {
    setThumbnail(thumbnail.filter((_, index) => index !== id));
  };

  return (
    <>
      <input
        type="file"
        id="photo"
        ref={fileInputRef}
        onChange={uploadImg}
        className="hidden"
        multiple
        placeholder="hi"
      ></input>
      <div className="flex flex-wrap justify-start mb-12">
        <label
          htmlFor="photo"
          className="relative w-16 h-16 cursor-pointer border rounded-lg ml-1 mr-1"
        >
          <div className="relative w-16 h-16 flex items-center justify-center">
            <MdPhotoCamera size={22} />
            <TiPlus
              className="border rounded-full absolute top-5 left-9 bg-teal-500 text-white"
              size={12}
            />
          </div>
          <span className="absolute top-2/3 text-[10px] -translate-x-2">
            {showImage.length}/3
          </span>
        </label>
        {thumbnail?.map((image, id) => (
          <div
            className="w-16 h-16 ml-2 border rounded-lg relative  overflow-hidden"
            key={id}
          >
            <img src={image} alt={`${image} - ${id}`} className="" />
            <button
              type="button"
              onClick={() => handleDeleteImg(id)}
              className="absolute top-1 right-1 "
            >
              <AiFillCloseCircle size={17} className="text-base-100 " />
            </button>
          </div>
        ))}
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
