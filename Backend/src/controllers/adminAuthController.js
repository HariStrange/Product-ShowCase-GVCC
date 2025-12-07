const pool = require("../config/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRES_IN = "7d";

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const query = `
        SELECT * FROM admin_users
        WHERE email = $1
        LIMIT 1 
    `;
    const values = [email];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const admin = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: "ADMIN",
      },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRES_IN }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
      admin: {
        id: admin.id,
        email: admin.email,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUserQuery = `SELECT * FROM admin_users WHERE email = $1`;
    const values = [email];
    const user = await pool.query(existingUserQuery, values);

    if (user.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email already taken",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const registerUserQuery = `
      INSERT INTO admin_users(username, email, password)
      VALUES($1, $2, $3)
      RETURNING id, username, email
    `;

    const registerValues = [username, email, hashedpassword];
    const result = await pool.query(registerUserQuery, registerValues);

    return res.status(201).json({
      success: true,
      message: "Admin Registered Successfully",
      admin: result.rows[0],
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
