const pool = require("../config/database");

exports.getEnquiries = async (req, res) => {
  try {
    const query = `
    SELECt e.*, p.name AS product_name
    FROM enquiries e
    LEFT JOIN products p ON e.product_id = p.id
    ORDER By e.created_At DESC
    `;

    const result = await pool.query(query);
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toLocaleTimeString(),
    });
  }
};

exports.createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message, product_id } = req.body;

    if (!name || !email || !phone || !message || !product_id) {
      res.status(400).json({
        success: false,
        error: "All fields are required",
        timestamp: new Date().toLocaleTimeString(),
      });
    }
    const query = `
        INSERT INTO enquiries (name,email,phone,message,product_id)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *
        `;

    const values = [name, email, phone, message, product_id];
    const result = await pool.query(query, values);

    res.status(200).json({
      success: true,
      data: result.rows[0],
      timestamp: new Date().toLocaleTimeString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toLocaleTimeString(),
    });
  }
};
