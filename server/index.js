const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/bugs', require('./routes/bugs'));
// app.get("/api/bugs", (req, res) => {
//   res.json(bugs);
// });

// app.post("/api/bugs", (req, res) => {
//   const bug = { id: Date.now(), resolved: false, ...req.body };
//   bugs.push(bug);

//   res.json(bug);
// });

// app.patch("/api/bugs/:id", (req, res) => {
//   const index = bugs.findIndex(bug => bug.id === parseInt(req.params.id));
//   const bug = bugs[index];
//   if ("resolved" in req.body) bug.resolved = req.body.resolved;
//   if ("userId" in req.body) bug.userId = req.body.userId;

//   res.json(bug);
// });

app.listen(PORT, () => {
  console.log(`Node server started on port ${PORT}.`);
});
