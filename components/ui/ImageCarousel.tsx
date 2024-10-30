import Carousel from 'react-bootstrap/Carousel';
import { ImageUrl } from '../../interfaces/project';

interface Props {
  imagesArr: ImageUrl[];
}

function ImageCarousel({ imagesArr }: Props) {
  const moreThanOneImg = imagesArr.length > 1;

  return (
    <Carousel controls={moreThanOneImg} indicators={moreThanOneImg}>
      {imagesArr.map((img) => (
        <Carousel.Item key={`${img?.filename}-img`}>
          <img
            className="d-block w-100"
            src={`${img.url}`}
            alt={`${img.filename}`}
            style={{ minHeight: '200px' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ImageCarousel;
