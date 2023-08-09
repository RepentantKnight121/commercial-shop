package routes

import (
	"github.com/gin-gonic/gin"

	"commercial-shop.com/controllers"
)

func addAccountRoutes(rg *gin.RouterGroup) {
	route := rg.Group("/account")

	route.GET("/:username", controllers.GetAccount)
	route.GET("/checklogin/:username", controllers.CheckLoginAccount)
	route.GET("", controllers.GetAllAccount)
	route.POST("", controllers.CreateAccount)
	route.PATCH("/:username", controllers.UpdateAccount)
	route.DELETE("/:username", controllers.DeleteAccount)
}
