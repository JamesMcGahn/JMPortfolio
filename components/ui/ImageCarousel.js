import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/legacy/image';

function ImageCarousel({ imagesArr, height, width }) {
  const moreThanOneImg = imagesArr.length > 1;

  return (
    <Carousel controls={moreThanOneImg} indicators={moreThanOneImg}>
      {imagesArr.map((img) => (
        <Carousel.Item key={`${img?.filename}-img`}>
          <Image
            className="d-block w-100"
            src={`${img.url}`}
            alt={`${img.filename}`}
            style={{ minHeight: '200px', height: 'auto', width: 'auto' }}
            width={width}
            height={height}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ImageCarousel;
