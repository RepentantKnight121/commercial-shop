package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"commercial-shop.com/models"
	"commercial-shop.com/services"
)

func CreateProductImage(c *gin.Context) {
	// Create service and assign to data
	data := services.ProductImageService{Items: []models.ProductImage{{}}}
	c.ShouldBindJSON(&data.Items[0])

	// Execute method and send status request to user
	err := data.Create()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "can't create product image!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "create product image successfully!"})
}

func DeleteProductImage(c *gin.Context) {
	// Create service and assign to data
	data := services.ProductImageService{Items: []models.ProductImage{{
		Id: c.Param("id"),
	}}}

	// Execute method and send status request to user
	err := data.Delete()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "can't delete product image!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "delete product image successfully!"})
}

func GetProductImage(c *gin.Context) {
	// Create service and assign to data
	data := services.ProductImageService{Items: []models.ProductImage{{
		Id: c.Param("id"),
	}}}

	// Execute method and send status request to user
	err := data.Get()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": "can't get product image value"})
		return
	}
	c.JSON(http.StatusOK, data.Items)
}

func GetAllProductImage(c *gin.Context) {
	// Get limit
	limit, err := strconv.Atoi(c.Query("limit"))
	if err != nil {
		limit = 20
	}
	if limit <= 0 {
		limit = 20
	}

	// Get page
	page, err := strconv.Atoi(c.Query("page"))
	if err != nil {
		page = 1
	}
	if page <= 0 {
		page = 1
	}

	// Create service and assign to data
	// Then execute method and send status request to user
	data := services.ProductImageService{}
	err = data.GetAll(&limit, &page)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": "can't get all product image value"})
		return
	}
	c.JSON(http.StatusOK, data.Items)
}

func UpdateProductImage(c *gin.Context) {
	// Create service and assign to data
	data := services.ProductImageService{Items: []models.ProductImage{{}}}
	c.ShouldBindJSON(&data.Items[0])
	data.Items[0].Id = c.Param("id")

	// Check input options
	productdetailid, image := true, true

	if data.Items[0].ProductDetailId == "" {
		productdetailid = false
	}
	if data.Items[0].Image == nil {
		image = false
	}

	// Execute method and send status request to user
	err := data.Update(&productdetailid, &image)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "can't update product image!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "update product image successfully!"})
}
