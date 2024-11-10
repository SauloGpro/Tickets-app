import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    role: { type: String, enum: ["user", "admin"], default: "user" }
}, {
    toJSON: {
        transform: function(doc, ret) {
            delete ret.__v;  // Elimina la versión y ID al convertir a JSON
            delete ret.id;
            delete ret.password;  // Elimina la contraseña para mayor seguridad
        },
        virtuals: true,
    },
});

// Hashea la contraseña antes de guardar en la base de datos
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();  // Solo hashea si la contraseña fue modificada

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);  // Aplica hash a la contraseña
});

userSchema.index({ id: 1, email: 1 });  // Índice para optimizar búsqueda por ID y email

const User = mongoose.model("User", userSchema);

export default User;
