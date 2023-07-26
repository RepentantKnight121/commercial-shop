package routes

import (
	"github.com/gin-gonic/gin"

	"commercial-shop.com/controllers"
)

func addBillInfoRoutes(rg *gin.RouterGroup) {
	route := rg.Group("/bill-info")

	route.GET("/:id", controllers.GetBillInfo)
	route.GET("", controllers.GetAllBillInfo)
	route.POST("", controllers.CreateBillInfo)
	route.PATCH("/:id", controllers.UpdateBillInfo)
	route.DELETE("/:id", controllers.DeleteBillInfo)
}
