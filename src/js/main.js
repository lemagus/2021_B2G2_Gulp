
function disBonjour() {

    const form = document.getElementById('formName')
    form.addEventListener('submit', function(e){
        e.preventDefault()

        const inputName = document.querySelector('#formName input[name=firstname]')
        alert("Voici mon nom " + inputName.value)
    });
}

disBonjour();