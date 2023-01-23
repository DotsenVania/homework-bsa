import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user
  addUserDB(data) {
    userRepository.create(data);
  }
  getAllUsers() {
    return userRepository.getAll()
  }
  getUserById(id, res) {
    const dataSearch = userRepository.getAll().filter(item => {
      return item.id == id
    })
    if(dataSearch[0] == undefined) {
      res.status(404).json({
        error: true,
        message: "No user found for this ID"
      })
    }else {
      return userRepository.getOne(dataSearch[0]);
    }
  } 
  updateUserById(id, data) {
    return userRepository.update(id, data); 
  }
  deleteUserById(id) {
    userRepository.delete(id); 
  }
  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
