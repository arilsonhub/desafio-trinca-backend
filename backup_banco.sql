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

USE [churrasTrinca]
GO

/****** Object:  Table [dbo].[Participantes]    Script Date: 26/11/2017 19:56:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Participantes](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[nome] [nvarchar](255) NOT NULL,
	[valorContribuicao] [money] NOT NULL,
	[isPago] [int] NOT NULL,
	[isBebida] [int] NOT NULL,
	[observacao] [nvarchar](255) NULL,
	[churrascoId] [bigint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/* ----------- Tabela Usuario --------------- */

USE [churrasTrinca]
GO

/****** Object:  Table [dbo].[Usuarios]    Script Date: 26/11/2017 19:56:53 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Usuarios](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[login] [nvarchar](255) NOT NULL,
	[senha] [nchar](10) NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/* ----------- INSERTS --------------- */
USE [churrasTrinca]
GO

INSERT INTO [dbo].[Usuarios]
           ([login]
           ,[senha])
     VALUES
           ('arilson','123456')
GO
