USE [jops]
GO
/****** Object:  StoredProcedure [dbo].[sp_insert_new_worker]    Script Date: 8/12/2024 10:39:16 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[sp_insert_new_worker]
            @w_name nvarchar(50)
           ,@w_addres nvarchar(50)
           ,@w_id_type nvarchar(50)
		   ,@w_id_no nvarchar(50)
           ,@w_pirthdate nvarchar(50)
           ,@w_status nvarchar(50)
           ,@w_sex nvarchar(50)
           ,@w_study1 nvarchar(50)
           ,@w_study2 nchar(10)
           ,@w_study3 nvarchar(50)
           ,@w_graduate_date1 nvarchar(50)
           ,@w_graduate_date2 nvarchar(50)
           ,@w_graduate_date3 nvarchar(50)
           ,@w_experiances nvarchar(max)
           ,@w_note nvarchar(256)
		   ,@User_whoInsert nvarchar(50)
		   ,@avilability nvarchar(50)
		   ,@w_img image 
		   ,@exper exper_TableType7_new READONLY 
as
BEGIN TRANSACTION
DECLARE @DataID int;
declare @w_id int=0
	   ,@counter int=1

select @w_id=(select max([dbo].[tbl_workers].w_id+1)from [dbo].[tbl_workers])

INSERT INTO [dbo].[tbl_workers]
           ([w_name]
           ,[w_addres]
		   ,[w_tel]
           ,[w_id_type]
           ,[w_id_no]
           ,[w_pirthdate]
           ,[w_status]
           ,[w_sex]
           ,[w_study1]
           ,[w_study2]
           ,[w_study3]
           ,[w_graduate_date1]
           ,[w_graduate_date2]
           ,[w_graduate_date3]
           ,[w_experiances]
           ,[w_note]
           ,[User_whoInsert]
           ,[Insert_date]
		   ,avilability
		   ,w_img)
     VALUES
           (
            @w_name
           ,@w_addres
		   ,@w_experiances
           ,@w_id_type
		   ,@w_id_no
           ,@w_pirthdate
           ,@w_status
           ,@w_sex
           ,@w_study1
           ,@w_study2
           ,@w_study3
           ,@w_graduate_date1
           ,@w_graduate_date2
           ,@w_graduate_date3
           ,''
           ,@w_note
		   ,@User_whoInsert
		   ,CURRENT_TIMESTAMP
		   ,@avilability
		   ,@w_img
		   )


SELECT @DataID = scope_identity();
		   
begin
	INSERT INTO [dbo].[tbl_exper]
           ([w_id]
           ,[exper_name]
           ,[exper_level]
           ,[exper_not]
		   ,[exper_time])
 
    SELECT @DataID
      ,[exper_name]
      ,[exper_level]
      ,[exper_not]
	  ,[exper_time]
    FROM @exper

		   end

COMMIT
