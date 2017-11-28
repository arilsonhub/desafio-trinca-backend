using System;

namespace ChurrasTrinca.Models
{
    public class Participante
    {
        public long id { get; set; }
        public string nome { get; set; }
        public Decimal valorContribuicao { get; set; }
        public int isPago { get; set; }
        public int isBebida { get; set; }
        public string observacao { get; set; }
        public long churrascoId { get; set; }
    }
}