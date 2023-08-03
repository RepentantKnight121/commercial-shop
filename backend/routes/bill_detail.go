package routes

import (
	"github.com/gin-gonic/gin"

	"commercial-shop.com/controllers"
)

func addBillDetailRoutes(rg *gin.RouterGroup) {
	route := rg.Group("/bill-detail")

	route.GET("/:id", controllers.GetBillDetail)
	route.GET("", controllers.GetAllBillDetail)
	route.POST("", controllers.CreateBillDetail)
	route.PATCH("/:id", controllers.UpdateBillDetail)
	route.DELETE("/:id", controllers.DeleteBillDetail)
}
