import UserRepository from "../dao/repositories/user.repository.js";
import { createHash, isValidPassword } from "../util/util.js";
import cartRepository from "../repositories/cart.repository.js";



class UserService {
    async registerUser(userData) {
        const existUser = await UserRepository.getUserByEmail(userData.email);
        if (existUser) {
            throw new Error("El usuario ya existe");
        }
        const cart = await cartRepository.createRepo();
        userData.cart = cart._id;

        userData.password = createHash(userData.password);
        return await UserRepository.createUser(userData);
    }

    async loginUser(email) {
        const user = await UserRepository.getUserByEmail(email);
        if (!user || !isValidPassword(user, user.password)) {
            throw new Error("Credenciales incorrectas");
        }

        return user;
    }
}

export default new UserService();