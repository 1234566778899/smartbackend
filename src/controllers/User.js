const User = require("../models/User");

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let userFounded = await User.findOne({ $or: [{ username }, { email }] });
        if (userFounded) return res.status(400).json({ error: 'Usuario ya existe' })
        if (password.length < 4) return res.status(400).json({ error: 'La contraseña minimo 4 caracteres' });
        let user = new User(req.body);
        const userCreated = await user.save();
        return res.status(200).json({ ok: 'Su cuenta sido registrado correctamente' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const login = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const userFounded = await User.findOne({ $or: [{ username }, { email }] });
        if (!userFounded) return res.status(400).json({ error: 'Usuario no encontrado' });
        if (!userFounded.active) return res.status(400).json({ error: 'El usuario no esta activo' });
        if (password == userFounded.password) return res.status(200).json({ id: userFounded._id });
        return res.status(400).json({ error: 'Contraseña incorrecta' });
    } catch (error) {
        console.log(error);
    }
}

const addCustomer = async (req, res) => {
    try {
        const { documentNumber } = req.body;

        const userFounded = await User.findOne({ documentNumber });
        if (userFounded) return res.status(400).json({ error: 'Cliente ya existe' });
        const user = new User(req.body);
        await user.save();
        return res.status(200).json({ ok: 'Cliente registrado correctamente' });
    } catch (error) {
        console.log(error);
    }
}
const getCustomers = async (req, res) => {
    try {
        const users = await User.find({ name: { $exists: true } }).sort({ createdAt: -1 });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        await User.deleteOne({ _id: id });
        return res.status(200).json({ ok: 'Usuario eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const updateCustomer = async (req, res) => {
    try {
        const { documentNumber, documentType, address, email, telephone, name, lname } = req.body;
        const { id } = req.params;
        const userFounded = await User.findOne({ _id: id });
        if (!userFounded) return res.status(400).json({ error: 'Usuario no econtrado' });
        await User.findOneAndUpdate({ _id: id }, { documentNumber, documentType, address, email, telephone, name, lname });
        return res.status(200).json({ ok: 'Usuario actualizado correctamente' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        if (!user) return res.status(400).json({ error: 'No existe el usuario' });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = {
    register,
    login,
    addCustomer,
    getCustomers,
    deleteCustomer,
    updateCustomer,
    getUser
}