import { Component } from 'react';
import css from './SearcBar.module.css';
class SearchBar extends Component {
  state = {
    query: '',
  };
  handleChange = e => {
    this.setState(prev => {
      return { ...prev, query: e.target.value };
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    this.props.handleSubmit(this.state.query);
    this.setState({
      value: '',
    });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.label}>Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
export default SearchBar;
