import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user
router.post('/', createUserValid, function(req, res) {
  userService.addUserDB(req.body);
})
router.get('/', (req, res) => {
  const allUsers = userService.getAllUsers(); 
  res.send(allUsers)
})
router.get('/:id', (req, res) => {
  const user = userService.getUserById(req.params.id, res);
  res.send(user).status(200).json({
    error: false, 
    message: 'Good'
  })
})
router.put('/:id', updateUserValid, (req, res) => {
  const id = req.params.id; 
  const data = req.body;
  res.send(userService.updateUserById(id, data))
}) 
router.delete('/:id', (req, res) => {
  const id = req.params.id; 
  res.send(userService.deleteUserById(id)).status(200).json({
    error: false, 
    message: 'deleted'
  });
}, responseMiddleware)


export { router };
