using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ChurrasTrinca.Models
{
    public class Churrasco
    {
        public long id { get; set; }
        [DataType(DataType.Date)]
        public DateTime data { get; set; }
        public string descricao { get; set; }
        public string observacao { get; set; }
        public ICollection<Participante> listaParticipante { get; set; }
    }
}