import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ error, pics, openModal }) => {
  return (
    <>
      {error && <h2>{error}</h2>}
      <div className={css.gallery}>
        {pics.map(element => (
          <ImageGalleryItem
            key={element.id}
            photo={element}
            openModal={openModal}
          />
        ))}
      </div>
    </>
  );
};
export default ImageGallery;
