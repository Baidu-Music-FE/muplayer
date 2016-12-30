<% @ language=vbscript%>
<%
dim fld,uid,upassword,connectionstring
myjd=request("buttonva")
'保利300多美女
'Response.Write myjd
'Response.ContentType = "application/vnd.ms-excel"
exec="select * from `" & myjd & "`"
set conn=Server.CreateObject("ADODB.Connection")
connectionstring="driver={mysql odbc 3.51 driver};database=zjwdb_6075388;server=localhost;uid=zjwdb_6075388;password=Wwwwbjwww197501;OPTION=3;stmt=SET NAMES gbk"
conn.open connectionstring
set rs=conn.execute(exec)

%>

<HTML>
<BODY>
<TABLE Border="1">
<% For Each fld in rs.Fields %>
<TH>
<% Response.Write fld.Name %>
</TH>
<%Next%>
<%rs.MoveFirst
Do until rs.EOF
%>
<TR>
<%
For Each fld in rs.Fields
%>
<TD>
<% Response.Write fld.Value %>
</TD>
<%Next%>
</TR>
<%rs.MoveNext
Loop%>
</TABLE>
</BODY>
</HTML>
<%
rs.Close
Set rs=Nothing
%>
