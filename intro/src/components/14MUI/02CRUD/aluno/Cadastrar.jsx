import { TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem, Button, FormLabel, FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Cadastrar = () => {

    const [nome, setNome] = useState("")
    const [curso, setCurso] = useState("SI")
    const [ira, setIra] = useState("0.0")

    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()

        const novoAluno = { nome, curso, ira }
        axios.post("http://localhost:3002/aluno/register", novoAluno)
            .then(
                (response) => {
                    alert(`Aluno ID ${response.data._id} adicionado!`)
                    navigate("/listarAluno")
                }
            )
            .catch(error => console.log(error))
    }

    return (
        <>
            <Typography variant="h5" fontWeight="bold">
                Cadastrar Aluno
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nome"
                    name="nome"
                    label="Nome Completo"
                    autoFocus
                    onChange={(event) => setNome(event.target.value)}
                />

                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="select-curso-label">Curso</InputLabel>
                    <Select
                        labelId="select-curso-label"
                        label="Curso"
                        value={curso}
                        onChange={(event) => setCurso(event.target.value)}
                    >
                        <MenuItem value="SI">SI</MenuItem>
                        <MenuItem value="ED">ED</MenuItem>
                        <MenuItem value="CC">CC</MenuItem>
                        <MenuItem value="DD">DD</MenuItem>
                        <MenuItem value="ES">ES</MenuItem>
                        <MenuItem value="RC">RC</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="ira"
                    label="IRA"
                    name="ira"
                    type="number"
                    inputProps={{
                        maxLength: 10,
                        step: "0.1"
                    }}
                    onChange={(e) => setIra(parseFloat(e.target.value))}
                />

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ my: 3 }}
                    >
                        Cadastrar
                    </Button>
                </Box>
            </Box>
        </>
    )
}
export default Cadastrar