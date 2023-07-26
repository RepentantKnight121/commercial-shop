package routes

import (
	"github.com/gin-gonic/gin"

	"commercial-shop.com/controllers"
)

func addCustomerRoutes(rg *gin.RouterGroup) {
	route := rg.Group("/customer")

	route.GET("/:id", controllers.GetCustomer)
	route.GET("", controllers.GetAllCustomer)
	route.POST("", controllers.CreateCustomer)
	route.PATCH("/:id", controllers.UpdateCustomer)
	route.DELETE("/:id", controllers.DeleteCustomer)
}
