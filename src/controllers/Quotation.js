const Quotation = require("../models/Quotation");

const addQuotation = async (req, res) => {

    try {
        const quotation = new Quotation(req.body);
        const saved = await quotation.save();
        return res.status(200).json(saved);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getQuotation = async (req, res) => {
    try {
        const quo = await Quotation.findOne({ _id: req.params.id });
        return res.status(200).json(quo);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getQuotations = async (req, res) => {
    try {
        const { inicio, fin, documentNumber, name, lname, estado } = req.body;
        let query = {
            "customer.documentNumber": { $regex: documentNumber || '', $options: 'i' },
            "customer.name": { $regex: name || '', $options: 'i' },
            "customer.lname": { $regex: lname || '', $options: 'i' },
        }
        if (estado) {
            query.estado = estado;
        }
        if (inicio && fin) {
            query.createdAt = {
                $gte: new Date(inicio),
                $lte: new Date(fin),
            };
        }
        let quotations = await Quotation.aggregate([
            [
                {
                    $lookup: {
                        from: 'users',
                        localField: 'customer',
                        foreignField: '_id',
                        as: 'customer'
                    }
                },
                {
                    $unwind: {
                        path: '$customer'
                    }
                },
                {
                    $match: query
                },
                {
                    $sort: { createdAt: -1 }
                }
            ]
        ])
        return res.status(200).json(quotations);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const addReference = async (req, res) => {
    try {
        const quo = await Quotation.findOne({ _id: req.params.id });
        quo.reference = req.body.reference;
        await quo.save();
        return res.status(200).json({ ok: 'Referencia agregada' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });

    }
}
const getDateAndQuantity = async (req, res) => {
    try {
        const quotations = await Quotation.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: { $getField: "createdAt" } },
                        month: { $month: { $getField: "createdAt" } },
                        day: { $dayOfMonth: { $getField: "createdAt" } },
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }
            }
        ])
        res.status(200).json(quotations);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const deleteQuotation = async (req, res) => {
    try {
        const { id } = req.params;
        await Quotation.deleteOne({ _id: id });
        return res.status(200).json({ ok: 'Cotización eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const updateState = async (req, res) => {
    try {
        const quo = await Quotation.findOne({ _id: req.params.id });
        if (!quo) return res.status(400).json({ error: 'No se encontró la cotización' });
        quo.estado = req.body.estado;
        await quo.save();
        return res.status(200).json({ ok: 'Esta actualizado' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = { addQuotation, getQuotations, deleteQuotation, getDateAndQuantity, getQuotation, updateState, addReference }