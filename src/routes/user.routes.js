/*import { Router, response } from "express";

const user = [
    {
        id: 1,
        name: "Luis",
        lastName: "Perez",
        email:"LuisPerez@mail.com",
        password: "12345"
    },
    {
        id: 2,
        name: "Juan",
        lastName: "Perez",
        email:"juanPerez@mail.com",
        password: "123456"
    },
    {
        id: 3,
        name: "Pedro",
        lastName: "Perez",
        email:"PedroPerez@mail.com",
        password: "1234567"
    },
    {
        id: 4,
        name: "Maria",
        lastName: "Perez",
        email:"MariaPerez@mail.com",
        password: "12345678"
    },
    {
        id: 5,
        name: "Luisa",
        lastName: "Perez",
        email:"LuisaPerez@mail.com",
        password: "123456789"
    }
]

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "ok",user});
});


router.post("/user" , (req, res) => { 
    console.log(req.body)
    const name= req.body.name
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password
    if (!name || !lastName || !email || !password) {
        res.status(400).json({ error: "Faltan datos del usuario" });      
        return  
    }

    let id = user[user.length - 1].id + 1
    user.push({name, lastName, email, password, id})

    res.status(201).json({ id });
})


router.put("/user/:id" , (req, res) => {
    const id = parseInt(req.params.id);
    const {name, lastName} = req.body;

    const userFound = user.find(u => u.id === id)

    if(userFound){
        const index = user.findIndex(u => u.id === id);

        user[index] = {...user[index], name, lastName}
        res.json({ message: "Usuario actualizado", response:user[index] });
        }else{
        res.status(404).json({ error: "Usuario no encontrado" });
    }
})


router.delete("/user/:id" , (req, res) => {
    const id = parseInt(req.params.id);

    const userFound = user.find(u => u.id === id)

    if(userFound){
        const index = user.findIndex(u => u.id === id);
        user.splice(index, 1);
        res.send({ error: "Usuario eliminado" + id});
        
    }else{
        res.status(404).json({ error: "Usuario no encontrado" });
    }
})




router.get("*" , (req, res) => {
    res.send({ message: "NO SE DE QUE ME ESTA HABLANDO HERMANO" });
});


export default router*/