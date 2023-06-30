import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface ImageListData {
  readonly imgList: { id: number; postImage: string }[];
}

const ImageCarousel = ({ imgList }: ImageListData) => {
  return (
    <Carousel
      className=""
      infiniteLoop
      useKeyboardArrows
      showThumbs={false}
      showStatus={false}
    >
      {imgList.map((img, idx) => (
        <img src={img.postImage} key={idx} />
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
