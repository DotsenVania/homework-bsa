import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { userRepository } from "../repositories/userRepository.js";

const router = Router();

router.post(
  "/login",
  (req, res, next) => {
    try {
      // TODO: Implement login action (get the user if it exist with entered credentials)
      // console.log(res.data)
      const {email, password} = req.body;
      console.log(req.body)
      if(email && password) {
        const searchFirstNameAndPassword = userRepository.getAll().filter(item => item.email == email && item.password == password);
        if(searchFirstNameAndPassword.length == 0) {
          res.status(404).json({
            error: true,
            message: "No such user exists"
          })
        } else {
          authService.login(searchFirstNameAndPassword[0]);
          res.send(authService.login(searchFirstNameAndPassword[0]));
        }
        // authService.login(searchFirstNameAndPassword[0]);
        // res.send(authService.login(searchFirstNameAndPassword[0]));
        // res.data = data;
      }else {
        res.status(404).json({
          error: true,
          message: "No such user exists"
        })
        throw Error("User not found");
      }
      
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
