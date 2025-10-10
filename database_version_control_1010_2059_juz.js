// 代码生成时间: 2025-10-10 20:59:42
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Define the schema version file path
const schemaVersionFilePath = path.join(__dirname, 'schemaVersions.json');

// Function to read the schema version from file
function readSchemaVersion() {
  try {
    const data = fs.readFileSync(schemaVersionFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading schema version file:', error);
    return null;
  }
}

// Function to write the schema version to file
function writeSchemaVersion(version) {
  try {
    const data = JSON.stringify(version, null, 2);
    fs.writeFileSync(schemaVersionFilePath, data);
  } catch (error) {
    console.error('Error writing schema version file:', error);
  }
}

// Function to migrate the database to the given version
function migrateDatabase(db, version) {
  // Define migration functions for each version
  const migrations = {
    '1.0.0': () => {
      // Migration logic for version 1.0.0
      console.log('Migrating to version 1.0.0...');
    },
    '1.1.0': () => {
      // Migration logic for version 1.1.0
      console.log('Migrating to version 1.1.0...');
    }
    // Add more migrations as needed
  };

  // Apply the necessary migrations
  Object.keys(migrations)
    .filter(v => v.split('.')[0] < version.split('.')[0] ||
                (v.split('.')[0] === version.split('.')[0] && v.split('.')[1] < version.split('.')[1]) ||
                (v.split('.')[0] === version.split('.')[0] && v.split('.')[1] === version.split('.')[1] && v.split('.')[2] <= version.split('.')[2]))
    .forEach(v => migrations[v]());
}

// Main function to control database version
function controlDatabaseVersion(dbPath, targetVersion) {
  const db = new sqlite3.Database(dbPath);
  const currentVersion = readSchemaVersion() || '0.0.0';

  console.log(`Current database version: ${currentVersion}`);
  console.log(`Target database version: ${targetVersion}`);

  if (currentVersion === targetVersion) {
    console.log('Database is already at the target version.');
    return;
  }

  db.serialize(() => {
    db.run('PRAGMA foreign_keys = ON;');

    try {
      migrateDatabase(db, targetVersion);
      writeSchemaVersion(targetVersion);
      console.log(`Database successfully migrated to version ${targetVersion}.`);
    } catch (error) {
      console.error('Error migrating database:', error);
      db.close();
      process.exit(1);
    }
  });

  db.close();
}

// Usage example
const dbPath = path.join(__dirname, 'my_database.db');
const targetVersion = '1.1.0';
controlDatabaseVersion(dbPath, targetVersion);