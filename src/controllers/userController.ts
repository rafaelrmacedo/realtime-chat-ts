import { Request, Response } from 'express';
import { User } from '../models/User';

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({
            error: 'Error to create a user', details: err
        });
    }
};

export const getUsers = async (_: Request, res: Response) => {
    const users = await User.find();

    res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404).json({
            error: 'User not found'
        });

        return;
    }

    res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!user) {
        res.status(404).json({
            error: 'User not found'
        });

        return;
    }

    res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        res.status(404).json({
            error: 'User not found'
        });

        return;
    }

    res.status(204).send();
};
