package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var router = gin.Default()

const SECRET_KEY = "secret"

func Run(port string) {
	// Cors middleware config
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowMethods = []string{"GET", "POST", "PATCH", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type"}
	config.AllowCredentials = true

	// Use middlewares
	router.Use(cors.New(config))

	getRoutes()

	router.Run(":" + port)
}

func getRoutes() {
	r := router.Group("/api")
	addAuthRoutes(r)
	addAccountRoutes(r)
	addAccountRoleRoutes(r)
	addBillDetailRoutes(r)
	addBillInfoRoutes(r)
	addBillStatusRoutes(r)
	addCategoryRoutes(r)
	addCustomerRoutes(r)
	addDiscountRoutes(r)
	addProductRoutes(r)
	addProductImageRoutes(r)
	addProductWithImageRoutes(r)
}
