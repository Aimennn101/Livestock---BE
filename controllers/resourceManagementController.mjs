import ResourceManagment from '../models/resourceManagementModel.mjs';

export const addResource = async (req, res) => {
    try {
        const resource = new ResourceManagment(req.body);
        await resource.save();
        res.status(201).json(resource);
    } catch (error) {
        console.log(error.message, "error")
        res.status(400).json({ error: error.message });
    }
};

export const getAllResources = async (req, res) => {
    try {
        const resource = await ResourceManagment.find({}).populate("land_id").populate({
            path: 'feed_id',
            populate: {
              path: 'livestock_id',
            }
          });
        res.status(201).json(resource);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const getResourceById = async (req, res) => {
    console.log(req.params.id,"req.params.idreq.params.idreq.params.id")
    try {
        const resource = await ResourceManagment.findById(req.params.id).populate('land_id').populate({
            path: 'feed_id',
            populate: {
              path: 'livestock_id',
            }
          });
        if (!resource) {
            return res.status(404).json({ message: 'resource not found' });
        }
        res.status(200).json(resource);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateResource = async (req, res) => {
    try {
        const resourceManagment = await ResourceManagment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!resourceManagment) {
            return res.status(404).json({ message: 'resourceManagment not found' });
        }
        res.status(200).json(resourceManagment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteResource = async (req, res) => {
    try {
        const resource = await ResourceManagment.findByIdAndDelete(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found', deleted: 0 });
        }
        res.status(200).json({ message: 'Resource deleted', deleted: 1 });
    } catch (error) {
        res.status(400).json({ error: error.message, deleted: 0 });
    }
};

// export const getAllPurchases = async (req, res) => {
//     try {
//         const purchases = await Purchase.find().populate('livestock_id buyer_id');
//         res.status(200).json(purchases);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// export const getPurchaseById = async (req, res) => {
//     try {
//         const purchase = await Purchase.findById(req.params.id).populate('livestock_id buyer_id');
//         if (!purchase) {
//             return res.status(404).json({ message: 'Purchase not found' });
//         }
//         res.status(200).json(purchase);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// export const updatePurchase = async (req, res) => {
//     try {
//         const purchase = await Purchase.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!purchase) {
//             return res.status(404).json({ message: 'Purchase not found' });
//         }
//         res.status(200).json(purchase);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// export const deletePurchase = async (req, res) => {
//     try {
//         const purchase = await Purchase.findByIdAndDelete(req.params.id);
//         if (!purchase) {
//             return res.status(404).json({ message: 'Purchase not found' });
//         }
//         res.status(200).json({ message: 'Purchase deleted' });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

