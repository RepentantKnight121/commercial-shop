package controllers

import (
	"fmt"
	"net/http"

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
		c.JSON(http.StatusBadRequest, gin.H{"error": "can't create product!"})
		fmt.Println(err)
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
		c.JSON(http.StatusBadRequest, gin.H{"error": "can't delete product!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "delete product successfully!"})
}

func GetProductDetail(c *gin.Context) {
	// Create service and assign to data
	data := services.ProductDetailService{Items: []models.ProductDetail{{
		Id: c.Param("id"),
	}}}

	// Execute method and send status request to user
	err := data.Get()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": "can't get product value"})
		return
	}
	c.JSON(http.StatusOK, data.Items)
}

func GetAllProductDetail(c *gin.Context) {
	// Get search
	productid := c.Query("productid")

	// Create service and assign to data
	// Then execute method and send status request to user
	data := services.ProductDetailService{}
	err := data.GetAll(&productid)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": "can't get all product value"})
		return
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
		c.JSON(http.StatusBadRequest, gin.H{"error": "can't update product!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "update product successfully!"})
}
