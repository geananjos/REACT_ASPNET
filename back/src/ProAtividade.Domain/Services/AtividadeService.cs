using System;
using System.Threading.Tasks;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;
using ProAtividade.Domain.Interfaces.Services;

namespace ProAtividade.Domain.Services
{
    public class AtividadeService : IAtividadeService
    {
        private readonly IAtividadeRepo _atividadeRepo;
        public AtividadeService(IAtividadeRepo atividadeRepo)
        {
            _atividadeRepo = atividadeRepo;
        }

        public async Task<Atividade> AdicionarAtividade(Atividade model)
        {
            if (await _atividadeRepo.PegaPorTituloAsync(model.Titulo) != null)
                throw new Exception("Ja existe uma atividade com esse titulo");

            if (await _atividadeRepo.PegaPorIdAsync(model.Id) == null)
            {
                _atividadeRepo.Adicionar(model);
                if (await _atividadeRepo.SalvarMudancasAsync())
                    return model;
            }

            return null;
        }

        public async Task<Atividade> AtualizarAtividade(Atividade model)
        {
            if (model.DataConclusao != null)
                throw new Exception("Nao e possivel alterar uma atividade concluida.");

            if (await _atividadeRepo.PegaPorIdAsync(model.Id) == null)
            {
                _atividadeRepo.Atualizar(model);
                if (await _atividadeRepo.SalvarMudancasAsync())
                    return model;
            }

            return null;
        }

        public async Task<bool> ConcluirAtividade(Atividade model)
        {
            if (model != null)
            {
                model.Concluir();
                _atividadeRepo.Atualizar<Atividade>(model);
                return await _atividadeRepo.SalvarMudancasAsync();
            }

            return false;
        }

        public async Task<bool> DeletarAtividade(int atividadeId)
        {
            var atividade = await _atividadeRepo.PegaPorIdAsync(atividadeId);
            if(atividade == null) throw new Exception("Esta atividade nao existe.");

            _atividadeRepo.Deletar(atividade);
            return await _atividadeRepo.SalvarMudancasAsync();
        }

        public async Task<Atividade> PegarAtividadePorIdAsync(int atividadeId)
        {
            try
            {
                var atividades = await _atividadeRepo.PegaPorIdAsync(atividadeId);
                if(atividades == null) return null;
                
                return atividades;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Atividade[]> PegarTodasAtividadesAsync()
        {
            try
            {
                var atividades = await _atividadeRepo.PegaTodasAsync();
                if(atividades == null) return null;
                
                return atividades;
            }
            catch (System.Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}