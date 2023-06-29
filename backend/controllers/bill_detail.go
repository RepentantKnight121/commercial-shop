package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"commercial-shop.com/models"
	"commercial-shop.com/services"
)

func CreateBillDetail(c *gin.Context) {
	// Create service and assign to data
	data := services.BillDetailService{Items: []models.BillDetail{{}}}
	c.ShouldBindJSON(&data.Items[0])

	// Execute method and send status request to user
	err := data.Create()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "can't create bill detail!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "create bill detail successfully!"})
}

func DeleteBillDetail(c *gin.Context) {
	// Create service and assign to data
	data := services.BillDetailService{Items: []models.BillDetail{{
		Id: c.Param("id"),
	}}}

	// Execute method and send status request to user
	err := data.Delete()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "can't delete bill detail!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "delete bill detail successfully!"})
}

func GetBillDetail(c *gin.Context) {
	// Create service and assign to data
	data := services.BillDetailService{Items: []models.BillDetail{{
		Id: c.Param("id"),
	}}}

	// Execute method and send status request to user
	err := data.Get()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": "can't get bill detail value"})
		return
	}
	c.JSON(http.StatusOK, data.Items)
}

func GetAllBillDetail(c *gin.Context) {
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
	data := services.BillDetailService{}
	err = data.GetAll(&limit, &page)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": "can't get all bill detail value"})
		return
	}
	c.JSON(http.StatusOK, data.Items)
}

func UpdateBillDetail(c *gin.Context) {
	// Create service and assign to data
	data := services.BillDetailService{Items: []models.BillDetail{{}}}
	c.ShouldBindJSON(&data.Items[0])
	data.Items[0].Id = c.Param("id")

	// Execute method and send status request to user
	err := data.Update()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "can't update bill detail!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "update bill detail successfully!"})
}
