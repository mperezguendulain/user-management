import { Request, Response } from 'express';
import * as authService from "../services/authService";

// Utils
import { getError } from '../utils/errorUtil';

// Validators
import { LoginSchema } from '../utils/validators/authValidator';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const validatedData = LoginSchema.parse({ email, password });

    const token = await authService.loginService(validatedData.email, validatedData.password);

    res.json({ success: true, token });
  } catch (err) {
    res.status(400).json(getError(err));
  }
};
