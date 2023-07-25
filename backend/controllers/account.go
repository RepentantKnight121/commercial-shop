package controllers

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"

	"commercial-shop.com/models"
	"commercial-shop.com/services"
	"commercial-shop.com/utils"
)

const SecretKey = "secret"

func CreateAccount(c *gin.Context) {
	// Create service and assign to data
	data := services.AccountService{Items: []models.Account{{}}}
	c.ShouldBindJSON(&data.Items[0])

	// Encrypt password
	encryptedPass, err := utils.HashPassword(data.Items[0].Password)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "can't create account"})
		return
	}
	data.Items[0].Password = encryptedPass

	// Execute method and send status request to user
	err = data.Create()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "can't create account"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "create account successfully!"})
}

func DeleteAccount(c *gin.Context) {
	// Create service and assign to data
	data := services.AccountService{Items: []models.Account{{
		Username: c.Param("username"),
	}}}

	// Execute method and send status request to user
	err := data.Delete()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "can't delete account!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "delete account successfully!"})
}

func GetAccount(c *gin.Context) {
	// Create service and assign to data
	data := services.AccountService{Items: []models.Account{{
		Username: c.Param("username"),
	}}}

	// Execute method and send status request to user
	login_flag := false
	userinfo_flag := false
	err := data.Get(&login_flag, &userinfo_flag)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": "can't get account value"})
		return
	}
	c.JSON(http.StatusOK, data.Items[0])
}

func GetAllAccount(c *gin.Context) {
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
	data := services.AccountService{}
	err = data.GetAll(&limit, &page)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"data": "can't get all account value"})
		return
	}
	c.JSON(http.StatusOK, data.Items)
}

func GetInfoAccount(c *gin.Context) {
	// Create service and assign to data
	data := services.AccountService{Items: []models.Account{{
		Username: c.Param("username"),
	}}}

	// Execute method and send status request to user
	login_flag := false
	userinfo_flag := true
	err := data.Get(&login_flag, &userinfo_flag)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Please enter username or password again!"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Login successfully!"})
}

func GetLoginAccount(c *gin.Context) {
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

	cookie := &http.Cookie{
		Name:     "login_commercial_shop_cookie",
		Value:    token,
		MaxAge:   3600,
		Path:     "/",
		Domain:   "localhost",
		Secure:   false,
		HttpOnly: true,
	}

	http.SetCookie(c.Writer, cookie)

	c.JSON(http.StatusOK, gin.H{"message": "Login successfully! Setting cookie!!!"})
}

func UpdateAccount(c *gin.Context) {
	// Create service and assign to data
	data := services.AccountService{Items: []models.Account{{}}}
	c.ShouldBindJSON(&data.Items[0])
	data.Items[0].Username = c.Param("username")

	// Check input options
	password_option, displayname_option, roleid_option, email_option, active_option := true, true, true, true, true

	// If password have then encrypt it and send to database
	if data.Items[0].Password == "" {
		password_option = false
	} else {
		encryptedPass, err := utils.HashPassword(data.Items[0].Password)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}
		data.Items[0].Password = encryptedPass
	}
	if data.Items[0].DisplayName == "" {
		displayname_option = false
	}
	if data.Items[0].RoleId == -1 {
		roleid_option = false
	}
	if data.Items[0].Email == "" {
		email_option = false
	}
	if data.Items[0].Active == -1 {
		active_option = false
	}

	// Execute method and send status request to user
	err := data.Update(&password_option, &displayname_option, &roleid_option, &email_option, &active_option)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "update account successfully!"})
}
