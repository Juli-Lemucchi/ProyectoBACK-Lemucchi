import UserModel from "./model/user.model";

class UserDao {
    async findeById(id) {
        return await UserModel.findById(id);
    }
    async findOne(query){
        return await UserModel.findOne(query);
    }
    async save(UserData){
        const user = new UserModel(UserData);
        return await user.save();
    }
}

export default new UserDao();