package controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"commercial-shop.com/access"
	"commercial-shop.com/models"
)

func GetAllProductDetail(c *gin.Context) {
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

	data, err := access.FindAllProductDetail(&limit, &page)

	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"data": "can't get all product detail value"})
		return
	}
	c.JSON(http.StatusOK, data)
}

func GetProductDetail(c *gin.Context) {
	id := c.Param("id")
	data, err := access.FindProductDetail(&id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": "can't get product detail value"})
		return
	}
	c.JSON(http.StatusOK, data)
}

func CreateProductDetail(c *gin.Context) {
	data := models.ProductDetail{}
	c.ShouldBindJSON(&data)
	err := access.CreateProductDetail(&data)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "can't create product detail!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "create product detail successfully!"})
}

func UpdateProductDetail(c *gin.Context) {
	data := models.ProductDetail{}
	c.ShouldBindJSON(&data)
	data.Id = c.Param("id")

	err := access.UpdateProductDetail(&data)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "can't update product detail!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "update product detail successfully!"})
}

func DeleteProductDetail(c *gin.Context) {
	id := c.Param("id")
	err := access.DeleteProductDetail(&id)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "can't delete product detail!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "delete product detail successfully!"})
}