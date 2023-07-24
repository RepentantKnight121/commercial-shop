package services

import (
	"testing"
	"time"

	"commercial-shop.com/models"
)

func Test_CreateBillInfo(t *testing.T) {
	// Create service and assign to data
	data := BillInfoService{Items: []models.BillInfo{{
		Id:         "001",
		CustomerId: "VIP03",
		Date:       time.Now(),
		Status:     0,
		Payment:    1,
	}}}

	date_option := true

	// Execute method and if error happen send error
	err := data.Create(&date_option)
	if err != nil {
		t.Fatalf("Error: %v", err)
	}
}

func Test_DeleteBillInfo(t *testing.T) {
	// Create service and assign to data
	data := BillInfoService{Items: []models.BillInfo{{
		Id: "001",
	}}}

	// Execute method and if error happen send error
	err := data.Delete()
	if err != nil {
		t.Fatalf("Err: %v", err)
	}
}

func Test_GetBillInfo(t *testing.T) {
	// Create service and assign to data
	data := BillInfoService{Items: []models.BillInfo{{
		Id: "001",
	}}}

	// Execute method and if error happen send error
	err := data.Get()
	if err != nil {
		t.Fatalf("Error: %v", err)
	}
}

func Test_GetAllBillInfo(t *testing.T) {
	// Create limit, page, service and assign to data
	limit := 10
	page := 10
	data := ProductImageService{}

	// Execute method and if error happen send error
	err := data.GetAll(&limit, &page)
	if err != nil {
		t.Fatalf("Error: %v", err)
	}
}

func Test_UpdateBillInfo(t *testing.T) {
	// Create service and assign to data
	data := BillInfoService{Items: []models.BillInfo{{
		Id:         "001",
		CustomerId: "VIP03",
		Date:       time.Now(),
		Status:     2,
		Payment:    1,
	}}}

	// Execute method and if error happen send error
	customerid, date, status, payment := true, true, true, true
	err := data.Update(&customerid, &date, &status, &payment)
	if err != nil {
		t.Fatalf("Error: %v", err)
	}
}
