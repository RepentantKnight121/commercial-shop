package services

import (
	"strconv"

	"commercial-shop.com/database"
	"commercial-shop.com/models"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type ProductWithImageService struct {
	Items []models.ProductWithImage
}

func (sv *ProductWithImageService) GetAll(limit, page *int, category, price, search *string) error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "SELECT product_id, category_id, product_name, product_price, product_amount, (SELECT ProductImage.product_image FROM ProductImage INNER JOIN Product ON ProductImage.product_id=Product.product_id LIMIT 1) AS product_image FROM Product ORDER BY product_price LIMIT @limit OFFSET @offset;"
	args := pgx.NamedArgs{
		"limit":  strconv.Itoa(*limit),
		"offset": strconv.Itoa(*limit * (*page - 1)),
	}

	if *price == "asc" && *category == "" && *search == "" {
		sql = "SELECT p.product_id, p.category_id, p.product_name, p.product_price, p.product_amount, pi.product_image FROM Product p LEFT JOIN (SELECT product_id, MIN(product_image_id) AS min_image_id FROM ProductImage WHERE product_image IS NOT NULL GROUP BY product_id) AS subquery ON p.product_id = subquery.product_id LEFT JOIN ProductImage pi ON subquery.min_image_id = pi.product_image_id ORDER BY p.product_price ASC LIMIT @limit OFFSET @offset;"
	} else if *price == "desc" && *category == "" && *search == "" {
		sql = "SELECT p.product_id, p.category_id, p.product_name, p.product_price, p.product_amount, pi.product_image FROM Product p LEFT JOIN (SELECT product_id, MIN(product_image_id) AS min_image_id FROM ProductImage WHERE product_image IS NOT NULL GROUP BY product_id) AS subquery ON p.product_id = subquery.product_id LEFT JOIN ProductImage pi ON subquery.min_image_id = pi.product_image_id ORDER BY p.product_price DESC LIMIT @limit OFFSET @offset;"
	} else if *price == "asc" && *category != "" && *search != "" {
		args["category"] = *category
		args["search"] = *search
		sql = "SELECT p.product_id, p.category_id, p.product_name, p.product_price, p.product_amount, pi.product_image FROM Product p LEFT JOIN (SELECT product_id, MIN(product_image_id) AS min_image_id FROM ProductImage WHERE product_image IS NOT NULL GROUP BY product_id) AS subquery ON p.product_id = subquery.product_id LEFT JOIN ProductImage pi ON subquery.min_image_id = pi.product_image_id WHERE ((p.product_name::text LIKE CONCAT('%', @search::text, '%')) AND p.category_id = @category) ORDER BY p.product_price ASC LIMIT @limit OFFSET @offset;"
	} else if *price == "desc" && *category != "" && *search != "" {
		args["category"] = *category
		args["search"] = *search
		sql = "SELECT p.product_id, p.category_id, p.product_name, p.product_price, p.product_amount, pi.product_image FROM Product p LEFT JOIN (SELECT product_id, MIN(product_image_id) AS min_image_id FROM ProductImage WHERE product_image IS NOT NULL GROUP BY product_id) AS subquery ON p.product_id = subquery.product_id LEFT JOIN ProductImage pi ON subquery.min_image_id = pi.product_image_id WHERE ((p.product_name::text LIKE CONCAT('%', @search::text, '%')) AND p.category_id = @category) ORDER BY p.product_price DESC LIMIT @limit OFFSET @offset;"
	} else if *price == "asc" && *category != "" && *search == "" {
		args["category"] = *category
		sql = "SELECT p.product_id, p.category_id, p.product_name, p.product_price, p.product_amount, pi.product_image FROM Product p LEFT JOIN (SELECT product_id, MIN(product_image_id) AS min_image_id FROM ProductImage WHERE product_image IS NOT NULL GROUP BY product_id) AS subquery ON p.product_id = subquery.product_id LEFT JOIN ProductImage pi ON subquery.min_image_id = pi.product_image_id WHERE p.category_id = @category ORDER BY p.product_price ASC LIMIT @limit OFFSET @offset;"
	} else if *price == "desc" && *category != "" && *search == "" {
		args["category"] = *category
		sql = "SELECT p.product_id, p.category_id, p.product_name, p.product_price, p.product_amount, pi.product_image FROM Product p LEFT JOIN (SELECT product_id, MIN(product_image_id) AS min_image_id FROM ProductImage WHERE product_image IS NOT NULL GROUP BY product_id) AS subquery ON p.product_id = subquery.product_id LEFT JOIN ProductImage pi ON subquery.min_image_id = pi.product_image_id WHERE p.category_id = @category ORDER BY p.product_price DESC LIMIT @limit OFFSET @offset;"
	} else if *price == "asc" && *category == "" && *search != "" {
		args["category"] = *category
		sql = "SELECT p.product_id, p.category_id, p.product_name, p.product_price, p.product_amount, pi.product_image FROM Product p LEFT JOIN (SELECT product_id, MIN(product_image_id) AS min_image_id FROM ProductImage WHERE product_image IS NOT NULL GROUP BY product_id) AS subquery ON p.product_id = subquery.product_id LEFT JOIN ProductImage pi ON subquery.min_image_id = pi.product_image_id WHERE p.product_name::text LIKE CONCAT('%', @search::text, '%') ORDER BY p.product_price ASC LIMIT @limit OFFSET @offset;"
	} else if *price == "desc" && *category == "" && *search != "" {
		args["category"] = *category
		sql = "SELECT p.product_id, p.category_id, p.product_name, p.product_price, p.product_amount, pi.product_image FROM Product p LEFT JOIN (SELECT product_id, MIN(product_image_id) AS min_image_id FROM ProductImage WHERE product_image IS NOT NULL GROUP BY product_id) AS subquery ON p.product_id = subquery.product_id LEFT JOIN ProductImage pi ON subquery.min_image_id = pi.product_image_id WHERE p.product_name::text LIKE CONCAT('%', @search::text, '%') ORDER BY p.product_price DESC LIMIT @limit OFFSET @offset;"
	}

	// Get rows from conn with SQL command
	rows, err := conn.Query(database.CTX, sql, args)
	if err != nil {
		return err
	}

	// convert each rows to struct and append to Slice to return
	i := 0
	for rows.Next() {
		sv.Items = append(sv.Items, models.ProductWithImage{})

		err := rows.Scan(
			&sv.Items[i].Id,
			&sv.Items[i].CategoryId,
			&sv.Items[i].Name,
			&sv.Items[i].Price,
			&sv.Items[i].Amount,
			&sv.Items[i].Image,
		)
		if err != nil {
			return err
		}

		i++
	}
	if err := rows.Err(); err != nil {
		return err
	}

	return nil
}
