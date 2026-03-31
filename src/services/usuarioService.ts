import { api } from "../api/api";

export const usuarioService = {

    login: async (email: string, senha: string) => {
        const response = await api.post("/usuarios/login", {
            email,
            senha
        });
        return response.data;
    }

};