package services

import (
	"strconv"

	"commercial-shop.com/database"
	"commercial-shop.com/models"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type ProductService struct {
	Items []models.Product
}

func (sv *ProductService) Create() error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "INSERT INTO Product VALUES (@id, @idCategory, @name, @fabric, @price, @description);"
	args := pgx.NamedArgs{
		"id":          sv.Items[0].Id,
		"idCategory":  sv.Items[0].CategoryId,
		"name":        sv.Items[0].Name,
		"fabric":      sv.Items[0].Fabric,
		"price":       sv.Items[0].Price,
		"description": sv.Items[0].Description,
	}

	// Execute sql command
	_, err = conn.Exec(database.CTX, sql, args)
	if err != nil {
		return err
	}

	return nil
}

func (sv *ProductService) Delete() error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "DELETE FROM Product WHERE product_id='" + sv.Items[0].Id + "';"

	// Execute sql command
	_, err = conn.Exec(database.CTX, sql)
	if err != nil {
		return err
	}

	return nil
}

func (sv *ProductService) Get() error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "SELECT * FROM Product WHERE product_id='" + sv.Items[0].Id + "';"

	// Get row from conn with SQL command
	err = conn.QueryRow(database.CTX, sql).Scan(
		&sv.Items[0].Id,
		&sv.Items[0].CategoryId,
		&sv.Items[0].Name,
		&sv.Items[0].Fabric,
		&sv.Items[0].Price,
		&sv.Items[0].Description,
	)
	if err != nil {
		return err
	}

	return nil
}

func (sv *ProductService) GetAll(limit, page *int, category, price, search *string) error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "SELECT * FROM Product ORDER BY product_price LIMIT @limit OFFSET @offset;"
	args := pgx.NamedArgs{
		"limit":  strconv.Itoa(*limit),
		"offset": strconv.Itoa(*limit * (*page - 1)),
	}

	if *price == "asc" && *category == "" && *search == "" {
		sql = "SELECT * FROM Product ORDER BY product_price ASC LIMIT @limit OFFSET @offset;"
	} else if *price == "desc" && *category == "" && *search == "" {
		sql = "SELECT * FROM Product ORDER BY product_price DESC LIMIT @limit OFFSET @offset;"
	} else if *price == "asc" && *category != "" && *search != "" {
		args["category"] = *category
		args["search"] = *search
		sql = "SELECT * FROM Product WHERE ((product_name::text LIKE CONCAT('%', @search::text, '%')) AND category_id=@category) ORDER BY product_price ASC LIMIT @limit OFFSET @offset;"
	} else if *price == "desc" && *category != "" && *search != "" {
		args["category"] = *category
		args["search"] = *search
		sql = "SELECT * FROM Product WHERE ((product_name::text LIKE CONCAT('%', @search::text, '%')) AND category_id=@category) ORDER BY product_price DESC LIMIT @limit OFFSET @offset;"
	} else if *price == "asc" && *category != "" && *search == "" {
		args["category"] = *category
		sql = "SELECT * FROM Product WHERE category_id=@category ORDER BY product_price ASC LIMIT @limit OFFSET @offset;"
	} else if *price == "desc" && *category != "" && *search == "" {
		args["category"] = *category
		sql = "SELECT * FROM Product WHERE category_id=@category ORDER BY product_price DESC LIMIT @limit OFFSET @offset;"
	} else if *price == "asc" && *category == "" && *search != "" {
		args["category"] = *category
		sql = "SELECT * FROM Product WHERE product_name::text LIKE CONCAT('%', @search::text, '%') ORDER BY product_price ASC LIMIT @limit OFFSET @offset;"
	} else if *price == "desc" && *category == "" && *search != "" {
		args["category"] = *category
		sql = "SELECT * FROM Product WHERE product_name::text LIKE CONCAT('%', @search::text, '%') ORDER BY product_price DESC LIMIT @limit OFFSET @offset;"
	}

	// Get rows from conn with SQL command
	rows, err := conn.Query(database.CTX, sql, args)
	if err != nil {
		return err
	}

	// convert each row to struct and append to Slice to return
	i := 0
	for rows.Next() {
		sv.Items = append(sv.Items, models.Product{})

		err := rows.Scan(
			&sv.Items[i].Id,
			&sv.Items[i].CategoryId,
			&sv.Items[i].Name,
			&sv.Items[i].Fabric,
			&sv.Items[i].Price,
			&sv.Items[i].Description,
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

func (sv *ProductService) Update(category, name, color, fabric, size, form, amount, price, description *bool) error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd check options if have
	sql := "UPDATE Product SET "
	args := pgx.NamedArgs{"id": sv.Items[0].Id}
	nextoption := true

	for i := 0; i < 5; i++ {
		switch {
		case *category:
			sql += "category_id=@category"
			args["category"] = sv.Items[0].CategoryId
			*category = false

		case *name:
			sql += "product_id=@name"
			args["name"] = sv.Items[0].Name
			*name = false

		case *fabric:
			sql += "product_fabric=@fabric"
			args["fabric"] = sv.Items[0].Fabric
			*fabric = false

		case *price:
			sql += "product_price=@price"
			args["price"] = sv.Items[0].Price
			*price = false

		case *description:
			sql += "product_description=@description"
			args["description"] = sv.Items[0].Description
			*description = false

		default:
			nextoption = false
		}

		// comma false
		if !nextoption {
			sql = sql[:len(sql)-1]
			break
		}
		sql += ","
	}
	sql += " WHERE product_id=@id;"

	// Execute sql command
	_, err = conn.Exec(database.CTX, sql, args)
	if err != nil {
		return err
	}

	return nil
}
