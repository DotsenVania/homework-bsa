import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();
router.post('/', createFighterValid, (req, res) => {
  console.log({...req.body, healt: 100})
  fighterService.addFighterDB({...req.body, health: 100})
})

router.get('/', (req, res) => {
  res.send(fighterService.getAllFighter())
})

router.get('/:id', (req, res) => {
  const fighter = fighterService.getFighterById(req.params.id, res); 
  res.send(fighter).status(200).json({
    error: false, 
    message: 'Good'
  })
})

router.put('/:id',updateFighterValid, (req, res) => {
  const id = req.params.id; 
  const data = req.body;
  res.send(fighterService.fighterUpdateById(id, data)); 
})

router.delete('/:id', (req, res) => {
  const id = req.params.id; 
  res.send(fighterService.deleteFighterById(id)).status(200).json({
    error: false, 
    message: 'deleted'
  });
}, responseMiddleware)
// TODO: Implement route controllers for fighter

export { router };
