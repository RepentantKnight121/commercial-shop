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
(1, 'Admin'),
(2, 'Khách hàng');

INSERT INTO Account (account_username, account_password, role_id, account_email) VALUES
('noob', '123', 1, 'noob@gmail.com');

INSERT INTO Customer VALUES
('1', 'noob', 'Noob', '123456', 'TP HCM');

INSERT INTO BillStatus VALUES
(0, 'Đơn hàng bị hủy'),
(1, 'Đang xác nhận đơn hàng'),
(2, 'Đang tiếp nhận hàng'),
(3, 'Đang giao hàng'),
(4, 'Đã hoàn thành');