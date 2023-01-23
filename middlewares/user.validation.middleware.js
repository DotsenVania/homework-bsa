import { USER } from "../models/user.js";
import { userRepository } from "../repositories/userRepository.js";
import { responseMiddleware } from "./response.middleware.js";
const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation

  let {firstName, lastName, email, phoneNumber, password} = req.body;
  const data = req.body;

  const resultVerification = Object.keys(data).map(item => {
    return item in USER
  }).includes(false); 

  if(!resultVerification) {
    if(firstName && lastName && email && phoneNumber && password) {
      const gmailRegexp = /[\w\d\.]@gmail\.com/iu;
      const phoneRegexp = /^[\+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/;
   
      const searchFirstName = userRepository.getAll().filter(item => item.firstName == firstName);
      const searchPhoneNumber = userRepository.getAll().filter(item => item.phoneNumber == phoneNumber);
      const searchEmail = userRepository.getAll().filter(item => item.email == email);
  
      
      if(searchFirstName.length !== 0) {
        res.status(404).json({
          error: true,
          message: "Such user already exists"
        })
      }
      if(searchPhoneNumber.length !== 0) {
        res.status(404).json({
          error: true,
          message: "Such tel already exists"
        })
      }
      if(!gmailRegexp.test(email)) {
        res.status(404).json({
          error: true,
          message: "Only Gmail is valid"
        })
      }else if(searchEmail.length !== 0) {
        res.status(404).json({
          error: true,
          message: "Such email already exists"
        })
      
      }else if(password.length < 3) {
        res.status(404).json({
          error: true,
          message: "Password must be longer than three characters"
        })
      }else if (!phoneRegexp.test(phoneNumber)) {
        res.status(404).json({
          error: true,
          message: "The phone number must start with +380"
        })
      }
      res.send(req.body)
    }else {
      res.status(404).json({
        error: true,
        message: "User entity to create isn't valid"
      })
      throw res.err = new Error("error") 
    }
  }else {
    res.status(404).json({
      error: true,
      message: "Redundant values"
    })
    throw res.err = new Error("error") 
  }
    
    
    
    
  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  
  let {firstName, email, phoneNumber, password} = req.body;

  const data = req.body;
  const reqDataLength = Object.keys(req.body).length;

  const resultVerification = Object.keys(data).map(item => {
    return item in USER
  }).includes(false); 

  function CheckingOnKey(key) {
    return Object.keys(data).includes(key)
  }

  if(!resultVerification) {
      const gmailRegexp = /[\w\d\.]@gmail\.com/iu;
      const phoneRegexp = /^[\+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/;
   
      const searchFirstName = userRepository.getAll().filter(item => item.firstName == firstName);
      const searchPhoneNumber = userRepository.getAll().filter(item => item.phoneNumber == phoneNumber);
      const searchEmail = userRepository.getAll().filter(item => item.email == email);
  
      if(CheckingOnKey("phoneNumber")) {
        if(searchPhoneNumber.length !== 0) {
          res.status(404).json({
            error: true,
            message: "Such tel already exists"
          })
        }else if (!phoneRegexp.test(phoneNumber)) {
              res.status(404).json({
                error: true,
                message: "The phone number must start with +380"
              })
            }
      }

      if(CheckingOnKey("email")) {
        if(!gmailRegexp.test(email)) {
              res.status(404).json({
                error: true,
                message: "Only Gmail is valid"
              })
            }else if(searchEmail.length !== 0) {
              res.status(404).json({
                error: true,
                message: "Such email already exists"
              })
            }
      }

      if(CheckingOnKey("password")) {
        if(password.length < 3) {
          res.status(404).json({
            error: true,
            message: "Password must be longer than three characters"
          })
        }
      }

      if(CheckingOnKey("firstName")) {
        if(searchFirstName.length !== 0) {
          res.status(404).json({
            error: true,
            message: "Such user already exists"
          })
        }
      }

        res.send(req.body)
      
  }else {
    res.status(404).json({
      error: true,
      message: "Redundant values"
    })
    throw res.err = new Error("error") 
  }
  
if(reqDataLength === 0){
    res.status(404).json({
      error: true,
      message: "There are no values"
    })
    throw res.err = new Error("error") 
  }
  next();
};

export { createUserValid, updateUserValid };
