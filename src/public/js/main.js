const socket = io();


socket.on("books", (data)=>{
    renderProducts(data)
})

const renderProducts = () =>{
    const contenedorBooks = document.getElementById("contenedorBooks");
    contenedorBooks.innerHTML = "";

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

document.getElementById("btnEnviar").addEventListener("click", ()=>{
    agregarProduct();
})

const agregarProduct = ()=>{
    const product ={
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
        ima: document.getElementById("ima").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        status: document.getElementById("status").value === "true",
    }

    socket.emit("agregarProduct", product);
}