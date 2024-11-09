import express from 'express';
import {
    createHousingRequirement,
    getAllHousingRequirements,
    getHousingRequirementById,
    updateHousingRequirement,
    deleteHousingRequirement
} from '../controllers/housingRequirementController.mjs';

const router = express.Router();

router.post('/', createHousingRequirement);
router.get('/', getAllHousingRequirements);
router.get('/:id', getHousingRequirementById);
router.put('/:id', updateHousingRequirement);
router.delete('/:id', deleteHousingRequirement);

export default router;
