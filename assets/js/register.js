window.addEventListener('load',function(){
    let formulario = document.querySelector('.rounded');   
    formulario.addEventListener('submit',function(evento){
        
        if(!validaciones(evento)){
            evento.preventDefault();
            
        }else{
            formulario.submit();
        }    

        function validaciones(evento){
       
            //Destructuring  
            let {firstName,lastName,cuitCuil,telephone,city,street,number,email,password} = formulario.elements;
            let errores = [];
            console.log(formulario.elements.email);

            
            // Acá validamos que el campo nombre no este vacio
              if(firstName.value == ''){
                errores.push('El campo nombre no puede estar vacio...');
                firstName.classList.add('input-invalid');              
            }
            if(firstName.value.length<2){
                errores.push('El campo nombre no puede tener menos de dos caracteres...');
                firstName.classList.add('input-invalid'); 
            }else{
                firstName.classList.add('input-valid');
                firstName.classList.remove('input-invalid');
            }
            // Acá validamos que el campo apellido no este vacio
            if(lastName.value == ''){
                errores.push('El campo apellido no puede estar vacio...');
                lastName.classList.add('input-invalid');              
            }
            if(lastName.value.length<2){
                errores.push('El campo apellido no puede tener menos de dos caracteres...');
                lastName.classList.add('input-invalid'); 
            }else{
                lastName.classList.add('input-valid');
                lastName.classList.remove('input-invalid');
            }
            // CUIT/CUIL
            if(cuitCuil.value == ''){
                errores.push('El campo CUIT/CUIL no puede estar vacio...');
                cuitCuil.classList.add('input-invalid');              
            }
            if(cuitCuil.value.length=11){
                errores.push('El campo CUIT/CUIL consta de 11 números, sin guiónes');
                cuitCuil.classList.add('input-invalid'); 
            }else{
                cuitCuil.classList.add('input-valid');
                cuitCuil.classList.remove('input-invalid');
            }
            // telephone
            if(telephone.value == ''){
                errores.push('El campo telefono no puede estar vacio...');
                telephone.classList.add('input-invalid');              
            }
            if(telephone.value.length<=10){
                errores.push('El campo telefono debe ser un celular, con código de área (ej. 11) más el número completo sin guiónes');
                telephone.classList.add('input-invalid'); 
            }else{
                telephone.classList.add('input-valid');
                telephone.classList.remove('input-invalid');
            }
            // city
            if(city.value == ''){
                errores.push('El campo ciudad no puede estar vacio...');
                city.classList.add('input-invalid');              
            }
            if(city.value.length<2){
                errores.push('El campo no puede tener menos de dos caracteres...');
                city.classList.add('input-invalid'); 
            }else{
                city.classList.add('input-valid');
                city.classList.remove('input-invalid');
            }
            // street
            if(street.value == ''){
                errores.push('El campo calle no puede estar vacio...');
                street.classList.add('input-invalid');              
            }
            if(street.value.length<2){
                errores.push('El calle no puede tener menos de dos caracteres...');
                street.classList.add('input-invalid'); 
            }else{
                street.classList.add('input-valid');
                street.classList.remove('input-invalid');
            }
            // number
            if(number.value == ''){
                errores.push('El campo altura no puede estar vacio...');
                number.classList.add('input-invalid');              
            }
            if(number.value.length<=1){
                errores.push('El campo altura no puede tener menos de un caracter...');
                number.classList.add('input-invalid'); 
            }else{
                number.classList.add('input-valid');
                number.classList.remove('input-invalid');
            }

             //Esta expresión regular valida como Mínimo ocho caracteres, al menos una letra y un número:
            let rePassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
            if(!rePassword.test(password.value)){errores.push('La contraseña como mínimo debe tener ocho caracteres, al menos una letra y un número');
               password.classList.add('input-invalid');   

            }else{
               password.classList.add('input-valid');
              password.classList.remove('input-invalid');          
            }



            fetch("/apiUsersMsList")
                .then(function(respuesta){
                return respuesta.json();
                })
                .then(function(dataUsuario){

                    // Acá validamos el email a través  de expreciones regulares
                    let usersEmail = dataUsuario.data
                    let reEmail  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                
                    if(!reEmail.test(email.value)){
                       errores.push('El email es inválido...');          
                       email.classList.add('input-invalid');  
                       email.classList.remove('input-valid');                 
                    }// validacion para que no este repetido el email         
                    else if( usersEmail.find(userEmail =>userEmail == email.value)){
                        errores.push('El email ya esta en uso...');          
                        email.classList.add('input-invalid'); 
                    }else{
                        email.classList.add('input-valid');
                        email.classList.remove('input-invalid');
                    }
                    //Aquí enviamos los errores al usuario
                    let ulErrores = document.getElementById('errores');
                    ulErrores.classList.add('alert')
                    if(errores.length > 0){
                        ulErrores.innerHTML = "";
                        for (let i = 0 ; i < errores.length; i++){
                            ulErrores.innerHTML += `<li> ${errores[i]} </li> `
                        }
                        return false;
                    }else{
                        return formulario.submit();
                    } 
                })  
                .catch(err => console.error(err))
            }
        
    })
})