

const $form = document.querySelector('form')
$form.addEventListener('submit', (e) => {
    e.preventDefault()
    const value = $form.querySelector('input').value
    if (value%2) {
        document.getElementById('number-type').innerHTML = `${value} is Odd`
    } else {
         document.getElementById('number-type').innerHTML = `${value} is Odd`
        }
})