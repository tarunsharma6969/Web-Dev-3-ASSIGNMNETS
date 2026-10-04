const express = require('express');
const requestLogger = require('./middleware/requestLogger');
const studentRouter = require('./routes/studentRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(requestLogger);

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Student Record API is running',
    endpoints: ['/students', '/students/:id']
  });
});

app.use('/students', studentRouter);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ success: false, message: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`Student Record API running at http://localhost:${PORT}`);
});
