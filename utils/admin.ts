export const loginAdmin = (loginInfo) => {
    return {
        token: Math.random().toString(36).replace(/[^a-z]+/g, ''),
        user: {
            name: 'System Admin'
        },
        role: 'Admin'
    }
}