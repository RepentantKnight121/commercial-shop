package routes

import (
	"github.com/gin-gonic/gin"

	"commercial-shop.com/controllers"
)

func addAccountRoleRoutes(rg *gin.RouterGroup) {
	route := rg.Group("/account-role")

	route.GET("/:id", controllers.GetAccountRole)
	route.GET("", controllers.GetAllAccountRole)
	route.POST("", controllers.CreateAccountRole)
	route.PATCH("/:id", controllers.UpdateAccountRole)
	route.DELETE("/:id", controllers.DeleteAccountRole)
}
