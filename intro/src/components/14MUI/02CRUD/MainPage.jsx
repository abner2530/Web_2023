import { BrowserRouter, Routes, Route } from "react-router-dom"
import MyMenuV1 from "./MyMenuV1"
import { Container } from "@mui/material"
//páginas do Professor
import CadastrarProfessor from "./professor/Cadastrar"
import ListarProfessor from "./professor/Listar"
import EditarProfessor from "./professor/Editar"

//páginas do Aluno
import CadastrarAluno from "./aluno/Cadastrar"
import ListarAluno from "./aluno/Listar"
import EditarAluno from "./aluno/Editar"
//página especifica para listar aluno aprovado Questão 2
import ListarAlunoAprovado from "./aluno/ListarAprovados"

const MainPage = () => {
    return (
        <BrowserRouter>
            <MyMenuV1 />
            <Container sx={{mt:4}}>
                <Routes>
                    <Route path="cadastrarProfessor" element={<CadastrarProfessor />}/>
                    <Route path="listarProfessor" element={<ListarProfessor />}/>
                    <Route path="editarProfessor/:id" element={<EditarProfessor />}/>
                    <Route path="cadastrarAluno" element={<CadastrarAluno />}/>
                    <Route path="listarAluno" element={<ListarAluno />}/>
                    <Route path="editarAluno/:id" element={<EditarAluno />}/>
                    <Route path="listarAlunoAprovado" element={<ListarAlunoAprovado />}/>
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default MainPage