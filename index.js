   //FORMULARIO PAGINA "REGISTRARSE" (reemplaza a los "prompt usados en la entrega anterior para el registro")
let form=[];
let submitbutton=document.getElementById("submitInput");
let todook=1;

submitbutton.onclick = () => {

form.unshift({nombre: document.getElementById("nombreInput").value, apellido: document.getElementById("apellidoInput").value, mail: document.getElementById("mailInput").value});

    if(form[0].nombre=="" || form[0].apellido=="" || form[0].mail==""){
        alert("No puede dejar casillas en blanco");
        todook=0;
    }

    if(form[0].mail.search("@hotmail")==-1 && form[0].mail.search("@gmail")==-1 && form[0].mail.search("@yahoo")==-1 && form[0].mail.search("@live")==-1){
        alert("El email ingresado es inválido");
        todook=0;
    }else if(todook=1){
        alert("Registro exitoso!");
    }
    
}

let objUsuario = {
    nombre : 'Magali',
    apellido : 'Lopez Barrios',
    mail : 'maguilopezbarrios@hotmail.com',
}

localStorage.setItem ('usuario', JSON.stringify (objUsuario));
console.log (localStorage.getItem ('usuario'));