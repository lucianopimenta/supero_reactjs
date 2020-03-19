import React, { Component } from 'react';
import './detail.css';
import {Link} from 'react-router-dom';

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      book: {
        editora: '',
        autor: '',
        isbn: '',
        ano: 0,
        idioma: '',
        peso: 0,
        dimensoes: {
          altura: 0,
          largura: 0,
          comprimento: 0
        }
      }
    };
    this.loadBook = this.loadBook.bind(this);
  }

  componentDidMount() {
    this.loadBook();
  }

  loadBook() {
    const { id } = this.props.match.params;
    let url = `http://13.59.75.47:8083/api/book/${id}`;
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        this.setState({ book: json });
      });
  }

  render() {
    return (

      <div className="container">
        <div>
          <div className="form-group">
            <h1>{this.state.book.titulo}</h1>
          </div>
          <div className="form-group">
            <span><b>Editora: </b>{this.state.book.editora}</span>
          </div>
          <div className="form-group">
            <span><b>Autor: </b>{this.state.book.autor}</span>
          </div>
          <div className="form-group">
            <span><b>ISBN: </b>{this.state.book.isbn}</span>
          </div>
          <div className="form-group">
            <span><b>Ano: </b>{this.state.book.ano}</span>
          </div>
          <div className="form-group">
            <span><b>Idioma: </b>{this.state.book.idioma}</span>
          </div>
          <div className="form-group">
            <span><b>Peso: </b>{this.state.book.peso} g</span>
          </div>
          <div className="form-group">
            <b>Dimensões: </b><br/>
            <span><i>Altura: </i>{this.state.book.dimensoes.altura}</span><br/>
            <span><i>Largura: </i>{this.state.book.dimensoes.largura}</span><br/>
            <span><i>Comprimento: </i>{this.state.book.dimensoes.comprimento}</span>
          </div>
        </div>
        <Link to={`/`}>Voltar</Link>
      </div>
    );
  }

}

export default Detail;