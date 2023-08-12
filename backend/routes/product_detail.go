package routes

import (
	"github.com/gin-gonic/gin"

	"commercial-shop.com/controllers"
)

func addProductDetailRoutes(rg *gin.RouterGroup) {
	route := rg.Group("/product-detail")

	route.GET("/:id", controllers.GetProductDetail)
	route.GET("/amount", controllers.GetAmountProductDetail)
	route.GET("/onlycolororsize", controllers.GetOnlyColorOrSizeProductDetail)
	route.GET("", controllers.GetAllProductDetail)
	route.POST("", controllers.CreateProductDetail)
	route.PATCH("/:id", controllers.UpdateProductDetail)
	route.DELETE("/:id", controllers.DeleteProductDetail)
}
