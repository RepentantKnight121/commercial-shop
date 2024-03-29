package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"commercial-shop.com/models"
	"commercial-shop.com/services"
)

func CreateProductDetail(c *gin.Context) {
	// Create service and assign to data
	data := services.ProductDetailService{Items: []models.ProductDetail{{}}}
	c.ShouldBindJSON(&data.Items[0])

	// Execute method and send status request to user
	err := data.Create()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "can't create product-detail!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "create product successfully!"})
}

func DeleteProductDetail(c *gin.Context) {
	// Create service and assign to data
	data := services.ProductDetailService{Items: []models.ProductDetail{{
		Id: c.Param("id"),
	}}}

	// Execute method and send status request to user
	err := data.Delete()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "can't delete product-detail!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "delete product successfully!"})
}

func GetProductDetail(c *gin.Context) {
	// Create service and assign to data
	data := services.ProductDetailService{Items: []models.ProductDetail{{
		Id: c.Param("id"),
	}}}

	amount_option := false

	// Execute method and send status request to user
	err := data.Get(&amount_option)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": "can't get product-detail value"})
		return
	}
	c.JSON(http.StatusOK, data.Items)
}

func GetAllProductDetail(c *gin.Context) {
	// Create service and assign to data
	// Then execute method and send status request to user
	data := services.ProductDetailService{Items: []models.ProductDetail{{}}}
	data.Items[0].ProductId = c.Query("productid")

	// Get limit
	limit, err := strconv.Atoi(c.Query("limit"))
	if err != nil {
		limit = 10
	}
	if limit <= 0 {
		limit = 10
	}

	// Get page
	page, err := strconv.Atoi(c.Query("page"))
	if err != nil {
		page = 1
	}
	if page <= 0 {
		page = 1
	}

	productid := data.Items[0].ProductId != ""

	err = data.GetAll(&limit, &page, &productid)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": "can't get all product-detail value"})
		return
	}

	if len(data.Items) > 0 {
		data.Items = data.Items[:len(data.Items)-1]
	}

	c.JSON(http.StatusOK, data.Items)
}

func UpdateProductDetail(c *gin.Context) {
	// Create service and assign to data
	data := services.ProductDetailService{Items: []models.ProductDetail{{}}}
	c.ShouldBindJSON(&data.Items[0])
	data.Items[0].Id = c.Param("id")

	// Check input options
	productid_option, color_option, size_option, amount_option :=
		true, true, true, true

	if data.Items[0].ProductId == "" {
		productid_option = false
	}
	if data.Items[0].Color == "" {
		color_option = false
	}
	if data.Items[0].Size == "" {
		size_option = false
	}
	if data.Items[0].Amount == -1 {
		amount_option = false
	}

	// Execute method and send status request to user
	err := data.Update(&productid_option, &color_option, &size_option, &amount_option)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "can't update product-detail!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "update product successfully!"})
}
