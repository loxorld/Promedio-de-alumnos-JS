//Variables
let alumnos = []
const idForm = document.getElementById("idForm")
const agregarNota = document.getElementById("agregarNota")
const botonAlumnos = document.getElementById("botonAlumnos")
const divAlumnos = document.getElementById("divAlumnos")
const notasAux = []
let total = 0

//clases
class Alumno {
    constructor(nombre, apellido, edad, notas) {
        this.nombre = nombre
        this.apelldio = apellido
        this.edad = edad
        this.notas = notas
        this.promedio = 0
    }
}

/* alumnos =  JSON.parse(localStorage.getItem("alumnos")) ?? [] */

if(localStorage.getItem("alumnos")) { //Verifico si ya existe o no informacion
    alumnos =  JSON.parse(localStorage.getItem("alumnos")) 
} else {
    localStorage.setItem("alumnos", JSON.stringify(alumnos)) 
}   

//Funciones
function alertita (){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Alumno cargado.'
        
      })
}

agregarNota.addEventListener("click", (ev) => { //Listener para el boton agregar notas
    ev.preventDefault()
    notasAux.push(document.getElementById("nota").value)

})

idForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const datForm = new FormData(e.target)
    const alumno = new Alumno(datForm.get("nombre"), datForm.get("apellido"), datForm.get("edad"), notasAux)
    alumno.notas.forEach((nota) => { 
        total += parseInt(nota)
    })
    alumno.promedio = total / alumno.notas.length
    console.log(alumno.promedio)
    if ((alumno.nombre != "") && (alumno.apelldio != "") && (alumno.edad != 0) && (alumno.promedio <= 10)) { // if que chequea que los datos ingresados sean coherentes
        alumnos.push(alumno)
        localStorage.setItem('alumnos', JSON.stringify(alumnos))
        alertita() 
        
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Datos Erroneos',
            text: 'Ingrese todos los datos correctamente porfavor',
          })
    }
    
    idForm.reset()
    total = 0 // vuelvo a poner el total en 0 para el proximo alumno
    notasAux.splice(0, notasAux.length)  // vacio el array para el proximo alumno
})

botonAlumnos.addEventListener("click", () => {  //Listener para mostrar los alumnos cargados en la pagina
    const almStorage = JSON.parse(localStorage.getItem('alumnos'))
    divAlumnos.innerHTML = ""
    almStorage.forEach((alumno, indice) => {
        divAlumnos.innerHTML += `
        <div class="card" id="alumno${indice}" style="width: 18rem;margin:3px;">
            <div class="card-body">
                <h5 class="card-title">Alumno ${alumno.nombre} ${alumno.apelldio}</h5>
                <p class="card-text">Edad: ${alumno.edad}</p>
                <p class="card-text">Promedio:${alumno.promedio}</p>
                <button class="btn btn-danger">Eliminar</button>
            </div>
        </div>
        `
    })
    almStorage.forEach((alumno, indice) => { // forma de llegar al boton eliminar en cada alumno
        const tarjetaAlumno = document.getElementById(`alumno${indice}`)
    
        tarjetaAlumno.children[0].children[3].addEventListener('click', () => {
            tarjetaAlumno.remove() //DOM
            alumnos.splice(indice, 1) //Array
            localStorage.setItem('alumnos', JSON.stringify(alumnos)) //Local storage
        })
    })  
})




//Main

