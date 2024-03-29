package routes

import (
	"commercial-shop.com/controllers"
	"github.com/gin-gonic/gin"
)

func addAuthRoutes(rg *gin.RouterGroup) {
	route := rg.Group("/auth")
	route.POST("/login", controllers.Login)
	route.POST("/register", controllers.Register)
	route.GET("/session/:username", controllers.SessionAccount)
}
