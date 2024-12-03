const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); 

app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur notre API REST simple!' });
});

const users = [
  { id: 1, firstName: "John", lastName: "Doe", role: "Admin" },
  { id: 2, firstName: "Jane", lastName: "Smith", role: "User" },
];

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  const createdUser = { id: users.length + 1, ...newUser };
  users.push(createdUser);
  res.status(201).json(createdUser);
});

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    users[userIndex] = { id, ...req.body };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser);
  } else {
    res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré : http://localhost:${port}`);
});
