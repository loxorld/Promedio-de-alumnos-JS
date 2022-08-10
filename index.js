//Variables
const alumnos = []
/* const alumnoAux = new Alumno() */
let condicion = "si"

//Funciones
function verificador(n1 = 0) {
    while (isNaN(n1)) {
        n1 = parseFloat(prompt("Ingrese porfavor una nota valida:"))
    }
    return n1
}

function ingresarAlumno () {
    const alum = {
        nombre:"",
        apellido:"",
        edad:0,
        promedio:0
    }
    let nota = 0
    let total = 0
    let promedio = 0
    let contador = 0
    let cond = "si"
    alum.nombre = prompt("Ingrese Nombre del alumno:")
    alum.apellido = prompt("Ingrese Apellido del alumno:")
    alum.edad = parseInt(prompt("Ingrese edad del alumno:"))
    nota = parseFloat(prompt("Ingrese su nota:"))
    nota = verificador (nota)  
    console.log(nota) 
    while (cond == "si"){
        total += nota 
        contador++
        cond = prompt("Ingrese Si si quiere seguir agregando notas").toLowerCase()
        if(cond == "si" ){
            nota = parseFloat(prompt("Ingrese su nota:"))
            nota = verificador (nota)
        }
    }
    promedio = total / contador
    alum.promedio = promedio
    alumnos.push(alum)
}


//Main

ingresarAlumno()
while (condicion == "si") {
    condicion = prompt("Ingrese Si si quiere seguir agregando alumnos:").toLowerCase()
    if (condicion == "si"){
        ingresarAlumno()
    }
}
console.log(alumnos)