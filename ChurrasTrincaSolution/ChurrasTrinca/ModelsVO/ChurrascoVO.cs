using System;

namespace ChurrasTrinca.ModelsVO
{
    public class ChurrascoVO
    {
        public long id { get; set; }        
        public DateTime data { get; set; }
        public string descricao { get; set; }
        public string observacao { get; set; }
        public int quantidadeParticipantes { get; set; }
        public Decimal totalArrecadado { get; set; }
        public Decimal valorASerArrecadado { get; set; }
        public int quantidadeBebuns { get; set; }
        public int quantidadeSaudaveis { get; set; }
    }
}