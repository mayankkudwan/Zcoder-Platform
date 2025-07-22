// import { Server } from "socket.io";

// const io = new Server(9000, { // first is port, second is an object
//     cors: {
//         origin: 'http://localhost:3000'
//     }
// });

// let users = [];

// const addUser = (userData, socketId) => {
//     if (!users.some(user => user.sub === userData.sub)) {
//         users.push({ ...userData, socketId });
//     }
// };

// const getUser = (userId) => {
//     return users.find(user => user.sub === userId);
// };

// io.on('connection', (socket) => {
//     console.log('socket user connected');

//     socket.on("addUsers", userData => {
//         addUser(userData, socket.id);
//         io.emit("getUsers", users);
//     });

//     socket.on("sendMessage", (data) => {
//         const user = getUser(data.receieverId);
//         if (user) {
//             io.to(user.socketId).emit('getMessage', data);
//         } else {
//             console.log(`User not found for receiverId: ${data.receieverId}`);
//         }
//     });

//     socket.on("sendCommunityMessage", (data) => {
//         io.emit('getCommunityMessage', data);
//     });

//     socket.on('disconnect', () => {
//         users = users.filter(user => user.socketId !== socket.id);
//         io.emit("getUsers", users);
//         console.log(`User disconnected: ${socket.id}`);
//     });
// });

// console.log("Server is running on port 9000");


import { Server } from "socket.io";

const io = new Server(9000, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

let users = [];

const addUser = (userData, socketId) => {
    // Remove existing user if already exists (prevent duplicates)
    users = users.filter(user => user.sub !== userData.sub);
    users.push({ ...userData, socketId });
    console.log(`User added: ${userData.sub}, Socket: ${socketId}`);
    console.log('Current users:', users.map(u => ({ sub: u.sub, socketId: u.socketId })));
};

const getUser = (userId) => {
    const user = users.find(user => user.sub === userId);
    console.log(`Looking for user ${userId}, found:`, user ? user.socketId : 'Not found');
    return user;
};

const removeUser = (socketId) => {
    const userIndex = users.findIndex(user => user.socketId === socketId);
    if (userIndex !== -1) {
        const removedUser = users[userIndex];
        users.splice(userIndex, 1);
        console.log(`User removed: ${removedUser.sub}`);
        return removedUser;
    }
};

io.on('connection', (socket) => {
    console.log(`Socket user connected: ${socket.id}`);

    socket.on("addUsers", userData => {
        addUser(userData, socket.id);
        io.emit("getUsers", users);
    });

    socket.on("sendMessage", (data) => {
        console.log('Message data received:', data);
        
        // Fix the typo: receiverId instead of receieverId
        const receiverId = data.receiverId || data.receieverId; // Support both for backward compatibility
        const user = getUser(receiverId);
        
        if (user) {
            console.log(`Sending message to user ${receiverId} at socket ${user.socketId}`);
            io.to(user.socketId).emit('getMessage', data);
            
            // Also send to sender for confirmation (optional)
            socket.emit('messageSent', { ...data, status: 'delivered' });
        } else {
            console.log(`User not found for receiverId: ${receiverId}`);
            console.log('Available users:', users.map(u => u.sub));
            
            // Send error back to sender
            socket.emit('messageError', { 
                error: 'Recipient not found', 
                receiverId: receiverId 
            });
        }
    });

    socket.on("sendCommunityMessage", (data) => {
        console.log('Broadcasting community message:', data);
        io.emit('getCommunityMessage', data);
    });

    socket.on('disconnect', () => {
        const removedUser = removeUser(socket.id);
        io.emit("getUsers", users);
        console.log(`User disconnected: ${socket.id}`);
    });
});

console.log("Server is running on port 9000");