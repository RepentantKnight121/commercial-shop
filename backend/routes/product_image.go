package routes

import (
	"github.com/gin-gonic/gin"

	"commercial-shop.com/controllers"
)

func addProductImageRoutes(rg *gin.RouterGroup) {
	route := rg.Group("/product-image")

	route.GET("/:id", controllers.GetProductImage)
	route.GET("", controllers.GetAllProductImage)
	route.POST("", controllers.CreateProductImage)
	route.PATCH("/:id", controllers.UpdateProductImage)
	route.DELETE("/:id", controllers.DeleteProductImage)
}
