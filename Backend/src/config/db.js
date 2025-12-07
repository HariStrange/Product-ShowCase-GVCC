const pool = require("./database");

const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(`
        CREATE TABLE IF NOT EXISTS products(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        category TEXT,
        short_desc TEXT,
        detailed_desc TEXT,
        image_url TEXT NOT NULL,
        price DECIMAL(10,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `);

    const checkResults = await client.query("SELECT COUNT(*) FROM products");
    const count = parseInt(checkResults.rows[0].count, 10);

    if (count === 0) {
      console.log("Seeding initial product data...");
      await client.query(`
              INSERT INTO products (name, category, short_desc, detailed_desc, image_url, price)
              VALUES
                  ('Classic Mechanical Keyboard', 'Electronics', 'A durable keyboard with satisfying tactile feedback.', 'Features Cherry MX Brown switches, full RGB backlighting, and a sturdy aluminum build. Perfect for both gaming and professional work.', 'https://res.cloudinary.com/dtt19zar3/image/upload/v1765098713/YUNZII_Coffee_Cat_Dye_Sub_PBT_Keycaps_152_Full_Keys_Dye_Sublimation_PBT_Custom_Keycaps_with_Key_m97x3o.jpg', 129.99),
                  ('Ergonomic Office Chair', 'Furniture', 'High-back chair with excellent lumbar support.', 'Fully adjustable height, tilt, and armrests. Constructed with breathable mesh to keep you cool during long working hours.', 'https://res.cloudinary.com/dtt19zar3/image/upload/v1765098713/Chaise_de_bureau_abel_-_noire_kyjpbj.jpg', 249.50),
                  ('Noise-Cancelling Headphones', 'Electronics', 'Immerse yourself in pure sound, distraction-free.', 'Industry-leading noise cancellation, up to 30 hours of battery life, and crystal-clear call quality. Comes with a compact carrying case.', 'https://res.cloudinary.com/dtt19zar3/image/upload/v1765098730/Best_Cafes_in_Tokyo___Softer_Volumes_cbspdb.jpg', 349.00),
                  ('Organic Coffee Beans - Ethiopian Yirgacheffe', 'Food & Beverage', 'A medium roast with floral and citrus notes.', '100% Arabica, single-origin beans, ethically sourced from the Yirgacheffe region. Perfect for pour-over or espresso.', 'https://res.cloudinary.com/dtt19zar3/image/upload/v1765098730/Washed_Process_Yirgacheffe_nhqota.jpg', 18.75),
                  ('Stainless Steel Water Bottle', 'Accessories', 'Keeps your drinks cold for 24 hours and hot for 12.', '32oz capacity, double-wall vacuum insulated, and leak-proof lid. Available in multiple colors.', 'https://res.cloudinary.com/dtt19zar3/image/upload/v1765098700/Larq_Bottle_CGI_Development_mofi6o.jpg', 25.99),
                  ('High-Performance Gaming Mouse', 'Electronics', 'Ultra-lightweight design for competitive gaming.', '16,000 DPI optical sensor, six programmable buttons, and customizable RGB lighting. Weighs only 68 grams.', 'https://res.cloudinary.com/dtt19zar3/image/upload/v1765098699/Gaming_Mouse_doecmy.jpg', 79.99),
                  ('Modern Minimalist Desk Lamp', 'Furniture', 'Sleek design with adjustable brightness and color temperature.', 'Touch control, flexible gooseneck, and eye-caring LED technology. Ideal for late-night reading or focused work.', 'https://res.cloudinary.com/dtt19zar3/image/upload/v1765098699/BOHON_LED_Desk_Lamp_sm0rkt.jpg', 55.00),
                  ('Premium Yoga Mat', 'Fitness', 'Extra thick, non-slip mat for ultimate comfort and stability.', 'Made from eco-friendly, non-toxic TPE material. Comes with a carrying strap. Perfect for yoga, Pilates, and floor exercises.', 'https://res.cloudinary.com/dtt19zar3/image/upload/v1765098699/Morning_Stretch_Routine___%EF%B8%8F_db6qr7.jpg', 45.95),
                  ('Portable Bluetooth Speaker', 'Electronics', 'Powerful sound in a compact, rugged package.', 'IPX7 waterproof rating, 12 hours of playtime, and built-in microphone for hands-free calling. Great for outdoor adventures.', 'https://res.cloudinary.com/dtt19zar3/image/upload/v1765098713/JBL_Portable_Speaker_Immersed_in_Jungle_Serenity_uob8c8.jpg', 99.00),
                  ('4K Ultra HD Smart TV - 55 Inch', 'Electronics', 'Stunning picture quality and smart streaming capabilities.', 'Direct-lit LED display, HDR support, and integrated smart platform with all major streaming apps. Voice remote included.', 'https://res.cloudinary.com/dtt19zar3/image/upload/v1765098713/Sony_XBR65Z9F_65_Inch_4K_Ultra_HD_Smart_BRAVIA_LED_TV_cjnuws.jpg', 699.99);
        `);
    } else {
      console.log("Products table already having data, skipping seeding.");
    }

    await client.query(`
        CREATE TABLE IF NOT EXISTS enquiries(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        product_id UUID REFERENCES products(id),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);


    await client.query(`
        CREATE TABLE IF NOT EXISTS admin_users(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    await client.query(`
        CREATE INDEX IF NOT EXISTS idx_product_name ON products(name);
        CREATE INDEX IF NOT EXISTS idx_product_category ON products(category);
        CREATE INDEX IF NOT EXISTS idx_enquiry_product_id ON enquiries(product_id);
        `);

    await client.query("COMMIT");
    console.log("Tables created successfully");
  } catch (error) {
    await client.query("ROLLBACK");
    console.log("Error creating tables: ", error);
    throw error;
  } finally {
    client.release();
  }
};

const testConnection = async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Database connection test successfull: ", result.rows[0].now);
    return true;
  } catch (error) {
    console.error("Database connection test failed: ", error);
    return false;
  }
};

module.exports = {
  createTables,
  testConnection,
};
