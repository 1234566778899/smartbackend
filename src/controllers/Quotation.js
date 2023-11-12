const Quotation = require("../models/Quotation");

const addQuotation = async (req, res) => {

    try {
        let quotation = new Quotation(req.body);
        await quotation.save();
        return res.status(200).json({ ok: 'Cliente registrado correctamente' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const getQuotations = async (req, res) => {
    try {
        const { inicio, fin, documentNumber, name, lname } = req.body;
        let query = {
            "customer.documentNumber": { $regex: documentNumber || '', $options: 'i' },
            "customer.name": { $regex: name || '', $options: 'i' },
            "customer.lname": { $regex: lname || '', $options: 'i' },
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
module.exports = { addQuotation, getQuotations, deleteQuotation, getDateAndQuantity }