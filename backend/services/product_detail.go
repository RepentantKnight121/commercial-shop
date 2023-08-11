package services

import (
	"commercial-shop.com/database"
	"commercial-shop.com/models"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type ProductDetailService struct {
	Items []models.ProductDetail
}

func (sv *ProductDetailService) Create() error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	sql := "INSERT INTO ProductDetail VALUES (@id, @productId, @color, @size, @amount);"
	args := pgx.NamedArgs{
		"id":         sv.Items[0].Id,
		"idCategory": sv.Items[0].ProductId,
		"name":       sv.Items[0].Size,
		"fabric":     sv.Items[0].Color,
		"price":      sv.Items[0].Amount,
	}

	// Execute sql command
	_, err = conn.Exec(database.CTX, sql, args)
	if err != nil {
		return err
	}

	return nil
}

func (sv *ProductDetailService) Delete() error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL command
	sql := "DELETE FROM ProductDetail WHERE product_detail_id='" + sv.Items[0].Id + "';"

	// Execute sql command
	_, err = conn.Exec(database.CTX, sql)
	if err != nil {
		return err
	}

	return nil
}

func (sv *ProductDetailService) Get() error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "SELECT * FROM ProductDetail WHERE product_detail_id='" + sv.Items[0].Id + "';"

	// Get row from conn with SQL command
	err = conn.QueryRow(database.CTX, sql).Scan(
		&sv.Items[0].Id,
		&sv.Items[0].ProductId,
		&sv.Items[0].Color,
		&sv.Items[0].Size,
		&sv.Items[0].Amount,
	)
	if err != nil {
		return err
	}

	return nil
}

func (sv *ProductDetailService) GetOnlyColorOrSize(color, size *bool) error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := ""

	// SQL options check
	if *color {
		sql = "SELECT DISTINCT product_detail_color FROM ProductDetail WHERE product_id='" + sv.Items[0].ProductId + "';"
	} else if *size {
		sql = "SELECT DISTINCT product_detail_size FROM ProductDetail WHERE product_id='" + sv.Items[0].ProductId + "';"
	}

	// Get rows from conn with SQL command
	rows, err := conn.Query(database.CTX, sql)
	if err != nil {
		return err
	}

	// convert each rows to struct and append to Slice to return
	i := 0
	for rows.Next() {
		sv.Items = append(sv.Items, models.ProductDetail{})

		if *color {
			err := rows.Scan(&sv.Items[i].Color)
			if err != nil {
				return err
			}
		} else if *size {
			err := rows.Scan(&sv.Items[i].Size)
			if err != nil {
				return err
			}
		}

		i++
	}
	if err := rows.Err(); err != nil {
		return err
	}

	return nil
}

func (sv *ProductDetailService) GetAll() error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "SELECT * FROM ProductDetail WHERE product_id=@productId ORDER BY product_detail_id;"
	args := pgx.NamedArgs{"productId": sv.Items[0].ProductId}

	// Get rows from conn with SQL command
	rows, err := conn.Query(database.CTX, sql, args)
	if err != nil {
		return err
	}

	// convert each rows to struct and append to Slice to return
	i := 0
	for rows.Next() {
		sv.Items = append(sv.Items, models.ProductDetail{})

		err := rows.Scan(
			&sv.Items[i].Id,
			&sv.Items[i].ProductId,
			&sv.Items[i].Color,
			&sv.Items[i].Size,
			&sv.Items[i].Amount,
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

func (sv *ProductDetailService) Update(productid, color, size, amount *bool) error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd check options if have
	sql := "UPDATE ProductDetail SET "
	args := pgx.NamedArgs{"id": sv.Items[0].Id}
	nextoption := true

	for i := 0; i < 5; i++ {
		switch {
		case *productid:
			sql += "product_id=@productId"
			args["productId"] = sv.Items[0].ProductId
			*productid = false

		case *color:
			sql += "product_detail_color=@color"
			args["color"] = sv.Items[0].Color
			*color = false

		case *size:
			sql += "product_detail_size=@size"
			args["size"] = sv.Items[0].Size
			*size = false

		case *amount:
			sql += "product_detail_amount=@amount"
			args["description"] = sv.Items[0].Amount
			*amount = false

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
	sql += " WHERE product_detail_id=@id;"

	// Execute sql command
	_, err = conn.Exec(database.CTX, sql, args)
	if err != nil {
		return err
	}

	return nil
}
