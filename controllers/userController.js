const db = require('../db/db.js');
const nodemailer = require('nodemailer');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.registerUser = (req, res) => {
  const { name, email, phone, password } = req.body;
  const profile_picture = req.file?.filename;

  db.query(
    'INSERT INTO users (name, email, phone, profile_picture, password) VALUES (?, ?, ?, ?, ?)',
    [name, email, phone, profile_picture, password],
    (err, result) => {
      if (err) return res.status(500).send(err);

      const emailHTML = `
        <div style="background-color: #f7f7f7; padding: 40px; font-family: 'Segoe UI', sans-serif; color: #333;">
          <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
            <div style="background-color: #16a34a; padding: 20px 30px;">
              <h2 style="margin: 0; color: #fff;">Welcome to PetCare 🐶</h2>
            </div>
            <div style="padding: 30px;">
              <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>
              <p>Thank you for registering with <strong>PetCare</strong>, your trusted Pet Adoption Welfare Service.</p>
              <p style="margin-top: 20px;">We’re excited to have you on board. You can now explore, adopt, and manage pets via your dashboard.</p>
              <hr style="margin: 30px 0;">
              <p style="font-size: 14px; color: #888;">This is an automated email. Do not reply.</p>
            </div>
          </div>
        </div>
      `;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Registration Successful',
        html: emailHTML
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) return res.status(500).send(error);
        res.status(201).send('User registered and email sent.');
      });
    }
  );
};

exports.getUsers = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;

  db.query('SELECT profile_picture FROM users WHERE id=?', [id], (err, result) => {
    if (err || result.length === 0) return res.status(404).send('User not found');

    const image = result[0].profile_picture;

    db.query('DELETE FROM users WHERE id=?', [id], (err) => {
      if (err) return res.status(500).send(err);
      if (image) fs.unlink(`./uploads/${image}`, () => {});
      res.send('User deleted');
    });
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, password } = req.body;
  const profile_picture = req.file?.filename;

  let query, values;

  if (profile_picture) {
    query = 'UPDATE users SET name=?, password=?, profile_picture=? WHERE id=?';
    values = [name, password, profile_picture, id];
  } else {
    query = 'UPDATE users SET name=?, password=? WHERE id=?';
    values = [name, password, id];
  }

  db.query(query, values, (err) => {
    if (err) return res.status(500).send('Error updating user');
    res.send('User updated successfully');
  });
};

