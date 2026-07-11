import api from "./api";

const userService = {
    getProfile() {
        return api.get("/users/profile");
    },

    updateProfile(data: any) {
        return api.patch("/users/profile", data);
    },

    async getUsers() {
        const response = await api.get("/users");
        return response.data;
    },

    deleteUser(id: string){
        return api.delete(
            `/users/${id}`
        );
    },
};

export default userService;