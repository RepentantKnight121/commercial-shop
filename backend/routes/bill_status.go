package routes

import (
	"github.com/gin-gonic/gin"

	"commercial-shop.com/controllers"
)

func addBillStatusRoutes(rg *gin.RouterGroup) {
	route := rg.Group("/bill-status")

	route.GET("/:id", controllers.GetBillStatus)
	route.GET("", controllers.GetAllBillStatus)
	route.POST("", controllers.CreateBillStatus)
	route.PATCH("/:id", controllers.UpdateBillStatus)
	route.DELETE("/:id", controllers.DeleteBillStatus)
}
