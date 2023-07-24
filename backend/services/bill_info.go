package services

import (
	"fmt"
	"strconv"

	"commercial-shop.com/database"
	"commercial-shop.com/models"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type BillInfoService struct {
	Items []models.BillInfo
}

func (sv *BillInfoService) Create(date_option *bool) error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "INSERT INTO BillInfo VALUES (@id, @customerId, @date, @status, @payment);"
	args := pgx.NamedArgs{
		"id":         sv.Items[0].Id,
		"customerId": sv.Items[0].CustomerId,
		"date":       sv.Items[0].Date,
		"status":     sv.Items[0].Status,
		"payment":    sv.Items[0].Payment,
	}
	if *date_option == false {
		sql = "INSERT INTO BillInfo (bill_id, customer_id, bill_status_id, bill_payment) VALUES (@id, @customerId, @status, @payment);"
		delete(args, "date")
	}
	fmt.Println(sql)

	// Execute sql command
	_, err = conn.Exec(database.CTX, sql, args)
	if err != nil {
		return err
	}

	return nil
}

func (sv *BillInfoService) Delete() error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "DELETE FROM BillInfo WHERE bill_id='" + sv.Items[0].Id + "';"

	// Execute sql command
	_, err = conn.Exec(database.CTX, sql)
	if err != nil {
		return err
	}

	return nil
}

func (sv *BillInfoService) Get() error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "SELECT * FROM BillInfo WHERE bill_id='" + sv.Items[0].Id + "';"

	// Get rows from conn with SQL command
	err = conn.QueryRow(database.CTX, sql).Scan(
		&sv.Items[0].Id,
		&sv.Items[0].CustomerId,
		&sv.Items[0].Date,
		&sv.Items[0].Status,
		&sv.Items[0].Payment,
	)
	if err != nil {
		return err
	}

	return nil
}

func (sv *BillInfoService) GetAll(limit, page *int) error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "SELECT * FROM BillInfo ORDER BY bill_id LIMIT @limit OFFSET @offset;"
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
		sv.Items = append(sv.Items, models.BillInfo{})

		err := rows.Scan(
			&sv.Items[i].Id,
			&sv.Items[i].CustomerId,
			&sv.Items[i].Date,
			&sv.Items[i].Status,
			&sv.Items[i].Payment,
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

func (sv *BillInfoService) Update(customerid, status, date, payment *bool) error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// Check input options to generate SQL command
	sql := "UPDATE BillInfo SET "
	args := pgx.NamedArgs{"id": sv.Items[0].Id}
	nextoption := true

	for i := 0; i < 4; i++ {
		switch {
		case *customerid:
			sql += "customer_id=@customer_id"
			args["customer_id"] = sv.Items[0].CustomerId
			*customerid = false

		case *status:
			sql += "bill_status=@status"
			args["status"] = sv.Items[0].Status
			*status = false

		case *date:
			sql += "bill_date=@date"
			args["date"] = sv.Items[0].Date
			*date = false

		case *payment:
			sql += "bill_payment=@payment"
			args["payment"] = sv.Items[0].Payment
			*payment = false

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
	sql += " WHERE bill_id=@id;"

	// Execute sql command
	_, err = conn.Exec(database.CTX, sql, args)
	if err != nil {
		return err
	}

	return nil
}
