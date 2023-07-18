import { Router } from "express";
import { check } from "express-validator";
import {
  createUser,
  deleteUser,
  getUsers,
  getUserById,
  updateUser,
  logIn,
} from "../controllers/users.controller.js";
import { validateFields } from "../validators/validateFields.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);

router.post("/register", 
//Middlewares
[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'El password debe tener como minimo 6 caracteres').isLength({min: 6}),
    validateFields
],
createUser);

router.post("/auth", logIn);
router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

//Utilizando put se actualiza todo, patch solo una parte del registro
router.patch("/:id", updateUser);

export default router;
