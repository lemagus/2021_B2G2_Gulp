const inputName = document.querySelector('#formName input[name=firstname]');
inputName.addEventListener('keyup', function(){
    const value = inputName.value;
    if(value.match(/[0-9]+/)){
        inputName.classList.add("error"); 
    }
});