const pool = require("../config/database");

exports.getProducts = async (req, res) => {
  try {
    const { search = "", category = "", page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const query = `
    SELECT *
    FROM products
    WHERE ($1 = '' OR name ILIKE '%' || $1 || '%')
    AND ($2 = '' OR category = $2)
    ORDER BY created_At DESC
    LIMIT $3 OFFSET $4
    `;
    const values = [search, category, limit, offset];
    const result = await pool.query(query, values);

    res.status(200).json({
      success: true,
      page: Number(page),
      limit: Number(limit),
      data: result.rows,
      timestamp: new Date().toLocaleTimeString(),
    });
  } catch (error) {
    console.error("Error fetching products: ", error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toLocaleTimeString(),
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
    SELECT * FROM products
    WHERE id = $1`;
    const values = [id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
        return res.status(404).json({
            success:false,
            message:"Product Not Found",
            timestamp: new Date().toLocaleTimeString(),
        })
    }else{
        res.status(200).json({
            success:true,
            data: result.rows[0],
            timestamp: new Date().toLocaleTimeString(),
        })
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toLocaleTimeString(),
    });
  }
};
