import express from 'express';
import { addShelterSpace, deleteShelterSpace, getAllShelterSpace, getShelterSpaceById, updateShelterSpace } from '../controllers/shelterSpaceController.mjs';

const router = express.Router();

router.post('/', addShelterSpace);
router.get('/all-shelters/:id', getAllShelterSpace);
router.get('/:id', getShelterSpaceById);
router.put('/:id', updateShelterSpace);
router.delete('/:id', deleteShelterSpace);
// router.get('/get', getSheltersListAgainstId);

export default router;
