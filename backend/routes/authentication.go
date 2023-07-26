package routes

import (
	"commercial-shop.com/controllers"
	"github.com/gin-gonic/gin"
)

func addAuthRoutes(rg *gin.RouterGroup) {
	route := rg.Group("/auth")
	route.POST("/login", controllers.GetLogin)
}
