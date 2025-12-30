CREATE TABLE IF NOT EXISTS blacklist_db (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    telegramId BIGINT NOT NULL,
    timestamp BIGINT NOT NULL,
    blacklisted_tags TEXT
);