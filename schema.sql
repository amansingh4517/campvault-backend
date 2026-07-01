
-- ---------- Custom Types ----------

CREATE TYPE task_stage AS ENUM ('open', 'assigned', 'in_progress', 'completed', 'cancelled');
CREATE TYPE item_condition AS ENUM ('new', 'like_new', 'good', 'fair', 'poor');
CREATE TYPE item_stage AS ENUM ('listed', 'reserved', 'completed', 'cancelled');
CREATE TYPE transaction_status AS ENUM ('holding', 'released', 'refunded');
CREATE TYPE attachment_filetype AS ENUM ('image', 'pdf', 'doc', 'video', 'other');
CREATE TYPE user_role AS ENUM ('student', 'admin');


-- ---------- Tables (in dependency order) ----------

-- 1. college — no dependencies
CREATE TABLE college (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    domain VARCHAR(100) UNIQUE
);

-- 2. users — depends on college
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'student',
    number VARCHAR(15) NOT NULL,
    location VARCHAR(255),
    college_id BIGINT NOT NULL REFERENCES college(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. tasks — depends on users (self-referencing FK: buyer/seller)
-- buyer posts the task and pays; seller accepts it and performs the work
CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    stage task_stage NOT NULL DEFAULT 'open',
    buyer_id BIGINT NOT NULL REFERENCES users(id),
    seller_id BIGINT REFERENCES users(id)
);

-- 4. items — depends on users (self-referencing FK: buyer/seller)
-- seller lists the item; buyer comes along later to purchase it
CREATE TABLE items (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    condition item_condition NOT NULL,
    stage item_stage NOT NULL DEFAULT 'listed',
    buyer_id BIGINT REFERENCES users(id),
    seller_id BIGINT NOT NULL REFERENCES users(id)
);

-- 5. task_transaction — one-to-one with tasks (UNIQUE enforces this)
CREATE TABLE task_transaction (
    id BIGSERIAL PRIMARY KEY,
    task_id BIGINT NOT NULL UNIQUE REFERENCES tasks(id),
    amount DECIMAL(10,2) NOT NULL,
    platform_fee DECIMAL(10,2),
    incoming_time TIMESTAMPTZ NOT NULL,
    outgoing_time TIMESTAMPTZ,
    status transaction_status NOT NULL DEFAULT 'holding'
);

-- 6. item_transaction — one-to-one with items (UNIQUE enforces this)
CREATE TABLE item_transaction (
    id BIGSERIAL PRIMARY KEY,
    item_id BIGINT NOT NULL UNIQUE REFERENCES items(id),
    amount DECIMAL(10,2) NOT NULL,
    platform_fee DECIMAL(10,2),
    incoming_time TIMESTAMPTZ NOT NULL,
    outgoing_time TIMESTAMPTZ,
    status transaction_status NOT NULL DEFAULT 'holding'
);

-- 7. attachment — one-to-many with tasks, one-to-many with users (uploader)
CREATE TABLE attachment (
    id BIGSERIAL PRIMARY KEY,
    task_id BIGINT NOT NULL REFERENCES tasks(id),
    uploader_id BIGINT NOT NULL REFERENCES users(id),
    filetype attachment_filetype NOT NULL,
    path VARCHAR(500) NOT NULL
);
