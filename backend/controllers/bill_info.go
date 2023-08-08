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
	// Create service and assign the BillInfo to data
	data := services.BillInfoService{Items: []models.BillInfo{{}}}
	c.ShouldBindJSON(&data.Items[0])

	// Set options
	dateOption := true
	if data.Items[0].Date.IsZero() {
		dateOption = false
	}

	// Execute the Create method and send the status response to the user
	err := data.Create(&dateOption)
	if err != nil {
		// Handle the error
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to create bill info"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": "successfully created bill info"})
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
	customerid_option, address_option, phone_option, date_option, status_option, payment_option := true, true, true, true, true, true

	if data.Items[0].CustomerId == "" {
		customerid_option = false
	}
	if data.Items[0].Address == "" {
		address_option = false
	}
	if data.Items[0].Phone == "" {
		phone_option = false
	}
	if data.Items[0].Date.IsZero() {
		date_option = false
	}
	if data.Items[0].Status == -1 {
		status_option = false
	}
	if data.Items[0].Payment == -1 {
		payment_option = false
	}

	// Execute method and send status request to user
	err := data.Update(&customerid_option, &address_option, &phone_option, &date_option, &status_option, &payment_option)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "can't update bill info!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "update bill info successfully!"})
}
