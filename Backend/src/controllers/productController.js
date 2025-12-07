const pool = require("../config/database");

exports.getProducts = async (req, res) => {
  try {
    const { search = "", category = "", page = 1, limit = 10 } = req.query;
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    const query = `
    SELECT *, count(*) OVER() AS total_count 
    FROM products
    WHERE ($1 = '' OR name ILIKE '%' || $1 || '%')
    AND ($2 = '' OR category = $2)
    ORDER BY created_At DESC
    LIMIT $3 OFFSET $4
    `;
    
    const values = [search, category, limitNum, offset];
    const result = await pool.query(query, values);

    const totalItems = result.rows.length > 0 ? parseInt(result.rows[0].total_count) : 0;
    const totalPages = Math.ceil(totalItems / limitNum);

    res.status(200).json({
      success: true,
      data: result.rows,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalItems,
        totalPages,
      },
      timestamp: new Date().toLocaleTimeString(),
    });
  } catch (error) {
    console.error("Error fetching products: ", error);
    res.status(500).json({
      success: false,
      error: error.message,
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
