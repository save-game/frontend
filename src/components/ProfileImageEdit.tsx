import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { MdPhotoCamera } from "react-icons/Md";
import { IoCloseOutline } from "react-icons/Io5";
import { BsPersonFill } from "react-icons/Bs";

interface Props {
  img: string | null;
}
interface Imagefile {
  file: File | null;
  thumnail: string;
  name: string;
}

const Dialog = styled.dialog`
  /* ::backdrop {
    ${tw`bg-medium-color/30`}
  } */
  ${tw`relative w-10/12 py-20 rounded-lg shadow-lg text-neutral-600 `}
`;

const ProfileImageEdit = ({ img }: Props) => {
  const [imgFile, setImgFile] = useState<Imagefile | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (img) {
      setImgFile({
        file: null,
        thumnail: img,
        name: "prevImg",
      });
    }
  }, []);

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList[0]) {
      const url = URL.createObjectURL(fileList[0]);
      setImgFile({
        file: fileList[0],
        thumnail: url,
        name: fileList[0].name,
      });
    }
  };

  const handleProfileImageUpload = () => {
    //storage올리고 url따서 서버에 업데이트
  };

  return (
    <div>
      <div
        onClick={openModal}
        className="absolute flex items-center justify-center bg-base-100 rounded-full w-8 h-8 shadow bottom-0 right-0 -m-1.5"
      >
        <MdPhotoCamera size={20} />
      </div>
      <Dialog ref={dialogRef}>
        <form method="dialog" className="">
          <div className="flex flex-col items-center text-sm font-semibold my-3">
            <div className="w-28 h-28 z-[888] flex justify-center items-center rounded-lg shadow bg-base-200  overflow-hidden relative mb-4">
              {imgFile ? (
                <img
                  src={imgFile.thumnail}
                  alt={imgFile.name}
                  className="inline-block"
                />
              ) : (
                <BsPersonFill size={84} className="mt-4 text-" />
              )}
              <button
                type="button"
                onClick={() => setImgFile(null)}
                className="w-5 h-5 border outline-none rounded-full  flex justify-center items-center bg-base-100 text-accent absolute top-1 right-1"
              >
                <IoCloseOutline size={17} />
              </button>
            </div>
            <label
              htmlFor="imageInput"
              className="btn  btn-sm btn-accent btn-outline text-sm w-full"
            >
              <p>사진 찾기</p>
            </label>
          </div>

          <input
            type="file"
            accept="image/*"
            id="imageInput"
            onChange={handleImage}
            className="hidden"
          />
          <button
            onClick={handleProfileImageUpload}
            className="btn btn-sm btn-accent w-full"
          >
            수정 완료
          </button>
          <button id="close" className="absolute top-5 right-5">
            <IoCloseOutline size={26} />
          </button>
          <label
            htmlFor="close"
            className="fixed top-0 bottom-0 left-0 right-0 -z-10"
          ></label>
        </form>
      </Dialog>
    </div>
  );
};

export default ProfileImageEdit;
