function ingresarAlumno (alum) {
    let nota = 0
    let total = 0
    let promedio = 0
    let contador = 0
    let cond = "si"
    alum.nombre = prompt("Ingrese Nombre del alumno:")
    alum.apellido = prompt("Ingrese Apellido del alumno:")
    alum.edad = parseInt(prompt("Ingrese edad del alumno:"))
    nota = parseFloat(prompt("Ingrese su nota:"))
    /* verificador (nota)   */
    while (cond == "si"){
        total += nota 
        contador++
        cond = prompt("Ingrese Si si quiere seguir agregando notas").toLowerCase()
        if(cond == "si" ){
            nota = parseFloat(prompt("Ingrese su nota:"))
            /* verificador (nota)  */
        }
    }
    promedio = total / contador
    alum.promedio = promedio
}


//Variables
const alumnos = []
/* const alumnoAux = new Alumno() */
const alumnoAux = {
    nombre:"",
    apellido:"",
    edad:0,
    promedio:0
}
let condicion = "si"

//Main
ingresarAlumno(alumnoAux)
while (condicion == "si") {
    alumnos.push(alumnoAux)
    condicion = prompt("Ingrese Si si quiere seguir agregando alumnos:").toLowerCase()
    if (condicion == "si"){
        ingresarAlumno(alumnoAux)
    }
}

console.log(alumnos)







