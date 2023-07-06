package controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"commercial-shop.com/models"
	"commercial-shop.com/services"
)

func CreateBillInfo(c *gin.Context) {
	// Create service and assign to data
	data := services.BillInfoService{Items: []models.BillInfo{{}}}
	c.ShouldBindJSON(&data.Items[0])

	// Execute method and send status request to user
	err := data.Create()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "can't create bill info!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "create bill info successfully!"})
}

func DeleteBillInfo(c *gin.Context) {
	// Create service and assign to data
	data := services.BillInfoService{Items: []models.BillInfo{{
		Id: c.Param("id"),
	}}}

	// Execute method and send status request to user
	err := data.Delete()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "can't delete bill info!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "delete bill info successfully!"})
}

func GetBillInfo(c *gin.Context) {
	// Create service and assign to data
	data := services.BillInfoService{Items: []models.BillInfo{{
		Id: c.Param("id"),
	}}}

	// Execute method and send status request to user
	err := data.Get()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": "can't get bill info value"})
		return
	}
	c.JSON(http.StatusOK, data.Items)
}

func GetAllBillInfo(c *gin.Context) {
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

	// Create service and assign to data
	// Then execute method and send status request to user
	data := services.BillInfoService{}
	err = data.GetAll(&limit, &page)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"data": "can't get all bill info value"})
		return
	}
	c.JSON(http.StatusOK, data.Items)
}

func UpdateBillInfo(c *gin.Context) {
	// Create service and assign to data
	data := services.BillInfoService{Items: []models.BillInfo{{}}}
	c.ShouldBindJSON(&data.Items[0])
	data.Items[0].Id = c.Param("id")

	// Check input options
	customerid, date, status, payment := true, true, true, true

	if data.Items[0].CustomerId == "" {
		customerid = false
	}
	if data.Items[0].Date.IsZero() {
		date = false
	}
	if data.Items[0].Status == -1 {
		status = false
	}
	if data.Items[0].Payment == -1 {
		payment = false
	}

	// Execute method and send status request to user
	err := data.Update(&customerid, &date, &status, &payment)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "can't update bill info!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "update bill info successfully!"})
}
