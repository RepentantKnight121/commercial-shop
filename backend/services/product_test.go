package services

import (
	"testing"

	"commercial-shop.com/models"
)

func Test_CreateProduct(t *testing.T) {
	// Create service and assign to data
	data := ProductService{
		Items: []models.Product{{
			Id:          "3",
			CategoryId:  "1",
			Name:        "Quần nam 3",
			Color:       "Đen",
			Fabric:      "Vải",
			Form:        "Ôm",
			Size:        "39",
			Price:       165000,
			Amount:      100,
			Description: "Thông tin chưa cập nhập",
		}},
	}

	// Execute method and if error happen send error
	err := data.Create()
	if err != nil {
		t.Fatalf("Error: %v", err)
	}
}

func Test_DeleteProduct(t *testing.T) {
	// Create service and assign to data
	data := ProductService{Items: []models.Product{{
		Id: "3",
	}}}

	// Execute method and if error happen send error
	err := data.Delete()
	if err != nil {
		t.Fatalf("Error: %v", err)
	}
}

func Test_GetProduct(t *testing.T) {
	// Create service and assign to data
	data := ProductService{Items: []models.Product{{
		Id: "3",
	}}}

	// Execute method and if error happen send error
	err := data.Get()
	if err != nil {
		t.Fatalf("Error: %v", err)
	}
}

func Test_GetAllProduct(t *testing.T) {
	// Create limit, page, service and assign to data
	limit := 10
	page := 1
	search := ""
	data := ProductService{}

	// Execute method and if error happen send error
	err := data.GetAll(&limit, &page, &search)
	if err != nil {
		t.Fatalf("Error: %v", err)
	}
}

func Test_UpdateProduct(t *testing.T) {
	// Create service and assign to data
	data := ProductService{
		Items: []models.Product{{
			Id:          "3",
			Price:       200000,
			Amount:      90,
			Description: "Thông tin chưa cập nhập. Chưa rõ ràng",
		}},
	}

	// Execute method and if error happen send error
	category, name, color, fabric, size, form, amount, price, description :=
		false, false, false, false, false, false, true, true, true
	err := data.Update(&category, &name, &color, &fabric, &size, &form, &amount, &price, &description)
	if err != nil {
		t.Fatalf("Error: %v", err)
	}
}
