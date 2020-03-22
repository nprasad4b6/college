

const $form = document.querySelector('form')
$form.addEventListener('submit', (e) => {
    e.preventDefault()
    const value = $form.querySelector('input').value
    if (value%2) { // other than zero.. always true
        document.getElementById('number-type').innerHTML = `${value} is Odd`
    } else {
         document.getElementById('number-type').innerHTML = `${value} is Even`
        }
})

// document.getElementById("ItemPreview").src = "data:image/png;base64,e68be19bb47466f3faa263a49ff7b7e6" + yourByteArrayAsBase64;