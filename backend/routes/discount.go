package routes

import (
	"github.com/gin-gonic/gin"

	"commercial-shop.com/controllers"
)

func addDiscountRoutes(rg *gin.RouterGroup) {
	route := rg.Group("/discount")

	route.GET("/:id", controllers.GetDiscount)
	route.GET("", controllers.GetAllDiscount)
	route.POST("", controllers.CreateDiscount)
	route.PATCH("/:id", controllers.UpdateDiscount)
	route.DELETE("/:id", controllers.DeleteDiscount)
}
