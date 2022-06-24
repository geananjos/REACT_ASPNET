import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Form, InputGroup } from 'react-bootstrap'
import TitlePage from '../../components/TitlePage'

const clientes = [
  {
    id: 1,
    nome: 'Microsoft',
    responsavel: 'Otto',
    contato: '10665544',
    situacao: 'Ativo'
  },
  {
    id: 2,
    nome: 'Amazon',
    responsavel: 'Otto',
    contato: '10665544',
    situacao: 'Desativado'
  },
  {
    id: 3,
    nome: 'Google',
    responsavel: 'Otto',
    contato: '10665544',
    situacao: 'Em Analise'
  },
  {
    id: 4,
    nome: 'Facebook',
    responsavel: 'Kevin',
    contato: '10665544',
    situacao: 'Ativo'
  },
  {
    id: 5,
    nome: 'Twitter',
    responsavel: 'Jack',
    contato: '10665544',
    situacao: 'Ativo'
  }
]

export default function ClienteLista() {
  const history = useHistory();
  const [termoBusca, setTermoBusca] = useState('');

  const handleInputChange = (e) => {
    setTermoBusca(e.target.value);
    console.log(termoBusca);
  }

  const clientesFiltrados = clientes.filter((cliente) => {
    return Object.values(cliente)
        .join(' ')
        .toLowerCase()
        .includes(termoBusca.toLowerCase());
  });

  const novoCliente = () => {
    history.push('/cliente/detalhe');
  };

  return (
    <>
        <TitlePage title='Cliente Lista'>
          <Button variant='outline-secondary' onClick={novoCliente}>
            <i className='fas fa-plus me-2'></i>
            Novo Cliente
          </Button>
        </TitlePage>
        <InputGroup className='mt-3 mb-3'>
          <InputGroup.Text>Buscar:</InputGroup.Text>
          <Form.Control onChange={handleInputChange} placeholder='Buscar por nome do cliente' />
        </InputGroup>
        <table className='table table-striped table-hover'>
          <thead className='table-dar mt-3'>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Responsavel</th>
              <th scope="col">Contato</th>
              <th scope="col">Situacao</th>
              <th scope="col">Opcoes</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.responsavel}</td>
                <td>{cliente.contato}</td>
                <td>{cliente.situacao}</td>
                <td>
                  <div>
                    <button className='btn btn-sm btn-outline-primary me-2' 
                            onClick={() => 
                              history.push(
                                `/cliente/detalhe/${cliente.id}`
                              )
                            }
                      >
                      <i className='fas fa-user-edit me-2'></i>
                      Editar
                    </button>
                    <button className='btn btn-sm btn-outline-danger me-2'>
                      <i className='fas fa-user-times me-2'></i>
                      Desativar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </>
  )
}
