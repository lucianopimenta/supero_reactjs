import React, { Component } from 'react';
import logo from '../../supero_cor.svg';
import calendar from '../../calendar.png';
import './home.css';
import {Link} from 'react-router-dom';
import { Table } from 'reactstrap';
import ReactPaginate from 'react-paginate';

class Home extends Component {

    constructor(props){
        super(props);
        this.state = { 
            pages: 1,
            filter: {
                search: '',
                anoInicial: 2010,
                anoFinal: 2020,
                pageNumber: 1
            },
            books: {
                itens: [],
                total: 0
            },
            options: [{ value: '2000', label: '2000' },{ value: '2001', label: '2001' },{ value: '2002', label: '2002' },{ value: '2003', label: '2003' },{ value: '2004', label: '2004' },{ value: '2005', label: '2005' },{ value: '2006', label: '2006' },{ value: '2007', label: '2007' },{ value: '2008', label: '2008' },{ value: '2009', label: '2009' },{ value: '2010', label: '2010' },{ value: '2011', label: '2011' },{ value: '2012', label: '2012' },{ value: '2013', label: '2013' },{ value: '2014', label: '2014' },{ value: '2015', label: '2015' },{ value: '2016', label: '2016' },{ value: '2017', label: '2017' },{ value: '2018', label: '2018' },{ value: '2019', label: '2019' },{ value: '2020', label: '2020' }]
        };

        this.busca = this.busca.bind(this);
    }

    componentDidMount(){
    }

    busca(){
        fetch('http://13.59.75.47:8083/api/book', {
            headers: {              
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(this.state.filter)
        })
        .then((r) => r.json())
        .then((json) => {
            this.setState({books: json, pages: Math.ceil(json.total / 10)});
        })
        .catch(err => console.error(err));
    }

    handlePageClick = data => {
        let selected = data.selected + 1;
    
        this.setState({filter: { ...this.state.filter, pageNumber: selected}}, () => {
          this.busca();
        });
    };

    _createRows = (row) => {        
        return (
            <tr key={row.id}>
                <td style={{textAlign: 'left', width: '30%'}}>{row.titulo} ({row.isbn})</td>
                <td style={{textAlign: 'left'}}>{row.autor}</td>
                <td style={{textAlign: 'left'}}>{row.editora}</td>
                <td style={{textAlign: 'center'}}>{row.ano}</td>
                <td style={{textAlign: 'center'}}><Link to={`/book/${row.id}`}>Detalhes</Link></td>
            </tr>
        );
    }

    render(){
        return (
          <div>
              <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="row">
                            <div className="col-md-12">
                                
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <img src={logo} alt="logo" width="200" height="80" />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" value={this.state.filter.search} 
                                            onChange={(e) => this.setState({filter: { ...this.state.filter, search: e.target.value }})} 
                                            placeholder="Busque livros por título, autor ou ISBN" style={{width: '100%'}}/>
                                    </div>
                                    <div className="col-md-3" style={{textAlign: 'end'}}>
                                        <input type="button" value="Buscar" onClick={this.busca} className="btn btn-primary btn-lg btn-block"/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-3">
                                        Filtrar ano de publicação:  
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" value={this.state.filter.anoInicial} style={{width: '10%'}}
                                            onChange={(e) => this.setState({filter: { ...this.state.filter, anoInicial: e.target.value }})}/>
                                            <img src={calendar} alt="calendar" width="24" height="24" style={{marginRight: '10px'}} />
                                            até
                                        <input type="text" value={this.state.filter.anoFinal} style={{width: '10%', marginLeft: '10px'}}
                                            onChange={(e) => this.setState({filter: { ...this.state.filter, anoFinal: e.target.value }})}/>
                                            <img src={calendar} alt="calendar" width="24" height="24" />
                                    </div>
                                    <div className="col-md-3" style={{textAlign: 'end'}}>
                                        <span className="font-weight-bold">{ this.state.books.total }</span> resultados encontrados
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <hr></hr>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <Table striped bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    <th style={{width: '40%'}}>Livro</th>
                                                    <th style={{width: '25%'}}>Autor</th>
                                                    <th style={{width: '25%'}}>Editora</th>
                                                    <th style={{width: '5%', textAlign: 'center'}}>Ano</th>
                                                    <th style={{width: '5%', textAlign: 'center'}}>Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.books.itens.map((r, i) => this._createRows(r, i))}
                                            </tbody>
                                        </Table>
                                    </div>
                                    
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <ReactPaginate
                                            previousLabel={'<'}
                                            nextLabel={'>'}
                                            breakLabel={'...'}
                                            breakClassName={'break-me'}
                                            pageCount={this.state.pages}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={10}
                                            onPageChange={this.handlePageClick}
                                            containerClassName={'pagination'}
                                            subContainerClassName={'pages pagination'}
                                            activeClassName={'active'}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
          </div>
        );
      }
}

export default Home;