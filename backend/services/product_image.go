package services

import (
	"strconv"

	"commercial-shop.com/database"
	"commercial-shop.com/models"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type ProductImageService struct {
	Items []models.ProductImage
}

func (sv *ProductImageService) Create() error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "INSERT INTO ProductImage VALUES (@id, @idProductDetail, @image);"
	args := pgx.NamedArgs{
		"id":              sv.Items[0].Id,
		"idProductDetail": sv.Items[0].ProductDetailId,
		"image":           sv.Items[0].Image,
	}

	// Execute sql command
	_, err = conn.Exec(database.CTX, sql, args)
	if err != nil {
		return err
	}

	return nil
}

func (sv *ProductImageService) Delete() error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "DELETE FROM ProductImage WHERE product_image_id='" + sv.Items[0].Id + "';"

	// Execute sql command
	_, err = conn.Exec(database.CTX, sql)
	if err != nil {
		return err
	}

	return nil
}

func (sv *ProductImageService) Get() error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "SELECT * FROM ProductImage WHERE product_image_id='" + sv.Items[0].Id + "';"

	// Get rows from conn with SQL command
	err = conn.QueryRow(database.CTX, sql).Scan(
		&sv.Items[0].Id,
		&sv.Items[0].ProductDetailId,
		&sv.Items[0].Image,
	)
	if err != nil {
		return err
	}

	return nil
}

func (sv *ProductImageService) GetAll(limit, page *int) error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "SELECT * FROM ProductImage ORDER BY product_image_id LIMIT @limit OFFSET @offset;"
	args := pgx.NamedArgs{
		"limit":  strconv.Itoa(*limit),
		"offset": strconv.Itoa(*limit * (*page - 1)),
	}

	// Get rows from conn with SQL command
	rows, err := conn.Query(database.CTX, sql, args)
	if err != nil {
		return err
	}

	// convert each rows to struct and append to Slice to return
	i := 0
	for rows.Next() {
		sv.Items = append(sv.Items, models.ProductImage{})

		err := rows.Scan(
			&sv.Items[i].Id,
			&sv.Items[i].ProductDetailId,
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

func (sv *ProductImageService) Update(productdetailid, image *bool) error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "UPDATE ProductImage SET product_detail_id=@productdetailid, product_image=@image WHERE product_image_id=@id;"
	args := pgx.NamedArgs{
		"id":              sv.Items[0].Image,
		"productdetailid": sv.Items[0].ProductDetailId,
		"image":           sv.Items[0].Image,
	}

	if *productdetailid {
		sql = "UPDATE ProductImage SET product_image=@image WHERE product_image_id=@id;"
		delete(args, "productdetailid")
	} else if *image {
		sql = "UPDATE ProductImage SET product_detail_id=@productdetailid WHERE product_image_id=@id;"
		delete(args, "image")
	}

	// Execute sql command
	_, err = conn.Exec(database.CTX, sql, args)
	if err != nil {
		return err
	}

	return nil
}
