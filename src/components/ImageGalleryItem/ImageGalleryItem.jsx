import css from './ImageGalleryItem.module.css';
import React from 'react';
export const ImageGalleryItem = ({ photo, openModal }) => {
  return (
    <div className={css.item}>
      <img
        className={css.image}
        alt="alt"
        src={photo.webformatURL}
        onClick={e => {
          openModal(photo.largeImageURL);
        }}
      />
    </div>
  );
};
