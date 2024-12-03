import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  CircularProgress,
  Typography,
  Paper,
  Pagination
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../hooks/useAuth"; 
import ModifyMemberPopup from "./ModifyMemberPopup";

const MembersTable =()=>{

    const{getToken}=useAuth();
    const [members,setMembers]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const [totalPage,setTotalPage]=useState(1);
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null);


    const fetchMembers = async (pageNumber)=>
    {
      const token = getToken();

      if(!token)
      {
        console.error("Token not found");
        return;
      }

      try{
     
        const response = await axios.get( 
          `${process.env.REACT_APP_API_URL}/api/v1/members/${pageNumber}`,
        {
          headers:{
            accept:"*/*",
            Authorization:`Bearer ${token}`,
          },
        });

        const {page,totalPages,members}=response.data;
        
        setMembers(members);
        setTotalPage(totalPages);
        setCurrentPage(page);
        
      }
      catch(error){
        console.error("Error at fething the members: ",error);
      }
    };

    useEffect(() => {
      fetchMembers(currentPage);

    }, [currentPage]);

    const renderPageNumbers = () =>
    {
      const pages=[];
      for(let i=1;i<=totalPage;i++)
      {
        pages.push(
          <Button
            key={i}
            variant={i === currentPage ? "contained" : "outlined"}
            color={i === currentPage ? "primary" : "default"}
            onClick={() => setCurrentPage(i)}
            sx={{ margin: "0 5px",
              backgroundColor: i === currentPage ? "#B43F3F" : "#FFF", 
              color: i === currentPage ? "#FFF" : "#B43F3F"
             }}
          >
            {i}
          </Button>
        );
      }
      return pages;
    }

    const handleDelete = async(memberId) =>{
      const token = getToken();

      if(!token)
      {
        console.error("Token not found");
        return;
      }

          try{
            await axios.delete( 
              `${process.env.REACT_APP_API_URL}/api/v1/member/${memberId}`,
            {
              headers:{
                accept:"*/*",
                Authorization:`Bearer ${token}`,
              },
            });

            setMembers(members.filter((member)=>member.memberId!==memberId));
          }
          catch(error)
          {
              console.error("Error at the deleting the member: ", error);
          }
    }

    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };


    const handleOpenPopup = (result) => {
      setSelectedResult(result);
      setPopupOpen(true);
    };

    const handleClosePopup = () => {
      setPopupOpen(false);
      setSelectedResult(null);
    };

    return (
      <Box sx={{ padding: 3, color: "white" }}>
         <Typography
        variant="h4"
        gutterBottom
        sx={{
          marginBottom: 5,
        }}
      >
        Membri existenti
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>

            <TableCell
                sx={{
                  borderBottom: "none",
                  color: "white",
                }}
              >
                Name  
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "none",
                  color: "white",
                }}
              >
                Team Name  
              </TableCell>

              <TableCell
                sx={{
                  borderBottom: "none",
                  color: "white",
                }}
              >
                Action 
              </TableCell>

            </TableRow>
          </TableHead>

          <TableBody>
            
               {members.map((member)=>(
                <TableRow key={member.memberId}>
                  <TableCell sx={{
                    borderBottom: "none",
                    color: "white",
                  }}>
                    {member.name}
                    </TableCell>
                  
                  <TableCell sx={{
                    borderBottom: "none",
                    color: "white",
                  }}>
                    {member.teamName}
                    </TableCell>

                    <TableCell sx={{
                    borderBottom: "none",
                    color: "white",
                  }}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(member.memberId)}
                    >
                      Sterge
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleOpenPopup(member)}
                    >
                      Modifica
                    </Button>
                    </Box>
                    </TableCell>
                    
                </TableRow>
               ))}

          </TableBody>
        </Table>
      </TableContainer>

  
          <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 3,
        }} >

        {renderPageNumbers()}
      </Box>  

        {popupOpen&&selectedResult&&(
          <ModifyMemberPopup  
          open={popupOpen}
           handleClose={handleClosePopup}
           result={selectedResult}
           onSave={fetchMembers}
           getToken={getToken}
           pageNumber={currentPage}
          />
         
        )}


      </Box>
    )
}


export default MembersTable;