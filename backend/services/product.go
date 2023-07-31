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
	sql := "INSERT INTO Product VALUES (@id, @idCategory, @name, @color, @fabric, @size, @form, @price, @amount, @description);"
	args := pgx.NamedArgs{
		"id":          sv.Items[0].Id,
		"idCategory":  sv.Items[0].CategoryId,
		"name":        sv.Items[0].Name,
		"color":       sv.Items[0].Color,
		"fabric":      sv.Items[0].Fabric,
		"size":        sv.Items[0].Size,
		"form":        sv.Items[0].Form,
		"price":       sv.Items[0].Price,
		"amount":      sv.Items[0].Amount,
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

	// Get rows from conn with SQL command
	err = conn.QueryRow(database.CTX, sql).Scan(
		&sv.Items[0].Id,
		&sv.Items[0].CategoryId,
		&sv.Items[0].Name,
		&sv.Items[0].Color,
		&sv.Items[0].Fabric,
		&sv.Items[0].Size,
		&sv.Items[0].Form,
		&sv.Items[0].Price,
		&sv.Items[0].Amount,
		&sv.Items[0].Description,
	)
	if err != nil {
		return err
	}

	return nil
}

func (sv *ProductService) GetAll(limit, page *int, price, search *string) error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "SELECT * FROM Product ORDER BY product_id LIMIT @limit OFFSET @offset;"
	args := pgx.NamedArgs{
		"limit":  strconv.Itoa(*limit),
		"offset": strconv.Itoa(*limit * (*page - 1)),
	}

	if *search != "" {
		args["search"] = search
		sql = "SELECT * FROM Product WHERE product_name::text LIKE CONCAT('%', @search::text, '%') ORDER BY product_id LIMIT @limit OFFSET @offset;"
	}

	if *price == "asc" {
		sql = "SELECT * FROM Product ORDER BY product_price ASC LIMIT @limit OFFSET @offset;"
	} else if *price == "desc" {
		sql = "SELECT * FROM Product ORDER BY product_price DESC LIMIT @limit OFFSET @offset;"
	}

	// Get rows from conn with SQL command
	rows, err := conn.Query(database.CTX, sql, args)
	if err != nil {
		return err
	}

	// convert each rows to struct and append to Slice to return
	i := 0
	for rows.Next() {
		sv.Items = append(sv.Items, models.Product{})

		err := rows.Scan(
			&sv.Items[i].Id,
			&sv.Items[i].CategoryId,
			&sv.Items[i].Name,
			&sv.Items[i].Color,
			&sv.Items[i].Fabric,
			&sv.Items[i].Size,
			&sv.Items[i].Form,
			&sv.Items[i].Price,
			&sv.Items[i].Amount,
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

	for i := 0; i < 9; i++ {
		switch {
		case *category:
			sql += "category_id=@category"
			args["category"] = sv.Items[0].CategoryId
			*category = false

		case *name:
			sql += "product_id=@name"
			args["name"] = sv.Items[0].Name
			*name = false

		case *color:
			sql += "product_color=@color"
			args["percent"] = sv.Items[0].Color
			*color = false

		case *fabric:
			sql += "product_fabric=@fabric"
			args["fabric"] = sv.Items[0].Fabric
			*fabric = false

		case *size:
			sql += "product_size=@size"
			args["size"] = sv.Items[0].Size
			*size = false

		case *form:
			sql += "product_size=@form"
			args["form"] = sv.Items[0].Form
			*form = false

		case *price:
			sql += "product_price=@price"
			args["price"] = sv.Items[0].Price
			*price = false

		case *amount:
			sql += "product_amount=@amount"
			args["amount"] = sv.Items[0].Amount
			*amount = false

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
