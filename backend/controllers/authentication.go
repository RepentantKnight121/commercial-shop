package controllers

import (
	"net/http"
	"time"

	"commercial-shop.com/models"
	"commercial-shop.com/services"
	"commercial-shop.com/utils"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func GetLogin(c *gin.Context) {
	// Get input data from user
	input := models.Account{}
	c.ShouldBindJSON(&input)

	// Create service and assign to data
	data := services.AccountService{Items: []models.Account{{
		Username: input.Username,
	}}}

	// Execute method and send status request to user
	login_flag := false
	userinfo_flag := false
	err := data.Get(&login_flag, &userinfo_flag)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Please enter username or password again!"})
		return
	}

	if data.Items[0].Active == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Please verify your account before login!"})
		return
	}

	// Check password input and encrypted password
	if !utils.CheckPasswordHash(input.Password, data.Items[0].Password) {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Please enter username or password again!"})
		return
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.RegisteredClaims{
		// A usual scenario is to set the expiration time relative to the current time
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * 7 * time.Hour)),
		IssuedAt:  jwt.NewNumericDate(time.Now()),
		NotBefore: jwt.NewNumericDate(time.Now()),
		Issuer:    data.Items[0].Username,
	})

	token, err := claims.SignedString([]byte(SecretKey))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not login!"})
	}

	c.SetCookie("login_commercial_shop_cookie", token, 3600, "/", "localhost", false, true)

	c.JSON(http.StatusOK, gin.H{"message": "Login successfully! Setting cookie!!!"})
}