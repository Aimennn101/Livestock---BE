import HousingRequirement from '../models/housingRequirementModel.mjs'; 

export const createHousingRequirement = async (req, res) => {
    try {
        const { livestock_type, space_required, shelter_type, temperature_range, ventilation } = req.body;

        const newRequirement = new HousingRequirement({
            livestock_type,
            space_required,
            shelter_type,
            temperature_range,
            ventilation
        });

        await newRequirement.save();
        res.status(201).json(newRequirement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllHousingRequirements = async (req, res) => {
    try {
        const requirements = await HousingRequirement.find();
        res.json(requirements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getHousingRequirementById = async (req, res) => {
    try {
        const requirement = await HousingRequirement.findById(req.params.id);

        if (!requirement) {
            return res.status(404).json({ message: 'Housing requirement not found' });
        }

        res.json(requirement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateHousingRequirement = async (req, res) => {
    try {
        const { livestock_type, space_required, shelter_type, temperature_range, ventilation } = req.body;

        const requirement = await HousingRequirement.findById(req.params.id);

        if (!requirement) {
            return res.status(404).json({ message: 'Housing requirement not found' });
        }

        requirement.livestock_type = livestock_type;
        requirement.space_required = space_required;
        requirement.shelter_type = shelter_type;
        requirement.temperature_range = temperature_range;
        requirement.ventilation = ventilation;

        await requirement.save();
        res.json(requirement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteHousingRequirement = async (req, res) => {
    try {
        const requirement = await HousingRequirement.findById(req.params.id);

        if (!requirement) {
            return res.status(404).json({ message: 'Housing requirement not found' });
        }

        await requirement.remove();
        res.json({ message: 'Housing requirement deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
