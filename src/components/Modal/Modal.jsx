import { Component } from 'react';
import css from './Modal.module.css';
class Modal extends Component {
  handleEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  }
  handleClose = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
      console.log(e);
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.handleClose}>
        <div className={css.module}>
          <img src={this.props.fullImage} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
