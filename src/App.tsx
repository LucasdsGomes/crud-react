import { useEffect, useState } from 'react';

interface Pedido {
  id: number;
  cliente: string;
  servico: string;
  status: 'pendente' | 'em andamento' | 'concluído';
}

function App() {
  const [cliente, setCliente] = useState('');
  const [servico, setServico] = useState('');
  const [status, setStatus] = useState<'pendente' | 'em andamento' | 'concluído'>('pendente');
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    const pedidosSalvos = localStorage.getItem('pedidos');
    if (pedidosSalvos) {
      setPedidos(JSON.parse(pedidosSalvos));
    }
  }, []);

  function handleRegister() {
    if (!cliente || !servico) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const newPedido: Pedido = {
      id: Date.now(), 
      cliente,
      servico,
      status
    };

    const newPedidos = [...pedidos, newPedido];
    setPedidos(newPedidos);
    localStorage.setItem('pedidos', JSON.stringify(newPedidos));

    setCliente('');
    setServico('');
    setStatus('pendente');
  }

  function handleDelete(id: number) {
    const pedidosAtualizados = pedidos.filter(pedido => pedido.id !== id);
    setPedidos(pedidosAtualizados);
    localStorage.setItem('pedidos', JSON.stringify(pedidosAtualizados));
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gerenciar Pedidos de Lavanderia</h1>

      <div className="card p-4 mb-4">
        <div className="form-group mb-3">
          <label htmlFor="cliente">Nome do Cliente</label>
          <input
            type="text"
            className="form-control"
            id="cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            placeholder="Digite o nome do cliente"
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="servico">Serviço</label>
          <input
            type="text"
            className="form-control"
            id="servico"
            value={servico}
            onChange={(e) => setServico(e.target.value)}
            placeholder="Digite o tipo de serviço"
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value as 'pendente' | 'em andamento' | 'concluído')}
          >
            <option value="pendente">Pendente</option>
            <option value="em andamento">Em andamento</option>
            <option value="concluído">Concluído</option>
          </select>
        </div>

        <button className="btn btn-primary w-100" onClick={handleRegister}>
          Adicionar Pedido
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Serviço</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.cliente}</td>
                <td>{pedido.servico}</td>
                <td>
                  <span
                    className={`badge ${
                      pedido.status === 'concluído' ? 'bg-success' : pedido.status === 'em andamento' ? 'bg-warning' : 'bg-secondary'
                    }`}
                  >
                    {pedido.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(pedido.id)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
