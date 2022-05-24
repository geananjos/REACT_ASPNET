import { useState, useEffect, React} from 'react';
import { Button, Modal } from 'react-bootstrap';
import './App.css';
import AtividadeForm from './components/AtividadeForm';
import AtividadeLista from './components/AtividadeLista';
import api from './api/atividade';

function App() {
  
  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({id: 0});
  
  const handleAtividadeModal = () => setShowAtividadeModal(!showAtividadeModal);
  
  const pegaTodasAtividades = async () => {
    const response = await api.get('atividade');
    return response.data;
  }

  useEffect(() => {
    const getAtividades = async () => {
      const todasAtividades = await pegaTodasAtividades();
      if(todasAtividades) setAtividade(todasAtividades);
    };

    getAtividades();
  }, [atividades]);

  const addAtividade = async (ativ) => {
    const response = await api.post('atividade', ativ);
    setAtividades([...atividades, response.data]);
  }

  const deletarAtividade = async (id) => {
    if(await api.delete(`atividade/${id}`)) {
      const atividadesFiltradas = atividades.filter(atividade => atividade.id !== id );
      setAtividades([...atividadesFiltradas]);
    }
  }

  function pegarAtividade(id) {
    const atividade = atividades.filter((atividade) => atividade.id === id );
    setAtividade(atividade[0]);
    handleAtividadeModal();
  }

  function cancelarAtividade() {
    setAtividade({id: 0});
  }

  const atualizarAtividade = async (ativ) => {
    const response = await api.put(`atividade/${ativ.id}`, ativ);
    const { id } = response.data;
    setAtividades(atividades.map(item => item.id === id ? response.data : item));
    setAtividade({id: 0});
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-end mt-2 pb-3 border-bottom border-1">
        <h1 className='m-0 p-0'>
          Atividade {atividade.id !== 0 ? atividade.id : ''}
        </h1>
        <Button variant="outline-secondary" onClick={handleAtividadeModal}>
          <i className='fas fa-plus'></i>
        </Button>
      </div>

      <AtividadeLista 
        atividades = {atividades}
        deletarAtividade = {deletarAtividade}
        pegarAtividade={pegarAtividade}
        />

      <Modal show={showAtividadeModal} onHide={handleAtividadeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Atividade {atividade.id !== 0 ? atividade.id : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtividadeForm 
            addAtividade = {addAtividade}
            cancelarAtividade = {cancelarAtividade}
            atualizarAtividade = {atualizarAtividade}
            atividadeSelecionada={atividade}
            atividades = {atividades}
          />
        </Modal.Body>
      </Modal>

    </>
    
  );
}

export default App;
