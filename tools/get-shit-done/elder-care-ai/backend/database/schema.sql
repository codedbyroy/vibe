CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('elderly', 'caregiver')),
  phone TEXT NOT NULL,
  linked_user_id INTEGER,
  FOREIGN KEY(linked_user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS medications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  time TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT 1,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  medication_id INTEGER NOT NULL,
  date TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('pending', 'taken', 'missed')),
  reminder_sent_at DATETIME,
  taken_at DATETIME,
  FOREIGN KEY(medication_id) REFERENCES medications(id)
);

CREATE TABLE IF NOT EXISTS alerts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  log_id INTEGER NOT NULL,
  sent_at DATETIME,
  type TEXT NOT NULL CHECK(type IN ('sms', 'push')),
  status TEXT NOT NULL CHECK(status IN ('sent', 'failed')),
  FOREIGN KEY(log_id) REFERENCES logs(id)
);
