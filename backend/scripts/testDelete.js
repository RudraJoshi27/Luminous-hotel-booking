const axios = require('axios');

const testDelete = async () => {
    try {
        // 1. Login as Admin
        const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
            username: 'superadmin',
            password: 'admin123'
        });
        const token = loginRes.data.token;
        console.log("Logged in as admin. Token received.");

        // 2. Fetch Users to find a target
        const usersRes = await axios.get('http://localhost:5000/api/users', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const target = usersRes.data.find(u => u.username !== 'superadmin');
        
        if (!target) {
            console.log("No test user found to delete. Please register one.");
            return;
        }
        console.log(`Attempting to delete user: ${target.username} (${target._id})`);

        // 3. Attempt Delete
        const deleteRes = await axios.delete(`http://localhost:5000/api/users/${target._id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Delete Response:", deleteRes.status, deleteRes.data);

    } catch (err) {
        console.error("Error:", err.response?.status, err.response?.data || err.message);
    }
};

testDelete();
