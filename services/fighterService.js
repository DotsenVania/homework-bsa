import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  addFighterDB(data) {
    fighterRepository.create(data);
  }
  getAllFighter() {
    return fighterRepository.getAll();
  }
  getFighterById(id, res) {
    const dataSearch = fighterRepository.getAll().filter( item => {
      return item.id == id; 
    })

    if(dataSearch[0] == undefined) {
      res.status(404).json({
        error: true,
        message: "No fighter found for this ID"
      })
    } else {
      return fighterRepository.getOne(dataSearch[0]);
    }
  } 
  fighterUpdateById(id, data) {
    return fighterRepository.update(id, data);
  }
  deleteFighterById(id) {
    fighterRepository.delete(id)
  }
}

const fighterService = new FighterService();

export { fighterService };
