USE [jops]
GO
/****** Object:  StoredProcedure [dbo].[sp_w_search]    Script Date: 8/12/2024 11:23:51 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[sp_w_search] 
 @Param nvarchar(100)
,@avilability int
,@Offset INT 
,@PageSize INT 
as

	 if @avilability=1
begin
 SET NOCOUNT ON;

   
   SELECT COUNT(*) AS TotalCount FROM tbl_workers;

SELECT tbl_workers.w_id as 'id'
      ,[w_name]
	  
      ,[w_addres] 
	  ,[w_tel]  
      ,[w_id_type] 
      
      ,[w_pirthdate] 
      ,[w_status] 
      ,[w_sex] 
      ,[w_study1] 
      ,[w_note]
      ,[User_whoInsert] 
      ,[Insert_date] 
	  ,avilability 
	  ,[w_study3] 
	  ,tbl_exper.exper_name 
	  
  FROM [dbo].[tbl_workers]
     left join tbl_exper on tbl_workers.w_id= tbl_exper.w_id

  where (
      ([w_name]like @param or
      [w_addres]like @param or
      [w_id_no]like @param or
      [w_pirthdate]like @param or
      [w_study1]like @param or
      [w_tel] like @param or
      [w_study1]like @param or
	  [w_note] like @param or
	  [w_graduate_date3] like @param or
	  [tbl_exper].exper_name like @Param
	  )
	  and avilability='متوفر'
      
	  )
	  order by tbl_workers.w_id DESC
	   OFFSET  @Offset ROWS
       FETCH NEXT @PageSize ROWS ONLY;

	
	  end
	  else if @avilability=2
begin
SELECT COUNT(*) AS TotalCount FROM tbl_workers;
SELECT tbl_workers.w_id as 'id'
      ,[w_name]
	  
      ,[w_addres] 
	  ,[w_tel] 
      ,[w_id_type] 
      ,[w_id_no] 
      ,[w_pirthdate]
      ,[w_status] 
      ,[w_sex] 
      ,[w_study1] 
      ,[w_graduate_date1] 
      ,[w_note] 
      ,[User_whoInsert] 
      ,[Insert_date] 
	  ,avilability 
	  ,[w_study3] 

      ,tbl_exper.exper_name as 'المهارة'
	  
  FROM [dbo].[tbl_workers]
     left join tbl_exper on tbl_workers.w_id= tbl_exper.w_id

  where (
      ([w_name]like @param or
      [w_addres]like @param or
      [w_id_no]like @param or
      [w_pirthdate]like @param or
      [w_study1]like @param or
      [w_tel] like @param or
      [w_study1]like @param or
	  [w_note] like @param or
	  [w_graduate_date3] like @param or
	  [tbl_exper].exper_name like @Param
	  )
	  and avilability='غير متوفر'
      
	  )
	  order by tbl_workers.w_id DESC
	   OFFSET @Offset ROWS
       FETCH NEXT @PageSize ROWS ONLY;

	  end

	  else 
begin
SELECT COUNT(*) AS TotalCount FROM tbl_workers;
SELECT tbl_workers.w_id as 'id'
      ,[w_name] 
	  
      ,[w_addres]
	  ,[w_tel] 
      ,[w_id_type]
      ,[w_id_no] 
      ,[w_pirthdate] 
      ,[w_status] 
      ,[w_sex] 
      ,[w_study1] 
      ,[w_graduate_date1] 
      ,[w_note] 
      ,[User_whoInsert] 
      ,[Insert_date] 
	  ,avilability 
	  ,[w_study3] 
      ,tbl_exper.exper_name 
	  
  FROM [dbo].[tbl_workers]
     left join tbl_exper on tbl_workers.w_id= tbl_exper.w_id

  where (
      [w_name]like @param or
      [w_addres]like @param or
      [w_id_no]like @param or
      [w_pirthdate]like @param or
      [w_study1]like @param or
      [w_tel] like @param or
      [w_study1]like @param or
	  [w_note] like @param or
      [w_graduate_date3] like @param or
	  [tbl_exper].exper_name like @Param
	  
	  )
	   order by tbl_workers.w_id DESC
	    OFFSET @Offset ROWS
       FETCH NEXT @PageSize ROWS ONLY;

	   
	 end
