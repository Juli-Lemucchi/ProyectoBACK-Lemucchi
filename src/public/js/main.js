const socket = io();


socket.on("books", (data)=>{
    renderProducts(data)
})

const renderProducts = () =>{
    const contenedorBooks = document.getElementById("contenedorBooks");

    data.forEach(item=>{
       const card = document.createElement("div");
       
       card.innerHTML = `<p>${item.title}</p>
       <p>${item.price}</p>
       <p>${item.description}</p>
       <p>${item.category}</p>
       <p>${item.ima}</p>
       <p>${item.stock}</p>
       <p>${item.id}</p>
       <button>Eliminar</button>
       `
       contenedorBooks.appendChild(card);

       card.querySelector("button").addEventListener("click", ()=>{
            eliminarProducts(item.id);
        })
    })
}

const eliminarProducts = (id)=>{
    socket.emit("eliminarProduct", id);
}