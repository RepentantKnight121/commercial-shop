package services

import (
	"strconv"

	"commercial-shop.com/database"
	"commercial-shop.com/models"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type CustomerService struct {
	Items []models.Customer
}

func (sv *CustomerService) Create() error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL command
	sql := "INSERT INTO Customer VALUES (@id, @username, @name, @phone, @address);"
	args := pgx.NamedArgs{
		"id":       sv.Items[0].Id,
		"username": sv.Items[0].AccountUsername,
		"name":     sv.Items[0].Name,
		"phone":    sv.Items[0].Phone,
		"address":  sv.Items[0].Address,
	}

	// Execute sql command
	_, err = conn.Exec(database.CTX, sql, args)
	if err != nil {
		return err
	}

	return nil
}

func (sv *CustomerService) Delete() error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "DELETE FROM Customer WHERE customer_id='" + sv.Items[0].Id + "';"

	// Execute sql command
	_, err = conn.Exec(database.CTX, sql)
	if err != nil {
		return err
	}

	return nil
}

func (sv *CustomerService) Get() error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "SELECT * FROM Customer WHERE customer_id='" + sv.Items[0].Id + "';"

	// Get rows from conn with SQL command
	err = conn.QueryRow(database.CTX, sql).Scan(
		&sv.Items[0].Id,
		&sv.Items[0].AccountUsername,
		&sv.Items[0].Name,
		&sv.Items[0].Phone,
		&sv.Items[0].Address,
	)
	if err != nil {
		return err
	}

	return nil
}

func (sv *CustomerService) GetAll(limit, page *int) error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "SELECT * FROM Customer ORDER BY customer_id LIMIT @limit OFFSET @offset;"
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
		sv.Items = append(sv.Items, models.Customer{})

		err := rows.Scan(
			&sv.Items[i].Id,
			&sv.Items[i].AccountUsername,
			&sv.Items[i].Name,
			&sv.Items[i].Phone,
			&sv.Items[i].Address,
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

func (sv *CustomerService) Update(name, phone, address *bool) error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "UPDATE Customer SET "
	args := pgx.NamedArgs{"id": sv.Items[0].Id}
	nextoption := true

	for i := 0; i < 4; i++ {
		switch {
		case *name:
			sql += "customer_name=@name"
			args["name"] = sv.Items[0].Name
			*name = false

		case *phone:
			sql += "customer_phone=@phone"
			args["phone"] = sv.Items[0].Phone
			*phone = false

		case *address:
			sql += "customer_address=@address"
			args["address"] = sv.Items[0].Address
			*address = false

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
	sql += " WHERE customer_id=@id;"

	// Execute sql command
	_, err = conn.Exec(database.CTX, sql, args)
	if err != nil {
		return err
	}

	return nil
}
