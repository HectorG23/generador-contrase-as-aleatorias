const tamañoSlider = document.querySelector(".pass-length input"),
opciones= document.querySelectorAll(".opcion input"),
botonCopiar= document.querySelector(".input-box span"),
contraseñaInput=  document.querySelector(".input-box input"),
indicadorCon=  document.querySelector(".pass-indicator"),
generarBtn = document.querySelector(".generate-btn");

const caracteres = {
    minusculas: "abcdefghijklmnñopqrstuvwxyz",
    mayusculas: "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
    numeros: "0123456789",
    simbolos: "^!$%&|[](){}:;.,*+-#@<>~",
}

const generarContraseña = ()=>{
    let contraseñaEstatica = "",
    randomContraseña = "",
    excluirDuplicado= false,
    longContraseña = tamañoSlider.value;

    opciones.forEach(opcion => {
        if(opcion.checked){
            if(opcion.id !== "exc-duplicado" && opcion.id !== "espacios"){
                contraseñaEstatica += caracteres[opcion.id];
            }else if(opcion.id === "espacios"){
                contraseñaEstatica += ` ${contraseñaEstatica} `;
            }else{
                excluirDuplicado = true; 
            }
           
        }
    });

    for (let i = 0; i < longContraseña; i++) {
        let randomCon = contraseñaEstatica[Math.floor(Math.random() * contraseñaEstatica.length)];
        if(excluirDuplicado){
            !randomContraseña.includes(randomCon) || randomCon == "" ? randomContraseña += randomCon : i-- ;
        }else{
            randomContraseña += randomCon
        }
    }

    contraseñaInput.value = randomContraseña;
}

const updatePassIndicator = () => {
    indicadorCon.id = tamañoSlider.value <= 8 ? "debil" : tamañoSlider.value <= 16 ? "medio" : "fuerte";
}

const actualizarSlider = ()=>{
  document.querySelector(".pass-length span").innerText=tamañoSlider.value;
  generarContraseña();
  updatePassIndicator();
}
actualizarSlider();

const copiarContraseña = () => {
    navigator.clipboard.writeText(contraseñaInput.value);
    botonCopiar.innerText = "check";
    setTimeout(()=>{
        botonCopiar.innerText = "copy_all";
    },1500)
}

tamañoSlider.addEventListener("input",actualizarSlider);
botonCopiar.addEventListener("click",copiarContraseña);
generarBtn.addEventListener("click",generarContraseña);