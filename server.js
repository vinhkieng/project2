require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Kết nối MongoDB
// (Tạm thời để localhost, tí nữa có link Cloud Atlas mình sẽ thay vào sau)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/studentdb';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Đã kết nối MongoDB'))
    .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// --- MODEL ---
const StudentSchema = new mongoose.Schema({
    code: String,
    name: String,
    department: String
});
const Student = mongoose.model('Student', StudentSchema);

// --- ROUTES ---
// 1. Lấy danh sách
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// 2. Thêm mới
app.post('/api/students', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.json(newStudent);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// 3. Xóa
app.delete('/api/students/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({message: 'Deleted'});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// Route trang chủ
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});