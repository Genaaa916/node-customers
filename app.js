const feedDisplay = document.querySelector("#feed")

fetch("http://localhost:3000/api/customers")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data.forEach(customer => {
            feedDisplay.innerHTML += `<h3> ${customer.firstname} ${customer.lastname} </h3> `
        })
    })