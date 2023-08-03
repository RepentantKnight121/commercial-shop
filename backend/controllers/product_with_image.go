package controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"commercial-shop.com/services"
	"github.com/gin-gonic/gin"
)

func GetAllProductWithImage(c *gin.Context) {
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

	// Get search
	search := c.Query("search")
	price := c.Query("price")
	category := c.Query("category")

	// Create service and assign to data
	// Then execute method and send status request to user
	data := services.ProductWithImageService{}
	err = data.GetAll(&limit, &page, &category, &price, &search)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"data": "can't get all product value"})
		return
	}
	c.JSON(http.StatusOK, data.Items)
}
