document.addEventListener('DOMContentLoaded', () => {
    const champsAValider = document.querySelectorAll('.validation')

    champsAValider.forEach(champ => {
        champ.addEventListener('change', (e) => {
            console.log('changement de valeur')
            validation(e.target)
        })
    })
})

let messagesErreurs = []

const validation = (e) => {
    //en fonction du type de donnée, je vais appeler la fonction de validation correspondante
    messagesErreurs = [] //on efface toutes les erreurs précédentes
    if (e.dataset.required === 'true') {
        console.log('champ obligatoire')
        console.log(e.value.length)
        if (e.value.length === 0) {
            console.log('champ vide')
            e.classList.remove('is-valid')
            e.classList.add('is-invalid')
            messagesErreurs.push('Ce champs est obligatoire. Vous devez saisir une valeur')
        }
    }

    if (e.dataset.type === 'text') {
        validationText(e)
    } else if (e.dataset.type === 'email') {
        validationEmail(e)
    } else if (e.dataset.id === 'numero') {
        validationNuméro(e)
    }

    e.parentNode.querySelector('.invalid-feedback').innerHTML = messagesErreurs.join('<br>')
}

const validationText = (e) => {
    //vérification de la taille min et max
    if (e.value.length < e.dataset.min) {
        e.classList.remove('is-valid')
        e.classList.add('is-invalid')
        //ajout d'un message explicatif
        messagesErreurs.push('Minimum ' + e.dataset.min + ' caractères.')
    } else if (e.value.length > e.dataset.max) {
        e.classList.remove('is-valid')
        e.classList.add('is-invalid')
        messagesErreurs.push('Maximum ' + e.dataset.max + ' caractères.')
    } else {
        e.classList.remove('is-invalid')
        e.classList.add('is-valid')
    }
}

const validationEmail = (e) => {
    const rejex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", 'g');
    //console.log(rejex.test(e.value))
    //vérification de la taille min et max
    if (rejex.test(e.value) === false){
        e.classList.remove('is-valid')
        e.classList.add('is-invalid')
        messagesErreurs.push('Adresse mail invalide.')
    } else {
        e.classList.remove('is-invalid')
        e.classList.add('is-valid')
    }
}
    const validationNuméro = (e) => {
        //vérification de la taille min et max
        if (e.value.length < e.dataset.min) {
            e.classList.remove('is-valid')
            e.classList.add('is-invalid')
            //ajout d'un message explicatif
            messagesErreurs.push('Minimum ' + e.dataset.min + ' chiffres.')
        } else if (e.value.length > e.dataset.max) {
            e.classList.remove('is-valid')
            e.classList.add('is-invalid')
            messagesErreurs.push('Maximum ' + e.dataset.max + ' chiffres.')
        } else {
            e.classList.remove('is-invalid')
            e.classList.add('is-valid')
        }
}

