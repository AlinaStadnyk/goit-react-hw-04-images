import { Component } from 'react';

import css from './App.module.css';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import SearchBar from 'components/SearchBar/SearchBar';
import { getAllPhotos } from 'Api/photos';
export class App extends Component {
  state = {
    pics: [],
    isLoading: false,
    error: '',
    query: '',
    page: 1,
    showModal: false,
    fullImage: '',
    total: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.getPhotos();
    }
  }

  getPhotos = async () => {
    try {
      this.setState({
        isLoading: true,
        error: '',
      });
      const response = await getAllPhotos(this.state.query, this.state.page);

      this.total = response.data.total;
      if (response.data.hits.length === 0) {
        alert('There are no results matching your query, please try again');
      }
      this.setState(prev => ({
        pics: [...prev.pics, ...response.data.hits],
        total: response.data.total,
      }));
    } catch (error) {
      this.setState({
        error: error.message,
      });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  handleSubmit = q => {
    this.setState({
      query: q,
      page: 1,
      pics: [],
    });
  };
  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = largeURL => {
    this.setState({
      fullImage: largeURL,
      showModal: true,
    });
  };
  closeModal = () => {
    this.setState({
      fullImage: '',
      showModal: false,
    });
  };
  render() {
    const { pics, isLoading, error, fullImage, showModal } = this.state;
    return (
      <div className={css.app}>
        <SearchBar handleSubmit={this.handleSubmit} />
        <ImageGallery pics={pics} error={error} openModal={this.openModal} />
        {isLoading && <Loader />}
        {showModal && (
          <Modal
            fullImage={fullImage}
            closeModal={this.closeModal}
            openModal={this.openModal}
          />
        )}
        {pics.length > 0 && pics.length !== this.state.total && (
          <Button handleLoadMore={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
