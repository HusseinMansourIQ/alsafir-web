USE [jops]
GO
/****** Object:  StoredProcedure [dbo].[sp_ins_sent]    Script Date: 8/13/2024 5:03:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[sp_ins_sent]
            @w_id int
           ,@com_id int
           ,@accept nvarchar(50)
           ,@sent_nots nvarchar(50)
		   ,@sent_date date = NULL
		   ,@accept_date date = NULL
		   as
INSERT INTO [dbo].[tbl_sent]
           (
		    [w_id]
           ,[com_id]
           ,[accept]
           ,[sent_nots]
		   ,sent_date
		   ,accept_date
		   )
     VALUES
           (
		    @w_id 
           ,@com_id 
           ,@accept
           ,@sent_nots
		   ,@sent_date
		   ,@accept_date
		   )
