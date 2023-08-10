INSERT INTO Category VALUES
('1', 'Quần nam'),
('2', 'Áo nam');

INSERT INTO Product (product_id, category_id, product_name) VALUES
('1', '1', 'Quần nam');

INSERT INTO ProductImage (product_image_id, product_id) VALUES
('1', '1'),
('2', '1');

INSERT INTO Discount (discount_id, discount_percent) VALUES
('XV1', 0.05),
('HS1', 0.03);

INSERT INTO AccountRole VALUES
(0, 'Khách hàng'),
(1, 'Admin');

INSERT INTO Account (account_username, account_password, role_id, account_email, account_active) VALUES
('noob', '$2a$14$Hkw1eqwkYF6LdlRDW7YQG.pLyWCwpzdQ43CiJvW54zp.8TTZbFgrG', 1, 'noob@gmail.com', 1);

INSERT INTO BillStatus VALUES
(0, 'Đơn hàng bị hủy'),
(1, 'Đang xác nhận đơn hàng'),
(2, 'Đang tiếp nhận hàng'),
(3, 'Đang giao hàng'),
(4, 'Đã hoàn thành');