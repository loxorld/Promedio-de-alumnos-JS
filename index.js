//Variables
const alumnos = []
const idForm = document.getElementById("idForm")
const agregarNota = document.getElementById("agregarNota")
const notasAux = []
let total = 0
class Alumno {
    constructor(nombre, apellido, edad, notas) {
        this.nombre = nombre
        this.apelldio = apellido
        this.edad = edad
        this.notas = notas
        this.promedio = 0
    }
}


//Funciones
agregarNota.addEventListener("click", (ev) => {
    ev.preventDefault()
    notasAux.push(document.getElementById("nota").value)

})

idForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const alumno = new Alumno(document.getElementById("nombre").value, document.getElementById("apellido").value, document.getElementById("edad").value, notasAux)
    alumno.notas.forEach((nota) => { 
        total += parseInt(nota)
    })
    alumno.promedio = total / alumno.notas.length
    console.log(alumno.promedio)
    alumnos.push(alumno)
    idForm.reset()
    total = 0 // vuelvo a poner el total en 0 para el proximo alumno
    console.log(alumnos)
    notasAux.splice(0, notasAux.length)  // vacio el array para el proximo alumno
})



//Main

