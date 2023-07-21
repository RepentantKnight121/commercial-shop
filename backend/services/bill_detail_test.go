package services

import (
	"testing"

	"commercial-shop.com/models"
)

func Test_CreateBillDetail(t *testing.T) {
	// Create service and assign to data
	data := BillDetailService{Items: []models.BillDetail{{
		Id:         "003",
		BillId:     "001",
		ProductId:  "XD32",
		DiscountId: "XV1",
		Amount:     2,
	}}}

	// Execute method and if error happen send error
	err := data.Create()
	if err != nil {
		t.Fatalf("Error: %v", err)
	}
}

func Test_DeleteBillDetail(t *testing.T) {
	// Create service and assign to data
	data := BillDetailService{Items: []models.BillDetail{{
		Id: "003",
	}}}

	// Execute method and if error happen send error
	err := data.Delete()
	if err != nil {
		t.Fatalf("Err: %v", err)
	}
}

func Test_GetBillDetail(t *testing.T) {
	// Create service and assign to data
	data := BillDetailService{Items: []models.BillDetail{{
		Id: "003",
	}}}

	// Execute method and if error happen send error
	err := data.Get()
	if err != nil {
		t.Fatalf("Error: %v", err)
	}
}

func Test_GetAllBillDetail(t *testing.T) {
	// Create limit, page. service and assign to data
	limit := 10
	page := 10
	data := BillDetailService{}

	// Execute method and if error happen send error
	err := data.GetAll(&limit, &page)
	if err != nil {
		t.Fatalf("Error: %v", err)
	}
}

func Test_UpdateBillDetail(t *testing.T) {
	// Create service and assign to data
	data := BillDetailService{Items: []models.BillDetail{{
		Id:         "003",
		BillId:     "001",
		ProductId:  "XD32",
		DiscountId: "XV1",
		Amount:     3,
	}}}

	// Execute method and if error happen send error
	billid_option, productdetailid_option, discountid_option, ammount_option := true, true, true, true
	err := data.Update(&billid_option, &productdetailid_option, &discountid_option, &ammount_option)
	if err != nil {
		t.Fatalf("Error: %v", err)
	}
}
