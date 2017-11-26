/* ----------- Tabela Churrasco --------------- */

USE [churrasTrinca]
GO

/****** Object:  Table [dbo].[Churrascoes]    Script Date: 26/11/2017 19:50:41 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Churrascoes](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[data] [date] NOT NULL,
	[descricao] [nvarchar](100) NOT NULL,
	[observacao] [text] NULL,
 CONSTRAINT [PK_Churrascoes] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


/* ----------- Tabela Participante --------------- */

/* ----------- Tabela Usuario --------------- */