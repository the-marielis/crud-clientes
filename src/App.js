import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [clientes, setClientes] = useState([]);
  const [novoCliente, setNovoCliente] = useState({
    nome: '',
    usuario: '',
    cpf: '',
    telefone: '',
    email: '',
    dataNascimento: '',
    rendaFamiliar: ''
  });
  const [editando, setEditando] = useState(false);
  const [clienteEditado, setClienteEditado] = useState(null);


  useEffect(() => {
    axios.get('http://localhost:3001/clientes')
      .then((response) => setClientes(response.data))
      .catch((error) => console.error('Erro ao buscar clientes:', error));
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoCliente({ ...novoCliente, [name]: value });
  };


  const adicionarCliente = () => {
    axios.post('http://localhost:3001/clientes', novoCliente)
      .then((response) => {
        setClientes([...clientes, { ...novoCliente, id: response.data.clienteId }]);
        limparFormulario();
      })
      .catch((error) => console.error('Erro ao adicionar cliente:', error));
  };


  const iniciarEdicao = (cliente) => {
    setEditando(true);
    setClienteEditado(cliente);
  };


  const salvarEdicao = () => {
    axios.put(`http://localhost:3001/clientes/${clienteEditado.id}`, clienteEditado)
      .then(() => {
        setClientes(
          clientes.map((cliente) =>
            cliente.id === clienteEditado.id ? clienteEditado : cliente
          )
        );
        setEditando(false);
        setClienteEditado(null);
        limparFormulario();
      })
      .catch((error) => console.error('Erro ao editar cliente:', error));
  };


  const excluirCliente = (id) => {
    axios.delete(`http://localhost:3001/clientes/${id}`)
      .then(() => {
        setClientes(clientes.filter((cliente) => cliente.id !== id));
      })
      .catch((error) => console.error('Erro ao excluir cliente:', error));
  };


  const limparFormulario = () => {
    setNovoCliente({
      nome: '',
      usuario: '',
      cpf: '',
      telefone: '',
      email: '',
      dataNascimento: '',
      rendaFamiliar: ''
    });
  };


  return (
    <div className="App">
      <h1>CRUD de Clientes</h1>


      <div>
        <h2>{editando ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
        <form>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={editando ? clienteEditado?.nome : novoCliente.nome}
              onChange={(e) =>
                editando
                  ? setClienteEditado({ ...clienteEditado, nome: e.target.value })
                  : handleInputChange(e)
              }
            />
            <label htmlFor="usuario"><br/>Usuário</label>
            <input
              type="text"
              name="usuario"
              placeholder="usuario"
              value={editando ? clienteEditado?.usuario : novoCliente.usuario}
              onChange={(e) =>
                editando
                  ? setClienteEditado({ ...clienteEditado, usuario: e.target.value })
                  : handleInputChange(e)
              }
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                name="cpf"
                placeholder="CPF"
                value={editando ? clienteEditado?.cpf : novoCliente.cpf}
                onChange={(e) =>
                  editando
                    ? setClienteEditado({ ...clienteEditado, cpf: e.target.value })
                    : handleInputChange(e)
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="text"
                name="telefone"
                placeholder="Telefone"
                value={editando ? clienteEditado?.telefone : novoCliente.telefone}
                onChange={(e) =>
                  editando
                    ? setClienteEditado({ ...clienteEditado, telefone: e.target.value })
                    : handleInputChange(e)
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={editando ? clienteEditado?.email : novoCliente.email}
              onChange={(e) =>
                editando
                  ? setClienteEditado({ ...clienteEditado, email: e.target.value })
                  : handleInputChange(e)
              }
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dataNascimento">Data de Nascimento</label>
              <input
                type="date"
                name="dataNascimento"
                value={editando ? clienteEditado?.dataNascimento : novoCliente.dataNascimento}
                onChange={(e) =>
                  editando
                    ? setClienteEditado({ ...clienteEditado, dataNascimento: e.target.value })
                    : handleInputChange(e)
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="rendaFamiliar">Renda Familiar</label>
              <input
                type="number"
                name="rendaFamiliar"
                placeholder="Renda Familiar"
                value={editando ? clienteEditado?.rendaFamiliar : novoCliente.rendaFamiliar}
                onChange={(e) =>
                  editando
                    ? setClienteEditado({ ...clienteEditado, rendaFamiliar: e.target.value })
                    : handleInputChange(e)
                }
              />
            </div>
          </div>
          <div className="button-group">
            <button type="submit" onClick={editando ? salvarEdicao : adicionarCliente}>
              {editando ? 'Salvar' : 'Cadastrar'}
            </button>
            <button type="button" onClick={limparFormulario}>Limpar</button>
          </div>
        </form>
      </div>
     
      <h2>Lista de Clientes</h2>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            <span>{cliente.nome} - {cliente.usuario} - {cliente.cpf} - {cliente.telefone} - {cliente.email}</span>
            <button onClick={() => iniciarEdicao(cliente)}>Editar</button>
            <button onClick={() => excluirCliente(cliente.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default App;