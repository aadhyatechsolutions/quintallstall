import axiosInstance from "../../utils/axiosInstance";

export const fetchUsers = async () => {
    const { data, status } = await axiosInstance.get('/users');
    if (status !== 200) {
        throw new Error('Failed to fetch users');
    }
    return data.users;
};

export const fetchUserById = async (userId) => {
    if (!userId) {
        throw new Error('User ID is required');
    }
    const { data, status } = await axiosInstance.get(`/users/${userId}`);
    if (status !== 200) {
        throw new Error('Failed to fetch user');
    }
    return data.user;
};

// Fetch users by role, or all users if no role is provided
export const fetchUsersByRoles = async (roles = []) => {
    const query = roles.length > 0 
        ? '?' + roles.map(role => `roles[]=${encodeURIComponent(role)}`).join('&')
        : '';

    const url = `/users${query}`;
    const { data, status } = await axiosInstance.get(url);

    if (status !== 200) {
        throw new Error('Failed to fetch users');
    }

    return data.users;
};

// Create a new user with a specific role
export const createUser = async (userData) => {
    
    const { data, status } = await axiosInstance.post('/users', userData);
    if (status !== 201) {
        throw new Error('Failed to create user');
    }
    return data.user;
};

// Update an existing user's data and role
export const updateUser = async (userId, userData, role) => {
    const { data, status } = await axiosInstance.post(`/users/${userId}`, userData);
    if (status !== 200) {
        throw new Error('Failed to update user');
    }
    return data.user;
};

// Delete a user by their ID
export const deleteUser = async (userId) => {
    const { data, status } = await axiosInstance.delete(`/users/${userId}`);
    if (status !== 200) {
        throw new Error('Failed to delete user');
    }
    return data;
};
