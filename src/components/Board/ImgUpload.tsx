import { ChangeEvent, useRef } from "react";
import { TiPlus } from "react-icons/ti";
import { MdPhotoCamera } from "react-icons/Md";
import { SHOW_WARNING_MODAL_DELAY } from "../../constants/modalTime";
import { useRecoilState } from "recoil";
import { showImgState } from "../../Recoil/boardAtom";

export default function ImgUpLoad() {
  const [showImage, setShowImage] = useRecoilState(showImgState);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const uploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    const imgLists = e.target.files;
    const imgUrlLists = [...showImage];
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
    if (imgLists) {
      for (let i = 0; i < imgLists?.length; i++) {
        const currentImageUrl = URL.createObjectURL(imgLists[i]);
        imgUrlLists.push(currentImageUrl);
      }
      setShowImage(imgUrlLists);
    }
  };

  const handleDeleteImg = (id: number) => {
    setShowImage(showImage.filter((_, index) => index !== id));
  };

  return (
    <>
      <input
        type="file"
        multiple={true}
        id="photo"
        ref={fileInputRef}
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
