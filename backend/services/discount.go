package services

import (
	"strconv"

	"commercial-shop.com/database"
	"commercial-shop.com/models"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type DiscountService struct {
	Items []models.Discount
}

func (sv *DiscountService) Create() error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "INSERT INTO Discount VALUES (@id, @description, @percent, @dateStart, @dateEnd);"
	args := pgx.NamedArgs{
		"id":          sv.Items[0].Id,
		"description": sv.Items[0].Description,
		"percent":     sv.Items[0].Percent,
		"dateStart":   sv.Items[0].DateStart,
		"dateEnd":     sv.Items[0].DateEnd,
	}

	// Execute sql command
	_, err = conn.Exec(database.CTX, sql, args)
	if err != nil {
		return err
	}

	return nil
}

func (sv *DiscountService) Delete() error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "DELETE FROM Discount WHERE discount_id='" + sv.Items[0].Id + "';"

	// Execute sql command
	_, err = conn.Exec(database.CTX, sql)
	if err != nil {
		return err
	}

	return nil
}

func (sv *DiscountService) Get() error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "SELECT * FROM Discount WHERE discount_id='" + sv.Items[0].Id + "';"

	// Get rows from conn with SQL command
	err = conn.QueryRow(database.CTX, sql).Scan(
		&sv.Items[0].Id,
		&sv.Items[0].Description,
		&sv.Items[0].Percent,
		&sv.Items[0].DateStart,
		&sv.Items[0].DateEnd,
	)
	if err != nil {
		return err
	}

	return nil
}

func (sv *DiscountService) GetAll(limit, page *int) error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "SELECT * FROM Discount ORDER BY discount_id LIMIT @limit OFFSET @offset;"
	args := pgx.NamedArgs{
		"limit":  strconv.Itoa(*limit),
		"offset": strconv.Itoa(*limit * (*page - 1)),
	}

	// Get rows from connection with SQL command
	rows, err := conn.Query(database.CTX, sql, args)
	if err != nil {
		return err
	}

	// convert each rows to struct and append to Slice to return
	i := 0
	for rows.Next() {
		sv.Items = append(sv.Items, models.Discount{})

		err := rows.Scan(
			&sv.Items[i].Id,
			&sv.Items[i].Description,
			&sv.Items[i].Percent,
			&sv.Items[i].DateStart,
			&sv.Items[i].DateEnd,
		)
		if err != nil {
			return err
		}

		i++
	}

	// Return error
	if err := rows.Err(); err != nil {
		return err
	}

	return nil
}

func (sv *DiscountService) Update(description, percent, start, end *bool) error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "UPDATE Discount SET "
	args := pgx.NamedArgs{"id": sv.Items[0].Id}
	nextoption := true

	for i := 0; i < 4; i++ {
		switch {
		case *description:
			sql += "discount_description=@description"
			args["description"] = sv.Items[0].Description
			*description = false

		case *percent:
			sql += "discount_percent=@percent"
			args["percent"] = sv.Items[0].Percent
			*percent = false

		case *start:
			sql += "discount_date_start=@start"
			args["start"] = sv.Items[0].DateStart
			*start = false

		case *end:
			sql += "discount_date_end=@end"
			args["end"] = sv.Items[0].DateEnd
			*end = false

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
	sql += " WHERE discount_id=@id;"

	// Execute sql command
	_, err = conn.Exec(database.CTX, sql, args)
	if err != nil {
		return err
	}

	return nil
}
