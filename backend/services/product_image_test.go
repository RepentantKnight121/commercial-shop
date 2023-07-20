package services

import (
	"testing"

	"commercial-shop.com/models"
)

func Test_CreateProductImage(t *testing.T) {
	// Create service and assign to data
	data := ProductImageService{Items: []models.ProductImage{{
		Id:        "3",
		ProductId: "XD32",
		Image:     nil,
	}}}

	// Execute method and if error happen send error
	err := data.Create()
	if err != nil {
		t.Fatalf("Error: %v", err)
	}
}

func Test_DeleteProductImage(t *testing.T) {
	// Create service and assign to data
	data := ProductImageService{Items: []models.ProductImage{{
		Id: "3",
	}}}

	// Execute method and if error happen send error
	err := data.Delete()
	if err != nil {
		t.Fatalf("Err: %v", err)
	}
}

func Test_GetProductImage(t *testing.T) {
	// Create service and assign to data
	data := ProductImageService{Items: []models.ProductImage{{
		Id: "3",
	}}}

	// Execute method and if error happen send error
	err := data.Get()
	if err != nil {
		t.Fatalf("Error: %v", err)
	}
}

func Test_GetAllProductImage(t *testing.T) {
	// Create limit, page, service and assign to data
	limit := 20
	page := 1
	data := ProductImageService{}

	// Execute method and if error happen send error
	err := data.GetAll(&limit, &page)
	if err != nil {
		t.Fatalf("Error: %v", err)
	}
}

func Test_UpdateProductImage(t *testing.T) {
	// Create service and assign to data
	data := ProductImageService{Items: []models.ProductImage{{
		Id:        "3",
		ProductId: "D33",
		Image:     nil,
	}}}

	// Execute method and if error happen send error
	productdetailid, image := true, true
	err := data.Update(&productdetailid, &image)
	if err != nil {
		t.Fatalf("Error: %v", err)
	}
}
