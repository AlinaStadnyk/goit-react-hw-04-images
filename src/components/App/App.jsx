import { useEffect } from 'react';
import { useState } from 'react';
import css from './App.module.css';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import SearchBar from 'components/SearchBar/SearchBar';
import { getAllPhotos } from 'Api/photos';

export const App = () => {
  const [pics, setPics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [fullImage, setFullImage] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!query) {
      return;
    }
    const getPhotos = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await getAllPhotos(query, page);

        if (response.data.hits.length === 0) {
          alert('There are no results matching your query, please try again');
        }

        setPics(prev => [...prev, ...response.data.hits]);
        setTotal(response.data.total);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPhotos();
  }, [page, query]);

  const handleSubmit = q => {
    setQuery(q);
    setPage(1);
    setPics([]);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const openModal = largeURL => {
    setFullImage(largeURL);
    setShowModal(true);
  };
  const closeModal = () => {
    setFullImage('');
    setShowModal(false);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery pics={pics} error={error} openModal={openModal} />
      {isLoading && <Loader />}
      {showModal && (
        <Modal
          fullImage={fullImage}
          closeModal={closeModal}
          openModal={openModal}
        />
      )}
      {pics.length > 0 && pics.length !== total && (
        <Button handleLoadMore={handleLoadMore} />
      )}
    </div>
  );
};
