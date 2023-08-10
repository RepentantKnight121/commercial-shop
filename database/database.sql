CREATE DATABASE shopdb;

\c shopdb;

CREATE TABLE Category (
    category_id    VARCHAR(20) PRIMARY KEY,
    category_name  VARCHAR(100) DEFAULT 'Chưa có thông tin'
);

CREATE TABLE Product (
    product_id           VARCHAR(20)  PRIMARY KEY ,
    category_id          VARCHAR(20)  NOT NULL,
    product_name         VARCHAR(100) DEFAULT 'Chưa có thông tin',
    product_fabric       VARCHAR(20)  DEFAULT 'Chưa có thông tin',
    product_price        INT          DEFAULT 0,
    product_description  VARCHAR(200) DEFAULT 'Chưa có thông tin',
    CONSTRAINT fk_category_id_for_product
        FOREIGN KEY (category_id)
        REFERENCES Category(category_id)
);

CREATE TABLE ProductDetail (
    product_detail_id      VARCHAR(20)  PRIMARY KEY,
    product_id             VARCHAR(20)  NOT NULL,
    product_detail_color   VARCHAR(100) DEFAULT 'Chưa có thông tin',
    product_detail_size    VARCHAR(20)  DEFAULT '',
    product_detail_amount  INT          CHECK (product_detail_amount >= 0) DEFAULT 0,
    CONSTRAINT fk_product_id_for_product_detail
        FOREIGN KEY (product_id)
        REFERENCES Product(product_id)
);

CREATE TABLE ProductImage (
    product_image_id  VARCHAR(20) PRIMARY KEY,
    product_id        VARCHAR(20) NOT NULL,
    product_image     BYTEA,
    CONSTRAINT fk_product_id_for_product_image
        FOREIGN KEY (product_id)
        REFERENCES Product(product_id)
);

CREATE TABLE AccountRole (
    role_id          SERIAL       PRIMARY KEY,
    role_description VARCHAR(200) DEFAULT 'Chưa có thông tin'
);

CREATE TABLE Account (
    account_username      VARCHAR(20)  PRIMARY KEY,
    role_id               INT          NOT NULL,
    account_password      VARCHAR(200) NOT NULL,
    account_displayname   VARCHAR(100) DEFAULT '',
    account_email         VARCHAR(200) DEFAULT '',
    account_active        INT          DEFAULT 0 CHECK (account_active=0 OR account_active=1),
    account_token_session BYTEA        DEFAULT NULL,
    CONSTRAINT fk_role_id_for_account
        FOREIGN KEY (role_id)
        REFERENCES AccountRole(role_id)
);

CREATE TABLE Discount (
    discount_id          VARCHAR(20)  PRIMARY KEY,
    discount_description VARCHAR(200) DEFAULT 'Chưa có thông tin',
    discount_percent     REAL         DEFAULT 0.0,
    discount_date_start  DATE         DEFAULT NOW(),
    discount_date_end    DATE         DEFAULT NOW()
);

CREATE TABLE BillStatus (
    bill_status_id           SERIAL PRIMARY KEY,
    bill_status_description  VARCHAR(200) DEFAULT 'Chưa có thông tin'
);

CREATE TABLE BillInfo (
    bill_id          SERIAL PRIMARY KEY,
    account_username VARCHAR(20) NOT NULL,
    bill_name        VARCHAR(20),
    bill_email       VARCHAR(200),
    bill_phone       VARCHAR(20),
    bill_address     VARCHAR(200),
    bill_date        DATE DEFAULT NOW(),
    bill_status_id   INT NOT NULL,
    bill_payment     INT CHECK (bill_payment = 0 OR bill_payment = 1) DEFAULT 0,
    CONSTRAINT fk_customer_id_for_bill_info
        FOREIGN KEY (account_username)
        REFERENCES Account(account_username),
    CONSTRAINT fk_bill_status_id_for_bill_info
        FOREIGN KEY (bill_status_id)
        REFERENCES BillStatus(bill_status_id)
);

CREATE TABLE BillDetail (
    bill_detail_id     SERIAL PRIMARY KEY,
    bill_id            INT NOT NULL,
    product_id         VARCHAR(20) NOT NULL,
    product_detail_id  VARCHAR(20) NOT NULL,
    discount_id        VARCHAR(20) NOT NULL,
    bill_amount        INT CHECK (bill_amount > 0),
    CONSTRAINT fk_bill_id_for_bill_detail
        FOREIGN KEY (bill_id)
        REFERENCES BillInfo(bill_id),
    CONSTRAINT fk_product_id_for_bill_detail
        FOREIGN KEY (product_id)
        REFERENCES Product(product_id),
    CONSTRAINT fk_product_detail_id_for_bill_detail
        FOREIGN KEY (product_detail_id)
        REFERENCES ProductDetail(product_detail_id),
    CONSTRAINT fk_discount_id_for_bill_detail
        FOREIGN KEY (discount_id)
        REFERENCES Discount(discount_id)
);

\i insert.sql
