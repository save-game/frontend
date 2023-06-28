import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { MdPhotoCamera } from "react-icons/Md";
import { IoCloseOutline } from "react-icons/Io5";
import { BsPersonFill } from "react-icons/Bs";
import { getUrl } from "../../api/firebase";
import { uploadProfileImage, useUser } from "../../api/member";
import { UseQueryResult, useMutation, useQueryClient } from "react-query";
import { UserData } from "../../interface/interface";
import imageCompression from "browser-image-compression";
import InformModal from "../Common/InformModal";
import { SHOW_MODAL_DELAY } from "../../constants/modalTime";

interface Props {
  readonly img: string | null | undefined;
}
interface Imagefile {
  readonly file: File | null;
  readonly thumbnail: string;
  readonly name: string;
}

const Dialog = styled.dialog`
  ${tw`relative w-10/12 py-20 rounded-lg shadow-lg text-neutral-600 `}
`;

const ProfileImageEdit = ({ img }: Props) => {
  const queryClient = useQueryClient();
  const { data: userInfo }: UseQueryResult<UserData> = useUser();
  const [imgFile, setImgFile] = useState<Imagefile | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const informDialogRef = useRef<HTMLDialogElement>(null);
  const { mutate: profileImageMutate, isLoading } = useMutation(
    uploadProfileImage,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userInfo"]);
        setTimeout(() => {
          if (!informDialogRef.current) return;
          informDialogRef.current.close();
        }, SHOW_MODAL_DELAY);
      },
    }
  );

  useEffect(() => {
    if (img) {
      setImgFile({
        file: null,
        thumbnail: img,
        name: "prevImg",
      });
    }
  }, [img]);

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImgFile({
      file: file,
      thumbnail: url,
      name: file.name,
    });
  };

  const handleProfileImageUpload = async () => {
    if (!userInfo || !imgFile || !imgFile.file) return;

    const resizedBlob = await imageCompression(imgFile.file, {
      maxSizeMB: 0.5,
    });

    const url = await getUrl(userInfo.memberId, resizedBlob);

    if (!url) return;
    profileImageMutate(url);
    if (!informDialogRef.current) return;
    informDialogRef.current.showModal();
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
                  src={imgFile.thumbnail}
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
            className="btn btn-sm btn-accent w-full text-base-100"
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
      <InformModal
        dialogRef={informDialogRef}
        loading={isLoading}
        inform="변경 되었습니다!"
      />
    </div>
  );
};

export default ProfileImageEdit;
