package routes

import (
	"github.com/gin-gonic/gin"

	"commercial-shop.com/controllers"
)

func addProductRoutes(rg *gin.RouterGroup) {
	route := rg.Group("/product")

	route.GET("/:id", controllers.GetProduct)
	route.GET("", controllers.GetAllProduct)
	route.POST("", controllers.CreateProduct)
	route.PATCH("/:id", controllers.UpdateProduct)
	route.DELETE("/:id", controllers.DeleteProduct)
}
