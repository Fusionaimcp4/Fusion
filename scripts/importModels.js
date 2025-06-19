const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const { Pool } = require('pg');

// Update with your actual connection string or use environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL 
});

const csvFilePath = path.join(__dirname, '../models2.csv');

// Helper to parse costs like "$1.25" or "$0"
const parseCost = (val) => {
  if (!val) return 0;
  const num = parseFloat(val.replace(/[^0-9.]/g, ''));
  return isNaN(num) ? 0 : num;
};

// Helper to parse context length like "1,048,576"
const parseContext = (val) => {
  if (!val) return 0;
  const num = parseInt(val.replace(/[^0-9]/g, ''), 10);
  return isNaN(num) ? 0 : num;
};

// (Optional) Uncomment to clear the table before import
// pool.query('DELETE FROM models', (err) => {
//   if (err) console.error('Error clearing table:', err);
// });

const rows = [];

fs.createReadStream(csvFilePath)
  .pipe(parse({ columns: true, trim: true }))
  .on('data', (row) => {
    rows.push(row);
  })
  .on('end', async () => {
    console.log('CSV loaded, inserting...');
    let inserted = 0;
    let skipped = 0;
    for (const row of rows) {
      const {
        'Model Name & ID': nameAndId,
        'Input ($/1M tokens)': inputCost,
        'Output ($/1M tokens)': outputCost,
        'Context (tokens)': contextLength
      } = row;

      // Robustly parse name, id_string, and provider
      let name = nameAndId;
      let id_string = '';
      let provider = '';
      const providerPatterns = ['openai/', 'anthropic/', 'google/'];
      for (const pattern of providerPatterns) {
        const idx = nameAndId.indexOf(pattern);
        if (idx !== -1) {
          name = nameAndId.slice(0, idx).trim();
          id_string = nameAndId.slice(idx).trim();
          if (pattern === 'openai/') provider = 'OpenAI';
          else if (pattern === 'anthropic/') provider = 'Anthropic';
          else if (pattern === 'google/') provider = 'Google';
          break;
        }
      }

      const inputCostNum = parseCost(inputCost);
      const outputCostNum = parseCost(outputCost);
      const contextLengthNum = parseContext(contextLength);

      // Debug log
      console.log({ name, id_string, provider, inputCostNum, outputCostNum, contextLengthNum });

      if (!id_string) {
        console.error('Skipping row due to empty id_string:', { nameAndId, name, id_string });
        skipped++;
        continue;
      }

      try {
        await pool.query(
          `INSERT INTO models
            (name, id_string, provider, input_cost_per_million_tokens, output_cost_per_million_tokens, context_length_tokens)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            name,
            id_string,
            provider,
            inputCostNum,
            outputCostNum,
            contextLengthNum
          ]
        );
        console.log(`Inserted: ${name} (${id_string})`);
        inserted++;
      } catch (err) {
        console.error(`Error inserting ${name}:`, err.message);
        skipped++;
      }
    }
    console.log('Import complete.');
    console.log(`Inserted: ${inserted}, Skipped: ${skipped}`);
    pool.end();
  })
  .on('error', (err) => {
    console.error('Error reading CSV:', err.message);
    pool.end();
  });