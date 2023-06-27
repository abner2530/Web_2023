import { IconButton, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { styled } from '@mui/material/styles'
import { tableCellClasses } from '@mui/material/TableCell'
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
//import { useNavigate } from "react-router-dom"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Listar = () => {

    const [alunos, setAlunos] = useState([])
    const [mudou, setMudou] = useState(false)
    //const navigate = useNavigate()

    useEffect(
        () => {
            axios.get("http://localhost:3002/aluno/listar")
                .then(
                    (response) => {
                        //console.log(response)
                        setAlunos(response.data)
                    }
                )
                .catch(error => console.log(error))
        }
        ,
        []
    )

    function deleteAluno(id) {
        if (window.confirm("Deseja Excluir? " + id)) {
            axios.delete(`http://localhost:3002/aluno/delete/${id}`)
                .then(
                    (response) => {
                        deleteTeste(id)
                        setMudou(!mudou)
                    }
                )
                .catch(error => console.log(error))
        }
    }

    function deleteTeste(id) {
        for (let i = 0; i < alunos.length; i++) {
            if (alunos[i]._id === id) {
                alunos.splice(i, 1);
                return true;
            }
        }
        return false
    }

    // Função para calcular a média dos IRAs
    function calcularMedia() {
        let somaIra = 0;
        alunos.forEach((aluno) => {
            somaIra += aluno.ira;
        });
        const media = somaIra / alunos.length;
        return media.toFixed(2);
    }

    // Função para filtrar alunos abaixo da média
    function filtrarAlunosAcimaDaMedia() {
        const media = calcularMedia();
        return alunos.filter((aluno) => aluno.ira > media);
    }


    return (
        <>
            <Typography variant="h5" fontWeight="bold">
                Listar Alunos Aprovados
            </Typography>
            

            <TableContainer component={Paper} sx={{ mt: 2, mb: 4 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>NOME</StyledTableCell>
                            <StyledTableCell>CURSO</StyledTableCell>
                            <StyledTableCell>IRA</StyledTableCell>
                            <StyledTableCell align="center">AÇÕES</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Alunos abaixo da média */}
                        <StyledTableRow>
                            <StyledTableCell colSpan={5} align="center">
                                <Typography variant="subtitle1" color="error">
                                    Alunos Aprovados:
                                </Typography>
                            </StyledTableCell>
                        </StyledTableRow>
                        {filtrarAlunosAcimaDaMedia().map((aluno) => (
                            <StyledTableRow
                                key={aluno._id}
                                style={{ color: "red" }}
                            >
                                <StyledTableCell>{aluno._id}</StyledTableCell>
                                <StyledTableCell>{aluno.nome}</StyledTableCell>
                                <StyledTableCell>{aluno.curso}</StyledTableCell>
                                <StyledTableCell>{aluno.ira}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}

export default Listar