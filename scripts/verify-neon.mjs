import 'dotenv/config';
import pg from 'pg';

async function verifyNeon() {
  console.log('====================================================');
  console.log('🧪 NEON POSTGRES END-TO-END VERIFICATION');
  console.log('====================================================\n');

  let hasErrors = false;

  // 1. Direct Database Query via Neon Connection String
  console.log('--- 1. Testing Direct Database Query via pg Pool ---');
  const databaseUrl = process.env.DATABASE_URL || process.env.DATABASE_URI;
  console.log('Connecting to Neon host:', new URL(databaseUrl).host);

  const client = new pg.Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log('✅ Connected to Neon PostgreSQL successfully!');

    const versionRes = await client.query('SELECT version();');
    console.log('  PostgreSQL Version:', versionRes.rows[0].version.split(' on ')[0]);

    const usersRes = await client.query('SELECT count(*) FROM users;');
    console.log('  Users in Neon DB:', usersRes.rows[0].count);

    const beritaRes = await client.query('SELECT count(*) FROM berita;');
    console.log('  Berita in Neon DB:', beritaRes.rows[0].count);

    const dusunRes = await client.query('SELECT count(*) FROM dusun;');
    console.log('  Dusun in Neon DB:', dusunRes.rows[0].count);

    const potensiRes = await client.query('SELECT count(*) FROM potensi;');
    console.log('  Potensi in Neon DB:', potensiRes.rows[0].count);

    const transparansiRes = await client.query('SELECT count(*) FROM dokumen_transparansi;');
    console.log('  Dokumen Transparansi in Neon DB:', transparansiRes.rows[0].count);

    await client.end();
    console.log('✅ Direct database queries PASSED!\n');
  } catch (err) {
    console.error('❌ Direct database query failed:', err.message);
    hasErrors = true;
  }

  // 2. Testing HTTP Endpoints served by Next.js from Neon Database
  console.log('--- 2. Testing Next.js App End-to-End HTTP Endpoints ---');
  const endpoints = [
    { url: 'http://localhost:3000/', name: 'Beranda (Frontend)' },
    { url: 'http://localhost:3000/profil/sejarah', name: 'Profil Sejarah (Globals)' },
    { url: 'http://localhost:3000/pemerintahan/struktur', name: 'Pemerintahan Struktur (Collections)' },
    { url: 'http://localhost:3000/api/berita', name: 'Payload REST API (/api/berita)' },
    { url: 'http://localhost:3000/admin/login', name: 'Payload CMS Admin Portal (/admin/login)' },
  ];

  for (const ep of endpoints) {
    try {
      const res = await fetch(ep.url);
      console.log(`  [HTTP ${res.status}] ${ep.name}: ${ep.url}`);
      if (res.status >= 200 && res.status < 400) {
        console.log(`    ✅ OK`);
      } else {
        console.error(`    ❌ Status ${res.status}`);
        hasErrors = true;
      }
    } catch (err) {
      console.error(`    ❌ Fetch error for ${ep.name}:`, err.message);
      hasErrors = true;
    }
  }

  console.log('\n====================================================');
  if (hasErrors) {
    console.error('❌ Verification FAILED with errors.');
    process.exit(1);
  } else {
    console.log('🎉 All Neon End-to-End Tests PASSED 100%!');
    console.log('====================================================');
  }
}

verifyNeon().catch((err) => {
  console.error(err);
  process.exit(1);
});
