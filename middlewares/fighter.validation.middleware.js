import { FIGHTER } from "../models/fighter.js";
import { fighterRepository } from "../repositories/fighterRepository.js";

const createFighterValid = (req, res, next) => {
  const { name, power, defense, health } = req.body; 

  const data = req.body;

  const resultVerification = Object.keys(data).map(item => {
    return item in FIGHTER
  }).includes(false); 
  
  function CheckingOnKey(key) {
    return Object.keys(data).includes(key)
  }

  if(!resultVerification){

    if (name, power, defense) {

      const searchName = fighterRepository.getAll().filter(item => item.name == name);
  
      if(searchName.length !== 0) {
        res.status(404).json({
          error: true,
          message: "Such a character already exists"
        })
      }
  
      if(power > 100) {
        res.status(404).json({
          error: true,
          message: "Power should be in the range from 1 to 100"
        })
      }
      if(power < 1) {
        res.status(404).json({
          error: true,
          message: "Power should be in the range from 1 to 100"
        })
      }

      if(defense > 10) {
        res.status(404).json({
          error: true,
          message: "Defense should be in the range from 1 to 10"
        })
      }

      if(defense < 1) {
        res.status(404).json({
          error: true,
          message: "Defense should be in the range from 1 to 10"
        })
      }

      if(CheckingOnKey("health")){
        if(health > 120) {
          res.status(404).json({
            error: true,
            message: "Health should be in the range from 80 to 120"
          })
        }
    
        if(health < 80) {
          res.status(404).json({
            error: true,
            message: "Health should be in the range from 80 to 120"
          })
        }
      }

      res.send(req.body)

    }else {
      res.status(404).json({
        error: true,
        message: "Fighter entity to create isn't valid"
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

const updateFighterValid = (req, res, next) => {
  const data = req.body;

  const { name, power, defense, health } = data; 

  const searchName = fighterRepository.getAll().filter(item => item.name == name);

  function CheckingOnKey(key) {
    return Object.keys(data).includes(key)
  }

  const resultVerification = Object.keys(data).map(item => {
    return item in FIGHTER
  }).includes(false); 

  if(CheckingOnKey("name")) {
    if(searchName.length !== 0) {
      res.status(404).json({
        error: true,
        message: "Such a character already exists"
      })
    }
  }

  if(CheckingOnKey("power")) {
    if(power > 100) {
      res.status(404).json({
        error: true,
        message: "Power should be in the range from 1 to 100"
      })
    }

    if(power < 1) {
      res.status(404).json({
        error: true,
        message: "Power should be in the range from 1 to 100"
      })
    }
  }

  if(CheckingOnKey("defense")) {
    if(defense > 10) {
        res.status(404).json({
          error: true,
          message: "Defense should be in the range from 1 to 10"
        })
      }

      if(defense < 1) {
        res.status(404).json({
          error: true,
          message: "Defense should be in the range from 1 to 10"
        })
      }
  }

  if(CheckingOnKey("health")){
    if(health > 120) {
      res.status(404).json({
        error: true,
        message: "Health should be in the range from 80 to 120"
      })
    }

    if(health < 80) {
      res.status(404).json({
        error: true,
        message: "Health should be in the range from 80 to 120"
      })
    }
  }

  if(resultVerification) {
    res.status(404).json({
      error: true,
      message: "Redundant values"
    })
  }

  next();
};

export { createFighterValid, updateFighterValid };
