package controllers

import (
	"net/http"
	"time"

	"commercial-shop.com/models"
	"commercial-shop.com/services"
	"commercial-shop.com/utils"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"

	emailverifier "github.com/AfterShip/email-verifier"
)

var verifier = emailverifier.NewVerifier().EnableSMTPCheck()

const SECRET_KEY = "secret"

func Login(c *gin.Context) {
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
	token_flag := false
	err := data.Get(&login_flag, &userinfo_flag, &token_flag)
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

	token, err := claims.SignedString([]byte(SECRET_KEY))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not login!"})
		return
	}

	// Store JWT token in database
	data.Items[0].Session = []byte(token)
	password_option, displayname_option, roleid_option, email_option, active_option, session_option := false, false, false, false, false, true

	err = data.Update(&password_option, &displayname_option, &roleid_option, &email_option, &active_option, &session_option)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Could not store token!"})
	}

	//c.SetSameSite(http.SameSiteLaxMode)
	//c.SetCookie("loginCookie", token, 3600, "/", "localhost", false, true)

	c.JSON(http.StatusOK, gin.H{"message": "Login successfully! Setting cookie!!!"})
}

func Register(c *gin.Context) {
	data := services.AccountService{Items: []models.Account{{}}}
	c.ShouldBindJSON(&data)

	// Check email
	_, err := verifier.Verify(data.Items[0].Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Verify email address failed!"})
		return
	}

	// Create register option
	register_option := true

	data.Create(&register_option)
}

func SessionAccount(c *gin.Context) {
	// Create service and assign to data
	data := services.AccountService{Items: []models.Account{{
		Username: c.Param("username"),
	}}}

	data.Items[0].Session = []byte(c.Query("token"))

	// Execute method and send status request to user
	login_flag := false
	userinfo_flag := false
	token_flag := true
	err := data.Get(&login_flag, &userinfo_flag, &token_flag)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Login through session failed"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Login successfully!"})
}
