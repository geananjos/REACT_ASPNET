import { useState, useEffect, React} from 'react';
import { Button, Modal, ModalFooter } from 'react-bootstrap';
import AtividadeLista from './AtividadeLista';
import AtividadeForm from './AtividadeForm'
import api from '../../api/atividade';
import TitlePage from '../../components/TitlePage';

export default function Atividade() {
  
  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [smShowConfirmModal, setSmShowAtividadeModal] = useState(false);
  const [atividades, setAtividades] = useState([]);
  const [atividade, setAtividade] = useState({id: 0});
  
  const handleAtividadeModal = () => setShowAtividadeModal(!showAtividadeModal);

  const handleConfirmModal = (id) => {
    if(id !== 0 && id !== undefined) {
      const atividade = atividades.filter((atividade) => atividade.id === id );
      setAtividade(atividade[0]);
    }
    else {
      setAtividade({id: 0});
    }
    setSmShowAtividadeModal(!smShowConfirmModal);
  }
  
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

  const novaAtividade = () => {
    setAtividade({id: 0});
    handleAtividadeModal();
  }

  const addAtividade = async (ativ) => {
    handleAtividadeModal();
    const response = await api.post('atividade', ativ);
    setAtividades([...atividades, response.data]);
  }

  const deletarAtividade = async (id) => {
    handleConfirmModal(0);
    if(await api.delete(`atividade/${id}`)) {
      const atividadesFiltradas = atividades.filter(atividade => atividade.id !== id );
      setAtividades([...atividadesFiltradas]);
    }
  }

  const pegarAtividade = (id) => {
    const atividade = atividades.filter((atividade) => atividade.id === id );
    setAtividade(atividade[0]);
    handleAtividadeModal();
  }

  const cancelarAtividade = () => {
    setAtividade({id: 0});
    handleAtividadeModal();
  }

  const atualizarAtividade = async (ativ) => {
    handleAtividadeModal();
    const response = await api.put(`atividade/${ativ.id}`, ativ);
    const { id } = response.data;
    setAtividades(
      atividades.map((item) => (item.id === id ? response.data : item))
    );
    setAtividade({id: 0});
  }

  return (
    <>
      <TitlePage 
        title={'Atividade ' + (atividade.id !== 0 ? atividade.id : '')}>
        <Button variant="outline-secondary" onClick={novaAtividade}>
          <i className='fas fa-plus'></i>
        </Button>
      </TitlePage>
      
      <AtividadeLista 
        atividades = {atividades}
        pegarAtividade={pegarAtividade}
        handleConfirmModal={handleConfirmModal}
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

      <Modal
        size='sm' 
        show={smShowConfirmModal}
        onHide={handleConfirmModal}
        >
        <Modal.Header closeButton>
          <Modal.Title>
            Excluindo atividade {' '}
            {atividade.id !== 0 ? atividade.id : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir a atividade {atividade.id} ?
        </Modal.Body>
        <ModalFooter className='d-flex justify-content-between'>
          <button className='btn- btn-outline-success me-2' onClick={() => deletarAtividade(atividade.id)}>
            <i className='fas fa-check me-2'></i>
            Sim
          </button>
          <button className='btn- btn-danger me-2' onClick={() => handleConfirmModal(0)}>
            <i className='fas fa-times me-2'></i>
            Nao
          </button>
        </ModalFooter>
      </Modal>

    </>
    
  );
}
