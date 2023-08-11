package services

import (
	"fmt"
	"strconv"

	"commercial-shop.com/database"
	"commercial-shop.com/models"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type BillDetailService struct {
	Items []models.BillDetail
}

func (sv *BillDetailService) Create() error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "INSERT INTO BillDetail (bill_id, product_detail_id, discount_id, bill_amount) VALUES (@bill_id, @product_detail_id, @discount_id, @amount);"
	args := pgx.NamedArgs{
		"bill_id":           strconv.Itoa(sv.Items[0].BillId),
		"product_detail_id": sv.Items[0].ProductDetailId,
		"discount_id":       sv.Items[0].DiscountId,
		"amount":            strconv.Itoa(sv.Items[0].Amount),
	}

	// Execute sql command
	_, err = conn.Exec(database.CTX, sql, args)
	fmt.Println(err)
	if err != nil {
		return err
	}

	return nil
}

func (sv *BillDetailService) Delete() error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "DELETE FROM BillDetail WHERE bill_detail_id='" + strconv.Itoa(sv.Items[0].Id) + "';"

	// Execute sql command
	_, err = conn.Exec(database.CTX, sql)
	if err != nil {
		return err
	}

	return nil
}

func (sv *BillDetailService) Get() error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "SELECT * FROM BillDetail WHERE bill_detail_id='" + strconv.Itoa(sv.Items[0].Id) + "';"

	// Get rows from conn with SQL command
	err = conn.QueryRow(database.CTX, sql).Scan(
		&sv.Items[0].Id,
		&sv.Items[0].BillId,
		&sv.Items[0].ProductDetailId,
		&sv.Items[0].DiscountId,
		&sv.Items[0].Amount,
	)
	if err != nil {
		return err
	}

	return nil
}

func (sv *BillDetailService) GetAll(limit, page *int) error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "SELECT * FROM BillDetail ORDER BY bill_detail_id LIMIT @limit OFFSET @offset;"
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
		sv.Items = append(sv.Items, models.BillDetail{})

		err := rows.Scan(
			&sv.Items[i].Id,
			&sv.Items[i].BillId,
			&sv.Items[i].ProductDetailId,
			&sv.Items[i].DiscountId,
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

func (sv *BillDetailService) Update(billid, productdetailid, discountid, amount *bool) error {
	// Connect to database and close after executing command
	conn, err := pgxpool.New(database.CTX, database.CONNECT_STR)
	if err != nil {
		return err
	}
	defer conn.Close()

	// SQL commamd
	sql := "UPDATE BillDetail SET "
	args := pgx.NamedArgs{"id": sv.Items[0].Id}
	nextoption := true

	for i := 0; i < 4; i++ {
		switch {
		case *billid:
			sql += "bill_id=@bill_id"
			args["bill_id"] = sv.Items[0].BillId
			*billid = false

		case *productdetailid:
			sql += "product_detail_id=@product_detail_id"
			args["@product_detail_id"] = sv.Items[0].ProductDetailId
			*productdetailid = false

		case *discountid:
			sql += "discount_id=@discount"
			args["discount"] = sv.Items[0].DiscountId
			*discountid = false

		case *amount:
			sql += "bill_ammount=@amount"
			args["amount"] = strconv.Itoa(sv.Items[0].Amount)
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
	sql += " WHERE bill_detail_id=@id;"

	// Execute sql command
	_, err = conn.Exec(database.CTX, sql, args)
	if err != nil {
		return err
	}

	return nil
}
