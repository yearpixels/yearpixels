// ü, é, á, í, ó, ú
import { theme } from './theme'

const feelings = [
  ["Día en que me sentí completo (a)", "#f44436"],
  ["Día perfecto / increible / el mejor", "#cddc39"],
  ["Día feliz / comódo / bueno", "#ffc107"],
  ["Día normal / relajado", "#c2185b"],
  ["Día agotador / cansado / aburrido", "#0d47a1"],
  ["Día depresivo / triste", "#607d8b"],
  ["Día frustrante / todo salió mal", "#b388ff"],
  ["Día de los peores en el año / muy malo", "#000000"],
]

const feelingsColors = new Map(feelings)

const months = [
  'Enero', 
  'Febrero', 
  'Marzo', 
  'Abril', 
  'Mayo', 
  'Junio', 
  'Julio', 
  'Agosto', 
  'Septiembre', 
  'Octubre', 
  'Noviembre', 
  'Diciembre'
]

function getFeeligns(){
  return new Map(feelings.map( feel => ([feel[0], false]) ))
}

export { 
  feelings, 
  getFeeligns, 
  feelingsColors, 
  
  months, 
  
  theme 
}