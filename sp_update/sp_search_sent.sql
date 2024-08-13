USE [jops]
GO
/****** Object:  StoredProcedure [dbo].[sp_serch_sent]    Script Date: 8/13/2024 4:57:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[sp_serch_sent] 
@Param nvarchar (50)
,@accept nvarchar (50)
,@Offset INT
,@PageSize INT

as
SELECT COUNT(*) AS TotalCount FROM tbl_sent
 if @accept='الكل'
begin
SELECT	 
       [tbl_workers].w_id 
      ,[tbl_workers].w_name 
      ,[tbl_workers].w_tel 
      ,[tbl_workers].w_sex 
      ,[w_study1] 
      ,tbl_workers.avilability 
	  ,tbl_sent.accept
	  ,tbl_companies.com_id 
	  ,tbl_companies.com_name 
	  ,[tbl_sent].sent_nots 
	  ,tbl_sent.sent_date 
	   ,CASE WHEN (tbl_sent.accept_date like '2100-01-01' or tbl_sent.accept_date = '2100-01-01' or tbl_sent.accept_date like '1900-01-01' or tbl_sent.accept_date = '1900-01-01') THEN '' ELSE tbl_sent.accept_date END 
	  ,tbl_sent.sent_id as'sent_id'
      
FROM tbl_sent
     left join tbl_workers
on   tbl_sent.w_id=tbl_workers.w_id
    left  join tbl_companies
     on   tbl_sent.com_id=tbl_companies.com_id
where (tbl_workers.w_name like @Param or
tbl_workers.w_tel like @Param or
tbl_companies.com_name like @Param or
tbl_companies.com_id like @Param 
) 
order by tbl_sent.sent_id DESC
       OFFSET  @Offset ROWS
       FETCH NEXT @PageSize ROWS ONLY;
end
else 
begin 
SELECT	 
       [tbl_workers].w_id 
      ,[tbl_workers].w_name 
      ,[tbl_workers].w_tel
      ,[tbl_workers].w_sex 
      ,[w_study1]
      ,tbl_workers.avilability 
	  ,tbl_sent.accept 
	  ,tbl_companies.com_id 
	  ,tbl_companies.com_name 
	  ,[tbl_sent].sent_nots 
	  ,tbl_sent.sent_date 
	   ,CASE WHEN (tbl_sent.accept_date like '2100-01-01' or tbl_sent.accept_date >= '01-01-2100' or tbl_sent.accept_date like '1900-01-01' or tbl_sent.accept_date = '1900-01-01') THEN '' ELSE tbl_sent.accept_date END AS 'تاريخ القبول'
      ,tbl_sent.sent_id as'sent_id'
FROM tbl_sent
     left join tbl_workers
on   tbl_sent.w_id=tbl_workers.w_id
    left  join tbl_companies
     on   tbl_sent.com_id=tbl_companies.com_id
where ( tbl_workers.w_name like @Param and tbl_sent.accept=@accept)
order by tbl_sent.sent_id DESC
       OFFSET  @Offset ROWS
       FETCH NEXT @PageSize ROWS ONLY;
end
--------------------------------------------------------------------------
--tbl_workers.w_name like @Param and
---------------------------------------------------------------------------
