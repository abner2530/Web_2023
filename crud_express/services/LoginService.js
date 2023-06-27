const ProfessorModel = require("../models/professor.models")

let login = [
    { login: "123", senha: "123" },
    
]

let id = 5

class ProfessorService {

    static list() {
        return professores
    }

    static register(data) {
        let professor = new ProfessorModel(
            id++,
            data.nome,
            data.curso,
            data.titulacao,
            data.ai
        )
        professores.push(professor)
        return professor
    }

    static update(id, data) {
        for (let professor of professores) {
            if (professor.id == id) {
                professor.nome = data.nome
                professor.curso = data.curso
                professor.titulacao = data.titulacao
                professor.ai = data.ai
                return professor
            }
        }
        return null
    }

    static delete(id) {
        for (let i = 0; i < professores.length; i++) {
            if (professores[i].id == id) {
                professores.splice(i, 1)
                return true
            }
        }
        return false
    }

    static retrieve(id) {
        for (let i = 0; i < professores.length; i++) {
            if (professores[i].id == id) {
                return professores[i];
            }
        }
        return {}
    }

}
module.exports = ProfessorService