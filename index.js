//Variables
let alumnos = []
const idForm = document.getElementById("idForm")
const agregarNota = document.getElementById("agregarNota")
const botonAlumnos = document.getElementById("botonAlumnos")
const divAlumnos = document.getElementById("divAlumnos")
const divClima = document.getElementById("divClima")
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

//Verificacion de datos
if(localStorage.getItem("alumnos")) { //Verifico si ya existe o no informacion
    alumnos =  JSON.parse(localStorage.getItem("alumnos")) 
} else {
    localStorage.setItem("alumnos", JSON.stringify(alumnos)) 
}   

//Funciones
function alertita (title){ //Funcion para no repetir codigo de Toast
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
        title: title

      })
}

agregarNota.addEventListener("click", (ev) => { //Listener para el boton agregar notas el cual agrega las notas en el array notas
    ev.preventDefault()
    notasAux.push(document.getElementById("nota").value)
})
idForm.addEventListener("submit", (e) => { //listener para el submit en el que se carga toda las informacion de los alumnos
    e.preventDefault()
    const datForm = new FormData(e.target)
    const alumno = new Alumno(datForm.get("nombre"), datForm.get("apellido"), datForm.get("edad"), notasAux)
    alumno.notas.forEach((nota) => { //suma todas las notas en la variable total
        total += parseInt(nota)
    })
    alumno.promedio = total / alumno.notas.length //Se guarda el promedio del alumno 
    console.log(alumno.promedio)
    if ((alumno.nombre != "") && (alumno.apelldio != "") && (alumno.edad != 0) && (alumno.promedio <= 10)) { // if que chequea que los datos ingresados sean coherentes
        alumnos.push(alumno)
        localStorage.setItem('alumnos', JSON.stringify(alumnos))
        alertita("Alumno Cargado.") 

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
        
        <div class="card text-white bg-primary mb-3" id="alumno${indice}" style="max-width: 20rem;">
            <div class="card-header">Alumno: ${alumno.nombre} ${alumno.apelldio}</div>
            <div class="card-body">
                <p class="card-title">Edad: ${alumno.edad} </p>
                <p class="card-text">Promedio: ${alumno.promedio}</p>
                <button class="btn btn-danger">Eliminar</button>
            </div>
        </div>
        `
    })
    almStorage.forEach((alumno, indice) => { // Forma en la cual llego hasta el boton eliminar de cada alumno y les doy la funcionalidad de borrarlos
        const tarjetaAlumno = document.getElementById(`alumno${indice}`)
    
        tarjetaAlumno.children[1].children[2].addEventListener('click', () => {
            tarjetaAlumno.remove() //DOM
            alumnos.splice(indice, 1) //Array
            localStorage.setItem('alumnos', JSON.stringify(alumnos)) //Local storage
        })
    })  
})

setTimeout(() =>{
    Swal.fire(
        'Bienvenido',
        'Esta pagina esta diseñada para Promediar notas de alumnos y cargar otros datos de Berazategui',
        'info'
      )
},1000)


//Clima Actual de Berazategui
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=-34.7632677&lon=-58.2116604&lang=es&appid=27b2732f0071d1035a707f18d369e2a3`)
.then(response => response.json())
.then((tiempo => { 
    divClima.innerHTML += `
        
    <div class="card text-white bg-primary mb-3" id="divClima" style="max-width: 20rem;">
        <div class="card-header">Tiempo Actual: ${tiempo.weather[0].description.toUpperCase()}</div>
    </div>
    `
    
}))
