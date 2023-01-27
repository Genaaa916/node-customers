const feedDisplay = document.querySelector("#feed")
const url = "http://localhost:3000/api/customers"


fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data.forEach(customer => {
            feedDisplay.innerHTML += `<h3 class="text-danger border-bottom p-2" > ${customer.firstname} ${customer.lastname} </h3>
            <p> ${customer.email} </p>
            <p> ${customer.phone} </p>
             `
        })
    })