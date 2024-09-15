import bcrypt from "bcrypt";

const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const calcuTotal = (books) => { 
    let total = 0;
    books.forEach(item => {
        total += item.book.price * item.quantity;
    });
    return total;
    };

export { createHash, isValidPassword, calcuTotal}